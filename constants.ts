import { City, FactionId, General } from './types';

export const INITIAL_YEAR = 194;
export const INITIAL_MONTH = 1;
export const ACTION_COST = 50;

export const GRID_COLS = 10;
export const GRID_ROWS = 6;

export const FACTION_COLORS: Record<FactionId, string> = {
  [FactionId.LIU_BEI]: '#3b82f6',    // Blue
  [FactionId.CAO_CAO]: '#a83c32',    // Red
  [FactionId.SUN_CE]: '#d7b328',     // Gold
  [FactionId.YUAN_SHAO]: '#facc15',  // Yellow
  [FactionId.YUAN_SHU]: '#f97316',   // Orange
  [FactionId.LIU_BIAO]: '#10b981',   // Green
  [FactionId.MA_TENG]: '#2dd4bf',    // Teal
  [FactionId.GONG_SUN_ZAN]: '#e879f9', // Pink
  [FactionId.LU_BU]: '#4b5563',      // Dark Grey (Lu Bu)
  [FactionId.LI_JUE]: '#78350f',     // Brown (Dong Zhuo remnants)
  [FactionId.LIU_ZHANG]: '#8b5cf6',  // Purple (Yi Province)
  [FactionId.ZHANG_LU]: '#ec4899',   // Magenta (Hanzhong)
  [FactionId.TAO_QIAN]: '#6366f1',   // Indigo
  [FactionId.KONG_RONG]: '#84cc16',  // Lime
  [FactionId.MENG_HUO]: '#be185d',   // Pink/Red (Nanman)
  [FactionId.SHI_XIE]: '#059669',    // Emerald (Jiao Province)
  [FactionId.NONE]: '#ffffff',
};

// Map Coordinate Reference:
// X: 0 (West) -> 100 (East)
// Y: 0 (North) -> 100 (South)

