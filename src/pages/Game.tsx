
import React from 'react';
import Layout from '../components/Layout';
import WasteGame from '../components/game/WasteGame';
import { GameController, Trophy, Book } from 'lucide-react';

const Game = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 rounded-full bg-intelliwaste-yellow/10 text-intelliwaste-yellow text-sm font-medium mb-4">
              Educational Game
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Test Your Waste Sorting Knowledge
            </h1>
            <p className="text-intelliwaste-gray-dark max-w-2xl mx-auto">
              Learn to correctly identify recyclable and non-recyclable items through our interactive game.
            </p>
          </div>
          
          {/* Game component */}
          <WasteGame />
          
          {/* Benefits section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Benefits of Learning Proper Waste Sorting
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-white border border-intelliwaste-gray-medium shadow-glass-sm text-center">
                <div className="w-16 h-16 rounded-full bg-intelliwaste-yellow/10 flex items-center justify-center text-intelliwaste-yellow mx-auto mb-4">
                  <Trophy size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Reduce Contamination</h3>
                <p className="text-intelliwaste-gray-dark">
                  Proper sorting reduces contamination in recycling streams, leading to more efficient recycling processes.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white border border-intelliwaste-gray-medium shadow-glass-sm text-center">
                <div className="w-16 h-16 rounded-full bg-intelliwaste-yellow/10 flex items-center justify-center text-intelliwaste-yellow mx-auto mb-4">
                  <Book size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Environmental Impact</h3>
                <p className="text-intelliwaste-gray-dark">
                  Knowing how to sort waste properly helps divert materials from landfills and reduce your carbon footprint.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-white border border-intelliwaste-gray-medium shadow-glass-sm text-center">
                <div className="w-16 h-16 rounded-full bg-intelliwaste-yellow/10 flex items-center justify-center text-intelliwaste-yellow mx-auto mb-4">
                  <GameController size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Engaging Education</h3>
                <p className="text-intelliwaste-gray-dark">
                  Learning through interactive play makes complex waste management concepts more accessible and memorable.
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="mt-16 p-8 rounded-xl bg-intelliwaste-blue/10 border border-intelliwaste-blue/20 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Test Your Knowledge?</h2>
            <p className="text-intelliwaste-gray-dark mb-6 max-w-2xl mx-auto">
              Challenge yourself with our waste sorting game and see how much you know about proper waste management.
            </p>
            <a 
              href="#game"
              className="inline-block px-6 py-3 bg-intelliwaste-blue text-white rounded-lg font-medium shadow-md hover:bg-intelliwaste-blue-dark transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({
                  top: document.querySelector('#game')?.offsetTop || 0,
                  behavior: 'smooth'
                });
              }}
            >
              Play Now
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Game;
