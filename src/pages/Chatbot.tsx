
import React from 'react';
import Layout from '../components/Layout';
import ChatInterface from '../components/chatbot/ChatInterface';
import { MessageSquare, PenLine, Lightbulb } from 'lucide-react';

const Chatbot = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 rounded-full bg-intelliwaste-green/10 text-intelliwaste-green text-sm font-medium mb-4">
              Smart Assistant
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Your Personal Waste Management Expert
            </h1>
            <p className="text-intelliwaste-gray-dark max-w-2xl mx-auto">
              Get instant answers to your waste management questions, disposal guidance, and recycling tips.
            </p>
          </div>
          
          {/* Chat interface */}
          <ChatInterface />
          
          {/* Suggested questions */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Lightbulb size={20} className="text-intelliwaste-yellow" />
              Suggested Questions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <SuggestedQuestion question="How do I recycle batteries?" />
              <SuggestedQuestion question="Is pizza box recyclable?" />
              <SuggestedQuestion question="Where can I dispose of electronics?" />
              <SuggestedQuestion question="How to reduce household waste?" />
              <SuggestedQuestion question="What plastics can be recycled?" />
              <SuggestedQuestion question="How to start composting at home?" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const SuggestedQuestion = ({ question }: { question: string }) => {
  return (
    <a 
      href={`/chatbot?q=${encodeURIComponent(question)}`}
      className="p-4 rounded-lg border border-intelliwaste-gray-medium hover:border-intelliwaste-green/50 bg-white hover:bg-intelliwaste-green/5 flex items-center gap-3 transition-all hover-lift"
    >
      <PenLine size={18} className="text-intelliwaste-green" />
      <span>{question}</span>
    </a>
  );
};

export default Chatbot;
