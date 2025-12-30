import { useState } from 'react';
import { quizQuestions, archetypeProfiles } from '../data/quizData';
import type { Archetype, QuizResult } from '../types/quiz';

export const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Archetype[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnswer = (archetype: Archetype, optionIndex: number) => {
    setSelectedOption(optionIndex);

    setTimeout(() => {
      const newAnswers = [...answers, archetype];
      setAnswers(newAnswers);

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResults(true);
      }
    }, 400);
  };

  const calculateResults = (): QuizResult => {
    const scores: Record<Archetype, number> = {
      hero: 0,
      sage: 0,
      magician: 0,
      innocent: 0,
      explorer: 0,
      ruler: 0,
      creator: 0
    };

    answers.forEach(archetype => {
      scores[archetype]++;
    });

    const sortedArchetypes = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([archetype]) => archetype as Archetype);

    return {
      primaryArchetype: sortedArchetypes[0],
      secondaryArchetype: sortedArchetypes[1],
      score: scores
    };
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setSelectedOption(null);
  };

  if (showResults) {
    const results = calculateResults();
    const primary = archetypeProfiles[results.primaryArchetype];
    const secondary = archetypeProfiles[results.secondaryArchetype];

    return (
      <div className="col-span-4 bg-[#5A3710] border-b border-[#362C28]">
        <div className="grid grid-cols-1 gap-0 border-t border-[#C9BEAD]">
          <div className="bg-[#362C28] p-8 md:p-16 border-b border-[#C9BEAD]">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-xs uppercase tracking-widest text-[#D4A574] mb-4">Your Creative Archetype</p>
              <h2 className="text-5xl md:text-7xl text-[#F7EED2] mb-4">{primary.name}</h2>
              <p className="text-xl md:text-2xl italic text-[#D4A574] mb-8">{primary.title}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-[#C9BEAD]">
            <div className="bg-[#F7EED2] p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#C9BEAD]">
              <p className="text-xs uppercase tracking-widest text-[#5A3710] mb-4">Arthurian Reflection</p>
              <h3 className="text-2xl md:text-3xl text-[#362C28] mb-6">{primary.arthurian}</h3>
              <p className="text-sm leading-relaxed text-[#362C28] mb-6">
                {primary.description}
              </p>
              <p className="text-xs uppercase tracking-wider text-[#5A3710] mb-3">Your Quest</p>
              <p className="text-sm italic text-[#5A3710] leading-relaxed">
                {primary.quest}
              </p>
            </div>

            <div className="bg-[#362C28] p-8 md:p-12">
              <p className="text-xs uppercase tracking-widest text-[#D4A574] mb-4">Design Approach</p>
              <p className="text-sm leading-relaxed text-[#F7EED2] mb-8">
                {primary.designApproach}
              </p>

              <p className="text-xs uppercase tracking-wider text-[#D4A574] mb-4">Core Strengths</p>
              <ul className="space-y-3">
                {primary.strengths.map((strength, index) => (
                  <li key={index} className="text-sm text-[#F7EED2] flex items-start">
                    <span className="text-[#D4A574] mr-2">•</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-[#5A3710] p-8 md:p-12 border-b border-[#C9BEAD]">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs uppercase tracking-widest text-[#D4A574] mb-4 text-center">Secondary Influence</p>
              <h3 className="text-2xl md:text-3xl text-[#F7EED2] mb-4 text-center">{secondary.name}</h3>
              <p className="text-sm leading-relaxed text-[#F7EED2] text-center opacity-90">
                Your work also carries echoes of <span className="text-[#D4A574]">{secondary.name}</span>—{secondary.arthurian.toLowerCase()}. This secondary influence enriches your primary archetype, adding depth and nuance to your creative approach.
              </p>
            </div>
          </div>

          <div className="bg-[#362C28] p-8 text-center border-b border-[#C9BEAD]">
            <button
              onClick={resetQuiz}
              className="px-8 py-4 bg-[#A92424] text-[#F7EED2] text-xs uppercase tracking-widest hover:bg-[#8B2B1B] transition-colors"
            >
              Retake the Quest
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="col-span-4 bg-[#5A3710] border-b border-[#362C28]">
      <div className="border-t border-[#C9BEAD]">
        <div className="bg-[#362C28] h-2">
          <div
            className="h-full bg-[#A92424] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-0">
        <div className="bg-[#362C28] p-8 md:p-16 border-b border-[#C9BEAD]">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-[#D4A574] mb-6 text-center">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </p>
            <h3 className="text-2xl md:text-4xl text-[#F7EED2] text-center leading-relaxed mb-8">
              {question.question}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.archetype, index)}
              className={`
                p-8 md:p-10 text-left transition-all duration-300
                border-b md:border-b-0 border-[#C9BEAD]
                ${index % 2 === 0 ? 'md:border-r' : ''}
                ${index < 2 ? 'md:border-b' : ''}
                ${selectedOption === index
                  ? 'bg-[#A92424] scale-[0.98]'
                  : 'bg-[#F7EED2] hover:bg-[#362C28] hover:text-[#F7EED2]'
                }
              `}
            >
              <p className={`
                text-base md:text-lg leading-relaxed transition-colors
                ${selectedOption === index ? 'text-[#F7EED2]' : ''}
              `}>
                {option.text}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
