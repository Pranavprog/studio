export const motivationalMessages: string[] = [
  "Believe you can and you're halfway there.",
  "The secret to getting ahead is getting started.",
  "It’s not whether you get knocked down, it’s whether you get up.",
  "The expert in anything was once a beginner.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "Don't watch the clock; do what it does. Keep going.",
];

export type Resource = {
  title: string;
  url: string;
  type: 'video' | 'article' | 'book';
};

export const resources: Record<string, Resource[]> = {
  'Physics': [
    { title: 'Khan Academy - Physics', url: 'https://www.khanacademy.org/science/physics', type: 'video' },
    { title: 'The Feynman Lectures on Physics', url: 'https://www.feynmanlectures.caltech.edu/', type: 'book' },
    { title: 'HyperPhysics Concepts', url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/index.html', type: 'article' },
  ],
  'Mathematics': [
    { title: '3Blue1Brown YouTube Channel', url: 'https://www.youtube.com/c/3blue1brown', type: 'video' },
    { title: 'Paul\'s Online Math Notes', url: 'https://tutorial.math.lamar.edu/', type: 'article' },
    { title: 'Calculus by Michael Spivak', url: '#', type: 'book' },
  ],
  'Biology': [
    { title: 'CrashCourse Biology', url: 'https://www.youtube.com/playlist?list=PL3EED4C1D684D3ADF', type: 'video' },
    { title: 'Campbell Biology (Book)', url: '#', type: 'book' },
    { title: 'Nature - Scitable', url: 'https://www.nature.com/scitable/', type: 'article' },
  ],
  'History': [
    { title: 'CrashCourse World History', url: 'https://www.youtube.com/playlist?list=PLBDA2E52FB1EF80C9', type: 'video' },
    { title: 'History.com', url: 'https://www.history.com/', type: 'article' },
    { title: 'Sapiens: A Brief History of Humankind', url: '#', type: 'book' },
  ]
};

export type Question = {
  question: string;
  options: string[];
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
};

export type Quiz = {
  title: string;
  questions: Question[];
};

export const quizzes: Record<string, Quiz> = {
  'Physics': {
    title: 'Fundamental Physics Quiz',
    questions: [
      { question: "What is Newton's first law of motion?", options: ["F=ma", "Law of Inertia", "Action-Reaction", "Law of Gravitation"], answer: "Law of Inertia", difficulty: 'Easy' },
      { question: "What is the unit of electric charge?", options: ["Ampere", "Volt", "Coulomb", "Ohm"], answer: "Coulomb", difficulty: 'Easy' },
      { question: "Calculate the force on a 10kg object accelerating at 2 m/s².", options: ["5 N", "12 N", "20 N", "0.2 N"], answer: "20 N", difficulty: 'Medium' },
      { question: "Which of these is a vector quantity?", options: ["Speed", "Mass", "Time", "Velocity"], answer: "Velocity", difficulty: 'Easy' },
      { question: "What phenomenon is responsible for the colors in a rainbow?", options: ["Reflection", "Refraction", "Dispersion", "Diffraction"], answer: "Dispersion", difficulty: 'Medium' },
      { question: "What is the principle of superposition in wave mechanics?", options: ["Waves cancel out", "Waves add up linearly", "Waves diffract", "Waves reflect"], answer: "Waves add up linearly", difficulty: 'Hard' },
      { question: "What does the Schrödinger equation describe?", options: ["The motion of planets", "The flow of electricity", "The behavior of quantum systems", "The expansion of the universe"], answer: "The behavior of quantum systems", difficulty: 'Hard' },
      { question: "What is the difference between elastic and inelastic collisions?", options: ["Kinetic energy is conserved in elastic collisions", "Momentum is conserved in elastic collisions", "Kinetic energy is conserved in inelastic collisions", "Both conserve momentum and energy"], answer: "Kinetic energy is conserved in elastic collisions", difficulty: 'Medium' },
      { question: "What is the escape velocity from Earth?", options: ["9.8 m/s", "11.2 km/s", "100 km/s", "299,792 km/s"], answer: "11.2 km/s", difficulty: 'Hard' },
      { question: "Which particle is responsible for the electromagnetic force?", options: ["Gluon", "Photon", "W Boson", "Graviton"], answer: "Photon", difficulty: 'Medium' },
    ]
  },
  'Biology': {
    title: 'Core Biology Concepts',
    questions: [
      { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondrion", "Golgi apparatus"], answer: "Mitochondrion", difficulty: 'Easy' },
      { question: "What is the process by which plants make their own food?", options: ["Respiration", "Transpiration", "Photosynthesis", "Germination"], answer: "Photosynthesis", difficulty: 'Easy' },
      { question: "How many chromosomes are in a typical human cell?", options: ["23", "46", "48", "24"], answer: "46", difficulty: 'Medium' },
      { question: "Which of these is NOT a type of tissue?", options: ["Epithelial", "Connective", "Nervous", "Stomach"], answer: "Stomach", difficulty: 'Easy' },
      { question: "What does DNA stand for?", options: ["Deoxyribonucleic Acid", "Diribonucleic Acid", "Deoxyribogenetic Acid", "Denatured Nucleic Acid"], answer: "Deoxyribonucleic Acid", difficulty: 'Medium' },
      { question: "What is the main function of ribosomes?", options: ["Energy production", "Protein synthesis", "Waste disposal", "Lipid synthesis"], answer: "Protein synthesis", difficulty: 'Medium' },
      { question: "Which of the following is a part of the central nervous system?", options: ["Femoral nerve", "Spinal cord", "Sciatic nerve", "Cranial nerves"], answer: "Spinal cord", difficulty: 'Easy' },
      { question: "What is the name of the bond that links amino acids together?", options: ["Glycosidic bond", "Peptide bond", "Hydrogen bond", "Ionic bond"], answer: "Peptide bond", difficulty: 'Hard' },
      { question: "Meiosis results in the formation of which type of cells?", options: ["Somatic cells", "Diploid cells", "Haploid gametes", "Stem cells"], answer: "Haploid gametes", difficulty: 'Medium' },
      { question: "What is the role of the enzyme 'amylase'?", options: ["Breaks down proteins", "Breaks down fats", "Breacks down carbohydrates/starches", "Synthesizes DNA"], answer: "Breacks down carbohydrates/starches", difficulty: 'Hard' },
    ]
  },
  'History': {
    title: 'World History Highlights',
    questions: [
      { question: "In which year did World War I begin?", options: ["1914", "1918", "1939", "1905"], answer: "1914", difficulty: 'Easy' },
      { question: "Who was the first emperor of Rome?", options: ["Julius Caesar", "Nero", "Augustus", "Constantine"], answer: "Augustus", difficulty: 'Medium' },
      { question: "The Renaissance began in which country?", options: ["France", "Spain", "Italy", "England"], answer: "Italy", difficulty: 'Easy' },
      { question: "What was the primary cause of the American Revolution?", options: ["Slavery", "Taxation without representation", "Religious freedom", "Westward expansion"], answer: "Taxation without representation", difficulty: 'Medium' },
      { question: "Who led the Mongol Empire at its peak?", options: ["Genghis Khan", "Kublai Khan", "Attila the Hun", "Timur"], answer: "Genghis Khan", difficulty: 'Medium' },
      { question: "The Treaty of Versailles ended which major conflict?", options: ["World War I", "World War II", "Napoleonic Wars", "The Cold War"], answer: "World War I", difficulty: 'Medium' },
      { question: "Which ancient civilization built the pyramids at Giza?", options: ["Roman", "Greek", "Egyptian", "Mesopotamian"], answer: "Egyptian", difficulty: 'Easy' },
      { question: "Who wrote 'The Communist Manifesto'?", options: ["Vladimir Lenin", "Adam Smith", "Karl Marx and Friedrich Engels", "John Locke"], answer: "Karl Marx and Friedrich Engels", difficulty: 'Hard' },
      { question: "The 'Silk Road' was a trade route connecting which two regions?", options: ["Europe and Africa", "Asia and North America", "Europe and Asia", "South America and Africa"], answer: "Europe and Asia", difficulty: 'Medium' },
      { question: "What event triggered the start of World War II in Europe?", options: ["The bombing of Pearl Harbor", "The invasion of Poland", "The assassination of Archduke Franz Ferdinand", "The rise of Mussolini"], answer: "The invasion of Poland", difficulty: 'Hard' },
    ]
  }
};
