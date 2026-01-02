import React, { useState, useRef, MouseEvent, useEffect } from 'react';
import { City, BattleAnim } from '../types';
import { FACTION_COLORS, GRID_COLS, GRID_ROWS } from '../constants';

interface MapProps {
  cities: City[];
  selectedCityId: string | null;
  onCitySelect: (cityId: string) => void;
  battleAnim: BattleAnim | null;
}

// Increased Hex Size to fill the view
const HEX_SIZE = 65; 
const HEX_WIDTH = Math.sqrt(3) * HEX_SIZE;
const HEX_HEIGHT = 2 * HEX_SIZE;

// Centering offsets for 1200x720 canvas
// Grid Width approx: 10 * 112 = 1120
// Grid Height approx: 6 * 97 = 582
const X_OFFSET = (1200 - (GRID_COLS * HEX_WIDTH)) / 2 + (HEX_WIDTH / 2);
const Y_OFFSET = (720 - (GRID_ROWS * (HEX_SIZE * 1.5))) / 2 + HEX_SIZE;

// Helper to calculate hex points string
const getHexPoints = (x: number, y: number, r: number) => {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle_deg = 60 * i - 30; // Pointy top
    const angle_rad = Math.PI / 180 * angle_deg;
    points.push(`${x + r * Math.cos(angle_rad)},${y + r * Math.sin(angle_rad)}`);
  }
  return points.join(' ');
};

// Convert Grid (col, row) to Pixel (x, y)
const gridToPixel = (col: number, row: number) => {
    // Offset every other row for hex layout
    const x = (col + (row % 2) * 0.5) * HEX_WIDTH + X_OFFSET;
    const y = row * (HEX_SIZE * 1.5) + Y_OFFSET;
    return { x, y };
};

const BattleVisuals = ({ startPos, endPos }: { startPos: {x:number, y:number}, endPos: {x:number, y:number} }) => {
    const [phase, setPhase] = useState<'travel' | 'clash'>('travel');
    const [pos, setPos] = useState(startPos);

    useEffect(() => {
        setPos(startPos);
        setPhase('travel');

        const travelTimer = setTimeout(() => {
            setPos(endPos);
        }, 50);

        const clashTimer = setTimeout(() => {
            setPhase('clash');
        }, 800);

        return () => {
            clearTimeout(travelTimer);
            clearTimeout(clashTimer);
        };
    }, [startPos, endPos]);

    return (
        <>
            {phase === 'travel' && (
                <g 
                    style={{ 
                        transform: `translate(${pos.x}px, ${pos.y}px)`, 
                        transition: 'transform 0.7s ease-in-out' 
                    }}
                    className="pointer-events-none z-50"
                >
                    <polygon points="-12,-8 -12,8 12,0" fill="#dc2626" stroke="white" strokeWidth="2" />
                </g>
            )}
            {phase === 'clash' && (
                 <g style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }} className="pointer-events-none z-50">
                    <circle r="40" fill="rgba(239, 68, 68, 0.5)" className="animate-ping" />
                    <text textAnchor="middle" dy="15" fontSize="50">💥</text>
                </g>
            )}
        </>
    );
};

