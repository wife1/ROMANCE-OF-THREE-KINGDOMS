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

  // Icons Helper
  const renderIcon = (cmd: CommandType) => {
    const props = { className: "w-3 h-3 md:w-4 md:h-4", fill: "currentColor", viewBox: "0 0 20 20" };
    switch (cmd) {
      case 'DEVELOP_FARM': // Sprout
        return <svg {...props}><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z" clipRule="evenodd" /><path d="M8.1 16h11.2a6 6 0 00-10.6-3.714C8.575 12.65 8.1 13 8.1 16z" /></svg>;
      case 'DEVELOP_COMMERCE': // Currency
        return <svg {...props}><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.699c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" /></svg>;
      case 'GIVE': // Gift/Heart
        return <svg {...props}><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>;
      case 'RECRUIT': // Flag
        return <svg {...props}><path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" /></svg>;
      case 'TRAIN': // Muscle/Bolt
        return <svg {...props}><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>;
      case 'MOVE': // Arrow
        return <svg {...props}><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
      case 'SEARCH': // Zoom
        return <svg {...props}><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>;
      case 'ATTACK': // Fire
        return <svg {...props}><path fillRule="evenodd" d="M13.5 4.938a7 7 0 11-9.006 1.737c.202-.257.59-.218.793.039.031.044.08.106.147.198.077.107.19.266.33.456.28.382.72.986 1.157 1.802.875 1.638 1.28 3.551 1.638 5.419.035.185.25.26.388.134a9.96 9.96 0 003.56-6.785zm-4.326 2.766a5.501 5.501 0 00-.773 2.656c.21-.97.747-2.074 1.764-2.883a.5.5 0 01.765.642c-.26.388-.415.786-.465 1.122.257-.152.548-.28.877-.33.376-.057.733.033 1.02.25.132.1.256.216.368.345a5.5 5.5 0 00-2.585-3.844.5.5 0 00-.97.042z" clipRule="evenodd" /></svg>;
      case 'ADVICE': // Info
        return <svg {...props}><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>;
      default: return null;
    }
  };

  const Btn = ({ cmd, label, reqOwnCity = true, color = 'blue' }: { cmd: CommandType, label: string, reqOwnCity?: boolean, color?: string }) => {
    const isAvailable = city && (!reqOwnCity || isMyCity);
    const isDisabled = disabled || !isAvailable;
    
    let colorClass = 'bg-blue-900 hover:bg-blue-800 border-blue-600';
    if (color === 'red') colorClass = 'bg-red-900 hover:bg-red-800 border-red-600';
    if (color === 'gold') colorClass = 'bg-yellow-800 hover:bg-yellow-700 border-yellow-600';

    return (
      <button
        onClick={() => onCommand(cmd)}
        disabled={isDisabled}
        title={label}
        className={`w-full aspect-square md:aspect-auto md:h-full flex flex-col items-center justify-center p-0.5 border-2 shadow-sm transition-all rounded
          ${isDisabled ? 'opacity-30 cursor-not-allowed bg-gray-900 border-gray-700 text-gray-600' : `${colorClass} text-white hover:-translate-y-0.5 shadow-md`}
        `}
      >
        {renderIcon(cmd)}
        <span className="text-[8px] md:text-[9px] mt-0.5 font-bold uppercase tracking-tight leading-none text-center transform scale-90 md:scale-100 origin-center">{label}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 border-4 border-white p-2">
       {/* Use a flex-grow grid for commands to fill the smaller space efficiently */}
       <div className="flex-1 grid grid-cols-3 gap-2 content-start">
          <div className="col-span-3 text-[9px] text-gray-500 font-bold font-mono text-center border-b border-gray-700 mb-0.5 leading-tight tracking-widest">DOMESTIC</div>
          <Btn cmd="DEVELOP_FARM" label="FARM" />
          <Btn cmd="DEVELOP_COMMERCE" label="MARKET" />
          <Btn cmd="GIVE" label="GIVE" />

          <div className="col-span-3 text-[9px] text-gray-500 font-bold font-mono text-center border-b border-gray-700 mb-0.5 mt-1 leading-tight tracking-widest">MILITARY</div>
          <Btn cmd="RECRUIT" label="RECRUIT" />
          <Btn cmd="TRAIN" label="TRAIN" />
          <Btn cmd="MOVE" label="MOVE" />

          <div className="col-span-3 text-[9px] text-gray-500 font-bold font-mono text-center border-b border-gray-700 mb-0.5 mt-1 leading-tight tracking-widest">STRATEGY</div>
          <Btn cmd="SEARCH" label="SEARCH" reqOwnCity={false} />
          <Btn cmd="ATTACK" label="ATTACK" reqOwnCity={false} color="red" />
          <Btn cmd="ADVICE" label="ADVICE" reqOwnCity={false} color="gold" />
       </div>
    </div>
  );
};

export default CommandMenu;