import type { QuizQuestion, ArchetypeProfile, Archetype } from '../types/quiz';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "When starting a new venture, what is your first instinct?",
    options: [
      {
        text: "Research deeply to understand the landscape and find meaning",
        archetype: 'sage',
        designPrinciple: 'Understanding precedes creation'
      },
      {
        text: "Disrupt the industry with something unprecedented",
        archetype: 'magician',
        designPrinciple: 'Transform the ordinary into extraordinary'
      },
      {
        text: "Take bold action and overcome any obstacle",
        archetype: 'hero',
        designPrinciple: 'Courage manifests in form'
      },
      {
        text: "Build solid foundations and establish clear systems",
        archetype: 'ruler',
        designPrinciple: 'Order creates clarity'
      }
    ]
  },
  {
    id: 2,
    question: "What drives your business vision?",
    options: [
      {
        text: "Discovering untapped opportunities and new possibilities",
        archetype: 'explorer',
        designPrinciple: 'Discovery reveals authenticity'
      },
      {
        text: "Creating authentic value through honest service",
        archetype: 'innocent',
        designPrinciple: 'Clarity emerges from simplicity'
      },
      {
        text: "Building something that lasts beyond your lifetime",
        archetype: 'creator',
        designPrinciple: 'Legacy lives in craft'
      },
      {
        text: "Establishing leadership and influence in your field",
        archetype: 'ruler',
        designPrinciple: 'Power speaks through refinement'
      }
    ]
  },
  {
    id: 3,
    question: "When facing a challenge in your business, what motivates you?",
    options: [
      {
        text: "Proving I can overcome what others find impossible",
        archetype: 'hero',
        designPrinciple: 'Obstacles forge mastery'
      },
      {
        text: "Finding the hidden wisdom within the difficulty",
        archetype: 'sage',
        designPrinciple: 'Limitation births innovation'
      },
      {
        text: "Transforming the problem into an unexpected opportunity",
        archetype: 'magician',
        designPrinciple: 'Impossibility is illusion'
      },
      {
        text: "Crafting an elegant solution that reflects excellence",
        archetype: 'creator',
        designPrinciple: 'Creation is sacred duty'
      }
    ]
  },
  {
    id: 4,
    question: "Which Arthurian symbol resonates most with your journey?",
    options: [
      {
        text: "The Round Table—collaboration and balanced leadership",
        archetype: 'ruler',
        designPrinciple: 'Harmony through proportion'
      },
      {
        text: "The Holy Grail—the endless quest for perfection",
        archetype: 'explorer',
        designPrinciple: 'Pursuit elevates craft'
      },
      {
        text: "Excalibur—power wielded with purpose and honor",
        archetype: 'hero',
        designPrinciple: 'Strength serves vision'
      },
      {
        text: "Merlin's wisdom—vision that transforms reality",
        archetype: 'magician',
        designPrinciple: 'Vision transcends technique'
      }
    ]
  },
  {
    id: 5,
    question: "How do you present your brand to the world?",
    options: [
      {
        text: "With deep understanding of what it truly represents",
        archetype: 'sage',
        designPrinciple: 'Knowledge informs intuition'
      },
      {
        text: "With honesty and transparency that builds trust",
        archetype: 'innocent',
        designPrinciple: 'Honesty creates trust'
      },
      {
        text: "With innovation that surprises and delights",
        archetype: 'magician',
        designPrinciple: 'Wonder lives in contrast'
      },
      {
        text: "With authority and consistent excellence",
        archetype: 'ruler',
        designPrinciple: 'Systems enable consistency'
      }
    ]
  },
  {
    id: 6,
    question: "What legacy do you hope to leave?",
    options: [
      {
        text: "Something that endures and inspires future generations",
        archetype: 'creator',
        designPrinciple: 'Excellence echoes eternally'
      },
      {
        text: "Wisdom and insights that help others succeed",
        archetype: 'sage',
        designPrinciple: 'Mastery is journey, not destination'
      },
      {
        text: "A spirit of adventure and courage to explore",
        archetype: 'explorer',
        designPrinciple: 'Growth requires exploration'
      },
      {
        text: "Proof that determination conquers all obstacles",
        archetype: 'hero',
        designPrinciple: 'Greatness demands sacrifice'
      }
    ]
  },
  {
    id: 7,
    question: "What brings you the deepest satisfaction in your work?",
    options: [
      {
        text: "Witnessing transformation and breakthrough moments",
        archetype: 'magician',
        designPrinciple: 'Impact transcends aesthetics'
      },
      {
        text: "Seeing your vision manifest into reality",
        archetype: 'creator',
        designPrinciple: 'Manifestation validates vision'
      },
      {
        text: "Knowing your work is genuine and trustworthy",
        archetype: 'innocent',
        designPrinciple: 'Simplicity achieves immortality'
      },
      {
        text: "Commanding respect and establishing influence",
        archetype: 'ruler',
        designPrinciple: 'Presence defines excellence'
      }
    ]
  }
];

