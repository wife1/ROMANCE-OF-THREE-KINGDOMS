import React, { useState } from 'react';
import { City, General, FactionId } from '../types';
import { FACTION_COLORS } from '../constants';

interface InfoPanelProps {
  selectedCity: City | null;
  generalsInCity: General[];
  factionId: FactionId;
}

type SortKey = 'war' | 'int' | 'pol' | 'cha';

const InfoPanel: React.FC<InfoPanelProps> = ({ selectedCity, generalsInCity, factionId }) => {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDesc, setSortDesc] = useState<boolean>(true);

  if (!selectedCity) {
    return (
      <div className="bg-nes-black border-4 border-nes-white p-4 h-full flex items-center justify-center text-nes-gray font-mono">
        <p>SELECT A CITY ON THE MAP</p>
      </div>
    );
  }

  const isMyCity = selectedCity.factionId === factionId;
  const ownerName = selectedCity.factionId === FactionId.NONE ? 'Unoccupied' : selectedCity.factionId.replace('_', ' ');
  const governor = generalsInCity.find(g => g.id === selectedCity.governorId);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDesc(!sortDesc);
    } else {
      setSortKey(key);
      setSortDesc(true);
    }
  };

  const sortedGenerals = [...generalsInCity].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey];
    const valB = b[sortKey];
    return sortDesc ? valB - valA : valA - valB;
  });

  const SortBtn = ({ label, sKey }: { label: string; sKey: SortKey }) => {
      const isActive = sortKey === sKey;
      return (
          <button 
            onClick={() => handleSort(sKey)}
            className={`px-1 hover:bg-gray-700 ${isActive ? 'text-nes-gold underline' : 'text-gray-400'}`}
            title={`Sort by ${label}`}
          >
            {label}{isActive ? (sortDesc ? '↓' : '↑') : ''}
          </button>
      );
  };

  return (
    <div className="bg-nes-black border-4 border-white p-2 md:p-4 h-full font-mono text-xs md:text-sm flex flex-col gap-4 text-white">
      {/* Header */}
      <div className="border-b-2 border-nes-gray pb-2 mb-2 flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-bold text-nes-gold">{selectedCity.name.toUpperCase()}</h2>
        <span 
          className="px-2 py-1 text-xs font-bold rounded"
          style={{ backgroundColor: FACTION_COLORS[selectedCity.factionId], color: '#fff' }}
        >
          {ownerName}
        </span>
      </div>

      {/* City Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex justify-between"><span>GOLD</span> <span className="text-yellow-400">{selectedCity.gold}</span></div>
          <div className="flex justify-between"><span>FOOD</span> <span className="text-green-400">{selectedCity.food}</span></div>
          <div className="flex justify-between"><span>POP.</span> <span>{selectedCity.population.toLocaleString()}</span></div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between"><span>SOLDIERS</span> <span className="text-red-400">{selectedCity.soldiers}</span></div>
          <div className="flex justify-between"><span>DEFENSE</span> <span>{selectedCity.defense}</span></div>
          <div className="flex justify-between"><span>FARMING</span> <span>{selectedCity.farming}</span></div>
          <div className="flex justify-between"><span>COMMERCE</span> <span>{selectedCity.commerce}</span></div>
        </div>
      </div>

      {/* Governor */}
      <div className="mt-2 border-t border-nes-gray pt-2 flex items-center gap-3">
        <div 
            className="w-10 h-10 border-2 border-nes-white flex items-center justify-center bg-gray-800 shadow-md"
            style={{ backgroundColor: governor?.faceUrl || '#333' }}
        >
             {!governor && <span className="text-xs text-gray-500">?</span>}
        </div>
        <div>
            <span className="text-nes-gray text-xs block">GOVERNOR</span>
            <span className="text-white font-bold">
            {governor?.name || 'None'}
            </span>
        </div>
      </div>

      {/* Generals List */}
      <div className="flex-1 overflow-hidden flex flex-col mt-2">
        <div className="flex justify-between items-end mb-1">
             <h3 className="text-nes-blue bg-nes-white px-1 font-bold">OFFICERS</h3>
             <div className="flex gap-1 text-[10px]">
                <SortBtn label="W" sKey="war" />
                <SortBtn label="I" sKey="int" />
                <SortBtn label="P" sKey="pol" />
                <SortBtn label="C" sKey="cha" />
             </div>
        </div>
        
        <div className="overflow-y-auto flex-1 border border-nes-gray p-1 space-y-1 scrollbar-thin">
          {sortedGenerals.length === 0 ? (
            <p className="text-gray-500 italic">No officers present.</p>
          ) : (
            sortedGenerals.map(gen => (
              <div key={gen.id} className="flex items-center gap-2 bg-gray-900 p-1 hover:bg-gray-800 cursor-help group relative">
                
                {/* Face Avatar */}
                <div className="w-6 h-6 border border-gray-600 shrink-0 shadow-sm" style={{ backgroundColor: gen.faceUrl }}></div>
                
                <div className="flex-1 flex justify-between items-center overflow-hidden">
                    <span className={`truncate mr-2 ${gen.factionId === factionId ? 'text-white' : 'text-gray-400'}`}>
                    {gen.name}
                    </span>
                    <div className="flex gap-1 text-[10px] text-gray-400 shrink-0">
                    <span className={sortKey === 'war' ? 'text-nes-gold font-bold' : ''} title="War">W:{gen.war}</span>
                    <span className={sortKey === 'int' ? 'text-nes-gold font-bold' : ''} title="Intelligence">I:{gen.int}</span>
                    <span className={sortKey === 'loyalty' ? 'text-nes-gold font-bold' : ''} title="Loyalty">L:{gen.loyalty}</span>
                    </div>
                </div>

                {/* Hover Tooltip for General */}
                <div className="absolute left-0 bottom-full w-full bg-nes-blue border border-white p-2 hidden group-hover:block z-50 text-[10px] shadow-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 border border-white" style={{ backgroundColor: gen.faceUrl }}></div>
                        <p className="font-bold text-nes-gold text-sm">{gen.name}</p>
                    </div>
                    <p className="italic mb-1">"{gen.description}"</p>
                    <div className="grid grid-cols-2 gap-x-2 border-t border-gray-500 pt-1">
                        <span className={sortKey === 'war' ? 'text-nes-gold' : ''}>WAR: {gen.war}</span>
                        <span className={sortKey === 'int' ? 'text-nes-gold' : ''}>INT: {gen.int}</span>
                        <span className={sortKey === 'pol' ? 'text-nes-gold' : ''}>POL: {gen.pol}</span>
                        <span className={sortKey === 'cha' ? 'text-nes-gold' : ''}>CHA: {gen.cha}</span>
                    </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {!isMyCity && selectedCity.factionId !== FactionId.NONE && (
         <div className="mt-2 p-2 bg-red-900/50 border border-red-500 text-center text-xs animate-pulse">
            ENEMY TERRITORY
         </div>
      )}
    </div>
  );
};

export default InfoPanel;