// src/constants/quiz.ts
export type Q = {
  q: string;
  options: string[];
  correctIndex: number;
  // Optional Greek fields (used when lang === "el")
  q_el?: string;
  options_el?: string[];
};

export const QUIZ: Q[] = [
  {
    q: "Which levels are 'Every Day' foods?",
    options: ["Level 1 & 2", "Level 3 only", "Level 4 only"],
    correctIndex: 0,
    q_el: "Ποια επίπεδα είναι «Καθημερινά» τρόφιμα;",
    options_el: ["Επίπεδο 1 & 2", "Μόνο Επίπεδο 3", "Μόνο Επίπεδο 4"],
  },
  {
    q: "Fish belongs to which level?",
    options: ["Level 3", "Level 2", "Level 4"],
    correctIndex: 0,
    q_el: "Το ψάρι ανήκει σε ποιο επίπεδο;",
    options_el: ["Επίπεδο 3", "Επίπεδο 2", "Επίπεδο 4"],
  },
  {
    q: "Sweets and soft drinks belong to…",
    options: ["Level 1", "Level 4", "Level 2"],
    correctIndex: 1,
    q_el: "Τα γλυκά και τα αναψυκτικά ανήκουν…",
    options_el: ["Στο Επίπεδο 1", "Στο Επίπεδο 4", "Στο Επίπεδο 2"],
  },
  {
    q: "Fruits & Veggies are eaten…",
    options: ["Once a month", "Every day", "Never"],
    correctIndex: 1,
    q_el: "Φρούτα & λαχανικά τα τρώμε…",
    options_el: ["Μία φορά τον μήνα", "Κάθε μέρα", "Ποτέ"],
  },
  {
    q: "Olive oil is part of…",
    options: ["Level 2", "Level 3", "Level 4"],
    correctIndex: 0,
    q_el: "Το ελαιόλαδο είναι μέρος…",
    options_el: ["του Επιπέδου 2", "του Επιπέδου 3", "του Επιπέδου 4"],
  },
  {
    q: "How often should red meat be eaten?",
    options: ["Every day", "A little — weekly or monthly", "2–3 times per week"],
    correctIndex: 1,
    q_el: "Κόκκινο κρέας: πόσο συχνά;",
    options_el: ["Κάθε μέρα", "Λίγο — εβδομαδιαία ή μηνιαία", "2–3 φορές την εβδομάδα"],
  },
  {
    q: "Which of these is a legume?",
    options: ["Chickpeas", "Salmon", "Chicken"],
    correctIndex: 0,
    q_el: "Ποιο από αυτά είναι όσπριο;",
    options_el: ["Ρεβίθια", "Σολομός", "Κοτόπουλο"],
  },
  {
    q: "Eggs belong to…",
    options: ["Level 3", "Level 4", "Level 1"],
    correctIndex: 0,
    q_el: "Τα αυγά ανήκουν…",
    options_el: ["Στο Επίπεδο 3", "Στο Επίπεδο 4", "Στο Επίπεδο 1"],
  },
  {
    q: "Which of these is a whole grain?",
    options: ["Oatmeal", "Ice cream", "Chips"],
    correctIndex: 0,
    q_el: "Ποιο από αυτά είναι ολικής άλεσης δημητριακό;",
    options_el: ["Βρώμη (κουάκερ)", "Παγωτό", "Πατατάκια"],
  },
  {
    q: "Dairy foods on Level 1 include…",
    options: ["Yogurt and cheese", "Soda and candy", "Fried chicken"],
    correctIndex: 0,
    q_el: "Στο Επίπεδο 1 τα γαλακτοκομικά περιλαμβάνουν…",
    options_el: ["Γιαούρτι και τυρί", "Αναψυκτικό και καραμέλες", "Τηγανητό κοτόπουλο"],
  },
];
