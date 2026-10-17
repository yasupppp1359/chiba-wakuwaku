// ========================================
// data.js - 千葉ワクワク紀行 定数データ (リアル路線＆ジャンクション版)
// ========================================

const CELL = {
  PLUS: "plus", MINUS: "minus", CARD: "card",
  STATION: "station", GOAL: "goal",
  EVENT: "event",
  HELI: "heli",
  NICE: "nice",
  SHOP: "shop",
};

const BOARD_W = 12000, BOARD_H = 10000;

const STATIONS = [
  // ==========================================
  // --- 主要ゴール駅（30箇所） ---
  // ==========================================
  { id:"chiba",      name:"千葉中央",       x:5000, y:5000, region:"center", kind:"goal" },
  { id:"makuhari",   name:"海浜幕張",       x:4000, y:4500, region:"center", kind:"goal" },
  { id:"soga",       name:"蘇我",           x:5000, y:6000, region:"center", kind:"goal" },
  { id:"ichikawa",   name:"市川",           x:2500, y:4000, region:"west",   kind:"goal" },
  { id:"funabashi",  name:"船橋",           x:3000, y:3500, region:"west",   kind:"goal" },
  { id:"urayasu",    name:"浦安（舞浜）",   x:2000, y:4000, region:"west",   kind:"goal" },
  { id:"matsudo",    name:"松戸",           x:3000, y:2000, region:"north",  kind:"goal" },
  { id:"kashiwa",    name:"柏",             x:4500, y:1000, region:"north",  kind:"goal" },
  { id:"abiko",      name:"我孫子",         x:5500, y:800,  region:"north",  kind:"goal" },
  { id:"noda",       name:"野田",           x:2000, y:1000, region:"north",  kind:"goal" },
  { id:"nagareyama", name:"流山",           x:3000, y:1500, region:"north",  kind:"goal" },
  { id:"narita",     name:"成田空港",       x:7500, y:1500, region:"north",  kind:"goal" },
  { id:"sakura",     name:"佐倉",           x:6000, y:3000, region:"north",  kind:"goal" }, // ジャンクション（総武線・京成線）
  { id:"naruto",     name:"成東",           x:8000, y:3500, region:"east",   kind:"goal" },
  { id:"choshi",     name:"銚子",           x:10000,y:500,  region:"east",   kind:"goal" },
  { id:"asahi",      name:"旭",             x:9000, y:2500, region:"east",   kind:"goal" },
  { id:"katori",     name:"香取",           x:8500, y:1000, region:"east",   kind:"goal" },
  { id:"sawara",     name:"佐原",           x:8000, y:1000, region:"east",   kind:"goal" },
  { id:"mobara",     name:"茂原",           x:7000, y:6500, region:"east",   kind:"goal" },
  { id:"ichinomiya", name:"一宮",           x:7500, y:6000, region:"east",   kind:"goal" },
  { id:"katsuura",   name:"勝浦",           x:9000, y:7000, region:"east",   kind:"goal" },
  { id:"isumi",      name:"いすみ",         x:8000, y:7000, region:"east",   kind:"goal" },
  { id:"ohara",      name:"大原",           x:8000, y:7500, region:"east",   kind:"goal" },
  { id:"tateyama",   name:"館山",           x:2000, y:8500, region:"south",  kind:"goal" },
  { id:"minamiboso", name:"南房総",         x:1500, y:9500, region:"south",  kind:"goal" },
  { id:"kamogawa",   name:"鴨川",           x:7000, y:8500, region:"south",  kind:"goal" },
  { id:"kimitsu",    name:"君津",           x:3000, y:7500, region:"south",  kind:"goal" },
  { id:"kisarazu",   name:"木更津",         x:3500, y:6500, region:"south",  kind:"goal" },
  { id:"sodegaura",  name:"袖ケ浦",         x:4000, y:5000, region:"south",  kind:"goal" },
  { id:"ichihara",   name:"市原",           x:6000, y:6500, region:"south",  kind:"goal" },

  // ==========================================
  // --- 物件駅（70箇所） ---
  // ==========================================
  { id:"chiba_p1",   name:"千葉みなと",     x:4500, y:4500, region:"center", kind:"prop" },
  { id:"chiba_p2",   name:"県庁前",         x:5500, y:4500, region:"center", kind:"prop" },
  { id:"chiba_p3",   name:"本千葉",         x:4500, y:5500, region:"center", kind:"prop" },
  
  { id:"ichihara_p1",name:"八幡宿",         x:5500, y:5500, region:"center", kind:"prop" },
  { id:"ichihara_p2",name:"五井",           x:6000, y:5500, region:"south",  kind:"prop" },
  { id:"ichihara_p3",name:"姉ケ崎",         x:5000, y:7000, region:"south",  kind:"prop" },
  { id:"ichihara_p4",name:"牛久",           x:6500, y:6500, region:"south",  kind:"prop" },
  
  { id:"funabashi_p1",name:"南船橋",        x:3500, y:4000, region:"west",   kind:"prop" },
  { id:"funabashi_p2",name:"西船橋",        x:2500, y:3500, region:"west",   kind:"prop" },
  { id:"funabashi_p3",name:"東海神",        x:3500, y:3000, region:"west",   kind:"prop" },
  { id:"funabashi_p4",name:"船橋法典",      x:2500, y:2500, region:"west",   kind:"prop" },
  
  { id:"ichikawa_p1",name:"南行徳",         x:2000, y:3500, region:"west",   kind:"prop" },
  { id:"ichikawa_p2",name:"妙典",           x:1500, y:3500, region:"west",   kind:"prop" },
  { id:"ichikawa_p3",name:"原木中山",       x:2000, y:3000, region:"west",   kind:"prop" },
  
  { id:"urayasu_p1", name:"新浦安",         x:1500, y:4500, region:"west",   kind:"prop" },
  { id:"urayasu_p2", name:"舞浜",           x:2500, y:4500, region:"west",   kind:"prop" },
  
  { id:"matsudo_p1", name:"新松戸",         x:3500, y:2000, region:"north",  kind:"prop" },
  { id:"matsudo_p2", name:"北松戸",         x:3000, y:1500, region:"north",  kind:"prop" },
  { id:"matsudo_p3", name:"上本郷",         x:2500, y:2000, region:"north",  kind:"prop" },
  
  { id:"kashiwa_p1", name:"南柏",           x:4000, y:1500, region:"north",  kind:"prop" },
  { id:"kashiwa_p2", name:"豊四季",         x:5000, y:1500, region:"north",  kind:"prop" },
  { id:"kashiwa_p3", name:"柏の葉",         x:4500, y:500,  region:"north",  kind:"prop" },
  
  { id:"noda_p1",    name:"川間",           x:1500, y:1500, region:"north",  kind:"prop" },
  { id:"noda_p2",    name:"梅郷",           x:2000, y:500,  region:"north",  kind:"prop" },
  
  { id:"nagareyama_p1",name:"江戸川台",     x:2500, y:1000, region:"north",  kind:"prop" },
  { id:"nagareyama_p2",name:"初石",         x:3500, y:1000, region:"north",  kind:"prop" },
  
  { id:"abiko_p1",   name:"天王台",         x:5000, y:500,  region:"north",  kind:"prop" },
  { id:"abiko_p2",   name:"手賀沼",         x:6000, y:1000, region:"north",  kind:"prop" },
  
  { id:"shiroi",     name:"白井",           x:5000, y:2000, region:"north",  kind:"prop" },
  { id:"inzai",      name:"印西牧の原",     x:6000, y:1500, region:"north",  kind:"prop" },
  { id:"shisui",     name:"酒々井",         x:6500, y:2000, region:"north",  kind:"prop" },
  
  { id:"narita_p1",  name:"空港第2ビル",    x:8000, y:1000, region:"north",  kind:"prop" },
  { id:"narita_p2",  name:"成田",           x:7500, y:2000, region:"north",  kind:"prop" },
  { id:"narita_p3",  name:"京成成田",       x:7000, y:1500, region:"north",  kind:"prop" },
  
  { id:"sakura_p1",  name:"京成佐倉",       x:6500, y:3000, region:"north",  kind:"prop" },
  { id:"sakura_p2",  name:"大佐倉",         x:6500, y:4000, region:"north",  kind:"prop" },

  // === 【京成電鉄ルート】 ===
  { id:"keisei_tsudanuma", name:"京成津田沼", x:3500, y:2500, region:"west", kind:"prop" },
  { id:"keisei_okubo",     name:"ひつじん",   x:4500, y:2000, region:"north", kind:"prop" },
  { id:"yachiyodai",       name:"八千代台",   x:5500, y:2500, region:"north", kind:"prop" },
  { id:"keisei_owada",     name:"田中邸前",   x:6500, y:2500, region:"north", kind:"prop" },
  // ==============================

  { id:"naruto_p1",  name:"日向",           x:8500, y:3000, region:"east",   kind:"prop" },
  { id:"naruto_p2",  name:"求名",           x:7500, y:3000, region:"east",   kind:"prop" },
  { id:"sanmu",      name:"山武",           x:8000, y:4000, region:"east",   kind:"prop" },
  { id:"yokoshiba",  name:"横芝",           x:8500, y:3500, region:"east",   kind:"prop" },
  
  { id:"choshi_p1",  name:"銚子漁港",       x:10500,y:1000, region:"east",   kind:"prop" },
  { id:"choshi_p2",  name:"犬吠",           x:11000,y:500,  region:"east",   kind:"prop" },
  { id:"asahi_p1",   name:"飯岡",           x:9500, y:1500, region:"east",   kind:"prop" },
  { id:"asahi_p2",   name:"干潟",           x:9000, y:3500, region:"east",   kind:"prop" },
  
  { id:"katori_p1",  name:"小見川",         x:9000, y:1500, region:"east",   kind:"prop" },
  { id:"sawara_p1",  name:"水郷",           x:7500, y:500,  region:"east",   kind:"prop" },
  { id:"sawara_p2",  name:"香取神宮",       x:8500, y:500,  region:"east",   kind:"prop" },
  
  { id:"mobara_p1",  name:"新茂原",         x:6500, y:7000, region:"east",   kind:"prop" },
  { id:"mobara_p2",  name:"茂原",           x:7500, y:7000, region:"east",   kind:"prop" },
  { id:"ichinomiya_p1",name:"上総一ノ宮",   x:8000, y:5500, region:"east",   kind:"prop" },
  
  { id:"yachimata",  name:"八街",           x:7000, y:4000, region:"east",   kind:"prop" },
  { id:"tomisato",   name:"富里",           x:7000, y:2500, region:"east",   kind:"prop" },
  { id:"kujukuri",   name:"九十九里",       x:9000, y:5000, region:"east",   kind:"prop" },
  
  { id:"ohara_p1",   name:"浪花",           x:8500, y:7500, region:"east",   kind:"prop" },
  { id:"ohara_p2",   name:"大多喜",         x:7500, y:8000, region:"east",   kind:"prop" },
  
  { id:"isumi_p1",   name:"御宿",           x:8500, y:8000, region:"east",   kind:"prop" },
  { id:"isumi_p2",   name:"大原",           x:7500, y:7500, region:"east",   kind:"prop" },
  { id:"katsuura_p1",name:"上総興津",       x:9500, y:7500, region:"east",   kind:"prop" },
  { id:"katsuura_p2",name:"鵜原",           x:9500, y:6500, region:"east",   kind:"prop" },
  
  { id:"kamogawa_p1",name:"安房小湊",       x:6500, y:8000, region:"south",  kind:"prop" },
  { id:"kamogawa_p2",name:"安房鴨川",       x:6000, y:8500, region:"south",  kind:"prop" },
  { id:"kamogawa_p3",name:"太海",           x:6500, y:9000, region:"south",  kind:"prop" },
  
  { id:"tateyama_p1",name:"那古船形",       x:2500, y:8000, region:"south",  kind:"prop" },
  { id:"tateyama_p2",name:"洲崎",           x:2500, y:9000, region:"south",  kind:"prop" },
  { id:"tateyama_p3",name:"九重",           x:1500, y:8500, region:"south",  kind:"prop" },
  
  { id:"minamiboso_p1",name:"富浦",         x:2000, y:9500, region:"south",  kind:"prop" },
  { id:"minamiboso_p2",name:"千倉",         x:1000, y:9000, region:"south",  kind:"prop" },
  
  { id:"kimitsu_p1", name:"青堀",           x:4000, y:7000, region:"south",  kind:"prop" },
  { id:"kimitsu_p2", name:"大貫",           x:3500, y:8000, region:"south",  kind:"prop" },
  
  { id:"kisarazu_p1",name:"巌根",           x:3000, y:6000, region:"south",  kind:"prop" },
  { id:"kisarazu_p2",name:"太田山",         x:4000, y:6000, region:"south",  kind:"prop" },
  
  { id:"sodegaura_p1",name:"長浦",          x:3500, y:5500, region:"south",  kind:"prop" },
  { id:"sodegaura_p2",name:"横田",          x:4500, y:5500, region:"south",  kind:"prop" },

  // === 【ジャンクション（交差駅）】 ===
  { id:"chidori",    name:"千鳥",           x:3500, y:4500, region:"west",   kind:"prop" }, // 京葉線×湾岸線
  { id:"goko",       name:"五香",           x:3500, y:2000, region:"north",  kind:"prop" }, // 常磐線×京成線
  { id:"yotsukaido", name:"四街道",         x:6000, y:4000, region:"center", kind:"prop" }, // 総武線×外房線
];

