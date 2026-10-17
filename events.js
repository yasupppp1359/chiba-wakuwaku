// ========================================
// events.js - 千葉ワクワク紀行 ランダムイベント
// ========================================

const EVENTS = [
  // ===== 良いイベント =====
  { name:"🎁 海ほたるで福引", run: (p) => {
      if (p.cards.length >= 10) {
        log("🎁 福引！ でも " + p.name + " の手札が一杯…");
        return;
      }
      const ids = Object.keys(CARDS);
      const cid = ids[Math.floor(Math.random() * ids.length)];
      p.cards.push(cid);
      log("🎁 " + p.name + " 福引で " + CARDS[cid].name + " を獲得！");
  }},
  { name:"🚴 房総フラワーライン", run: (p) => {
      const gain = (Math.floor(Math.random() * 5) + 3) * 1000000;
      p.money += gain;
      log("🚴 " + p.name + " 菜の花畑をサイクリングして爽快 +" + ky(gain));
  }},
  { name:"🍜 勝浦タンタンメン", run: (p) => {
      const gain = (Math.floor(Math.random() * 3) + 1) * 1000000;
      p.money += gain;
      log("🍜 " + p.name + " 名物タンタンメンで体力回復 +" + ky(gain));
  }},
  { name:"🥜 落花生の収穫", run: (p) => {
      const gain = (Math.floor(Math.random() * 10) + 5) * 1000000;
      p.money += gain;
      log("🥜 " + p.name + " 立派な落花生が採れました！ +" + ky(gain));
  }},
  { name:"📺 チバテレ取材", run: (p) => {
      const owned = ALL_PROPS.filter(x => x.owner === p.id);
      if (owned.length === 0) {
        log("📺 " + p.name + " テレビ取材（物件なし）");
        return;
      }
      const target = owned[Math.floor(Math.random() * owned.length)];
      target.price = Math.floor(target.price * 2);
      log("📺 " + p.name + " の " + target.name + " がチバテレで紹介され2倍に！");
  }},
  { name:"👑 千葉県知事表彰", run: (p) => {
      const owned = ALL_PROPS.filter(x => x.owner === p.id);
      const bonus = owned.length * 500000;
      if (bonus === 0) {
        log("👑 知事表彰（物件なし）");
        return;
      }
      p.money += bonus;
      log("👑 " + p.name + " 知事表彰 " + owned.length + "件 +" + ky(bonus));
  }},
  { name:"🌸 茂原桜まつり", run: (p) => {
      const tourism = ALL_PROPS.filter(x => x.owner === p.id && x.type === "tourism");
      if (tourism.length === 0) {
        log("🌸 桜まつり（観光地なし）");
        return;
      }
      const gain = tourism.reduce((s, x) => s + Math.floor(x.price * 0.2), 0);
      p.money += gain;
      log("🌸 " + p.name + " 桜まつり収入 +" + ky(gain));
  }},
  { name:"🏭 京葉工業地帯見学", run: (p) => {
      const factories = ALL_PROPS.filter(x => x.owner === p.id && x.type === "factory");
      if (factories.length === 0) {
        log("🏭 工場見学（工場なし）");
        return;
      }
      const gain = factories.reduce((s, x) => s + Math.floor(x.price * 0.1), 0);
      p.money += gain;
      log("🏭 " + p.name + " 工場見学 +" + ky(gain));
  }},

  // ===== 悪いイベント =====
  { name:"🚧 湾岸道路渋滞", run: (p) => {
      let cur = p.pos;
      for (let i = 0; i < 3; i++) {
        const parents = PARENTS[cur];
        if (parents.length === 0) break;
        cur = parents[Math.floor(Math.random() * parents.length)];
      }
      p.pos = cur;
      log("🚧 " + p.name + " 湾岸渋滞にはまり3マス戻される");
      drawAllPlayers();
      applyCamera();
  }},
  { name:"🍽 食べ過ぎ", run: (p) => {
      const loss = Math.floor(Math.abs(p.money) * 0.05);
      if (loss === 0) return;
      p.money -= loss;
      log("🍽 " + p.name + " 海鮮を食べ過ぎて −" + ky(loss));
  }},
  { name:"🌪 房総に台風上陸", run: (p) => {
      const farms = ALL_PROPS.filter(x => x.owner === p.id && x.type === "farm");
      if (farms.length === 0) {
        log("🌪 台風（農地なし）");
        return;
      }
      const loss = farms.reduce((s, x) => s + Math.floor(x.price * 0.1), 0);
      p.money -= loss;
      log("🌪 " + p.name + " 台風で農地被害 −" + ky(loss));
  }},
  { name:"🐗 イノシシ出没", run: (p) => {
      const loss = (Math.floor(Math.random() * 5) + 2) * 1000000;
      p.money -= loss;
      log("🐗 " + p.name + " イノシシに畑を荒らされた −" + ky(loss));
  }},
  { name:"🤧 花粉症発症", run: (p) => {
      if (p.buffs.sekubi > 0) return;
      p.buffs.sekubi = 1;
      log("🤧 " + p.name + " 花粉症で1ターン休み");
  }},
  { name:"🚕 京成線ストップ", run: (p) => {
      const stations = MAP.filter(c => c.type === CELL.STATION && c.id !== p.pos);
      if (stations.length === 0) return;
      const target = stations[Math.floor(Math.random() * stations.length)];
      p.pos = target.id;
      log("🚕 " + p.name + " 代行タクシーで " + target.name + " へ");
      drawAllPlayers();
      applyCamera();
  }},
  { name:"🐄 牧場から牛逃走", run: (p) => {
      const ranches = ALL_PROPS.filter(x => x.owner === p.id && x.type === "ranch");
      if (ranches.length === 0) {
        log("🐄 牛逃走（牧場なし）");
        return;
      }
      const loss = ranches.reduce((s, x) => s + Math.floor(x.price * 0.1), 0);
      p.money -= loss;
      log("🐄 " + p.name + " 牛が逃げた −" + ky(loss));
  }},
  { name:"🚗 アクアライン大渋滞", run: (p) => {
      const loss = (Math.floor(Math.random() * 8) + 3) * 1000000;
      p.money -= loss;
      log("🚗 " + p.name + " アクアラインで足止め −" + ky(loss));
  }},
  { name:"⛽ ガソリン代高騰", run: (p) => {
      const loss = (Math.floor(Math.random() * 3) + 1) * 1000000;
      p.money -= loss;
      log("⛽ " + p.name + " ガソリン代が高くて −" + ky(loss));
  }},

  // ===== 特殊イベント =====
  { name:"🎂 誕生日", run: (p) => {
      let total = 0;
      for (const other of players) {
        if (other === p) continue;
        const gift = Math.min(Math.max(other.money, 0), 1000000);
        if (gift > 0) {
          other.money -= gift;
          total += gift;
        }
      }
      p.money += total;
      if (total === 0) {
        log("🎂 " + p.name + " の誕生日（誰もお金なし）");
      } else {
        log("🎂 " + p.name + " の誕生日！ みんなから +" + ky(total));
      }
  }},
  { name:"📦 落とし物", run: (p) => {
      if (Math.random() < 0.5) {
        const gain = (Math.floor(Math.random() * 5) + 1) * 1000000;
        p.money += gain;
        log("📦 " + p.name + " 落とし物で +" + ky(gain));
      } else {
        if (p.cards.length < 10) {
          const ids = Object.keys(CARDS);
          const cid = ids[Math.floor(Math.random() * ids.length)];
          p.cards.push(cid);
          log("📦 " + p.name + " 落とし物で " + CARDS[cid].name + " を拾った！");
        } else {
          log("📦 落とし物（手札一杯）");
        }
      }
  }},
  { name:"🏪 船橋競馬で大穴", run: (p) => {
      const r = Math.random();
      if (r < 0.3) {
        const gain = 5000000;
        p.money += gain;
        log("🏪 " + p.name + " 競馬で大穴的中！ +" + ky(gain));
      } else if (r < 0.6) {
        const gain = 1000000;
        p.money += gain;
        log("🏪 " + p.name + " 競馬で的中 +" + ky(gain));
      } else {
        log("🏪 " + p.name + " 競馬でスッカラカン…");
      }
  }},
  { name:"🎓 千葉県民検定", run: (p) => {
      const r = Math.random();
      if (r < 0.5) {
        const gain = 3000000;
        p.money += gain;
        log("🎓 " + p.name + " 千葉県民検定合格！ +" + ky(gain));
      } else {
        log("🎓 " + p.name + " 千葉県民検定不合格…");
      }
  }},
];

// ===== イベント発動 =====
function triggerRandomEvent() {
  const ev = EVENTS[Math.floor(Math.random() * EVENTS.length)];
  log("✨ イベント発生！ " + ev.name);
  ev.run(player);
  updateHUD();
}