export const INITIAL_CITIES: City[] = [
  // --- NORTH EAST (Gongsun Zan / Gongsun Du / Yuan Shao) ---
  {
    id: 'c_xiangping', name: 'Xiang Ping', factionId: FactionId.NONE, // Gongsun Du
    gold: 500, food: 3000, soldiers: 8000, population: 30000,
    farming: 40, commerce: 30, defense: 50, governorId: 'g_gongsundu',
    x: 96, y: 5, neighbors: []
  },
  {
    id: 'c_beiping', name: 'Bei Ping', factionId: FactionId.GONG_SUN_ZAN,
    gold: 400, food: 3000, soldiers: 9000, population: 40000,
    farming: 45, commerce: 40, defense: 75, governorId: 'g_gongsunzan',
    x: 88, y: 10, neighbors: []
  },
  {
    id: 'c_nanpi', name: 'Nan Pi', factionId: FactionId.YUAN_SHAO,
    gold: 600, food: 5000, soldiers: 12000, population: 60000,
    farming: 65, commerce: 55, defense: 65, governorId: 'g_wenchou',
    x: 78, y: 18, neighbors: []
  },
  {
    id: 'c_ye', name: 'Ye', factionId: FactionId.YUAN_SHAO,
    gold: 900, food: 6000, soldiers: 15000, population: 80000,
    farming: 80, commerce: 70, defense: 85, governorId: 'g_yuanshao',
    x: 68, y: 22, neighbors: []
  },
  {
    id: 'c_jinyang', name: 'Jin Yang', factionId: FactionId.NONE, // Zhang Yan
    gold: 300, food: 2000, soldiers: 5000, population: 35000,
    farming: 40, commerce: 30, defense: 70, governorId: 'g_zhangyan',
    x: 55, y: 15, neighbors: []
  },
  {
    id: 'c_shangdang', name: 'Shang Dang', factionId: FactionId.NONE, // Zhang Yang
    gold: 250, food: 2000, soldiers: 6000, population: 30000,
    farming: 35, commerce: 25, defense: 80, governorId: 'g_zhangyang',
    x: 50, y: 22, neighbors: []
  },
  {
    id: 'c_pingyuan', name: 'Ping Yuan', factionId: FactionId.NONE,
    gold: 350, food: 2500, soldiers: 4000, population: 40000,
    farming: 55, commerce: 45, defense: 50, governorId: 'g_yuantan',
    x: 80, y: 26, neighbors: []
  },
  {
    id: 'c_beihai', name: 'Bei Hai', factionId: FactionId.KONG_RONG,
    gold: 400, food: 3000, soldiers: 6000, population: 45000,
    farming: 60, commerce: 60, defense: 55, governorId: 'g_kongrong',
    x: 90, y: 28, neighbors: []
  },
  {
    id: 'c_langye', name: 'Lang Ye', factionId: FactionId.NONE, // Zang Ba
    gold: 250, food: 2000, soldiers: 8000, population: 30000,
    farming: 40, commerce: 30, defense: 60, governorId: 'g_zangba',
    x: 92, y: 36, neighbors: []
  },

  // --- CENTRAL PLAINS (Cao Cao / Lu Bu / Contested) ---
  {
    id: 'c_puyang', name: 'Pu Yang', factionId: FactionId.LU_BU,
    gold: 200, food: 1500, soldiers: 12000, population: 40000,
    farming: 40, commerce: 40, defense: 60, governorId: 'g_lubu',
    x: 72, y: 33, neighbors: []
  },
  {
    id: 'c_chenliu', name: 'Chen Liu', factionId: FactionId.CAO_CAO,
    gold: 500, food: 3000, soldiers: 8000, population: 50000,
    farming: 60, commerce: 60, defense: 65, governorId: 'g_caocao',
    x: 60, y: 36, neighbors: []
  },
  {
    id: 'c_hulao', name: 'Hulao Gate', factionId: FactionId.NONE,
    gold: 100, food: 1000, soldiers: 2000, population: 5000,
    farming: 10, commerce: 10, defense: 95, governorId: null,
    x: 52, y: 35, neighbors: []
  },
  {
    id: 'c_luoyang', name: 'Luo Yang', factionId: FactionId.NONE, // Ruined
    gold: 200, food: 1000, soldiers: 1000, population: 20000,
    farming: 20, commerce: 20, defense: 40, governorId: null,
    x: 45, y: 35, neighbors: []
  },
  {
    id: 'c_xuchang', name: 'Xu Chang', factionId: FactionId.CAO_CAO,
    gold: 400, food: 4000, soldiers: 7000, population: 60000,
    farming: 80, commerce: 70, defense: 60, governorId: 'g_xiahoudun',
    x: 58, y: 46, neighbors: []
  },
  {
    id: 'c_wan', name: 'Wan', factionId: FactionId.NONE, // Zhang Xiu
    gold: 300, food: 2000, soldiers: 8000, population: 35000,
    farming: 50, commerce: 50, defense: 65, governorId: 'g_zhangxiu',
    x: 48, y: 52, neighbors: []
  },

  // --- EAST (Liu Bei / Tao Qian / Yuan Shu) ---
  {
    id: 'c_xiaopei', name: 'Xiao Pei', factionId: FactionId.LIU_BEI,
    gold: 250, food: 1500, soldiers: 4000, population: 25000,
    farming: 45, commerce: 30, defense: 40, governorId: 'g_liubei',
    x: 78, y: 38, neighbors: []
  },
  {
    id: 'c_xiapi', name: 'Xia Pi', factionId: FactionId.TAO_QIAN,
    gold: 600, food: 4000, soldiers: 8000, population: 55000,
    farming: 75, commerce: 65, defense: 75, governorId: 'g_taoqian',
    x: 86, y: 42, neighbors: []
  },
  {
    id: 'c_runan', name: 'Ru Nan', factionId: FactionId.NONE, // Yellow Turbans/Kong Zhou
    gold: 200, food: 1500, soldiers: 15000, population: 60000,
    farming: 60, commerce: 40, defense: 40, governorId: 'g_gongdu',
    x: 60, y: 58, neighbors: []
  },
  {
    id: 'c_shouchun', name: 'Shou Chun', factionId: FactionId.YUAN_SHU,
    gold: 800, food: 5000, soldiers: 20000, population: 70000,
    farming: 70, commerce: 75, defense: 80, governorId: 'g_yuanshu',
    x: 72, y: 60, neighbors: []
  },
  {
    id: 'c_guangling', name: 'Guang Ling', factionId: FactionId.NONE,
    gold: 300, food: 2000, soldiers: 3000, population: 30000,
    farming: 50, commerce: 50, defense: 45, governorId: 'g_zerong',
    x: 90, y: 50, neighbors: []
  },

  // --- NORTH WEST (Li Jue / Ma Teng) ---
  {
    id: 'c_changan', name: 'Chang An', factionId: FactionId.LI_JUE,
    gold: 1200, food: 8000, soldiers: 25000, population: 80000,
    farming: 60, commerce: 60, defense: 98, governorId: 'g_lijue',
    x: 32, y: 35, neighbors: []
  },
  {
    id: 'c_chencang', name: 'Chen Cang', factionId: FactionId.LI_JUE,
    gold: 300, food: 3000, soldiers: 8000, population: 20000,
    farming: 40, commerce: 30, defense: 85, governorId: null,
    x: 22, y: 36, neighbors: []
  },
  {
    id: 'c_anding', name: 'An Ding', factionId: FactionId.MA_TENG,
    gold: 300, food: 2500, soldiers: 10000, population: 20000,
    farming: 30, commerce: 20, defense: 60, governorId: null,
    x: 25, y: 22, neighbors: []
  },
  {
    id: 'c_tianshui', name: 'Tian Shui', factionId: FactionId.MA_TENG,
    gold: 350, food: 3000, soldiers: 12000, population: 30000,
    farming: 45, commerce: 35, defense: 65, governorId: 'g_mateng',
    x: 15, y: 28, neighbors: []
  },
  {
    id: 'c_wuwei', name: 'Wu Wei', factionId: FactionId.MA_TENG,
    gold: 250, food: 2000, soldiers: 8000, population: 15000,
    farming: 20, commerce: 40, defense: 55, governorId: 'g_machao',
    x: 5, y: 15, neighbors: []
  },

  // --- YI PROVINCE & HANZHONG (Liu Zhang / Zhang Lu) ---
  {
    id: 'c_hanzhong', name: 'Han Zhong', factionId: FactionId.ZHANG_LU,
    gold: 500, food: 5000, soldiers: 10000, population: 40000,
    farming: 65, commerce: 40, defense: 90, governorId: 'g_zhanglu',
    x: 28, y: 50, neighbors: []
  },
  {
    id: 'c_zitong', name: 'Zi Tong', factionId: FactionId.LIU_ZHANG,
    gold: 400, food: 4000, soldiers: 6000, population: 35000,
    farming: 60, commerce: 30, defense: 85, governorId: null,
    x: 22, y: 60, neighbors: []
  },
  {
    id: 'c_chengdu', name: 'Cheng Du', factionId: FactionId.LIU_ZHANG,
    gold: 1000, food: 10000, soldiers: 20000, population: 90000,
    farming: 95, commerce: 70, defense: 80, governorId: 'g_liuzhang',
    x: 15, y: 70, neighbors: []
  },
  {
    id: 'c_jiangzhou', name: 'Jiang Zhou', factionId: FactionId.LIU_ZHANG,
    gold: 500, food: 5000, soldiers: 8000, population: 50000,
    farming: 70, commerce: 60, defense: 70, governorId: 'g_yan_yan',
    x: 25, y: 75, neighbors: []
  },
  {
    id: 'c_yongan', name: 'Yong An', factionId: FactionId.LIU_ZHANG,
    gold: 300, food: 3000, soldiers: 5000, population: 25000,
    farming: 40, commerce: 30, defense: 80, governorId: null,
    x: 35, y: 72, neighbors: []
  },
  {
    id: 'c_jianning', name: 'Jian Ning', factionId: FactionId.NONE, // Nanman Border
    gold: 200, food: 2000, soldiers: 15000, population: 30000,
    farming: 40, commerce: 20, defense: 50, governorId: null,
    x: 12, y: 88, neighbors: []
  },
  {
    id: 'c_yunnan', name: 'Yun Nan', factionId: FactionId.MENG_HUO,
    gold: 300, food: 2000, soldiers: 20000, population: 50000,
    farming: 30, commerce: 10, defense: 60, governorId: 'g_menghuo',
    x: 8, y: 96, neighbors: []
  },

  // --- JING PROVINCE (Liu Biao) ---
  {
    id: 'c_shangyong', name: 'Shang Yong', factionId: FactionId.NONE, // Shen brothers
    gold: 200, food: 1500, soldiers: 3000, population: 15000,
    farming: 30, commerce: 20, defense: 75, governorId: null,
    x: 38, y: 52, neighbors: []
  },
  {
    id: 'c_xinye', name: 'Xin Ye', factionId: FactionId.LIU_BIAO, // Technically under Liu Biao
    gold: 200, food: 2000, soldiers: 4000, population: 25000,
    farming: 50, commerce: 30, defense: 40, governorId: null,
    x: 48, y: 62, neighbors: []
  },
  {
    id: 'c_xiangyang', name: 'Xiang Yang', factionId: FactionId.LIU_BIAO,
    gold: 800, food: 8000, soldiers: 15000, population: 80000,
    farming: 85, commerce: 80, defense: 90, governorId: 'g_liubiao',
    x: 45, y: 68, neighbors: []
  },
  {
    id: 'c_jiangxia', name: 'Jiang Xia', factionId: FactionId.LIU_BIAO,
    gold: 500, food: 4000, soldiers: 12000, population: 40000,
    farming: 60, commerce: 60, defense: 80, governorId: 'g_huangzu',
    x: 55, y: 70, neighbors: []
  },
  {
    id: 'c_jiangling', name: 'Jiang Ling', factionId: FactionId.LIU_BIAO,
    gold: 600, food: 6000, soldiers: 10000, population: 60000,
    farming: 80, commerce: 75, defense: 85, governorId: 'g_cairen',
    x: 42, y: 75, neighbors: []
  },
  {
    id: 'c_wuling', name: 'Wu Ling', factionId: FactionId.NONE, // Jin Xuan
    gold: 300, food: 3000, soldiers: 5000, population: 30000,
    farming: 50, commerce: 40, defense: 50, governorId: 'g_jinxuan',
    x: 38, y: 80, neighbors: []
  },
  {
    id: 'c_changsha', name: 'Chang Sha', factionId: FactionId.NONE, // Han Xuan
    gold: 400, food: 4000, soldiers: 8000, population: 45000,
    farming: 65, commerce: 55, defense: 60, governorId: 'g_hanxuan', // Han Xuan starts here
    x: 48, y: 82, neighbors: []
  },
  {
    id: 'c_lingling', name: 'Ling Ling', factionId: FactionId.NONE, // Liu Du
    gold: 250, food: 2500, soldiers: 4000, population: 25000,
    farming: 45, commerce: 35, defense: 45, governorId: 'g_liudu',
    x: 40, y: 88, neighbors: []
  },
  {
    id: 'c_guiyang', name: 'Gui Yang', factionId: FactionId.NONE, // Zhao Fan
    gold: 250, food: 2500, soldiers: 4000, population: 25000,
    farming: 45, commerce: 35, defense: 45, governorId: 'g_zhaofan',
    x: 50, y: 88, neighbors: []
  },

  // --- JIANGDONG (Sun Ce / Liu Yao / Others) ---
  {
    id: 'c_lujiang', name: 'Lu Jiang', factionId: FactionId.SUN_CE, // Sun Ce base approx
    gold: 400, food: 3000, soldiers: 5000, population: 35000,
    farming: 55, commerce: 50, defense: 60, governorId: 'g_sunce',
    x: 65, y: 68, neighbors: []
  },
  {
    id: 'c_chaisang', name: 'Chai Sang', factionId: FactionId.NONE,
    gold: 350, food: 3000, soldiers: 4000, population: 30000,
    farming: 60, commerce: 60, defense: 70, governorId: null,
    x: 58, y: 80, neighbors: []
  },
  {
    id: 'c_jianye', name: 'Jian Ye', factionId: FactionId.NONE, // Liu Yao
    gold: 700, food: 6000, soldiers: 12000, population: 75000,
    farming: 85, commerce: 90, defense: 80, governorId: 'g_liuyao',
    x: 80, y: 70, neighbors: []
  },
  {
    id: 'c_wu', name: 'Wu', factionId: FactionId.NONE, // Yan Baihu
    gold: 500, food: 4000, soldiers: 6000, population: 50000,
    farming: 75, commerce: 80, defense: 65, governorId: 'g_yanbaihu',
    x: 88, y: 75, neighbors: []
  },
  {
    id: 'c_huiji', name: 'Hui Ji', factionId: FactionId.NONE, // Wang Lang
    gold: 400, food: 3500, soldiers: 5000, population: 40000,
    farming: 60, commerce: 60, defense: 50, governorId: 'g_wanglang',
    x: 86, y: 85, neighbors: []
  },

  // --- SOUTH (Jiao Province) ---
  {
    id: 'c_nanhai', name: 'Nan Hai', factionId: FactionId.SHI_XIE,
    gold: 400, food: 4000, soldiers: 6000, population: 30000,
    farming: 50, commerce: 70, defense: 50, governorId: null,
    x: 60, y: 94, neighbors: []
  },
  {
    id: 'c_jiaozhi', name: 'Jiao Zhi', factionId: FactionId.SHI_XIE,
    gold: 600, food: 5000, soldiers: 8000, population: 40000,
    farming: 65, commerce: 50, defense: 60, governorId: 'g_shixie',
    x: 40, y: 96, neighbors: []
  }
];

