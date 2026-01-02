export enum FactionId {
  LIU_BEI = 'LIU_BEI',
  CAO_CAO = 'CAO_CAO',
  SUN_QUAN = 'SUN_QUAN',
  DONG_ZHUO = 'DONG_ZHUO',
  YUAN_SHAO = 'YUAN_SHAO',
  NONE = 'NONE'
}

export interface General {
  id: string;
  name: string;
  war: number;
  int: number;
  pol: number;
  cha: number;
  loyalty: number;
  factionId: FactionId;
  locationId: string; // City ID
  faceUrl: string; // Placeholder color or image URL
  description: string;
}

export interface City {
  id: string;
  name: string;
  factionId: FactionId;
  gold: number;
  food: number;
  soldiers: number;
  population: number;
  farming: number; // 0-100
  commerce: number; // 0-100
  defense: number; // 0-100
  governorId: string | null;
  x: number; // For map visualization (0-100%)
  y: number; // For map visualization (0-100%)
  neighbors: string[]; // IDs of connected cities
}

export interface GameState {
  year: number;
  month: number;
  currentTurnFaction: FactionId;
  playerFaction: FactionId;
  cities: City[];
  generals: General[];
  messages: LogMessage[];
  selectedCityId: string | null;
  selectedGeneralId: string | null;
  isProcessing: boolean; // For async operations
}

export interface LogMessage {
  id: string;
  text: string;
  type: 'info' | 'war' | 'event' | 'advisor';
  timestamp: number;
}

export type CommandType = 'DEVELOP_FARM' | 'DEVELOP_COMMERCE' | 'RECRUIT' | 'TRAIN' | 'SEARCH' | 'MOVE' | 'ATTACK' | 'ADVICE' | 'GIVE';
