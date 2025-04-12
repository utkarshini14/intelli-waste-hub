import React, { useState, useEffect } from 'react';
import { Trophy, RefreshCw, Trash, Recycle, Info, Check, X } from 'lucide-react';

interface WasteItem {
  id: number;
  name: string;
  image: string;
  type: 'recyclable' | 'non-recyclable';
  info: string;
}

const wasteItems: WasteItem[] = [
  {
    id: 1,
    name: 'Plastic Bottle',
    image: 'https://placehold.co/200x200/e2e8f0/1e293b?text=Plastic+Bottle',
    type: 'recyclable',
    info: 'Rinse before recycling. Remove cap and place both in recycling bin.'
  },
  {
    id: 2,
    name: 'Banana Peel',
    image: 'https://placehold.co/200x200/e2e8f0/1e293b?text=Banana+Peel',
    type: 'non-recyclable',
    info: 'Compostable item. Place in compost or general waste.'
  },
  {
    id: 3,
    name: 'Glass Jar',
    image: 'https://placehold.co/200x200/e2e8f0/1e293b?text=Glass+Jar',
    type: 'recyclable',
    info: 'Remove lid and rinse before recycling.'
  },
  {
    id: 4,
    name: 'Used Tissue',
    image: 'https://placehold.co/200x200/e2e8f0/1e293b?text=Used+Tissue',
    type: 'non-recyclable',
    info: 'Cannot be recycled due to contamination. Dispose in general waste.'
  },
  {
    id: 5,
    name: 'Aluminum Can',
    image: 'https://placehold.co/200x200/e2e8f0/1e293b?text=Aluminum+Can',
    type: 'recyclable',
    info: 'Rinse and crush (optional) before recycling.'
  },
  {
    id: 6,
    name: 'Styrofoam Cup',
    image: 'https://placehold.co/200x200/e2e8f0/1e293b?text=Styrofoam+Cup',
    type: 'non-recyclable',
    info: 'Not recyclable in most programs. Check local facilities.'
  },
  {
    id: 7,
    name: 'Cardboard Box',
    image: 'https://placehold.co/200x200/e2e8f0/1e293b?text=Cardboard+Box',
    type: 'recyclable',
    info: 'Flatten before recycling. Remove tape and plastic elements.'
  },
  {
    id: 8,
    name: 'Broken Ceramic Plate',
    image: 'https://placehold.co/200x200/e2e8f0/1e293b?text=Ceramic+Plate',
    type: 'non-recyclable',
    info: 'Ceramics contaminate glass recycling. Dispose in general waste.'
  },
];

