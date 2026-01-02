import React from 'react';
import { City, FactionId } from '../types';
import { FACTION_COLORS } from '../constants';

interface MapProps {
  cities: City[];
  selectedCityId: string | null;
  onCitySelect: (cityId: string) => void;
}

const Map: React.FC<MapProps> = ({ cities, selectedCityId, onCitySelect }) => {
  return (
    <div className="relative w-full h-[400px] bg-gray-900 border-4 border-nes-blue rounded-lg overflow-hidden select-none">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>

      {/* Rivers (Decorative SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <path d="M 20 50 Q 40 40 50 60 T 90 70" stroke="#3b82f6" strokeWidth="4" fill="none" />
        <path d="M 10 30 Q 30 20 40 35 T 80 30" stroke="#3b82f6" strokeWidth="4" fill="none" />
      </svg>

      {/* Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {cities.map(city => 
          city.neighbors.map(neighborId => {
            const neighbor = cities.find(c => c.id === neighborId);
            if (!neighbor) return null;
            // Only draw line once per pair (compare IDs)
            if (city.id > neighbor.id) return null;
            return (
              <line 
                key={`${city.id}-${neighbor.id}`}
                x1={`${city.x}%`} 
                y1={`${city.y}%`} 
                x2={`${neighbor.x}%`} 
                y2={`${neighbor.y}%`} 
                stroke="#6b7280" 
                strokeWidth="2" 
                strokeDasharray="4"
              />
            );
          })
        )}
      </svg>

      {/* Cities */}
      {cities.map((city) => {
        const isSelected = selectedCityId === city.id;
        const factionColor = FACTION_COLORS[city.factionId];
        
        return (
          <div
            key={city.id}
            onClick={() => onCitySelect(city.id)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 
              ${isSelected ? 'z-20 scale-110' : 'z-10 hover:scale-105'}`}
            style={{ 
              left: `${city.x}%`, 
              top: `${city.y}%` 
            }}
          >
            <div className="flex flex-col items-center group">
              {/* City Icon */}
              <div 
                className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center shadow-lg transition-all duration-300
                  ${isSelected ? 'border-4 animate-pulse' : 'border-2'}
                  bg-gray-900`}
                style={{ 
                  borderColor: factionColor,
                  boxShadow: isSelected ? `0 0 15px ${factionColor}` : 'none'
                }}
              >
                 <span 
                   className="text-xs font-bold drop-shadow-md"
                   style={{ color: factionColor }}
                 >
                   {city.name.substring(0, 1)}
                 </span>
              </div>
              
              {/* City Name Label */}
              <div className={`mt-1 px-2 py-0.5 text-[10px] md:text-xs font-mono font-bold uppercase tracking-wide
                ${isSelected ? 'bg-nes-gold text-black' : 'bg-black/70 text-white'}`}>
                {city.name}
              </div>

              {/* Stats Hover Tooltip */}
              <div className="absolute top-10 w-32 hidden group-hover:block z-50 bg-nes-blue border-2 border-white p-2 text-[10px] text-white pointer-events-none">
                 <p>Gold: {city.gold}</p>
                 <p>Soldiers: {city.soldiers}</p>
                 <p>Owner: {city.factionId === FactionId.NONE ? 'Free' : city.factionId.replace('_', ' ')}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Map;