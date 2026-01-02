import { GoogleGenAI } from "@google/genai";
import { GameState, City, General } from "../types";

const getAI = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * Acts as the in-game advisor.
 */
export const getAdvisorAdvice = async (
  gameState: GameState,
  city: City
): Promise<string> => {
  const ai = getAI();
  const prompt = `
    You are a strategic military advisor in the Romance of the Three Kingdoms era (Ancient China).
    The player is ruling the city of ${city.name}.
    
    Current Status:
    - Year: ${gameState.year}, Month: ${gameState.month}
    - Gold: ${city.gold}
    - Food: ${city.food}
    - Soldiers: ${city.soldiers}
    - Population: ${city.population}
    - Farming Level: ${city.farming}/100
    - Commerce Level: ${city.commerce}/100
    - Defense: ${city.defense}/100
    
    Nearby cities: ${city.neighbors.join(", ")}.
    
    Give me one short paragraph of strategic advice in an archaic, wise tone.
    Focus on what is most lacking (e.g., if gold is low, suggest commerce. If soldiers are low, suggest recruiting).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "My lord, the stars are clouded. I cannot see the future clearly.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "My lord, I am unable to speak at this moment.";
  }
};

/**
 * Generates a battle report.
 */
export const getBattleReport = async (
  attacker: General,
  defenderName: string,
  attackerSoldiers: number,
  defenderSoldiers: number,
  won: boolean
): Promise<string> => {
  const ai = getAI();
  const prompt = `
    Write a very short (2 sentences) dramatic description of a battle in the Three Kingdoms era.
    Attacker General: ${attacker.name} (War: ${attacker.war})
    Defender: Forces of ${defenderName}
    Result: ${won ? "The attacker was VICTORIOUS" : "The attacker was DEFEATED"}.
    
    Style: Epic, historical, concise.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "The armies clashed, and blood stained the fields.";
  } catch (error) {
    return "The battle concluded.";
  }
};

/**
 * Generates a random event for the new turn.
 */
export const getSeasonalEvent = async (year: number, month: number): Promise<string | null> => {
    // Only 20% chance of an event
    if (Math.random() > 0.2) return null;

    const ai = getAI();
    const prompt = `
      It is the year ${year}, month ${month} in the Three Kingdoms era.
      Generate a single sentence random event text (e.g., locust plague, good harvest, wandering sage, star omen).
      Style: Retro game system message.
    `;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      return response.text || null;
    } catch (error) {
      return null;
    }
}
