// src/i18n/strings.ts
export type Lang = "en" | "el";

export const STR = {
  en: {
    ui: {
      unlockNext: "I learned this! Unlock next →",
      examples: "Examples",
      learnTitle: "Mediterranean Food Pyramid",
      learnSubtitle: "Tap a level to learn with big text and icons.",
      watchVideo: "Watch Video",
      resetProgress: "Reset Progress",
      unlockedStatus: (n: number, total: number) => `Unlocked: ${n}/${total}`,
      lockedTitle: "Locked",
      lockedMsg: "Complete previous level to unlock this one.",
      greatJob: "Great job!",
      nextUnlocked: "Next level unlocked ✅",
      quizTitle: "Quiz Time",
      question: "Question",
      next: "Next",
      finish: "Finish",
      pickOne: "Pick one",
      highScore: "High score",
      resultsTitle: "Your Results",
      showAll: "Show all questions",
      showWrong: "Show only wrong",
      tryAgain: "Try again",
      resetHigh: "Reset high score",
      allCorrect: "All correct! 🎉",
      nothingToReview: "Great job—nothing to review.",
      tabLearn: "Learn",
      tabQuiz: "Quiz",
      tabGame: "Game",
    },
  },
  el: {
    ui: {
      unlockNext: "Το έμαθα! Ξεκλείδωσε το επόμενο →",
      examples: "Παραδείγματα",
      learnTitle: "Μεσογειακή Διατροφική Πυραμίδα",
      learnSubtitle: "Πάτησε ένα επίπεδο για να μάθεις με μεγάλες εικόνες και απλά λόγια.",
      watchVideo: "Παρακολούθηση βίντεο",
      resetProgress: "Μηδενισμός προόδου",
      unlockedStatus: (n: number, total: number) => `Ξεκλείδωτα: ${n}/${total}`,
      lockedTitle: "Κλειδωμένο",
      lockedMsg: "Ολοκλήρωσε το προηγούμενο επίπεδο για να ξεκλειδώσεις αυτό.",
      greatJob: "Μπράβο!",
      nextUnlocked: "Ξεκλείδωσες το επόμενο επίπεδο ✅",
      quizTitle: "Κουίζ",
      question: "Ερώτηση",
      next: "Επόμενο",
      finish: "Τέλος",
      pickOne: "Διάλεξε μία απάντηση",
      highScore: "Ρεκόρ",
      resultsTitle: "Αποτελέσματα",
      showAll: "Εμφάνιση όλων",
      showWrong: "Μόνο τα λάθη",
      tryAgain: "Ξαναδοκίμασε",
      resetHigh: "Μηδένισε το ρεκόρ",
      allCorrect: "Όλα σωστά! 🎉",
      nothingToReview: "Υπέροχα—δεν υπάρχει κάτι για επανάληψη.",
      tabLearn: "Μάθηση",
      tabQuiz: "Κουίζ",
      tabGame: "Παιχνίδι",
    },
  },
} as const;

// Canonical group name → Greek label
export const GROUP_GR: Record<string, string> = {
  "Vegetables": "Λαχανικά",
  "Fruits": "Φρούτα",
  "Legumes": "Όσπρια",
  "Grains & cereals": "Δημητριακά & Σιτηρά",
  "Nuts & Seeds": "Ξηροί καρποί & Σπόροι",
  "Olive oil": "Ελαιόλαδο",
  "Dairy": "Γαλακτοκομικά",
  "Fish": "Ψάρι",
  "Eggs": "Αυγά",
  "Chicken": "Κοτόπουλο",
  "Red meat": "Κόκκινο κρέας",
  "Sweets": "Γλυκά",
  "Chips": "Πατατάκια/Τηγανητές",
  "Soft drinks / Packaged juices": "Αναψυκτικά / Συσκευασμένοι χυμοί",
};

// Level text (override Learn constants when Greek is active)
export const LEVEL_TITLE_GR: Record<number, string> = {
  1: "Επίπεδο 1 — Καθημερινά (βάση)",
  2: "Επίπεδο 2 — Καθημερινά (πράσινη ζώνη)",
  3: "Επίπεδο 3 — 2–3 φορές την εβδομάδα",
  4: "Επίπεδο 4 — 1–2 φορές τον μήνα",
};

