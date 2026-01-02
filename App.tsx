import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  GameState, City, General, FactionId, LogMessage, CommandType, BattleAnim 
} from './types';
import { 
  INITIAL_YEAR, INITIAL_MONTH, INITIAL_CITIES, INITIAL_GENERALS, FACTION_COLORS, ACTION_COST, GRID_COLS, GRID_ROWS 
} from './constants';
import Map from './components/Map';
import InfoPanel from './components/InfoPanel';
import CommandMenu from './components/CommandMenu';
import { getAdvisorAdvice, getBattleReport, getSeasonalEvent } from './services/geminiService';

// --- INITIAL MAP PROCESSING ---
// Deterministically calculate grid positions and neighbors based on strict hex logic
const processInitialMap = (rawCities: City[]): City[] => {
  const occupied = new Set<string>();
  const citiesWithGrid: City[] = rawCities.map(city => {
      // Use full grid range for distribution (0 to GRID-1)
      let col = Math.min(GRID_COLS - 1, Math.floor((city.x / 100) * GRID_COLS));
      let row = Math.min(GRID_ROWS - 1, Math.floor((city.y / 100) * GRID_ROWS));
      
      // Collision Resolution (Spiral)
      let radius = 0;
      let found = false;
      const maxRadius = Math.max(GRID_COLS, GRID_ROWS);
      
      while (!found && radius < maxRadius) {
         for (let rOffset = -radius; rOffset <= radius; rOffset++) {
             for (let cOffset = -radius; cOffset <= radius; cOffset++) {
                 if (radius > 0 && Math.abs(rOffset) !== radius && Math.abs(cOffset) !== radius) continue;

                 const r = row + rOffset;
                 const c = col + cOffset;
                 
                 if (r >= 0 && r < GRID_ROWS && c >= 0 && c < GRID_COLS) {
                     const key = `${c},${r}`;
                     if (!occupied.has(key)) {
                         col = c;
                         row = r;
                         occupied.add(key);
                         found = true;
                         break;
                     }
                 }
             }
             if (found) break;
         }
         radius++;
      }
      return { ...city, gridCol: col, gridRow: row };
  });

  // Calculate Neighbors based on Hex Adjacency
  return citiesWithGrid.map(city => {
    const c = city.gridCol!;
    const r = city.gridRow!;
    
    // Offset for odd rows (if standard "odd-r" horizontal layout behavior is visually implied by map renderer)
    // In Map.tsx: x = (col + (row % 2) * 0.5) ... 
    // This is "Odd-R" style where odd rows are shifted right.
    const neighbors: string[] = [];
    
    // Potential neighbors candidates
    const candidates = [
        { c: c - 1, r: r },     // Left
        { c: c + 1, r: r },     // Right
    ];

    if (r % 2 === 0) {
        // Even Row
        candidates.push({ c: c - 1, r: r - 1 }); // Top Left
        candidates.push({ c: c, r: r - 1 });     // Top Right
        candidates.push({ c: c - 1, r: r + 1 }); // Bot Left
        candidates.push({ c: c, r: r + 1 });     // Bot Right
    } else {
        // Odd Row
        candidates.push({ c: c, r: r - 1 });     // Top Left
        candidates.push({ c: c + 1, r: r - 1 }); // Top Right
        candidates.push({ c: c, r: r + 1 });     // Bot Left
        candidates.push({ c: c + 1, r: r + 1 }); // Bot Right
    }

    candidates.forEach(cand => {
        if (cand.c >= 0 && cand.c < GRID_COLS && cand.r >= 0 && cand.r < GRID_ROWS) {
             const neighborCity = citiesWithGrid.find(nc => nc.gridCol === cand.c && nc.gridRow === cand.r);
             if (neighborCity) {
                 neighbors.push(neighborCity.id);
             }
        }
    });

    return { ...city, neighbors };
  });
};

// Calculate once at module level
const PROCESSED_CITIES = processInitialMap(INITIAL_CITIES);

// --- FACTION SELECTION COMPONENT ---
interface FactionSelectProps {
  onSelect: (factionId: FactionId) => void;
}

