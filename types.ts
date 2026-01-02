export enum FactionId {
  LIU_BEI = 'LIU_BEI',
  CAO_CAO = 'CAO_CAO',
  SUN_CE = 'SUN_CE',
  YUAN_SHAO = 'YUAN_SHAO',
  YUAN_SHU = 'YUAN_SHU',
  LIU_BIAO = 'LIU_BIAO',
  MA_TENG = 'MA_TENG',
  GONG_SUN_ZAN = 'GONG_SUN_ZAN',
  LU_BU = 'LU_BU',
  LI_JUE = 'LI_JUE',
  LIU_ZHANG = 'LIU_ZHANG',
  ZHANG_LU = 'ZHANG_LU',
  TAO_QIAN = 'TAO_QIAN',
  KONG_RONG = 'KONG_RONG',
  MENG_HUO = 'MENG_HUO',
  SHI_XIE = 'SHI_XIE',
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
  gridCol?: number; // Calculated grid column
  gridRow?: number; // Calculated grid row
}

export interface BattleAnim {
  attackerId: string;
  defenderId: string;
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