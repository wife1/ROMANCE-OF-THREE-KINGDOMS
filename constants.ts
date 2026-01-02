import { City, FactionId, General } from './types';

export const INITIAL_YEAR = 194;
export const INITIAL_MONTH = 1;

export const FACTION_COLORS: Record<FactionId, string> = {
  [FactionId.LIU_BEI]: '#3b82f6', // Blue
  [FactionId.CAO_CAO]: '#a83c32', // Red
  [FactionId.SUN_QUAN]: '#d7b328', // Gold
  [FactionId.DONG_ZHUO]: '#4b5563', // Grey
  [FactionId.YUAN_SHAO]: '#facc15', // Yellow
  [FactionId.NONE]: '#ffffff',
};

export const INITIAL_CITIES: City[] = [
  {
    id: 'c_luoyang', name: 'Luo Yang', factionId: FactionId.CAO_CAO,
    gold: 500, food: 2000, soldiers: 5000, population: 40000,
    farming: 40, commerce: 60, defense: 80, governorId: 'g_caocao',
    x: 45, y: 35, neighbors: ['c_xuchang', 'c_changan', 'c_ye']
  },
  {
    id: 'c_xuchang', name: 'Xu Chang', factionId: FactionId.CAO_CAO,
    gold: 300, food: 1500, soldiers: 3000, population: 30000,
    farming: 50, commerce: 40, defense: 50, governorId: 'g_xiahoudun',
    x: 50, y: 45, neighbors: ['c_luoyang', 'c_xiaopei', 'c_ye']
  },
  {
    id: 'c_xiaopei', name: 'Xiao Pei', factionId: FactionId.LIU_BEI,
    gold: 200, food: 1000, soldiers: 2000, population: 15000,
    farming: 30, commerce: 20, defense: 30, governorId: 'g_liubei',
    x: 65, y: 45, neighbors: ['c_xuchang', 'c_xiapi']
  },
  {
    id: 'c_xiapi', name: 'Xia Pi', factionId: FactionId.NONE,
    gold: 150, food: 800, soldiers: 1000, population: 20000,
    farming: 45, commerce: 45, defense: 40, governorId: null,
    x: 75, y: 50, neighbors: ['c_xiaopei', 'c_jianye']
  },
  {
    id: 'c_jianye', name: 'Jian Ye', factionId: FactionId.SUN_QUAN,
    gold: 600, food: 3000, soldiers: 4000, population: 35000,
    farming: 70, commerce: 80, defense: 60, governorId: 'g_sunquan',
    x: 80, y: 70, neighbors: ['c_xiapi', 'c_chai sang']
  },
  {
    id: 'c_changan', name: 'Chang An', factionId: FactionId.DONG_ZHUO,
    gold: 1000, food: 5000, soldiers: 15000, population: 50000,
    farming: 50, commerce: 50, defense: 95, governorId: 'g_dongzhuo',
    x: 30, y: 35, neighbors: ['c_luoyang', 'c_hanzhong']
  },
  {
    id: 'c_hanzhong', name: 'Han Zhong', factionId: FactionId.NONE,
    gold: 300, food: 2000, soldiers: 2000, population: 10000,
    farming: 50, commerce: 20, defense: 70, governorId: null,
    x: 25, y: 50, neighbors: ['c_changan', 'c_chengdu']
  },
  {
    id: 'c_chengdu', name: 'Cheng Du', factionId: FactionId.NONE,
    gold: 600, food: 4000, soldiers: 5000, population: 45000,
    farming: 80, commerce: 40, defense: 60, governorId: null,
    x: 20, y: 65, neighbors: ['c_hanzhong']
  },
  {
    id: 'c_ye', name: 'Ye', factionId: FactionId.YUAN_SHAO,
    gold: 800, food: 4000, soldiers: 8000, population: 60000,
    farming: 70, commerce: 60, defense: 70, governorId: 'g_yuanshao',
    x: 55, y: 20, neighbors: ['c_luoyang', 'c_xuchang']
  }
];

export const INITIAL_GENERALS: General[] = [
  // Liu Bei Faction
  { id: 'g_liubei', name: 'Liu Bei', war: 75, int: 74, pol: 80, cha: 99, loyalty: 100, factionId: FactionId.LIU_BEI, locationId: 'c_xiaopei', faceUrl: '#4ade80', description: 'Virtuous ruler.' },
  { id: 'g_guanyu', name: 'Guan Yu', war: 98, int: 76, pol: 60, cha: 95, loyalty: 100, factionId: FactionId.LIU_BEI, locationId: 'c_xiaopei', faceUrl: '#dc2626', description: 'God of War.' },
  { id: 'g_zhangfei', name: 'Zhang Fei', war: 99, int: 35, pol: 20, cha: 40, loyalty: 100, factionId: FactionId.LIU_BEI, locationId: 'c_xiaopei', faceUrl: '#1f2937', description: 'Fierce warrior.' },
  
  // Cao Cao Faction
  { id: 'g_caocao', name: 'Cao Cao', war: 85, int: 96, pol: 94, cha: 90, loyalty: 100, factionId: FactionId.CAO_CAO, locationId: 'c_luoyang', faceUrl: '#7e22ce', description: 'Hero of Chaos.' },
  { id: 'g_xiahoudun', name: 'Xiahou Dun', war: 92, int: 60, pol: 70, cha: 80, loyalty: 100, factionId: FactionId.CAO_CAO, locationId: 'c_xuchang', faceUrl: '#2563eb', description: 'The One-Eyed Dragon.' },
  { id: 'g_guojia', name: 'Guo Jia', war: 15, int: 98, pol: 84, cha: 70, loyalty: 100, factionId: FactionId.CAO_CAO, locationId: 'c_luoyang', faceUrl: '#e5e7eb', description: 'Brilliant strategist.' },

  // Sun Quan Faction
  { id: 'g_sunquan', name: 'Sun Quan', war: 70, int: 85, pol: 88, cha: 95, loyalty: 100, factionId: FactionId.SUN_QUAN, locationId: 'c_jianye', faceUrl: '#b45309', description: 'Young Emperor.' },
  { id: 'g_zhouyu', name: 'Zhou Yu', war: 75, int: 97, pol: 86, cha: 94, loyalty: 100, factionId: FactionId.SUN_QUAN, locationId: 'c_jianye', faceUrl: '#fecaca', description: 'Peerless commander.' },

  // Dong Zhuo
  { id: 'g_dongzhuo', name: 'Dong Zhuo', war: 87, int: 50, pol: 15, cha: 5, loyalty: 100, factionId: FactionId.DONG_ZHUO, locationId: 'c_changan', faceUrl: '#4b5563', description: 'Tyrant.' },
  { id: 'g_lubu', name: 'Lu Bu', war: 100, int: 25, pol: 10, cha: 15, loyalty: 50, factionId: FactionId.DONG_ZHUO, locationId: 'c_changan', faceUrl: '#7f1d1d', description: 'Mightiest warrior.' },
  
  // Yuan Shao
  { id: 'g_yuanshao', name: 'Yuan Shao', war: 70, int: 70, pol: 75, cha: 85, loyalty: 100, factionId: FactionId.YUAN_SHAO, locationId: 'c_ye', faceUrl: '#facc15', description: 'Indecisive noble.' },
];