export const INITIAL_GENERALS: General[] = [
  // --- LIU BEI (Xiao Pei) ---
  { id: 'g_liubei', name: 'Liu Bei', war: 75, int: 74, pol: 80, cha: 99, loyalty: 100, factionId: FactionId.LIU_BEI, locationId: 'c_xiaopei', faceUrl: '#4ade80', description: 'Virtuous ruler.' },
  { id: 'g_guanyu', name: 'Guan Yu', war: 98, int: 76, pol: 60, cha: 95, loyalty: 100, factionId: FactionId.LIU_BEI, locationId: 'c_xiaopei', faceUrl: '#dc2626', description: 'God of War.' },
  { id: 'g_zhangfei', name: 'Zhang Fei', war: 99, int: 35, pol: 20, cha: 40, loyalty: 100, factionId: FactionId.LIU_BEI, locationId: 'c_xiaopei', faceUrl: '#1f2937', description: 'Fierce warrior.' },
  { id: 'g_sunqian', name: 'Sun Qian', war: 35, int: 68, pol: 75, cha: 82, loyalty: 95, factionId: FactionId.LIU_BEI, locationId: 'c_xiaopei', faceUrl: '#4ade80', description: 'Diplomat.' },
  { id: 'g_jianyong', name: 'Jian Yong', war: 40, int: 66, pol: 70, cha: 75, loyalty: 95, factionId: FactionId.LIU_BEI, locationId: 'c_xiaopei', faceUrl: '#4ade80', description: 'Easygoing minister.' },
  { id: 'g_mizhu', name: 'Mi Zhu', war: 30, int: 70, pol: 80, cha: 75, loyalty: 100, factionId: FactionId.LIU_BEI, locationId: 'c_xiaopei', faceUrl: '#4ade80', description: 'Wealthy patron.' },
  { id: 'g_mifang', name: 'Mi Fang', war: 60, int: 25, pol: 30, cha: 20, loyalty: 80, factionId: FactionId.LIU_BEI, locationId: 'c_xiaopei', faceUrl: '#4ade80', description: 'Fickle brother.' },

  // --- CAO CAO (Chen Liu / Xu Chang) ---
  { id: 'g_caocao', name: 'Cao Cao', war: 85, int: 96, pol: 94, cha: 90, loyalty: 100, factionId: FactionId.CAO_CAO, locationId: 'c_chenliu', faceUrl: '#7e22ce', description: 'Hero of Chaos.' },
  { id: 'g_xiahoudun', name: 'Xiahou Dun', war: 92, int: 60, pol: 70, cha: 80, loyalty: 100, factionId: FactionId.CAO_CAO, locationId: 'c_xuchang', faceUrl: '#2563eb', description: 'The One-Eyed Dragon.' },
  { id: 'g_xiahouyuan', name: 'Xiahou Yuan', war: 91, int: 54, pol: 60, cha: 75, loyalty: 100, factionId: FactionId.CAO_CAO, locationId: 'c_xuchang', faceUrl: '#2563eb', description: 'Rapid march.' },
  { id: 'g_guojia', name: 'Guo Jia', war: 15, int: 98, pol: 84, cha: 70, loyalty: 100, factionId: FactionId.CAO_CAO, locationId: 'c_chenliu', faceUrl: '#e5e7eb', description: 'Brilliant strategist.' },
  { id: 'g_dianwei', name: 'Dian Wei', war: 97, int: 30, pol: 20, cha: 50, loyalty: 100, factionId: FactionId.CAO_CAO, locationId: 'c_chenliu', faceUrl: '#4b5563', description: 'Evil Comes.' },
  { id: 'g_caoren', name: 'Cao Ren', war: 86, int: 65, pol: 50, cha: 75, loyalty: 100, factionId: FactionId.CAO_CAO, locationId: 'c_chenliu', faceUrl: '#2563eb', description: 'Iron Wall.' },
  { id: 'g_xunyu', name: 'Xun Yu', war: 20, int: 95, pol: 98, cha: 92, loyalty: 100, factionId: FactionId.CAO_CAO, locationId: 'c_xuchang', faceUrl: '#e5e7eb', description: 'King\'s Advisor.' },
  { id: 'g_xunyou', name: 'Xun You', war: 25, int: 94, pol: 80, cha: 70, loyalty: 100, factionId: FactionId.CAO_CAO, locationId: 'c_xuchang', faceUrl: '#e5e7eb', description: 'Master tactician.' },
  { id: 'g_chengyu', name: 'Cheng Yu', war: 50, int: 90, pol: 80, cha: 50, loyalty: 100, factionId: FactionId.CAO_CAO, locationId: 'c_chenliu', faceUrl: '#e5e7eb', description: 'Ruthless advisor.' },
  { id: 'g_yuejin', name: 'Yue Jin', war: 84, int: 50, pol: 40, cha: 60, loyalty: 90, factionId: FactionId.CAO_CAO, locationId: 'c_xuchang', faceUrl: '#2563eb', description: 'Vanguard general.' },
  { id: 'g_xuchu', name: 'Xu Chu', war: 96, int: 36, pol: 20, cha: 50, loyalty: 100, factionId: FactionId.CAO_CAO, locationId: 'c_chenliu', faceUrl: '#4b5563', description: 'Tiger Fool.' },
  { id: 'g_lidian', name: 'Li Dian', war: 77, int: 78, pol: 70, cha: 65, loyalty: 95, factionId: FactionId.CAO_CAO, locationId: 'c_chenliu', faceUrl: '#2563eb', description: 'Studious general.' },
  { id: 'g_yujin', name: 'Yu Jin', war: 84, int: 70, pol: 55, cha: 60, loyalty: 90, factionId: FactionId.CAO_CAO, locationId: 'c_xuchang', faceUrl: '#2563eb', description: 'Disciplinarian.' },
  { id: 'g_caohong', name: 'Cao Hong', war: 79, int: 45, pol: 40, cha: 50, loyalty: 100, factionId: FactionId.CAO_CAO, locationId: 'c_chenliu', faceUrl: '#2563eb', description: 'Wealthy cousin.' },
  { id: 'g_manchong', name: 'Man Chong', war: 60, int: 82, pol: 85, cha: 70, loyalty: 95, factionId: FactionId.CAO_CAO, locationId: 'c_xuchang', faceUrl: '#e5e7eb', description: 'Iron judge.' },
  { id: 'g_liuye', name: 'Liu Ye', war: 30, int: 91, pol: 80, cha: 75, loyalty: 95, factionId: FactionId.CAO_CAO, locationId: 'c_xuchang', faceUrl: '#e5e7eb', description: 'Trebuchet inventor.' },
  { id: 'g_maojie', name: 'Mao Jie', war: 45, int: 60, pol: 85, cha: 70, loyalty: 100, factionId: FactionId.CAO_CAO, locationId: 'c_chenliu', faceUrl: '#e5e7eb', description: 'Agriculturalist.' },
  { id: 'g_luqian', name: 'Lu Qian', war: 70, int: 50, pol: 60, cha: 55, loyalty: 100, factionId: FactionId.CAO_CAO, locationId: 'c_chenliu', faceUrl: '#2563eb', description: 'Loyal officer.' },

  // --- SUN CE (Lu Jiang) ---
  { id: 'g_sunce', name: 'Sun Ce', war: 92, int: 75, pol: 70, cha: 92, loyalty: 100, factionId: FactionId.SUN_CE, locationId: 'c_lujiang', faceUrl: '#b45309', description: 'Little Conqueror.' },
  { id: 'g_zhouyu', name: 'Zhou Yu', war: 75, int: 97, pol: 86, cha: 94, loyalty: 100, factionId: FactionId.SUN_CE, locationId: 'c_lujiang', faceUrl: '#fecaca', description: 'Peerless commander.' },
  { id: 'g_sunquan', name: 'Sun Quan', war: 65, int: 80, pol: 88, cha: 95, loyalty: 100, factionId: FactionId.SUN_CE, locationId: 'c_lujiang', faceUrl: '#b45309', description: 'Young master.' },
  { id: 'g_zhangzhao', name: 'Zhang Zhao', war: 10, int: 85, pol: 96, cha: 80, loyalty: 100, factionId: FactionId.SUN_CE, locationId: 'c_lujiang', faceUrl: '#fecaca', description: 'Internal affairs expert.' },
  { id: 'g_huanggai', name: 'Huang Gai', war: 83, int: 65, pol: 60, cha: 70, loyalty: 100, factionId: FactionId.SUN_CE, locationId: 'c_lujiang', faceUrl: '#9a3412', description: 'Veteran general.' },
  { id: 'g_chengpu', name: 'Cheng Pu', war: 84, int: 70, pol: 65, cha: 75, loyalty: 100, factionId: FactionId.SUN_CE, locationId: 'c_lujiang', faceUrl: '#9a3412', description: 'Sun family veteran.' },
  { id: 'g_zhoutai', name: 'Zhou Tai', war: 91, int: 40, pol: 30, cha: 50, loyalty: 90, factionId: FactionId.SUN_CE, locationId: 'c_lujiang', faceUrl: '#9a3412', description: 'Fearless bodyguard.' },
  { id: 'g_handang', name: 'Han Dang', war: 85, int: 50, pol: 40, cha: 60, loyalty: 100, factionId: FactionId.SUN_CE, locationId: 'c_lujiang', faceUrl: '#9a3412', description: 'Reliable general.' },
  { id: 'g_jiangqin', name: 'Jiang Qin', war: 84, int: 50, pol: 40, cha: 60, loyalty: 95, factionId: FactionId.SUN_CE, locationId: 'c_lujiang', faceUrl: '#9a3412', description: 'River pirate.' },
  { id: 'g_chenwu', name: 'Chen Wu', war: 87, int: 40, pol: 30, cha: 50, loyalty: 100, factionId: FactionId.SUN_CE, locationId: 'c_lujiang', faceUrl: '#9a3412', description: 'Sacrificial warrior.' },
  { id: 'g_zhanghong', name: 'Zhang Hong', war: 15, int: 92, pol: 90, cha: 80, loyalty: 100, factionId: FactionId.SUN_CE, locationId: 'c_lujiang', faceUrl: '#fecaca', description: 'Strategic mind.' },
  { id: 'g_zhuzhi', name: 'Zhu Zhi', war: 60, int: 70, pol: 75, cha: 60, loyalty: 100, factionId: FactionId.SUN_CE, locationId: 'c_lujiang', faceUrl: '#fecaca', description: 'Early supporter.' },
  { id: 'g_lufan', name: 'Lu Fan', war: 40, int: 75, pol: 70, cha: 60, loyalty: 95, factionId: FactionId.SUN_CE, locationId: 'c_lujiang', faceUrl: '#fecaca', description: 'Go player.' },
  { id: 'g_lingcao', name: 'Ling Cao', war: 81, int: 50, pol: 40, cha: 60, loyalty: 100, factionId: FactionId.SUN_CE, locationId: 'c_lujiang', faceUrl: '#9a3412', description: 'Vanguard.' },
  { id: 'g_dongxi', name: 'Dong Xi', war: 83, int: 40, pol: 30, cha: 55, loyalty: 90, factionId: FactionId.SUN_CE, locationId: 'c_lujiang', faceUrl: '#9a3412', description: 'Fearsome warrior.' },

  // --- YUAN SHAO (Ye / Nan Pi) ---
  { id: 'g_yuanshao', name: 'Yuan Shao', war: 70, int: 70, pol: 75, cha: 85, loyalty: 100, factionId: FactionId.YUAN_SHAO, locationId: 'c_ye', faceUrl: '#facc15', description: 'Noble leader.' },
  { id: 'g_wenchou', name: 'Wen Chou', war: 94, int: 25, pol: 20, cha: 45, loyalty: 100, factionId: FactionId.YUAN_SHAO, locationId: 'c_nanpi', faceUrl: '#854d0e', description: 'Fierce general.' },
  { id: 'g_yanliang', name: 'Yan Liang', war: 95, int: 25, pol: 20, cha: 45, loyalty: 100, factionId: FactionId.YUAN_SHAO, locationId: 'c_ye', faceUrl: '#854d0e', description: 'Fierce general.' },
  { id: 'g_zhanghe', name: 'Zhang He', war: 89, int: 72, pol: 65, cha: 70, loyalty: 90, factionId: FactionId.YUAN_SHAO, locationId: 'c_ye', faceUrl: '#854d0e', description: 'Adaptive general.' },
  { id: 'g_tianfeng', name: 'Tian Feng', war: 30, int: 93, pol: 88, cha: 70, loyalty: 98, factionId: FactionId.YUAN_SHAO, locationId: 'c_ye', faceUrl: '#fef08a', description: 'Outspoken advisor.' },
  { id: 'g_jushou', name: 'Ju Shou', war: 40, int: 90, pol: 85, cha: 70, loyalty: 98, factionId: FactionId.YUAN_SHAO, locationId: 'c_nanpi', faceUrl: '#fef08a', description: 'Grand strategist.' },
  { id: 'g_shenpei', name: 'Shen Pei', war: 60, int: 70, pol: 82, cha: 70, loyalty: 100, factionId: FactionId.YUAN_SHAO, locationId: 'c_ye', faceUrl: '#fef08a', description: 'Loyal minister.' },
  { id: 'g_guotu', name: 'Guo Tu', war: 40, int: 80, pol: 70, cha: 50, loyalty: 85, factionId: FactionId.YUAN_SHAO, locationId: 'c_ye', faceUrl: '#fef08a', description: 'Sycophant.' },
  { id: 'g_fengji', name: 'Feng Ji', war: 30, int: 82, pol: 75, cha: 50, loyalty: 90, factionId: FactionId.YUAN_SHAO, locationId: 'c_ye', faceUrl: '#fef08a', description: 'Ambitious rival.' },
  { id: 'g_xuyou', name: 'Xu You', war: 25, int: 91, pol: 70, cha: 40, loyalty: 70, factionId: FactionId.YUAN_SHAO, locationId: 'c_ye', faceUrl: '#fef08a', description: 'Greedy genius.' },
  { id: 'g_gaolan', name: 'Gao Lan', war: 88, int: 60, pol: 50, cha: 60, loyalty: 90, factionId: FactionId.YUAN_SHAO, locationId: 'c_nanpi', faceUrl: '#854d0e', description: 'Match for Xu Chu.' },
  { id: 'g_yuantan', name: 'Yuan Tan', war: 70, int: 40, pol: 50, cha: 60, loyalty: 95, factionId: FactionId.YUAN_SHAO, locationId: 'c_pingyuan', faceUrl: '#facc15', description: 'Eldest son.' },
  { id: 'g_yuanxi', name: 'Yuan Xi', war: 65, int: 50, pol: 55, cha: 65, loyalty: 95, factionId: FactionId.YUAN_SHAO, locationId: 'c_nanpi', faceUrl: '#facc15', description: 'Middle son.' },
  { id: 'g_yuanshang', name: 'Yuan Shang', war: 75, int: 50, pol: 40, cha: 70, loyalty: 95, factionId: FactionId.YUAN_SHAO, locationId: 'c_ye', faceUrl: '#facc15', description: 'Favorite son.' },
  { id: 'g_chunyuqiong', name: 'Chunyu Qiong', war: 70, int: 40, pol: 30, cha: 30, loyalty: 95, factionId: FactionId.YUAN_SHAO, locationId: 'c_ye', faceUrl: '#854d0e', description: 'Drunkard general.' },

  // --- LU BU (Pu Yang) ---
  { id: 'g_lubu', name: 'Lu Bu', war: 100, int: 26, pol: 13, cha: 15, loyalty: 100, factionId: FactionId.LU_BU, locationId: 'c_puyang', faceUrl: '#7f1d1d', description: 'Mightiest warrior.' },
  { id: 'g_chengung', name: 'Chen Gong', war: 55, int: 89, pol: 80, cha: 70, loyalty: 95, factionId: FactionId.LU_BU, locationId: 'c_puyang', faceUrl: '#9ca3af', description: 'Strategist.' },
  { id: 'g_zhangliao', name: 'Zhang Liao', war: 93, int: 80, pol: 75, cha: 85, loyalty: 90, factionId: FactionId.LU_BU, locationId: 'c_puyang', faceUrl: '#60a5fa', description: 'Valiant general.' },
  { id: 'g_gaoshun', name: 'Gao Shun', war: 87, int: 50, pol: 40, cha: 65, loyalty: 100, factionId: FactionId.LU_BU, locationId: 'c_puyang', faceUrl: '#4b5563', description: 'Formation breaker.' },
  { id: 'g_houcheng', name: 'Hou Cheng', war: 68, int: 40, pol: 30, cha: 30, loyalty: 70, factionId: FactionId.LU_BU, locationId: 'c_puyang', faceUrl: '#4b5563', description: 'Defector.' },
  { id: 'g_songxian', name: 'Song Xian', war: 75, int: 40, pol: 30, cha: 30, loyalty: 70, factionId: FactionId.LU_BU, locationId: 'c_puyang', faceUrl: '#4b5563', description: 'Minor officer.' },
  { id: 'g_weixu', name: 'Wei Xu', war: 73, int: 40, pol: 30, cha: 30, loyalty: 70, factionId: FactionId.LU_BU, locationId: 'c_puyang', faceUrl: '#4b5563', description: 'Minor officer.' },
  { id: 'g_diaochan', name: 'Diao Chan', war: 10, int: 80, pol: 60, cha: 100, loyalty: 100, factionId: FactionId.LU_BU, locationId: 'c_puyang', faceUrl: '#f472b6', description: 'Beauty of beauties.' },
  { id: 'g_zangba', name: 'Zang Ba', war: 84, int: 50, pol: 45, cha: 65, loyalty: 80, factionId: FactionId.NONE, locationId: 'c_langye', faceUrl: '#4b5563', description: 'Bandit leader.' },
  { id: 'g_sunguan', name: 'Sun Guan', war: 78, int: 30, pol: 20, cha: 40, loyalty: 90, factionId: FactionId.NONE, locationId: 'c_langye', faceUrl: '#4b5563', description: 'Bandit officer.' },

  // --- LIU BIAO (Jing) ---
  { id: 'g_liubiao', name: 'Liu Biao', war: 55, int: 70, pol: 80, cha: 80, loyalty: 100, factionId: FactionId.LIU_BIAO, locationId: 'c_xiangyang', faceUrl: '#10b981', description: 'Scholarly ruler.' },
  { id: 'g_cairen', name: 'Cai Mao', war: 70, int: 75, pol: 70, cha: 50, loyalty: 100, factionId: FactionId.LIU_BIAO, locationId: 'c_jiangling', faceUrl: '#065f46', description: 'Naval commander.' },
  { id: 'g_zhangyun', name: 'Zhang Yun', war: 65, int: 60, pol: 50, cha: 40, loyalty: 90, factionId: FactionId.LIU_BIAO, locationId: 'c_jiangling', faceUrl: '#065f46', description: 'Naval lieutenant.' },
  { id: 'g_wenpin', name: 'Wen Pin', war: 82, int: 60, pol: 60, cha: 70, loyalty: 95, factionId: FactionId.LIU_BIAO, locationId: 'c_xiangyang', faceUrl: '#065f46', description: 'Stalwart defender.' },
  { id: 'g_kuailiang', name: 'Kuai Liang', war: 30, int: 80, pol: 75, cha: 70, loyalty: 100, factionId: FactionId.LIU_BIAO, locationId: 'c_xiangyang', faceUrl: '#34d399', description: 'Wise counselor.' },
  { id: 'g_kuaiyue', name: 'Kuai Yue', war: 30, int: 88, pol: 80, cha: 75, loyalty: 100, factionId: FactionId.LIU_BIAO, locationId: 'c_xiangyang', faceUrl: '#34d399', description: 'Top strategist.' },
  { id: 'g_huangzu', name: 'Huang Zu', war: 72, int: 50, pol: 40, cha: 30, loyalty: 100, factionId: FactionId.LIU_BIAO, locationId: 'c_jiangxia', faceUrl: '#065f46', description: 'Governor of Jiangxia.' },
  { id: 'g_ganning', name: 'Gan Ning', war: 94, int: 74, pol: 20, cha: 60, loyalty: 70, factionId: FactionId.NONE, locationId: 'c_jiangxia', faceUrl: '#38bdf8', description: 'Pirate captain.' },
  { id: 'g_wangcan', name: 'Wang Can', war: 5, int: 85, pol: 80, cha: 60, loyalty: 90, factionId: FactionId.LIU_BIAO, locationId: 'c_xiangyang', faceUrl: '#34d399', description: 'Scholar.' },

  // --- MA TENG (Liang) ---
  { id: 'g_mateng', name: 'Ma Teng', war: 88, int: 50, pol: 60, cha: 85, loyalty: 100, factionId: FactionId.MA_TENG, locationId: 'c_tianshui', faceUrl: '#2dd4bf', description: 'Loyalist of the West.' },
  { id: 'g_machao', name: 'Ma Chao', war: 97, int: 45, pol: 30, cha: 80, loyalty: 95, factionId: FactionId.MA_TENG, locationId: 'c_wuwei', faceUrl: '#cffafe', description: 'The Splendid.' },
  { id: 'g_madai', name: 'Ma Dai', war: 83, int: 55, pol: 45, cha: 70, loyalty: 90, factionId: FactionId.MA_TENG, locationId: 'c_wuwei', faceUrl: '#2dd4bf', description: 'Reliable cousin.' },
  { id: 'g_pangde', name: 'Pang De', war: 94, int: 60, pol: 40, cha: 70, loyalty: 95, factionId: FactionId.MA_TENG, locationId: 'c_wuwei', faceUrl: '#2dd4bf', description: 'Coffin carrier.' },
  { id: 'g_hansui', name: 'Han Sui', war: 70, int: 75, pol: 60, cha: 60, loyalty: 70, factionId: FactionId.MA_TENG, locationId: 'c_tianshui', faceUrl: '#2dd4bf', description: 'Alliance breaker.' },
  { id: 'g_matie', name: 'Ma Tie', war: 70, int: 50, pol: 40, cha: 60, loyalty: 100, factionId: FactionId.MA_TENG, locationId: 'c_wuwei', faceUrl: '#2dd4bf', description: 'Ma brother.' },
  { id: 'g_maxiu', name: 'Ma Xiu', war: 68, int: 50, pol: 40, cha: 60, loyalty: 100, factionId: FactionId.MA_TENG, locationId: 'c_wuwei', faceUrl: '#2dd4bf', description: 'Ma brother.' },
  { id: 'g_chenggongying', name: 'Cheng Gongying', war: 75, int: 80, pol: 70, cha: 60, loyalty: 90, factionId: FactionId.MA_TENG, locationId: 'c_tianshui', faceUrl: '#2dd4bf', description: 'Han Sui advisor.' },
  { id: 'g_houxuan', name: 'Hou Xuan', war: 72, int: 30, pol: 20, cha: 30, loyalty: 90, factionId: FactionId.MA_TENG, locationId: 'c_tianshui', faceUrl: '#2dd4bf', description: 'Liang general.' },

  // --- LI JUE (Chang An) ---
  { id: 'g_lijue', name: 'Li Jue', war: 75, int: 40, pol: 30, cha: 20, loyalty: 100, factionId: FactionId.LI_JUE, locationId: 'c_changan', faceUrl: '#78350f', description: 'Tyrannical rebel.' },
  { id: 'g_guosi', name: 'Guo Si', war: 73, int: 30, pol: 20, cha: 20, loyalty: 100, factionId: FactionId.LI_JUE, locationId: 'c_changan', faceUrl: '#78350f', description: 'Bandit general.' },
  { id: 'g_jiaxu', name: 'Jia Xu', war: 30, int: 97, pol: 85, cha: 60, loyalty: 90, factionId: FactionId.LI_JUE, locationId: 'c_changan', faceUrl: '#a16207', description: 'The Poison Strategist.' },
  { id: 'g_fanchou', name: 'Fan Chou', war: 76, int: 20, pol: 10, cha: 15, loyalty: 100, factionId: FactionId.LI_JUE, locationId: 'c_changan', faceUrl: '#78350f', description: 'Rebel general.' },
  
  // --- LIU ZHANG (Yi) ---
  { id: 'g_liuzhang', name: 'Liu Zhang', war: 20, int: 50, pol: 65, cha: 75, loyalty: 100, factionId: FactionId.LIU_ZHANG, locationId: 'c_chengdu', faceUrl: '#8b5cf6', description: 'Peaceful lord.' },
  { id: 'g_yan_yan', name: 'Yan Yan', war: 85, int: 65, pol: 60, cha: 75, loyalty: 100, factionId: FactionId.LIU_ZHANG, locationId: 'c_jiangzhou', faceUrl: '#6d28d9', description: 'Veteran general.' },
  { id: 'g_zhangren', name: 'Zhang Ren', war: 86, int: 70, pol: 60, cha: 75, loyalty: 100, factionId: FactionId.LIU_ZHANG, locationId: 'c_chengdu', faceUrl: '#6d28d9', description: 'Loyal defender.' },
  { id: 'g_fazheng', name: 'Fa Zheng', war: 50, int: 94, pol: 82, cha: 60, loyalty: 90, factionId: FactionId.LIU_ZHANG, locationId: 'c_chengdu', faceUrl: '#a78bfa', description: 'Vengeful strategist.' },
  { id: 'g_zhangsong', name: 'Zhang Song', war: 10, int: 84, pol: 70, cha: 20, loyalty: 60, factionId: FactionId.LIU_ZHANG, locationId: 'c_chengdu', faceUrl: '#a78bfa', description: 'Map bearer.' },
  { id: 'g_huangquan', name: 'Huang Quan', war: 45, int: 82, pol: 80, cha: 70, loyalty: 95, factionId: FactionId.LIU_ZHANG, locationId: 'c_chengdu', faceUrl: '#a78bfa', description: 'Capable administrator.' },
  { id: 'g_wuyi', name: 'Wu Yi', war: 75, int: 70, pol: 70, cha: 75, loyalty: 90, factionId: FactionId.LIU_ZHANG, locationId: 'c_chengdu', faceUrl: '#a78bfa', description: 'In-law.' },
  { id: 'g_liyan', name: 'Li Yan', war: 80, int: 85, pol: 75, cha: 60, loyalty: 80, factionId: FactionId.LIU_ZHANG, locationId: 'c_jiangzhou', faceUrl: '#a78bfa', description: 'Later regent.' },

  // --- NEW FACTIONS (South) ---
  { id: 'g_menghuo', name: 'Meng Huo', war: 87, int: 42, pol: 45, cha: 80, loyalty: 100, factionId: FactionId.MENG_HUO, locationId: 'c_yunnan', faceUrl: '#be185d', description: 'Nanman King.' },
  { id: 'g_zhurong', name: 'Zhu Rong', war: 85, int: 40, pol: 40, cha: 75, loyalty: 100, factionId: FactionId.MENG_HUO, locationId: 'c_yunnan', faceUrl: '#be185d', description: 'Fire Goddess.' },
  { id: 'g_shixie', name: 'Shi Xie', war: 30, int: 80, pol: 88, cha: 90, loyalty: 100, factionId: FactionId.SHI_XIE, locationId: 'c_jiaozhi', faceUrl: '#059669', description: 'Scholar of Jiao.' },

  // --- OTHERS & FREE ---
  { id: 'g_yuanshu', name: 'Yuan Shu', war: 65, int: 60, pol: 50, cha: 70, loyalty: 100, factionId: FactionId.YUAN_SHU, locationId: 'c_shouchun', faceUrl: '#f97316', description: 'Ambitious pretender.' },
  { id: 'g_jiling', name: 'Ji Ling', war: 83, int: 40, pol: 30, cha: 50, loyalty: 100, factionId: FactionId.YUAN_SHU, locationId: 'c_shouchun', faceUrl: '#c2410c', description: 'Trident wielder.' },
  { id: 'g_zhangxun', name: 'Zhang Xun', war: 78, int: 40, pol: 35, cha: 45, loyalty: 90, factionId: FactionId.YUAN_SHU, locationId: 'c_shouchun', faceUrl: '#c2410c', description: 'Grand general.' },
  { id: 'g_yanxiang', name: 'Yan Xiang', war: 20, int: 85, pol: 80, cha: 60, loyalty: 95, factionId: FactionId.YUAN_SHU, locationId: 'c_shouchun', faceUrl: '#fdba74', description: 'Voice of reason.' },
  { id: 'g_leibo', name: 'Lei Bo', war: 75, int: 30, pol: 20, cha: 30, loyalty: 70, factionId: FactionId.YUAN_SHU, locationId: 'c_shouchun', faceUrl: '#c2410c', description: 'Bandit nature.' },
  { id: 'g_chenlan', name: 'Chen Lan', war: 74, int: 35, pol: 20, cha: 30, loyalty: 70, factionId: FactionId.YUAN_SHU, locationId: 'c_shouchun', faceUrl: '#c2410c', description: 'Bandit nature.' },
  
  { id: 'g_gongsunzan', name: 'Gongsun Zan', war: 82, int: 65, pol: 60, cha: 75, loyalty: 100, factionId: FactionId.GONG_SUN_ZAN, locationId: 'c_beiping', faceUrl: '#e879f9', description: 'White Horse General.' },
  { id: 'g_zhaoyun', name: 'Zhao Yun', war: 96, int: 75, pol: 65, cha: 95, loyalty: 95, factionId: FactionId.GONG_SUN_ZAN, locationId: 'c_beiping', faceUrl: '#f0abfc', description: 'Dragon of Changshan.' },
  { id: 'g_gongsunyue', name: 'Gongsun Yue', war: 70, int: 50, pol: 50, cha: 60, loyalty: 100, factionId: FactionId.GONG_SUN_ZAN, locationId: 'c_beiping', faceUrl: '#e879f9', description: 'Younger brother.' },
  
  { id: 'g_zhanglu', name: 'Zhang Lu', war: 60, int: 70, pol: 80, cha: 85, loyalty: 100, factionId: FactionId.ZHANG_LU, locationId: 'c_hanzhong', faceUrl: '#ec4899', description: 'Religious leader.' },
  { id: 'g_yanpu', name: 'Yan Pu', war: 30, int: 80, pol: 75, cha: 60, loyalty: 90, factionId: FactionId.ZHANG_LU, locationId: 'c_hanzhong', faceUrl: '#fce7f3', description: 'Advisor.' },
  
  { id: 'g_taoqian', name: 'Tao Qian', war: 30, int: 60, pol: 80, cha: 85, loyalty: 100, factionId: FactionId.TAO_QIAN, locationId: 'c_xiapi', faceUrl: '#6366f1', description: 'Kind governor.' },
  { id: 'g_chengui', name: 'Chen Gui', war: 20, int: 85, pol: 88, cha: 70, loyalty: 90, factionId: FactionId.TAO_QIAN, locationId: 'c_xiapi', faceUrl: '#a5b4fc', description: 'Schemer against Lu Bu.' },
  { id: 'g_chendeng', name: 'Chen Deng', war: 60, int: 88, pol: 85, cha: 75, loyalty: 90, factionId: FactionId.TAO_QIAN, locationId: 'c_xiapi', faceUrl: '#a5b4fc', description: 'Dragon genius.' },

  { id: 'g_kongrong', name: 'Kong Rong', war: 25, int: 85, pol: 85, cha: 75, loyalty: 100, factionId: FactionId.KONG_RONG, locationId: 'c_beihai', faceUrl: '#84cc16', description: 'Famous scholar.' },
  { id: 'g_taishici', name: 'Taishi Ci', war: 93, int: 68, pol: 60, cha: 80, loyalty: 90, factionId: FactionId.KONG_RONG, locationId: 'c_beihai', faceUrl: '#bef264', description: 'Honor bound warrior.' },
  
  { id: 'g_huangzhong', name: 'Huang Zhong', war: 95, int: 65, pol: 60, cha: 75, loyalty: 90, factionId: FactionId.NONE, locationId: 'c_changsha', faceUrl: '#fca5a5', description: 'Master archer.' },
  { id: 'g_weiyan', name: 'Wei Yan', war: 92, int: 70, pol: 40, cha: 30, loyalty: 80, factionId: FactionId.NONE, locationId: 'c_changsha', faceUrl: '#991b1b', description: 'Rebellious spirit.' },
  { id: 'g_xushu', name: 'Xu Shu', war: 60, int: 93, pol: 80, cha: 80, loyalty: 100, factionId: FactionId.NONE, locationId: 'c_xinye', faceUrl: '#38bdf8', description: 'Swordsman scholar.' },
  
  { id: 'g_zhangxiu', name: 'Zhang Xiu', war: 80, int: 60, pol: 50, cha: 65, loyalty: 100, factionId: FactionId.NONE, locationId: 'c_wan', faceUrl: '#4b5563', description: 'Warlord of Wan.' },
  { id: 'g_hucheer', name: 'Hu Che Er', war: 85, int: 40, pol: 20, cha: 30, loyalty: 100, factionId: FactionId.NONE, locationId: 'c_wan', faceUrl: '#4b5563', description: 'Strongman.' },
  
  // --- INDEPENDENT WARLORDS (Previously Empty Cities) ---
  { id: 'g_gongsundu', name: 'Gongsun Du', war: 70, int: 60, pol: 70, cha: 80, loyalty: 100, factionId: FactionId.NONE, locationId: 'c_xiangping', faceUrl: '#e879f9', description: 'King of Liaodong.' },
  { id: 'g_zhangyan', name: 'Zhang Yan', war: 81, int: 62, pol: 45, cha: 70, loyalty: 100, factionId: FactionId.NONE, locationId: 'c_jinyang', faceUrl: '#4b5563', description: 'Black Mountain Bandit.' },
  { id: 'g_zhangyang', name: 'Zhang Yang', war: 72, int: 50, pol: 60, cha: 70, loyalty: 100, factionId: FactionId.NONE, locationId: 'c_shangdang', faceUrl: '#4b5563', description: 'Benevolent warlord.' },
  { id: 'g_mushun', name: 'Mu Shun', war: 77, int: 40, pol: 30, cha: 45, loyalty: 90, factionId: FactionId.NONE, locationId: 'c_shangdang', faceUrl: '#4b5563', description: 'Fallen warrior.' },
  { id: 'g_gongdu', name: 'Gong Du', war: 75, int: 30, pol: 20, cha: 50, loyalty: 90, factionId: FactionId.NONE, locationId: 'c_runan', faceUrl: '#c2410c', description: 'Yellow Turban remnant.' },
  { id: 'g_zerong', name: 'Ze Rong', war: 60, int: 40, pol: 20, cha: 30, loyalty: 50, factionId: FactionId.NONE, locationId: 'c_guangling', faceUrl: '#c2410c', description: 'Corrupt monk.' },
  { id: 'g_liuyao', name: 'Liu Yao', war: 50, int: 60, pol: 75, cha: 80, loyalty: 100, factionId: FactionId.NONE, locationId: 'c_jianye', faceUrl: '#6366f1', description: 'Inspector of Yang.' },
  { id: 'g_yanbaihu', name: 'Yan Baihu', war: 70, int: 40, pol: 30, cha: 60, loyalty: 100, factionId: FactionId.NONE, locationId: 'c_wu', faceUrl: '#4b5563', description: 'White Tiger Yan.' },
  { id: 'g_wanglang', name: 'Wang Lang', war: 35, int: 76, pol: 80, cha: 70, loyalty: 100, factionId: FactionId.NONE, locationId: 'c_huiji', faceUrl: '#6366f1', description: 'Debater.' },
  { id: 'g_yufan', name: 'Yu Fan', war: 70, int: 85, pol: 80, cha: 60, loyalty: 90, factionId: FactionId.NONE, locationId: 'c_huiji', faceUrl: '#a5b4fc', description: 'I Ching scholar.' },
  { id: 'g_jinxuan', name: 'Jin Xuan', war: 65, int: 55, pol: 60, cha: 60, loyalty: 100, factionId: FactionId.NONE, locationId: 'c_wuling', faceUrl: '#10b981', description: 'Governor of Wuling.' },
  { id: 'g_gongzhi', name: 'Gong Zhi', war: 50, int: 70, pol: 75, cha: 60, loyalty: 80, factionId: FactionId.NONE, locationId: 'c_wuling', faceUrl: '#34d399', description: 'Surrendered.' },
  { id: 'g_hanxuan', name: 'Han Xuan', war: 40, int: 30, pol: 50, cha: 20, loyalty: 100, factionId: FactionId.NONE, locationId: 'c_changsha', faceUrl: '#10b981', description: 'Tyrant of Changsha.' },
  { id: 'g_zhaofan', name: 'Zhao Fan', war: 45, int: 50, pol: 60, cha: 60, loyalty: 100, factionId: FactionId.NONE, locationId: 'c_guiyang', faceUrl: '#10b981', description: 'Governor of Guiyang.' },
  { id: 'g_liudu', name: 'Liu Du', war: 50, int: 60, pol: 65, cha: 70, loyalty: 100, factionId: FactionId.NONE, locationId: 'c_lingling', faceUrl: '#10b981', description: 'Governor of Lingling.' },
  { id: 'g_liuba', name: 'Liu Ba', war: 30, int: 85, pol: 88, cha: 70, loyalty: 90, factionId: FactionId.NONE, locationId: 'c_lingling', faceUrl: '#34d399', description: 'Reclusive scholar.' },
  { id: 'g_xingdaorong', name: 'Xing Daorong', war: 80, int: 20, pol: 10, cha: 40, loyalty: 90, factionId: FactionId.NONE, locationId: 'c_lingling', faceUrl: '#4b5563', description: 'Mighty warrior.' },
];