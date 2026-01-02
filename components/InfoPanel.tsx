import React, { useState } from 'react';
import { City, General, FactionId } from '../types';
import { FACTION_COLORS, ACTION_COST } from '../constants';

interface InfoPanelProps {
  selectedCity: City | null;
  generalsInCity: General[];
  factionId: FactionId;
}

type SortKey = 'war' | 'int' | 'pol' | 'cha' | 'loyalty';

// Moved outside to prevent re-mounting on every render
const SortBtn = ({ label, sKey, activeKey, isDesc, onSort }: { label: string; sKey: SortKey; activeKey: SortKey | null; isDesc: boolean; onSort: (k: SortKey) => void }) => {
    const isActive = activeKey === sKey;
    return (
        <button 
          onClick={() => onSort(sKey)}
          className={`px-1 hover:bg-gray-700 transition-colors ${isActive ? 'text-nes-gold font-bold underline' : 'text-gray-400'}`}
          title={`Sort by ${label}`}
        >
          {label}{isActive ? (isDesc ? '↓' : '↑') : ''}
        </button>
    );
};

const InfoPanel: React.FC<InfoPanelProps> = ({ selectedCity, generalsInCity, factionId }) => {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDesc, setSortDesc] = useState<boolean>(true);

  if (!selectedCity) {
    return (
      <div className="bg-gray-900 border-4 border-white p-4 h-full flex items-center justify-center text-gray-500 font-mono text-center">
        <div className="animate-pulse">
           <p className="mb-2 text-2xl">☜</p>
           <p>SELECT A CITY</p>
        </div>
      </div>
    );
  }

  const isMyCity = selectedCity.factionId === factionId;
  const ownerName = selectedCity.factionId === FactionId.NONE ? 'Unoccupied' : selectedCity.factionId.replace(/_/g, ' ');
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

  return (
    <div className="bg-gray-900 border-4 border-white p-2 md:p-4 h-full font-mono text-xs md:text-sm flex flex-col gap-4 text-white shadow-xl">
      {/* Header */}
      <div className="border-b-2 border-gray-600 pb-2 mb-2 flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-bold text-nes-gold drop-shadow-md">{selectedCity.name.toUpperCase()}</h2>
        <span 
          className="px-2 py-1 text-[10px] md:text-xs font-bold rounded border border-white/20"
          style={{ backgroundColor: FACTION_COLORS[selectedCity.factionId], color: '#fff' }}
        >
          {ownerName}
        </span>
      </div>

      {/* City Stats Grid */}
      <div className="grid grid-cols-2 gap-4 bg-gray-800/50 p-2 rounded border border-gray-700">
        <div className="space-y-1">
          <div className="flex justify-between">
              <span className="text-gray-400">GOLD</span> 
              <span className="text-yellow-400 font-bold">{selectedCity.gold}</span>
          </div>
          <div className="flex justify-between">
              <span className="text-gray-400">FOOD</span> 
              <span className="text-green-400 font-bold">{selectedCity.food}</span>
          </div>
          <div className="flex justify-between">
              <span className="text-gray-400">POP.</span> 
              <span>{selectedCity.population.toLocaleString()}</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between">
              <span className="text-gray-400">SOLDIERS</span> 
              <span className="text-red-400 font-bold">{selectedCity.soldiers}</span>
          </div>
          {isMyCity && (
            <div className="flex justify-end text-[10px] text-gray-500">
               <span>COST: {ACTION_COST}G</span>
            </div>
          )}
          <div className="flex justify-between">
              <span className="text-gray-400">DEFENSE</span> 
              <span>{selectedCity.defense}</span>
          </div>
          <div className="flex justify-between">
              <span className="text-gray-400">DEV</span> 
              <span>F{selectedCity.farming}/C{selectedCity.commerce}</span>
          </div>
        </div>
      </div>

      {/* Governor */}
      <div className="mt-1 flex items-center gap-3 bg-gray-800 p-2 rounded border border-gray-700">
        <div 
            className="w-10 h-10 border-2 border-white flex items-center justify-center bg-gray-700 shadow-md shrink-0"
            style={{ backgroundColor: governor?.faceUrl || '#333' }}
        >
             {!governor && <span className="text-xs text-gray-500">?</span>}
        </div>
        <div className="overflow-hidden">
            <span className="text-gray-400 text-[10px] block uppercase tracking-wider">GOVERNOR</span>
            <span className="text-white font-bold truncate block">
            {governor?.name || 'None'}
            </span>
        </div>
      </div>

      {/* Generals List */}
      <div className="flex-1 overflow-hidden flex flex-col mt-2">
        <div className="flex justify-between items-end mb-1 border-b border-gray-700 pb-1">
             <h3 className="text-nes-blue bg-white px-2 py-0.5 font-bold text-[10px] rounded-t">OFFICERS ({generalsInCity.length})</h3>
             <div className="flex gap-1 text-[10px]">
                <SortBtn label="W" sKey="war" activeKey={sortKey} isDesc={sortDesc} onSort={handleSort} />
                <SortBtn label="I" sKey="int" activeKey={sortKey} isDesc={sortDesc} onSort={handleSort} />
                <SortBtn label="P" sKey="pol" activeKey={sortKey} isDesc={sortDesc} onSort={handleSort} />
                <SortBtn label="C" sKey="cha" activeKey={sortKey} isDesc={sortDesc} onSort={handleSort} />
             </div>
        </div>
        
        <div className="overflow-y-auto flex-1 border border-gray-700 bg-gray-800 p-1 space-y-1">
          {sortedGenerals.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-600 italic">No officers present.</div>
          ) : (
            sortedGenerals.map(gen => (
              <div key={gen.id} className="flex items-center gap-2 bg-gray-900 p-1 hover:bg-gray-700 cursor-help group relative border border-gray-800 hover:border-gray-500 transition-colors">
                
                {/* Face Avatar */}
                <div className="w-6 h-6 border border-gray-500 shrink-0 shadow-sm" style={{ backgroundColor: gen.faceUrl }}></div>
                
                <div className="flex-1 flex justify-between items-center overflow-hidden">
                    <span className={`truncate mr-2 font-bold ${gen.factionId === factionId ? 'text-white' : 'text-gray-400'}`}>
                    {gen.name}
                    </span>
                    <div className="flex gap-1 text-[10px] text-gray-400 shrink-0 font-mono">
                    <span className={sortKey === 'war' ? 'text-nes-gold' : ''}>W{gen.war}</span>
                    <span className={sortKey === 'int' ? 'text-nes-gold' : ''}>I{gen.int}</span>
                    <span className={sortKey === 'loyalty' ? 'text-nes-gold' : ''}>L{gen.loyalty}</span>
                    </div>
                </div>

                {/* Hover Tooltip for General */}
                <div className="absolute left-0 bottom-full w-full bg-nes-blue border-2 border-white p-3 hidden group-hover:block z-50 text-xs shadow-2xl pointer-events-none mb-2">
                    <div className="flex items-center gap-3 mb-2 border-b border-white/30 pb-2">
                        <div className="w-10 h-10 border-2 border-white shadow-lg" style={{ backgroundColor: gen.faceUrl }}></div>
                        <div>
                            <p className="font-bold text-nes-gold text-sm">{gen.name}</p>
                            <p className="text-[10px] text-gray-300">Loyalty: {gen.loyalty}</p>
                        </div>
                    </div>
                    <p className="italic mb-2 text-gray-200 leading-tight">"{gen.description}"</p>
                    <div className="grid grid-cols-4 gap-1 text-center bg-black/30 p-1 rounded">
                        <div><span className="block text-[8px] text-gray-400">WAR</span><span className="font-bold text-red-300">{gen.war}</span></div>
                        <div><span className="block text-[8px] text-gray-400">INT</span><span className="font-bold text-blue-300">{gen.int}</span></div>
                        <div><span className="block text-[8px] text-gray-400">POL</span><span className="font-bold text-green-300">{gen.pol}</span></div>
                        <div><span className="block text-[8px] text-gray-400">CHA</span><span className="font-bold text-yellow-300">{gen.cha}</span></div>
                    </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {!isMyCity && selectedCity.factionId !== FactionId.NONE && (
         <div className="mt-auto p-2 bg-red-900/80 border-2 border-red-500 text-center text-xs font-bold text-white animate-pulse shadow-lg">
            ⚠️ ENEMY TERRITORY
         </div>
      )}
    </div>
  );
};

export default InfoPanel;