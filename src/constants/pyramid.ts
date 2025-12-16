export type Level = { title: string; color: string; frequency: string; items: string[] };

export const LEVELS: Level[] = [
  {
    title: 'Level 1 — Grains, Dairy, Nuts & Olive Oil',
    color: '#FFE27A',
    frequency: 'Every Day',
    items: [
      '🍞 Whole-grain bread, rice, pasta, oatmeal',
      '🥜 Nuts & seeds (almonds, peanuts, pistachios)',
      '🧀 Milk, yogurt, cheese (incl. halloumi)',
      '🫒 Olive oil'
    ]
  },
  {
    title: 'Level 2 — Fruits & Veggies',
    color: '#9BE564',
    frequency: 'Every Day',
    items: [
      '🍎 Fruits (apples, oranges, bananas, pears, strawberries, cherries, grapes)',
      '🥕 Veggies (carrot, cucumber, lettuce, corn, broccoli, tomato)',
      '🫘 Legumes (beans, chickpeas, lentils)'
    ]
  },
  {
    title: 'Level 3 — Fish & Poultry',
    color: '#8CC7FF',
    frequency: '2–3 times per week',
    items: [
      '🐟 Fish (sea bream, sea bass, squid, octopus, salmon, cod)',
      '🥚 Eggs',
      '🐔 Chicken / duck'
    ]
  },
  {
    title: 'Level 4 — Treats & Red Meat',
    color: '#FF9AA2',
    frequency: 'A little — weekly or monthly',
    items: [
      '🥩 Red meat (beef, pork, lamb)',
      '🧈 Butter',
      '🍭 Sweets & chips, soft drinks & packaged juices'
    ]
  }
];

export const LEVEL_COUNT = LEVELS.length;
