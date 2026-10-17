// ========================================
// cpu.js - 千葉ワクワク紀行 CPU AI
// ========================================

const CPU_NAMES = {
  1: "観光客",
  2: "地元の常連",
  3: "千葉マスター",
};

const CPU_ICONS = {
  1: "🧑‍🌾",
  2: "🧑‍💼",
  3: "🧑‍🚀",
};

// ===== カード使用判断 =====
function cpuChooseCard() {
  const p = player;
  if (p.cards.length === 0) return -1;
  const level = p.cpuLevel;

  const usable = [];
  for (let i = 0; i < p.cards.length; i++) {
    const c = CARDS[p.cards[i]];
    if (c) usable.push({ idx: i, card: c });
  }
  if (usable.length === 0) return -1;

  const dist = shortestDistance(p.pos, GOAL_ID);

  if (level === 1) {
    // 観光客: 移動系・ワープ系を時々使う
    const moveCards = usable.filter(u =>
      u.card.cat === "move" || u.card.cat === "warp");
    if (moveCards.length > 0 && Math.random() < 0.30) {
      return moveCards[Math.floor(Math.random() * moveCards.length)].idx;
    }
    return -1;
  }

  if (level === 2) {
    // 地元の常連: 移動系・ワープ系は積極的、お邪魔系も時々
    const moveCards = usable.filter(u =>
      u.card.cat === "move" || u.card.cat === "warp");
    if (moveCards.length > 0 && (dist > 10 || Math.random() < 0.7)) {
      return moveCards[Math.floor(Math.random() * moveCards.length)].idx;
    }
    const jamaCards = usable.filter(u => u.card.cat === "jama");
    if (jamaCards.length > 0 && Math.random() < 0.25) {
      return jamaCards[Math.floor(Math.random() * jamaCards.length)].idx;
    }
    return -1;
  }

  if (level === 3) {
    // 千葉マスター: 全カードを評価
    if (dist <= 20) {
      const bigMove = usable.filter(u =>
        u.card.cat === "move" &&
        (u.card.name.includes("ダッシュ") || u.card.name.includes("スペーシア") ||
         u.card.name === "しらこばと"));
      if (bigMove.length > 0) {
        return bigMove[0].idx;
      }
      const anyMove = usable.filter(u => u.card.cat === "move");
      if (anyMove.length > 0 && Math.random() < 0.8) {
        return anyMove[0].idx;
      }
    } else {
      const moveCards = usable.filter(u =>
        ["move","warp"].includes(u.card.cat));
      if (moveCards.length > 0 && Math.random() < 0.7) {
        return moveCards[Math.floor(Math.random() * moveCards.length)].idx;
      }
      const others = usable.filter(u =>
        ["util","money","jama"].includes(u.card.cat));
      if (others.length > 0 && Math.random() < 0.4) {
        return others[Math.floor(Math.random() * others.length)].idx;
      }
    }
    return -1;
  }
  return -1;
}

// ===== 移動先の選択 =====
function cpuChooseTarget(reachable) {
  const p = player;
  const level = p.cpuLevel;
  const candidates = [];
  for (const [id, info] of reachable) {
    if (id === p.pos) continue;
    candidates.push({ id, dist: info.dist });
  }
  if (candidates.length === 0) return p.pos;

  for (const c of candidates) {
    c.goalDist = shortestDistance(c.id, GOAL_ID);
  }

  if (level === 1) {
    if (Math.random() < 0.5) {
      return candidates[Math.floor(Math.random() * candidates.length)].id;
    }
  } else if (level === 2) {
    if (Math.random() < 0.2) {
      return candidates[Math.floor(Math.random() * candidates.length)].id;
    }
  }

  candidates.sort((a, b) => a.goalDist - b.goalDist);
  return candidates[0].id;
}

// ===== CPU ターン進行 =====
function cpuTakeTurn() {
  if (!player.isCPU || !turnInProgress) return;

  const cardIdx = cpuChooseCard();
  if (cardIdx >= 0) {
    log("🤖 " + player.name + " がカードを使います");
    useCardByIndex(cardIdx);
    return;
  }

  setTimeout(() => {
    if (!turnInProgress) return;
    cpuRollDice();
  }, 400);
}

function cpuRollDice() {
  if (!player || !player.isCPU) return;
  if (!turnInProgress) return;
  if (!canRoll) return;

  canUseCard = false;
  canRoll = false;

  let count = thisTurn.diceCount;
  if (player.buffs.nonbiri > 0) {
    count = 1;
  }

  animateDiceRoll(count, (results) => {
    let total = 0;
    for (const r of results) total += r;
    log("🎲 " + player.name + ": " +
        (results.length > 1 ? results.join("+") + "=" : "") + total + " マス");
    remainingSteps = total;
    isMoving = true;
    turnPath = [player.pos];
    updateHUD();
    showMoveTargets();
  });
}