const FactionSelectScreen: React.FC<FactionSelectProps> = ({ onSelect }) => {
  const playableFactions = useMemo(() => {
    const factions = new Set(PROCESSED_CITIES.map(c => c.factionId));
    factions.delete(FactionId.NONE);
    return Array.from(factions);
  }, []);

  const getFactionStats = (fid: FactionId) => {
    const cities = PROCESSED_CITIES.filter(c => c.factionId === fid);
    const generals = INITIAL_GENERALS.filter(g => g.factionId === fid);
    const leader = generals.reduce((prev, current) => (prev.cha > current.cha) ? prev : current, generals[0]);
    let difficulty = 'Normal';
    if (cities.length >= 3) difficulty = 'Easy';
    if (cities.length === 1 && generals.length < 5) difficulty = 'Hard';

    return { cityCount: cities.length, generalCount: generals.length, leader, difficulty };
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-mono p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl md:text-6xl text-nes-gold font-bold mb-8 text-center drop-shadow-md">
        SELECT YOUR RULER
      </h1>
      <p className="mb-8 text-gray-400 text-sm md:text-base">Choose a hero to unify the land.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-7xl overflow-y-auto max-h-[70vh] p-2 scrollbar-thin">
        {playableFactions.map(fid => {
          const stats = getFactionStats(fid);
          const color = FACTION_COLORS[fid];
          const leaderName = fid.replace(/_/g, ' ');

          return (
            <button 
              key={fid}
              onClick={() => onSelect(fid)}
              className="bg-gray-800 border-4 border-gray-600 hover:border-white hover:scale-105 transition-all p-4 text-left group relative overflow-hidden"
            >
              <div 
                className="absolute top-0 right-0 w-16 h-16 opacity-20 transform rotate-45 translate-x-8 -translate-y-8" 
                style={{ backgroundColor: color }} 
              />
              
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 border-2 border-white shadow-lg" style={{ backgroundColor: stats.leader?.faceUrl || color }}></div>
                 <div>
                    <h2 className="text-xl font-bold group-hover:text-nes-gold">{leaderName}</h2>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                        stats.difficulty === 'Easy' ? 'bg-green-900 text-green-200' :
                        stats.difficulty === 'Hard' ? 'bg-red-900 text-red-200' : 'bg-blue-900 text-blue-200'
                    }`}>
                        {stats.difficulty}
                    </span>
                 </div>
              </div>

              <div className="space-y-1 text-xs text-gray-400">
                <div className="flex justify-between">
                    <span>Cities:</span> <span className="text-white">{stats.cityCount}</span>
                </div>
                <div className="flex justify-between">
                    <span>Officers:</span> <span className="text-white">{stats.generalCount}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-700 grid grid-cols-4 gap-1 text-center">
                    <div title="War">
                        <span className="block text-xxs text-gray-500">WAR</span>
                        <span className="text-red-400">{stats.leader?.war || '?'}</span>
                    </div>
                    <div title="Int">
                        <span className="block text-xxs text-gray-500">INT</span>
                        <span className="text-blue-400">{stats.leader?.int || '?'}</span>
                    </div>
                    <div title="Pol">
                        <span className="block text-xxs text-gray-500">POL</span>
                        <span className="text-green-400">{stats.leader?.pol || '?'}</span>
                    </div>
                    <div title="Cha">
                        <span className="block text-xxs text-gray-500">CHA</span>
                        <span className="text-yellow-400">{stats.leader?.cha || '?'}</span>
                    </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// --- MAIN APP ---

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  // --- STATE ---
  const [gameState, setGameState] = useState<GameState>({
    year: INITIAL_YEAR,
    month: INITIAL_MONTH,
    currentTurnFaction: FactionId.LIU_BEI, // Will be updated on start
    playerFaction: FactionId.LIU_BEI,      // Will be updated on start
    cities: PROCESSED_CITIES, // Use processed map
    generals: INITIAL_GENERALS,
    messages: [],
    selectedCityId: null,
    selectedGeneralId: null,
    isProcessing: false
  });
  
  const [battleAnim, setBattleAnim] = useState<BattleAnim | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- HELPERS ---
  const addMessage = (text: string, type: LogMessage['type'] = 'info') => {
    setGameState(prev => ({
      ...prev,
      messages: [...prev.messages, { id: Date.now().toString() + Math.random(), text, type, timestamp: Date.now() }]
    }));
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [gameState.messages]);

  // --- ACTIONS ---

  const handleStartGame = (factionId: FactionId) => {
      // Find a starting city for this faction to focus camera
      const startCity = PROCESSED_CITIES.find(c => c.factionId === factionId);
      const startCityId = startCity ? startCity.id : PROCESSED_CITIES[0].id;
      const factionName = factionId.replace(/_/g, ' ');

      // Reset everything to initial state to ensure clean restart
      setGameState({
          year: INITIAL_YEAR,
          month: INITIAL_MONTH,
          currentTurnFaction: factionId,
          playerFaction: factionId,
          cities: PROCESSED_CITIES, 
          generals: INITIAL_GENERALS,
          messages: [
              { id: 'init', text: `Welcome, Lord ${factionName}. The year is ${INITIAL_YEAR}. Unify the land!`, type: 'event', timestamp: Date.now() }
          ],
          selectedCityId: startCityId,
          selectedGeneralId: null,
          isProcessing: false
      });
      setGameStarted(true);
      setIsRestartModalOpen(false);
  };
  
  const handleCitySelect = (cityId: string) => {
    setGameState(prev => ({ ...prev, selectedCityId: cityId, selectedGeneralId: null }));
  };

  const handleNextTurn = async () => {
    if (gameState.isProcessing) return;
    setGameState(prev => ({ ...prev, isProcessing: true }));

    // 1. Advance Time
    let newMonth = gameState.month + 1;
    let newYear = gameState.year;
    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    }

    addMessage(`--- Year ${newYear}, Month ${newMonth} ---`, 'info');

    // 2. Simple AI Simulation (Resources Growth)
    const updatedCities = gameState.cities.map(city => {
      // Passive income/food
      if (city.factionId !== FactionId.NONE) {
        return {
          ...city,
          gold: city.gold + Math.floor(city.commerce * 0.5),
          food: city.food + Math.floor(city.farming * 0.8),
          soldiers: city.soldiers // Soldiers don't auto-increase
        };
      }
      return city;
    });

    // 3. Random Event via Gemini
    const eventText = await getSeasonalEvent(newYear, newMonth);
    if (eventText) {
       addMessage(`EVENT: ${eventText}`, 'event');
    }

    setGameState(prev => ({
      ...prev,
      year: newYear,
      month: newMonth,
      cities: updatedCities,
      isProcessing: false
    }));
  };

  const handleCommand = async (cmd: CommandType) => {
    const city = gameState.cities.find(c => c.id === gameState.selectedCityId);
    if (!city) return;
    if (gameState.isProcessing) return;

    // Check ownership for domestic commands
    const isMine = city.factionId === gameState.playerFaction;

    // Helper to consume action
    const consumeTurn = (updatedCity: City | null, msg: string) => {
      setGameState(prev => ({
        ...prev,
        cities: updatedCity ? prev.cities.map(c => c.id === updatedCity.id ? updatedCity : c) : prev.cities
      }));
      addMessage(msg);
    };

    if (cmd === 'ADVICE') {
      setGameState(prev => ({ ...prev, isProcessing: true }));
      const advice = await getAdvisorAdvice(gameState, city);
      addMessage(`ADVISOR: "${advice}"`, 'advisor');
      setGameState(prev => ({ ...prev, isProcessing: false }));
      return;
    }

    if (!isMine && cmd !== 'ATTACK' && cmd !== 'SEARCH') {
      addMessage("You do not control this city.", 'info');
      return;
    }

    // Resource Check
    if ((cmd === 'DEVELOP_FARM' || cmd === 'DEVELOP_COMMERCE' || cmd === 'RECRUIT') && city.gold < ACTION_COST) {
      addMessage("Not enough gold!", 'info');
      return;
    }

    switch (cmd) {
      case 'DEVELOP_FARM': {
        const gain = Math.floor(Math.random() * 5) + 2;
        const newCity = { ...city, farming: Math.min(100, city.farming + gain), gold: city.gold - ACTION_COST };
        consumeTurn(newCity, `Developed agriculture in ${city.name}. Farming +${gain}.`);
        break;
      }
      case 'DEVELOP_COMMERCE': {
        const gain = Math.floor(Math.random() * 5) + 2;
        const newCity = { ...city, commerce: Math.min(100, city.commerce + gain), gold: city.gold - ACTION_COST };
        consumeTurn(newCity, `Improved market in ${city.name}. Commerce +${gain}.`);
        break;
      }
      case 'GIVE': {
          if (city.food < 100) { addMessage("Not enough food."); return; }
          const newCity = { ...city, food: city.food - 100, population: city.population + 500 };
          consumeTurn(newCity, `Distributed food to the people of ${city.name}. Population increased.`);
          break;
      }
      case 'RECRUIT': {
        const recruits = Math.floor(city.population * 0.01) + 100;
        const newCity = { ...city, soldiers: city.soldiers + recruits, gold: city.gold - ACTION_COST, population: city.population - recruits };
        consumeTurn(newCity, `Recruited ${recruits} soldiers in ${city.name}.`);
        break;
      }
      case 'TRAIN': {
          const gain = Math.floor(Math.random() * 5) + 3;
          const newCity = { ...city, defense: Math.min(100, city.defense + gain) };
          consumeTurn(newCity, `Trained troops. City defense +${gain}.`);
          break;
      }
      case 'SEARCH': {
        setGameState(prev => ({ ...prev, isProcessing: true }));
        const roll = Math.random();
        setTimeout(() => {
             if (roll > 0.7) {
                 const goldFound = Math.floor(Math.random() * 200) + 50;
                 if (isMine) {
                    const newCity = { ...city, gold: city.gold + goldFound };
                    consumeTurn(newCity, `Search successful! Found ${goldFound} gold in ${city.name}.`);
                 } else {
                     addMessage(`Scouts report finding hidden stash of ${goldFound} gold, but we cannot seize it here.`, 'info');
                 }
             } else {
                 addMessage(`Nothing of value found in ${city.name}.`, 'info');
             }
             setGameState(prev => ({ ...prev, isProcessing: false }));
        }, 500);
        break;
      }
      case 'ATTACK': {
        if (city.factionId === gameState.playerFaction) {
            addMessage("You cannot attack your own city.", 'info');
            return;
        }
        
        // Find player's strongest adjacent city using the dynamically calculated neighbors
        const myNeighbors = city.neighbors
            .map(nid => gameState.cities.find(c => c.id === nid))
            .filter(c => c && c.factionId === gameState.playerFaction) as City[];

        if (myNeighbors.length === 0) {
            addMessage("No adjacent friendly cities to launch attack from!", 'info');
            return;
        }

        const attackerCity = myNeighbors[0];
        const myGeneral = gameState.generals.find(g => g.id === attackerCity.governorId) || gameState.generals.find(g => g.locationId === attackerCity.id && g.factionId === gameState.playerFaction);
        
        if (!myGeneral) {
             addMessage(`No general available in ${attackerCity.name} to lead the attack!`, 'info');
             return;
        }

        if (attackerCity.soldiers < 1000) {
            addMessage(`Not enough soldiers in ${attackerCity.name} to attack.`, 'info');
            return;
        }

        setGameState(prev => ({ ...prev, isProcessing: true }));

        setBattleAnim({ attackerId: attackerCity.id, defenderId: city.id });
        await new Promise(resolve => setTimeout(resolve, 1700));
        setBattleAnim(null);
        
        const attackPower = (myGeneral.war * 0.5) + (attackerCity.soldiers * 0.01);
        const defensePower = (city.defense * 2) + (city.soldiers * 0.012);
        const variance = Math.random() * 20;
        
        const win = (attackPower + variance) > defensePower;
        const lossAttacker = Math.floor(attackerCity.soldiers * (win ? 0.1 : 0.3));
        const lossDefender = Math.floor(city.soldiers * (win ? 0.5 : 0.2));

        const report = await getBattleReport(
            myGeneral, 
            city.factionId === FactionId.NONE ? 'Rebels' : city.factionId, 
            attackerCity.soldiers, 
            city.soldiers, 
            win
        );

        addMessage(`BATTLE REPORT: ${report}`, 'war');
        addMessage(`Result: ${win ? 'VICTORY' : 'DEFEAT'}. Lost ${lossAttacker} soldiers. Enemy lost ${lossDefender}.`, win ? 'event' : 'war');

        let newDefenderCity = { ...city, soldiers: Math.max(0, city.soldiers - lossDefender) };
        let newAttackerCity = { ...attackerCity, soldiers: Math.max(0, attackerCity.soldiers - lossAttacker) };

        if (win) {
            newDefenderCity.factionId = gameState.playerFaction;
            newDefenderCity.gold = Math.floor(newDefenderCity.gold / 2);
            newDefenderCity.governorId = null;
            addMessage(`We have captured ${city.name}!`);
        }

        setGameState(prev => ({
             ...prev,
             cities: prev.cities.map(c => {
                 if (c.id === newAttackerCity.id) return newAttackerCity;
                 if (c.id === newDefenderCity.id) return newDefenderCity;
                 return c;
             }),
             isProcessing: false
        }));

        break;
      }
      case 'MOVE': {
        addMessage("Movement requires moving generals/troops between connected cities. (Simplified: Not implemented fully)", 'info');
        break;
      }
    }
  };

  const handleRestartLevel = () => {
      handleStartGame(gameState.playerFaction);
  };

  const handleChooseNewRuler = () => {
      setGameStarted(false);
      setIsRestartModalOpen(false);
  };

  if (!gameStarted) {
      return <FactionSelectScreen onSelect={handleStartGame} />;
  }

  const selectedCity = gameState.cities.find(c => c.id === gameState.selectedCityId) || null;
  const generalsInSelected = gameState.generals.filter(g => g.locationId === gameState.selectedCityId);
  const playerFactionName = gameState.playerFaction.replace(/_/g, ' ');

  return (
    <div className="w-full min-h-screen bg-nes-blue p-2 md:p-4 font-mono text-white flex flex-col items-center relative">
      
      {isRestartModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
            <div className="bg-gray-900 border-4 border-white p-6 max-w-sm w-full text-center shadow-2xl">
                 <h2 className="text-2xl text-nes-gold font-bold mb-6 drop-shadow-md">SYSTEM MENU</h2>
                 <div className="flex flex-col gap-4">
                     <button 
                        onClick={handleRestartLevel}
                        className="bg-blue-900 border-2 border-blue-400 py-3 hover:bg-blue-800 hover:scale-105 transition-all text-white font-bold"
                     >
                        RESTART LEVEL
                     </button>
                     <button 
                        onClick={handleChooseNewRuler}
                        className="bg-green-900 border-2 border-green-400 py-3 hover:bg-green-800 hover:scale-105 transition-all text-white font-bold"
                     >
                        CHOOSE NEW RULER
                     </button>
                     <button 
                        onClick={() => setIsRestartModalOpen(false)}
                        className="bg-gray-800 border-2 border-gray-500 py-2 mt-2 hover:bg-gray-700 text-gray-300 text-sm"
                     >
                        CANCEL
                     </button>
                 </div>
            </div>
        </div>
      )}

      {isTutorialOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4">
            <div className="bg-gray-900 border-4 border-white p-6 max-w-3xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
                 <button
                    onClick={() => setIsTutorialOpen(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white text-xl font-bold"
                 >
                    ✕
                 </button>
                 <h2 className="text-2xl md:text-3xl text-nes-gold font-bold mb-6 drop-shadow-md text-center border-b-2 border-gray-700 pb-4">
                    SCROLL OF KNOWLEDGE
                 </h2>

                 <div className="space-y-6 text-gray-300 font-mono text-sm leading-relaxed">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <section>
                            <h3 className="text-white font-bold mb-2 text-lg border-b border-gray-600 inline-block">GOAL</h3>
                            <p>Unify the chaotic lands of ancient China. Capture all cities on the map to win.</p>
                        </section>

                        <section>
                            <h3 className="text-white font-bold mb-2 text-lg border-b border-gray-600 inline-block">RESOURCES</h3>
                            <ul className="space-y-1">
                                <li><span className="text-yellow-400 font-bold">GOLD:</span> Used for actions. Generated by Market.</li>
                                <li><span className="text-green-400 font-bold">FOOD:</span> Keeps troops fed. Generated by Farm.</li>
                                <li><span className="text-red-400 font-bold">SOLDIERS:</span> Determine battle strength.</li>
                            </ul>
                        </section>
                    </div>

                    <section className="bg-gray-800 p-4 rounded border border-gray-700">
                        <h3 className="text-white font-bold mb-3 text-lg">COMMANDS</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <h4 className="text-green-300 font-bold mb-1">DOMESTIC</h4>
                                <ul className="text-xs space-y-1">
                                    <li>• <strong>FARM:</strong> +Farming stat (Food/Turn)</li>
                                    <li>• <strong>MARKET:</strong> +Commerce stat (Gold/Turn)</li>
                                    <li>• <strong>GIVE:</strong> Spend food to gain Pop/Loyalty</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-red-300 font-bold mb-1">MILITARY</h4>
                                <ul className="text-xs space-y-1">
                                    <li>• <strong>RECRUIT:</strong> Get soldiers (Costs Gold)</li>
                                    <li>• <strong>TRAIN:</strong> Increase City Defense</li>
                                    <li>• <strong>MOVE:</strong> (Simplifed) Not fully active</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-yellow-300 font-bold mb-1">STRATEGY</h4>
                                <ul className="text-xs space-y-1">
                                    <li>• <strong>ATTACK:</strong> Invade neighbor</li>
                                    <li>• <strong>SEARCH:</strong> Find gold/items</li>
                                    <li>• <strong>ADVICE:</strong> Ask the AI Strategist</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-white font-bold mb-2 text-lg border-b border-gray-600 inline-block">COMBAT</h3>
                        <p>To attack, you must own a city adjacent to an enemy. Select your city, click <strong className="text-red-400">ATTACK</strong>, then confirm. Victory depends on your General's <strong className="text-white">WAR</strong> stat and number of soldiers.</p>
                    </section>
                 </div>

                 <div className="mt-8 text-center">
                     <button
                        onClick={() => setIsTutorialOpen(false)}
                        className="bg-nes-blue border-2 border-white px-8 py-3 text-white font-bold hover:bg-blue-600 hover:scale-105 transition-all"
                     >
                        I UNDERSTAND
                     </button>
                 </div>
            </div>
        </div>
      )}

      <div className="w-full max-w-[1800px] mb-4 flex justify-between items-end border-b-4 border-white pb-2">
        <div>
           <h1 className="text-2xl md:text-4xl text-nes-gold font-bold drop-shadow-md">ROMANCE OF THREE KINGDOMS</h1>
           <p className="text-xs text-gray-300 mt-1">WEB EDITION • {gameState.year} AD • Month {gameState.month}</p>
        </div>
        <div className="text-right flex items-end gap-2">
             <div className="mr-2">
                <div className="text-sm">RULER: <span className="text-blue-400 font-bold uppercase" style={{ color: FACTION_COLORS[gameState.playerFaction] }}>{playerFactionName}</span></div>
             </div>
             <button
               onClick={() => setIsTutorialOpen(true)}
               className="mt-2 px-3 py-1 bg-cyan-700 border-2 border-white text-white font-bold hover:bg-cyan-600 transition-colors text-sm"
             >
               TUTORIAL
             </button>
             <button 
               onClick={() => setIsRestartModalOpen(true)}
               className="mt-2 px-3 py-1 bg-gray-700 border-2 border-white text-gray-200 font-bold hover:bg-gray-600 transition-colors text-sm"
             >
               RESTART
             </button>
             <button 
               onClick={handleNextTurn}
               disabled={gameState.isProcessing}
               className={`mt-2 px-4 py-1 bg-nes-red border-2 border-white text-white font-bold hover:bg-red-600 transition-colors ${gameState.isProcessing ? 'opacity-50' : ''}`}
             >
               {gameState.isProcessing ? 'PROCESSING...' : 'END TURN'}
             </button>
        </div>
      </div>

      <div className="w-full max-w-[1800px] grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        
        <div className="lg:col-span-3 xl:col-span-3 flex flex-col gap-4 h-full order-2 lg:order-1">
            <div className="flex-[3] min-h-[300px]">
                <InfoPanel 
                    selectedCity={selectedCity} 
                    generalsInCity={generalsInSelected} 
                    factionId={gameState.playerFaction}
                />
            </div>
            <div className="flex-1 min-h-[160px]">
                <CommandMenu 
                    onCommand={handleCommand} 
                    disabled={gameState.isProcessing}
                    city={selectedCity}
                    playerFactionId={gameState.playerFaction}
                />
            </div>
        </div>

        <div className="lg:col-span-9 xl:col-span-9 flex flex-col gap-4 order-1 lg:order-2">
           <Map 
             cities={gameState.cities} 
             selectedCityId={gameState.selectedCityId} 
             onCitySelect={handleCitySelect} 
             battleAnim={battleAnim}
           />
           
           <div className="bg-black border-4 border-nes-white p-2 overflow-y-auto h-48 md:h-64 font-mono text-sm leading-relaxed scrollbar-thin w-full shadow-inner">
              {gameState.messages.map((msg) => (
                <div key={msg.id} className={`mb-1 border-b border-gray-800 pb-1 last:border-0 ${
                    msg.type === 'war' ? 'text-red-400' : 
                    msg.type === 'advisor' ? 'text-yellow-300 italic' :
                    msg.type === 'event' ? 'text-purple-300' : 'text-gray-300'
                }`}>
                  <span className="opacity-50 mr-2 text-xs">[{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]</span>
                  <span>{msg.text}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
           </div>
        </div>
        
      </div>
    </div>
  );
};

export default App;