const EDGES = [
  // ==========================================
  // --- 【JR路線網】 ---
  // ==========================================

  // ■ 総武線（西から東へ）
  ["ichikawa", "funabashi"],
  ["funabashi", "chiba"],
  ["chiba", "yotsukaido"],
  ["yotsukaido", "sakura"],
  ["sakura", "narita"],
  ["narita", "sawara"],
  ["sawara", "choshi"],
  ["funabashi", "funabashi_p1"],
  ["funabashi", "funabashi_p2"],
  ["funabashi", "funabashi_p3"],
  ["funabashi", "funabashi_p4"],
  ["ichikawa", "ichikawa_p1"],
  ["ichikawa", "ichikawa_p2"],
  ["ichikawa", "ichikawa_p3"],

  // ■ 京葉線（湾岸ルート）
  ["urayasu", "makuhari"],
  ["makuhari", "chidori"],
  ["chidori", "soga"],
  ["urayasu", "urayasu_p1"],
  ["urayasu", "urayasu_p2"],
  ["chiba", "chiba_p1"],
  ["chiba", "chiba_p2"],
  ["chiba", "chiba_p3"],
  ["makuhari", "chiba_p2"],
  ["soga", "ichihara_p1"],
  ["soga", "ichihara_p2"],

  // ■ 常磐線（北西ルート）
  ["matsudo", "kashiwa"],
  ["kashiwa", "abiko"],
  ["matsudo", "matsudo_p1"],
  ["matsudo", "matsudo_p2"],
  ["matsudo", "matsudo_p3"],
  ["kashiwa", "kashiwa_p1"],
  ["kashiwa", "kashiwa_p2"],
  ["kashiwa", "kashiwa_p3"],
  ["abiko", "abiko_p1"],
  ["abiko", "abiko_p2"],

  // ■ 東武野田線
  ["kashiwa", "nagareyama"],
  ["nagareyama", "noda"],
  ["nagareyama", "nagareyama_p1"],
  ["nagareyama", "nagareyama_p2"],
  ["noda", "noda_p1"],
  ["noda", "noda_p2"],

  // ■ 成田線・総武本線（北東ルート）
  ["sakura", "shisui"],
  ["shisui", "narita"],
  ["narita", "narita_p1"],
  ["narita", "narita_p2"],
  ["sakura", "sakura_p1"],
  ["sakura", "sakura_p2"],
  ["sakura", "yachimata"],
  ["yachimata", "naruto"],
  ["naruto", "yokoshiba"],
  ["yokoshiba", "asahi"],
  ["asahi", "choshi"],
  ["naruto", "naruto_p1"],
  ["naruto", "naruto_p2"],
  ["asahi", "asahi_p1"],
  ["asahi", "asahi_p2"],
  ["choshi", "choshi_p1"],
  ["choshi", "choshi_p2"],
  ["sawara", "sawara_p1"],
  ["sawara", "sawara_p2"],
  ["sawara", "katori"],
  ["katori", "katori_p1"],

  // ■ 内房線（南西ルート）
  ["soga", "sodegaura"],
  ["sodegaura", "kisarazu"],
  ["kisarazu", "kimitsu"],
  ["kimitsu", "tateyama"],
  ["tateyama", "minamiboso"],
  ["sodegaura", "sodegaura_p1"],
  ["sodegaura", "sodegaura_p2"],
  ["kisarazu", "kisarazu_p1"],
  ["kisarazu", "kisarazu_p2"],
  ["kimitsu", "kimitsu_p1"],
  ["kimitsu", "kimitsu_p2"],
  ["tateyama", "tateyama_p1"],
  ["tateyama", "tateyama_p2"],
  ["tateyama", "tateyama_p3"],
  ["minamiboso", "minamiboso_p1"],
  ["minamiboso", "minamiboso_p2"],

  // ■ 外房線（南東ルート）
  ["chiba", "ichihara"],
  ["ichihara", "mobara"],
  ["mobara", "ohara"],
  ["ohara", "katsuura"],
  ["katsuura", "kamogawa"],
  ["ichihara", "ichihara_p3"],
  ["ichihara", "ichihara_p4"],
  ["mobara", "mobara_p1"],
  ["mobara", "mobara_p2"],
  ["mobara", "ichinomiya"],
  ["ichinomiya", "ichinomiya_p1"],
  ["ohara", "ohara_p1"],
  ["ohara", "ohara_p2"],
  ["ohara", "isumi"],
  ["isumi", "isumi_p1"],
  ["isumi", "isumi_p2"],
  ["katsuura", "katsuura_p1"],
  ["katsuura", "katsuura_p2"],
  ["kamogawa", "kamogawa_p1"],
  ["kamogawa", "kamogawa_p2"],
  ["kamogawa", "kamogawa_p3"],

  // ==========================================
  // --- 【京成電鉄ルート（カスタム）】 ---
  // ==========================================
  ["funabashi", "keisei_tsudanuma"],
  ["keisei_tsudanuma", "keisei_okubo"], // ひつじん
  ["keisei_okubo", "yachiyodai"],
  ["yachiyodai", "keisei_owada"],       // 田中邸前
  ["keisei_owada", "sakura"],           // 京成佐倉（佐倉でJRと合流）
  ["sakura", "narita"],                 // 京成成田（成田でJRと合流）

  // ==========================================
  // --- 【交差・ショートカット網（四方八方接続）】 ---
  // ==========================================
  // 1. 千鳥（京葉線×京成線・湾岸線）
  ["chidori", "funabashi_p1"], ["chidori", "urayasu_p2"],
  
  // 2. 五香（常磐線×京成線）
  ["goko", "matsudo"], ["goko", "funabashi_p4"], ["goko", "keisei_tsudanuma"],
  
  // 3. 四街道（総武線×外房線）
  ["yotsukaido", "chiba_p3"], ["yotsukaido", "ichihara_p1"],

  // 4. 印西・白井ルート（北総線エリアの交差）
  ["kashiwa_p1", "shiroi"], ["shiroi", "inzai"], ["inzai", "tomisato"], ["inzai", "sakura"],
  
  // 5. 内陸横断（圏央道方面）
  ["ichihara_p4", "yachimata"],
  ["sodegaura_p2", "ichihara_p2"],
  ["kimitsu_p2", "kamogawa_p2"],
  ["tateyama_p3", "kimitsu_p2"],
  ["mobara_p1", "isumi_p2"],
];