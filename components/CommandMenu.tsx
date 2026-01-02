import React from 'react';
import { CommandType, City, FactionId } from '../types';

interface CommandMenuProps {
  onCommand: (cmd: CommandType) => void;
  disabled: boolean;
  city: City | null;
  playerFactionId: FactionId;
}

const CommandMenu: React.FC<CommandMenuProps> = ({ onCommand, disabled, city, playerFactionId }) => {
  const isMyCity = city?.factionId === playerFactionId;

  // Helper to render buttons
  const Btn = ({ cmd, label, reqOwnCity = true, color = 'blue' }: { cmd: CommandType, label: string, reqOwnCity?: boolean, color?: string }) => {
    const isAvailable = city && (!reqOwnCity || isMyCity);
    const isDisabled = disabled || !isAvailable;
    
    let colorClass = 'bg-blue-700 hover:bg-blue-600 border-blue-400';
    if (color === 'red') colorClass = 'bg-red-900 hover:bg-red-700 border-red-500';
    if (color === 'gold') colorClass = 'bg-yellow-800 hover:bg-yellow-700 border-yellow-500';

    return (
      <button
        onClick={() => onCommand(cmd)}
        disabled={isDisabled}
        className={`w-full py-2 px-1 text-xs md:text-sm font-mono border-2 shadow-sm transition-all
          ${isDisabled ? 'opacity-30 cursor-not-allowed bg-gray-800 border-gray-600' : `${colorClass} text-white hover:-translate-y-0.5`}
        `}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="grid grid-cols-3 gap-2 p-2 bg-nes-black border-4 border-nes-white h-full">
        {/* Row 1: Domestic */}
        <div className="col-span-3 text-[10px] text-gray-400 font-mono text-center mb-1">- DOMESTIC -</div>
        <Btn cmd="DEVELOP_FARM" label="1. FARM" />
        <Btn cmd="DEVELOP_COMMERCE" label="2. MARKET" />
        <Btn cmd="GIVE" label="3. GIVE" />

        {/* Row 2: Military */}
        <div className="col-span-3 text-[10px] text-gray-400 font-mono text-center mb-1 mt-2">- MILITARY -</div>
        <Btn cmd="RECRUIT" label="4. RECRUIT" />
        <Btn cmd="TRAIN" label="5. TRAIN" />
        <Btn cmd="MOVE" label="6. MOVE" />

        {/* Row 3: Strategy */}
        <div className="col-span-3 text-[10px] text-gray-400 font-mono text-center mb-1 mt-2">- STRATEGY -</div>
        <Btn cmd="SEARCH" label="7. SEARCH" reqOwnCity={false} />
        <Btn cmd="ATTACK" label="8. WAR" reqOwnCity={false} color="red" />
        <Btn cmd="ADVICE" label="9. ADVICE" reqOwnCity={false} color="gold" />
    </div>
  );
};

export default CommandMenu;
