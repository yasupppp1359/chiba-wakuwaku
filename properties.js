// ========================================
// properties.js - 千葉ワクワク紀行 物件システム
// ========================================

const PROP_TYPES = {
  farm:    { name:"農地",   icon:"🥜", rate:0.12, harvest:0.30, sellable:true },
  factory: { name:"工場",   icon:"🏭", rate:0.18, sellable:true },
  tourism: { name:"観光地", icon:"🏰", rate:0.25, sellable:true },
  fishing: { name:"漁港",   icon:"🐟", rate:0.15, sellable:true },
  ranch:   { name:"牧場",   icon:"🐄", rate:0.06, sellable:false },
  water:   { name:"水道局", icon:"🚰", rate:0.06, sellable:false },
  // カスタム用追加タイプ
  restaurant: { name:"飲食店", icon:"🍖", rate:0.15, sellable:true },
  clinic:     { name:"接骨院", icon:"🩺", rate:0.10, sellable:true },
  care:       { name:"デイサービス", icon:"🤝", rate:0.12, sellable:true },
  handyman:   { name:"便利屋", icon:"🔧", rate:0.14, sellable:true },
};

const PROP_PRICE = {
  farm:    { min:500,   max:3000 },
  factory: { min:2000,  max:10000 },
  tourism: { min:5000,  max:30000 },
  fishing: { min:3000,  max:15000 },
  ranch:   { min:5000,  max:5000 },
  water:   { min:5000,  max:5000 },
  // カスタム用価格帯
  restaurant: { min:2000, max:8000 },
  clinic:     { min:3000, max:10000 },
  care:       { min:3000, max:10000 },
  handyman:   { min:1000, max:5000 },
};

const REGION_MIX = {
  north:  [["farm",0.50],["factory",0.30],["tourism",0.10],["fishing",0.10]],
  east:   [["farm",0.30],["fishing",0.50],["tourism",0.20]],
  center: [["factory",0.50],["tourism",0.30],["farm",0.20]],
  west:   [["tourism",0.40],["factory",0.30],["farm",0.20],["fishing",0.10]],
  south:  [["fishing",0.40],["farm",0.30],["tourism",0.30]],
};

const SPECIAL_PROPS = {
  urayasu:  "tourism",
  choshi:   "fishing",
  katsuura: "fishing",
  ichihara: "factory",
  narita:   "tourism",
};

// === 【追加】特定の駅のカスタム物件名 ===
const CUSTOM_PROP_NAMES = {
  keisei_okubo: [
    "ジンギスカン屋", "ラム肉専門店", "ひつじカフェ", "羊肉焼肉店", 
    "ジンギスカン弁当", "羊羹本舗", "ひつじ牧場直売所", "羊毛工房"
  ],
  keisei_owada: [
    "田中接骨院", "田中デイサービス", "田中便利屋", "田中不動産", 
    "田中食堂", "田中薬局", "田中クリーニング", "田中理容室"
  ]
};
// ==============================================

const SELL_RATE = 0.7;

function pickWeighted(mix) {
  const r = Math.random();
  let cum = 0;
  for (const [type, w] of mix) {
    cum += w;
    if (r < cum) return type;
  }
  return mix[0][0];
}

const ALL_PROPS = [];

function generateProperties(stationIdToCellId) {
  let id = 0;
  for (const st of STATIONS) {
    if (st.kind !== "goal" && st.kind !== "prop") continue;

    let count = 5 + Math.floor(Math.random() * 4);
    const mix = REGION_MIX[st.region] || REGION_MIX.center;
    const special = SPECIAL_PROPS[st.id];
    const cellId = stationIdToCellId[st.id];
    
    const customNames = CUSTOM_PROP_NAMES[st.id];
    if (customNames) {
      count = customNames.length;
    }

    for (let i = 0; i < count; i++) {
      let type;
      if (special && i === 0) type = special;
      else type = pickWeighted(mix);

      let pName = st.name + "の" + PROP_TYPES[type].name;
      
      // カスタム名がある場合は上書き
      if (customNames) {
        pName = customNames[i];
        // 名前に合わせて物件タイプを推測
        if (pName.includes("接骨院")) type = "clinic";
        else if (pName.includes("デイサービス")) type = "care";
        else if (pName.includes("便利屋")) type = "handyman";
        else if (pName.includes("食堂") || pName.includes("カフェ") || pName.includes("焼肉") || pName.includes("ジンギスカン")) type = "restaurant";
        // それ以外はランダムのまま
      }

      const p = PROP_PRICE[type] || PROP_PRICE.factory; // フォールバック
      const price = (p.min + Math.floor(Math.random() * (p.max - p.min + 1))) * 10000;
      
      ALL_PROPS.push({
        id: id++,
        stationId: st.id,
        stationCellId: cellId,
        type: type,
        name: pName,
        price: price,
        owner: null,
      });
    }
  }
}

function getPropsAtStation(cellId) {
  return ALL_PROPS.filter(p => p.stationCellId === cellId);
}

function ownsAllStation(playerId, cellId) {
  const props = getPropsAtStation(cellId);
  if (props.length === 0) return false;
  return props.every(p => p.owner === playerId);
}

function buyProperty(propId) {
  const prop = ALL_PROPS.find(p => p.id === propId);
  if (!prop || prop.owner !== null) return false;
  if (player.money < prop.price) return false;
  player.money -= prop.price;
  prop.owner = player.id;
  return true;
}

function canSellProperty(prop) {
  return PROP_TYPES[prop.type].sellable;
}

function sellProperty(propId) {
  const prop = ALL_PROPS.find(p => p.id === propId);
  if (!prop) return false;
  if (prop.owner !== player.id) return false;
  if (!canSellProperty(prop)) return false;

  const sellPrice = Math.floor(prop.price * SELL_RATE);
  player.money += sellPrice;
  prop.owner = null;
  return sellPrice;
}

function getSellPrice(prop) {
  return Math.floor(prop.price * SELL_RATE);
}

function getPlayerProperties(p) {
  return ALL_PROPS.filter(x => x.owner === p.id);
}

function payPropertyIncome() {
  let total = 0;
  const byStation = {};

  for (const p of ALL_PROPS) {
    if (p.owner !== player.id) continue;
    if (!byStation[p.stationCellId]) byStation[p.stationCellId] = [];
    byStation[p.stationCellId].push(p);
  }

  for (const cellId in byStation) {
    const props = byStation[cellId];
    const allOwned = props.every(x => x.owner === player.id);

    for (const p of props) {
      const t = PROP_TYPES[p.type];
      let rate = t.rate;
      if (p.type === "farm" && Math.random() < 0.30) rate = t.harvest;

      let income = Math.floor(p.price * rate);
      if (allOwned) income *= 2;
      total += income;
    }
  }

  if (total > 0) {
    player.money += total;
    log("💰 ボーナス日！ " + player.name + " 物件収入 +" + ky(total));
  } else {
    log("💰 " + player.name + " ボーナス日（物件収入なし）");
  }
  return total;
}

function getInflationMultiplier() {
  const period = Math.floor((day - 1) / 10);
  const monthBonus = Math.pow(1.25, month - 1);
  return Math.pow(1.1, period) * monthBonus;
}