export const LEVEL_SUMMARY_GR: Record<number, string> = {
  1: "Τροφές για καθημερινή ενέργεια και γερά κόκαλα.",
  2: "Γέμισε το πιάτο με χρώματα και υγιεινά λιπαρά.",
  3: "Εναλλάσσουμε πρωτεΐνες μέσα στην εβδομάδα.",
  4: "Τροφές και ροφήματα «κάπου-κάπου».",
};

export const LEVEL_HINT_GR: Record<number, string> = {
  1: "Προτίμησε ολικής άλεσης όπου γίνεται.",
  2: "Πρόσθεσε ελαιόλαδο, ελιές ή αβοκάντο.",
  4: "Κράτα τα για ιδιαίτερες στιγμές.",
};

// Kid notes per group (Greek)
export const KID_NOTE_GR: Record<string, string> = {
  "Vegetables": "Τα λαχανικά βοηθούν το σώμα να μείνει δυνατό.",
  "Fruits": "Τα φρούτα είναι ζουμερά και δίνουν βιταμίνες.",
  "Legumes": "Τα όσπρια δίνουν «σούπερ» ενέργεια για παιχνίδι.",
  "Grains & cereals": "Τα δημητριακά δίνουν ενέργεια που κρατάει.",
  "Nuts & Seeds": "Μικρά αλλά δυνατά — για μυαλό και σώμα.",
  "Olive oil": "Λίγο ελαιόλαδο κάνει καλό στην καρδιά.",
  "Dairy": "Χτίζουν γερά κόκαλα και δόντια.",
  "Fish": "Βοηθά μυαλό και σώμα να δουλεύουν καλύτερα.",
  "Eggs": "Βοηθούν τους μύες να μεγαλώσουν.",
  "Chicken": "Νόστιμη πρωτεΐνη για να μεγαλώνεις.",
  "Red meat": "Κάπου-κάπου και σε μικρές ποσότητες.",
  "Sweets": "Διασκεδαστικά καμιά φορά — όχι πολλά για τα δόντια.",
  "Chips": "Τραγανά αλλά αλμυρά — κράτα τα για λιγάκι.",
  "Soft drinks / Packaged juices": "Διάλεξε νερό τις περισσότερες φορές.",
};

// Greek examples per canonical group
export const EXAMPLES_GR: Record<string, string[]> = {
  "Vegetables": ["ντομάτα", "αγγούρι", "μπρόκολο", "καρότο", "πράσινα φυλλώδη"],
  "Fruits": ["μήλο", "μπανάνα", "πορτοκάλι", "καρπούζι", "μούρα"],
  "Legumes": ["φακές", "φασόλια", "ρεβίθια", "αρακάς"],
  "Grains & cereals": ["ψωμί ολικής άλεσης", "ζυμαρικά", "ρύζι", "βρώμη", "πατάτες"],
  "Nuts & Seeds": ["αμύγδαλα", "καρύδια", "σουσάμι", "σπόροι κολοκύθας"],
  "Olive oil": ["ελαιόλαδο", "ελιές", "αβοκάντο"],
  "Dairy": ["γάλα", "γιαούρτι", "τυρί", "χαλλούμι"],
  "Fish": ["σολομός", "σαρδέλες", "τόνος", "γαρίδες"],
  "Eggs": ["βραστό αυγό", "ομελέτα", "αυγό στραπατσάδα"],
  "Chicken": ["ψητό κοτόπουλο", "κοτόσουπα"],
  "Red meat": ["μοσχάρι", "αρνί", "χοιρινό", "επεξεργασμένα κρέατα (λουκάνικα, σαλάμι, μπιφτέκι)"],
  "Sweets": ["μπισκότα", "κέικ", "καραμέλες", "σοκολάτα"],
  "Chips": ["πατατάκια", "τηγανητές πατάτες"],
  "Soft drinks / Packaged juices": ["αναψυκτικό", "συσκευασμένος χυμός"]
};
