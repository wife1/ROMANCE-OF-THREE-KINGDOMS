import React, { useState, useEffect, useRef } from 'react';
import { 
  GameState, City, General, FactionId, LogMessage, CommandType 
} from './types';
import { 
  INITIAL_YEAR, INITIAL_MONTH, INITIAL_CITIES, INITIAL_GENERALS, FACTION_COLORS 
} from './constants';
import Map from './components/Map';
import InfoPanel from './components/InfoPanel';
import CommandMenu from './components/CommandMenu';
import { getAdvisorAdvice, getBattleReport, getSeasonalEvent } from './services/geminiService';

const App: React.FC = () => {
  // --- STATE ---
  const [gameState, setGameState] = useState<GameState>({
    year: INITIAL_YEAR,
    month: INITIAL_MONTH,
    currentTurnFaction: FactionId.LIU_BEI,
    playerFaction: FactionId.LIU_BEI,
    cities: INITIAL_CITIES,
    generals: INITIAL_GENERALS,
    messages: [{ id: 'init', text: 'Welcome to Romance of the Three Kingdoms.', type: 'info', timestamp: Date.now() }],
    selectedCityId: 'c_xiaopei', // Start with player city
    selectedGeneralId: null,
    isProcessing: false
  });

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
    const costGold = 50;

    // Helper to consume action
    const consumeTurn = (updatedCity: City | null, msg: string) => {
      setGameState(prev => ({
        ...prev,
        cities: updatedCity ? prev.cities.map(c => c.id === updatedCity.id ? updatedCity : c) : prev.cities
      }));
      addMessage(msg);
      // In a real game, this might consume an "Action Point". For now, we just log it.
      // We don't force end turn immediately to allow multiple actions, but resources limit you.
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
    if ((cmd === 'DEVELOP_FARM' || cmd === 'DEVELOP_COMMERCE' || cmd === 'RECRUIT') && city.gold < costGold) {
      addMessage("Not enough gold!", 'info');
      return;
    }

    switch (cmd) {
      case 'DEVELOP_FARM': {
        const gain = Math.floor(Math.random() * 5) + 2;
        const newCity = { ...city, farming: Math.min(100, city.farming + gain), gold: city.gold - costGold };
        consumeTurn(newCity, `Developed agriculture in ${city.name}. Farming +${gain}.`);
        break;
      }
      case 'DEVELOP_COMMERCE': {
        const gain = Math.floor(Math.random() * 5) + 2;
        const newCity = { ...city, commerce: Math.min(100, city.commerce + gain), gold: city.gold - costGold };
        consumeTurn(newCity, `Improved market in ${city.name}. Commerce +${gain}.`);
        break;
      }
      case 'GIVE': {
          // Improve population loyalty or generals loyalty? Let's do food -> pop loyalty simulation (not stored in simple state, so maybe just population)
          if (city.food < 100) { addMessage("Not enough food."); return; }
          const newCity = { ...city, food: city.food - 100, population: city.population + 500 };
          consumeTurn(newCity, `Distributed food to the people of ${city.name}. Population increased.`);
          break;
      }
      case 'RECRUIT': {
        const recruits = Math.floor(city.population * 0.01) + 100;
        const newCity = { ...city, soldiers: city.soldiers + recruits, gold: city.gold - costGold, population: city.population - recruits };
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
        // Simplified search mechanism
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
        // Simplified Battle Logic
        if (city.factionId === gameState.playerFaction) {
            addMessage("You cannot attack your own city.", 'info');
            return;
        }
        
        // Find player's strongest adjacent city
        const myNeighbors = city.neighbors
            .map(nid => gameState.cities.find(c => c.id === nid))
            .filter(c => c && c.factionId === gameState.playerFaction) as City[];

        if (myNeighbors.length === 0) {
            addMessage("No adjacent friendly cities to launch attack from!", 'info');
            return;
        }

        const attackerCity = myNeighbors[0]; // Just pick first for simplicity
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
        
        // Battle Calculation
        const attackPower = (myGeneral.war * 0.5) + (attackerCity.soldiers * 0.01);
        const defensePower = (city.defense * 2) + (city.soldiers * 0.012); // Defenders advantage
        const variance = Math.random() * 20;
        
        const win = (attackPower + variance) > defensePower;
        const lossAttacker = Math.floor(attackerCity.soldiers * (win ? 0.1 : 0.3));
        const lossDefender = Math.floor(city.soldiers * (win ? 0.5 : 0.2));

        // Generate Report
        const report = await getBattleReport(
            myGeneral, 
            city.factionId === FactionId.NONE ? 'Rebels' : city.factionId, 
            attackerCity.soldiers, 
            city.soldiers, 
            win
        );

        addMessage(`BATTLE REPORT: ${report}`, 'war');
        addMessage(`Result: ${win ? 'VICTORY' : 'DEFEAT'}. Lost ${lossAttacker} soldiers. Enemy lost ${lossDefender}.`, win ? 'event' : 'war');

        // Apply changes
        let newDefenderCity = { ...city, soldiers: Math.max(0, city.soldiers - lossDefender) };
        let newAttackerCity = { ...attackerCity, soldiers: Math.max(0, attackerCity.soldiers - lossAttacker) };

        if (win) {
            newDefenderCity.factionId = gameState.playerFaction;
            newDefenderCity.gold = Math.floor(newDefenderCity.gold / 2); // Plunder
            newDefenderCity.governorId = null; // Needs assignment
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
        addMessage("Movement logic simplified: Soldiers stay in cities.", 'info');
        break;
      }
    }
  };

  // --- RENDER ---
  const selectedCity = gameState.cities.find(c => c.id === gameState.selectedCityId) || null;
  const generalsInSelected = gameState.generals.filter(g => g.locationId === gameState.selectedCityId);

  return (
    <div className="w-full min-h-screen bg-nes-blue p-2 md:p-4 font-mono text-white flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-6xl mb-4 flex justify-between items-end border-b-4 border-white pb-2">
        <div>
           <h1 className="text-2xl md:text-4xl text-nes-gold font-bold drop-shadow-md">ROMANCE OF THREE KINGDOMS</h1>
           <p className="text-xs text-gray-300 mt-1">WEB EDITION • {gameState.year} AD • Month {gameState.month}</p>
        </div>
        <div className="text-right">
             <div className="text-sm">RULER: <span className="text-blue-400 font-bold">LIU BEI</span></div>
             <button 
               onClick={handleNextTurn}
               disabled={gameState.isProcessing}
               className={`mt-2 px-4 py-1 bg-nes-red border-2 border-white text-white font-bold hover:bg-red-600 transition-colors ${gameState.isProcessing ? 'opacity-50' : ''}`}
             >
               {gameState.isProcessing ? 'PROCESSING...' : 'END TURN'}
             </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        
        {/* Info Column: Info & Commands (4 cols) - Moved to visual left on desktop using order-first */}
        <div className="lg:col-span-4 flex flex-col gap-4 h-full order-2 lg:order-1">
            <div className="h-1/2 min-h-[300px]">
                <InfoPanel 
                    selectedCity={selectedCity} 
                    generalsInCity={generalsInSelected} 
                    factionId={gameState.playerFaction}
                />
            </div>
            <div className="flex-1 min-h-[250px]">
                <CommandMenu 
                    onCommand={handleCommand} 
                    disabled={gameState.isProcessing}
                    city={selectedCity}
                    playerFactionId={gameState.playerFaction}
                />
            </div>
        </div>

        {/* Map Column: Map (8 cols) - Moved to visual right on desktop using order-last */}
        <div className="lg:col-span-8 flex flex-col gap-4 order-1 lg:order-2">
           <Map 
             cities={gameState.cities} 
             selectedCityId={gameState.selectedCityId} 
             onCitySelect={handleCitySelect} 
           />
           
           {/* Message Log */}
           <div className="flex-1 bg-black border-4 border-nes-white p-2 overflow-y-auto h-48 md:h-64 font-mono text-sm leading-relaxed scrollbar-thin">
              {gameState.messages.map((msg) => (
                <div key={msg.id} className={`mb-1 ${
                    msg.type === 'war' ? 'text-red-400' : 
                    msg.type === 'advisor' ? 'text-yellow-300 italic' :
                    msg.type === 'event' ? 'text-purple-300' : 'text-gray-300'
                }`}>
                  <span className="opacity-50 mr-2">[{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]</span>
                  {msg.text}
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