const Map: React.FC<MapProps> = ({ cities, selectedCityId, onCitySelect, battleAnim }) => {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const dragStartRef = useRef({ x: 0, y: 0 });
  const initialOffsetRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  // Helper to find a city at grid coords
  const getCityAt = (c: number, r: number) => {
      // Since cities are pre-processed with gridCol/gridRow, simple lookup
      return cities.find(city => city.gridCol === c && city.gridRow === r);
  };

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    initialOffsetRef.current = { ...offset };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMovedRef.current = true;
    setOffset({ x: initialOffsetRef.current.x + dx, y: initialOffsetRef.current.y + dy });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Render Grid
  const renderGrid = () => {
      const hexes = [];
      for (let r = 0; r < GRID_ROWS; r++) {
          for (let c = 0; c < GRID_COLS; c++) {
              const { x, y } = gridToPixel(c, r);
              const city = getCityAt(c, r);
              
              // Only render if there is a city at this hex
              if (!city) continue;

              const isSelected = city.id === selectedCityId;
              const selectedCityObj = cities.find(ct => ct.id === selectedCityId);
              const isNeighbor = selectedCityObj?.neighbors.includes(city.id);

              const fillColor = FACTION_COLORS[city.factionId];
              const strokeColor = isSelected ? '#fff' : '#000';
              const zIndex = isSelected ? 20 : 10;
              const strokeWidth = isSelected ? 4 : 2;

              hexes.push(
                  <g key={`hex-${c}-${r}`} transform={`translate(${x},${y})`} style={{ zIndex }}>
                      <polygon 
                        points={getHexPoints(0, 0, HEX_SIZE + 0.5)} // Slight overlap to close gaps
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        onClick={(e) => {
                            if (!hasMovedRef.current) {
                                e.stopPropagation();
                                onCitySelect(city.id);
                            }
                        }}
                        className="cursor-pointer hover:brightness-110 transition-all"
                      />
                      
                      {/* Neighbor Highlight Overlay */}
                      {isNeighbor && (
                          <polygon 
                            points={getHexPoints(0, 0, HEX_SIZE * 0.85)}
                            fill="none"
                            stroke="#d7b328"
                            strokeWidth="3"
                            strokeDasharray="6 3"
                            className="animate-pulse pointer-events-none"
                          />
                      )}

                      {/* City Label */}
                      <g className="pointer-events-none select-none">
                          <text 
                              y="-8" 
                              fill="white" 
                              textAnchor="middle" 
                              fontSize="24" 
                              fontWeight="bold"
                              style={{ textShadow: '2px 2px 0 #000' }}
                          >
                              {city.name.substring(0,1)}
                          </text>
                          <text 
                              y="20" 
                              fill="white" 
                              textAnchor="middle" 
                              fontSize="12" 
                              fontWeight="bold"
                              style={{ textShadow: '1px 1px 0 #000' }}
                          >
                              {city.name.length > 7 ? city.name.substring(0,6) + '.' : city.name}
                          </text>
                      </g>
                  </g>
              );
          }
      }
      return hexes;
  };

  const battleStartCity = battleAnim ? cities.find(c => c.id === battleAnim.attackerId) : null;
  const battleEndCity = battleAnim ? cities.find(c => c.id === battleAnim.defenderId) : null;
  
  // Calculate pixel positions for battle if cities exist
  const battleStartPos = battleStartCity && battleStartCity.gridCol !== undefined ? gridToPixel(battleStartCity.gridCol, battleStartCity.gridRow!) : null;
  const battleEndPos = battleEndCity && battleEndCity.gridCol !== undefined ? gridToPixel(battleEndCity.gridCol, battleEndCity.gridRow!) : null;

  return (
    <div 
      className={`relative w-full h-[500px] lg:h-[700px] bg-black border-4 border-nes-white rounded-lg overflow-hidden select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="absolute top-2 left-2 z-10 bg-black/50 p-1 text-xs text-gray-400 pointer-events-none">
          Map: 10x6 Grid (Compact)
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-50">
        <button onClick={(e) => { e.stopPropagation(); setZoom(z => Math.min(z + 0.1, 2)); }} className="w-8 h-8 bg-nes-blue border-2 border-white text-white font-bold flex items-center justify-center shadow-lg">+</button>
        <button onClick={(e) => { e.stopPropagation(); setZoom(z => Math.max(z - 0.1, 0.4)); }} className="w-8 h-8 bg-nes-blue border-2 border-white text-white font-bold flex items-center justify-center shadow-lg">-</button>
      </div>

      <svg 
        className="w-full h-full block bg-black"
        viewBox="0 0 1200 720"
      >
        <g transform={`translate(${offset.x}, ${offset.y}) scale(${zoom})`}>
                {renderGrid()}
                {battleStartPos && battleEndPos && (
                    <BattleVisuals 
                        startPos={battleStartPos} 
                        endPos={battleEndPos} 
                    />
                )}
        </g>
      </svg>
    </div>
  );
};

export default Map;