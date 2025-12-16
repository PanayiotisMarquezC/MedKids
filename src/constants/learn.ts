// src/constants/learn.ts

export type FoodGroup = {
  name:
    | "Vegetables"
    | "Fruits"
    | "Legumes"
    | "Grains & cereals"
    | "Nuts & Seeds"
    | "Olive oil"
    | "Dairy"
    | "Fish"
    | "Eggs"
    | "Chicken"
    | "Red meat"
    | "Sweets"
    | "Chips"
    | "Soft drinks / Packaged juices";
  emoji: string;
  examples: string[];
  kidNote: string;
};

export type LearnLevel = {
  id: number;
  title: string;
  summary: string;
  hint?: string;
  groups: FoodGroup[];
};

/* ------------------------------------------------------------------ */
/* LEVEL 1 — EVERY DAY (Base – yellow)                                */
/* ------------------------------------------------------------------ */
const LEVEL_1: LearnLevel = {
  id: 1,
  title: "Level 1 — Every day (base)",
  summary: "Foods for daily energy and strong bones.",
  hint: "Choose whole grains when you can.",
  groups: [
    {
      name: "Grains & cereals",
      emoji: "🍞",
      examples: ["whole-grain bread", "pasta", "rice", "oats", "potatoes"],
      kidNote: "Grains give long-lasting energy for play."
    },
    {
      name: "Dairy",
      emoji: "🥛",
      examples: ["milk", "yogurt", "cheese", "halloumi"],
      kidNote: "Dairy helps build strong bones and teeth."
    },
    {
      name: "Nuts & Seeds",
      emoji: "🥜",
      examples: ["almonds", "walnuts", "sesame", "pumpkin seeds"],
      kidNote: "Tiny but mighty—great for brain and body."
    }
  ]
};

/* ------------------------------------------------------------------ */
/* LEVEL 2 — EVERY DAY (Green band)                                   */
/* ------------------------------------------------------------------ */
const LEVEL_2: LearnLevel = {
  id: 2,
  title: "Level 2 — Every day (greens & colors)",
  summary: "Fill half your plate with colors and healthy fats.",
  hint: "Add olive oil, olives or avocado to veggies.",
  groups: [
    {
      name: "Vegetables",
      emoji: "🥦",
      examples: ["tomato", "cucumber", "broccoli", "carrot", "leafy greens"],
      kidNote: "Veggies help your body stay strong and healthy."
    },
    {
      name: "Fruits",
      emoji: "🍎",
      examples: ["apple", "banana", "orange", "watermelon", "berries"],
      kidNote: "Fruits are juicy and give you vitamins."
    },
    {
      name: "Legumes",
      emoji: "🫘",
      examples: ["lentils", "beans", "chickpeas", "peas"],
      kidNote: "Legumes give ‘super energy’ for running and playing."
    },
    {
      name: "Olive oil",
      emoji: "🫒",
      examples: ["olive oil", "olives", "avocado"],
      kidNote: "A little healthy fat keeps hearts happy."
    }
  ]
};

/* ------------------------------------------------------------------ */
/* LEVEL 3 — 2–3 TIMES A WEEK (Blue band)                             */
/* ------------------------------------------------------------------ */
const LEVEL_3: LearnLevel = {
  id: 3,
  title: "Level 3 — 2–3 times a week",
  summary: "Mix different proteins during the week.",
  groups: [
    {
      name: "Fish",
      emoji: "🐟",
      examples: ["salmon", "sardines", "tuna", "shrimp"],
      kidNote: "Fish helps your brain and body work their best."
    },
    {
      name: "Eggs",
      emoji: "🥚",
      examples: ["boiled egg", "omelette", "scrambled"],
      kidNote: "Eggs help your muscles grow strong."
    },
    {
      name: "Chicken",
      emoji: "🍗",
      examples: ["grilled chicken", "chicken soup"],
      kidNote: "Chicken is a tasty protein to help you grow."
    }
  ]
};

/* ------------------------------------------------------------------ */
/* LEVEL 4 — 1–2 TIMES A MONTH (Top red band)                         */
/* ------------------------------------------------------------------ */
const LEVEL_4: LearnLevel = {
  id: 4,
  title: "Level 4 — 1–2 times a month",
  summary: "These are ‘sometimes’ foods and drinks.",
  hint: "Save for special times.",
  groups: [
    {
      name: "Sweets",
      emoji: "🍰",
      examples: ["cookies", "cake", "candy", "chocolate"],
      kidNote: "Fun sometimes—too much isn’t good for teeth."
    },
    {
      name: "Chips",
      emoji: "🍟",
      examples: ["crisps", "fries"],
      kidNote: "Crispy but salty—keep as a treat."
    },
    {
      name: "Soft drinks / Packaged juices",
      emoji: "🥤",
      examples: ["soda", "packaged juice"],
      kidNote: "Choose water most of the time."
    },
    {
      name: "Red meat",
      emoji: "🥩",
      examples: ["beef", "lamb", "pork", "processed meats (sausages, salami, burgers)"],
      kidNote: "Okay rarely—small portions, and not every week."
    }
  ]
};

export const LEVELS: LearnLevel[] = [LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4];

export function getGroupByName(name: FoodGroup["name"]): FoodGroup | undefined {
  for (const lvl of LEVELS) {
    const g = lvl.groups.find(x => x.name === name);
    if (g) return g;
  }
  return undefined;
}