export const archetypeProfiles: Record<Archetype, ArchetypeProfile> = {
  hero: {
    name: 'The Hero',
    title: 'The Courageous Champion',
    arthurian: 'Sir Lancelot—The Champion Knight',
    description: 'You approach your venture as a quest that demands courage and determination. Every challenge is an opportunity to prove your capability. Like Lancelot, you combine excellence with unwavering dedication, building a business that stands as testament to your resolve and vision.',
    designApproach: 'Your brand should be bold, purposeful, and uncompromising. It must command attention and inspire action, reflecting your strength and determination to overcome any obstacle.',
    strengths: [
      'Tackles impossible challenges with confidence',
      'Takes decisive action when others hesitate',
      'Perseveres through setbacks and adversity',
      'Inspires others with courageous leadership'
    ],
    quest: 'To build something that proves determination conquers all obstacles.'
  },
  sage: {
    name: 'The Sage',
    title: 'The Wisdom Keeper',
    arthurian: 'Merlin—The Counselor and Seer',
    description: 'You understand that great ventures emerge from deep knowledge. Like Merlin, you see patterns others miss and guide your business with insight born from study and contemplation. Your approach reflects the wisdom of understanding both your market and human nature.',
    designApproach: 'Your brand should be thoughtful, meaningful, and insightful. It must communicate depth and expertise, positioning you as a trusted authority who illuminates truth.',
    strengths: [
      'Uncovers deep insights about your industry',
      'Makes decisions backed by research and wisdom',
      'Guides others with thoughtful counsel',
      'Balances intuition with analytical thinking'
    ],
    quest: 'To illuminate truth and share wisdom that empowers others.'
  },
  magician: {
    name: 'The Magician',
    title: 'The Transformer of Reality',
    arthurian: 'Merlin—The Alchemist and Shape-shifter',
    description: 'You see business as alchemy—transforming the ordinary into the extraordinary. Like Merlin in his transformative aspect, you bend conventional thinking and create experiences that feel almost supernatural in their impact. You make people believe in possibility.',
    designApproach: 'Your brand should be experimental, unexpected, and transformative. It must surprise, delight, and fundamentally shift how people see your industry.',
    strengths: [
      'Invents innovative solutions to problems',
      'Creates memorable, transformative experiences',
      'Combines unexpected elements into powerful offerings',
      'Makes the complex feel effortless and magical'
    ],
    quest: 'To reveal that reality is more wondrous than we imagine through transformation.'
  },
  innocent: {
    name: 'The Innocent',
    title: 'The Purist',
    arthurian: 'Sir Galahad—The Pure Knight',
    description: 'You believe in the power of simplicity and honesty. Like Galahad, who achieved the Grail through purity of heart, you strip away the unnecessary to reveal essential truth. Your business possesses a clarity and directness that feels both refreshing and timeless.',
    designApproach: 'Your brand should be clean, honest, and optimistic. It must feel pure, accessible, and fundamentally trustworthy—a beacon of authenticity in a complex world.',
    strengths: [
      'Builds trust through transparency and honesty',
      'Communicates with clarity and directness',
      'Creates timeless value that endures',
      'Maintains integrity above all else'
    ],
    quest: 'To prove that simplicity is the ultimate sophistication and honesty creates lasting impact.'
  },
  explorer: {
    name: 'The Explorer',
    title: 'The Seeker of Horizons',
    arthurian: 'The Grail Knight—The Eternal Quester',
    description: 'You approach business as an endless journey of discovery. Like the knights who sought the Holy Grail, you are driven by the pursuit itself. Each venture is an expedition into unknown territory, and you find fulfillment in the search for new possibilities.',
    designApproach: 'Your brand should be adventurous, curious, and evolving. It must embrace experimentation and communicate that you are pioneering new frontiers.',
    strengths: [
      'Constantly evolves and adapts to change',
      'Discovers opportunities others overlook',
      'Creates authentic, pioneering ventures',
      'Embraces innovation as a way of life'
    ],
    quest: 'To discover what has never been found before and expand the boundaries of possibility.'
  },
  ruler: {
    name: 'The Ruler',
    title: 'The Master of Order',
    arthurian: 'King Arthur—The Architect of Kingdoms',
    description: 'You understand that great ventures require structure, hierarchy, and control. Like Arthur establishing Camelot, you create systems of order that command respect and endure through time. Your business possesses authority, refinement, and impeccable organization.',
    designApproach: 'Your brand should be systematic, refined, and authoritative. It must establish clear leadership and communicate power through elegance and consistency.',
    strengths: [
      'Builds robust systems and processes',
      'Commands authority and respect',
      'Establishes clear vision and hierarchy',
      'Creates scalable, sustainable enterprises'
    ],
    quest: 'To create order from chaos and establish systems that stand the test of time.'
  },
  creator: {
    name: 'The Creator',
    title: 'The Divine Craftsperson',
    arthurian: 'The Lady of the Lake—The Forger of Excalibur',
    description: 'You see your work as an act of creation that borders on the sacred. Like the Lady of the Lake forging Excalibur, you imbue your business with intention, craft, and care. What you build is not just functional—it is meant to endure and inspire.',
    designApproach: 'Your brand should be meticulous, intentional, and crafted. Every detail must receive attention, every element serves the whole, creating something that feels complete and inevitable.',
    strengths: [
      'Creates work of exceptional quality and craft',
      'Maintains unwavering attention to detail',
      'Builds something that feels destined',
      'Leaves a lasting legacy through excellence'
    ],
    quest: 'To create something so complete and refined it feels like it has always existed.'
  }
};