const WasteGame: React.FC = () => {
  const [currentItem, setCurrentItem] = useState<WasteItem | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [round, setRound] = useState(1);
  const [maxRounds] = useState(8);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedItems, setUsedItems] = useState<number[]>([]);
  const [showInfo, setShowInfo] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameActive, setGameActive] = useState(false);
  
  useEffect(() => {
    if (gameActive && !gameOver) {
      pickRandomItem();
    }
  }, [gameActive, gameOver]);
  
  useEffect(() => {
    if (!gameActive || gameOver || showFeedback) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAnswer('timeout');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameActive, gameOver, showFeedback]);
  
  const pickRandomItem = () => {
    if (usedItems.length >= wasteItems.length) {
      endGame();
      return;
    }
    
    const availableItems = wasteItems.filter(item => !usedItems.includes(item.id));
    const randomItem = availableItems[Math.floor(Math.random() * availableItems.length)];
    
    setCurrentItem(randomItem);
    setTimeLeft(15);
    setShowFeedback(false);
    setShowInfo(false);
  };
  
  const handleAnswer = (answer: 'recyclable' | 'non-recyclable' | 'timeout') => {
    if (!currentItem) return;
    
    let correct = false;
    
    if (answer === 'timeout') {
      correct = false;
    } else {
      correct = answer === currentItem.type;
    }
    
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 10);
    }
    
    setShowFeedback(true);
    setUsedItems(prev => [...prev, currentItem.id]);
    
    setTimeout(() => {
      if (round >= maxRounds) {
        endGame();
      } else {
        setRound(prev => prev + 1);
        pickRandomItem();
      }
    }, 2000);
  };
  
  const endGame = () => {
    setGameOver(true);
  };
  
  const startNewGame = () => {
    setScore(0);
    setRound(1);
    setGameOver(false);
    setUsedItems([]);
    setShowFeedback(false);
    setGameActive(true);
  };
  
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto p-6 rounded-xl bg-white shadow-glass-sm border border-intelliwaste-gray-medium">
      {!gameActive ? (
        <div className="text-center py-8">
          <div className="mb-6 w-20 h-20 rounded-full bg-intelliwaste-blue/10 flex items-center justify-center mx-auto">
            <Trophy size={40} className="text-intelliwaste-blue" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Waste Sorting Challenge</h2>
          <p className="text-intelliwaste-gray-dark mb-6 max-w-md mx-auto">
            Test your waste management knowledge! Sort items correctly and earn points.
          </p>
          <button
            onClick={startNewGame}
            className="px-6 py-3 bg-intelliwaste-blue text-white rounded-lg font-medium shadow-sm hover:bg-intelliwaste-blue-dark transition-colors"
          >
            Start Game
          </button>
        </div>
      ) : gameOver ? (
        <div className="text-center py-8">
          <div className="mb-6 w-20 h-20 rounded-full bg-intelliwaste-yellow/20 flex items-center justify-center mx-auto">
            <Trophy size={40} className="text-intelliwaste-yellow" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
          <p className="text-2xl font-semibold mb-6">Your Score: {score}/{maxRounds * 10}</p>
          
          <div className="mb-8 p-4 rounded-lg bg-intelliwaste-gray/50 max-w-md mx-auto">
            <p className="text-intelliwaste-gray-dark">
              {score === maxRounds * 10 
                ? "Perfect score! You're a waste sorting expert!" 
                : score >= (maxRounds * 10) / 2 
                  ? "Good job! You know your recyclables well."
                  : "Keep learning about waste management. You'll improve!"}
            </p>
          </div>
          
          <button
            onClick={startNewGame}
            className="px-6 py-3 bg-intelliwaste-blue text-white rounded-lg font-medium shadow-sm hover:bg-intelliwaste-blue-dark transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={18} />
            Play Again
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm font-medium text-intelliwaste-gray-dark">
              Round: {round}/{maxRounds}
            </div>
            <div className="px-4 py-1 rounded-full bg-intelliwaste-gray">
              <span className="font-medium">Score: {score}</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              timeLeft <= 5 ? 'bg-intelliwaste-red/10 text-intelliwaste-red' : 'bg-intelliwaste-gray'
            }`}>
              {timeLeft}s
            </div>
          </div>
          
          {currentItem && (
            <div className="mb-6">
              <div className="relative">
                <img
                  src={currentItem.image}
                  alt={currentItem.name}
                  className="w-full h-64 object-cover rounded-lg shadow-sm"
                />
                
                <button
                  onClick={toggleInfo}
                  className="absolute top-2 right-2 p-2 rounded-full bg-white/80 text-intelliwaste-gray-dark hover:bg-white transition-all"
                >
                  <Info size={18} />
                </button>
                
                {showInfo && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/70 text-white rounded-b-lg backdrop-blur-sm">
                    <p>{currentItem.info}</p>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-semibold text-center mt-4">{currentItem.name}</h3>
              
              {showFeedback ? (
                <div className={`mt-4 p-4 rounded-lg ${
                  isCorrect ? 'bg-intelliwaste-green/10 border border-intelliwaste-green/20' : 'bg-intelliwaste-red/10 border border-intelliwaste-red/20'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCorrect ? 'bg-intelliwaste-green' : 'bg-intelliwaste-red'
                    } text-white`}>
                      {isCorrect ? <Check size={20} /> : <X size={20} />}
                    </div>
                    <div>
                      <p className="font-medium">
                        {isCorrect ? 'Correct!' : 'Incorrect!'}
                      </p>
                      <p className="text-sm text-intelliwaste-gray-dark">
                        {currentItem.name} is {currentItem.type}.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleAnswer('recyclable')}
                    className="py-3 px-4 rounded-lg bg-intelliwaste-blue text-white font-medium flex items-center justify-center gap-2 hover:bg-intelliwaste-blue-dark transition-colors"
                  >
                    <Recycle size={20} />
                    Recyclable
                  </button>
                  <button
                    onClick={() => handleAnswer('non-recyclable')}
                    className="py-3 px-4 rounded-lg bg-intelliwaste-gray-dark text-white font-medium flex items-center justify-center gap-2 hover:bg-black/70 transition-colors"
                  >
                    <Trash size={20} />
                    Non-Recyclable
                  </button>
                </div>
              )}
            </div>
          )}
          
          <div className="text-center text-sm text-intelliwaste-gray-dark">
            Drag the item to the correct bin or tap/click the bin
          </div>
        </div>
      )}
    </div>
  );
};

export default WasteGame;
