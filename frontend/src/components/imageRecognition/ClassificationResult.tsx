
import React from 'react';
import { Check, X, Trash, Recycle } from 'lucide-react';

type WasteType = 'recyclable' | 'non-recyclable' | null;

interface ClassificationResultProps {
  isLoading: boolean;
  wasteType: WasteType;
  confidence?: number;
  onReset: () => void;
}

const ClassificationResult: React.FC<ClassificationResultProps> = ({
  isLoading,
  wasteType,
  confidence = 0,
  onReset,
}) => {
  if (isLoading) {
    return (
      <div className="mt-8 w-full max-w-2xl mx-auto p-6 rounded-xl bg-white border border-intelliwaste-gray-medium shadow-glass-sm">
        <div className="flex items-center justify-center py-8">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-4 border-intelliwaste-blue/20 border-t-intelliwaste-blue animate-spin"></div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <Recycle size={20} className="text-intelliwaste-blue" />
            </div>
          </div>
          <div className="ml-4 font-medium">Analyzing your waste image...</div>
        </div>
      </div>
    );
  }

  if (wasteType === null) {
    return null;
  }

  const isRecyclable = wasteType === 'recyclable';
  
  return (
    <div className="mt-8 w-full max-w-2xl mx-auto">
      <div className={`p-6 rounded-xl shadow-glass ${isRecyclable ? 'bg-intelliwaste-green/10' : 'bg-intelliwaste-red/10'} border ${isRecyclable ? 'border-intelliwaste-green/20' : 'border-intelliwaste-red/20'}`}>
        <div className="flex items-center mb-4">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isRecyclable ? 'bg-intelliwaste-green' : 'bg-intelliwaste-red'}`}>
            {isRecyclable ? (
              <Recycle size={28} className="text-white" />
            ) : (
              <Trash size={28} className="text-white" />
            )}
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">
              {isRecyclable ? 'Recyclable Waste' : 'Non-Recyclable Waste'}
            </h3>
            <div className="flex items-center mt-1">
              <div className="w-full max-w-[150px] h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${isRecyclable ? 'bg-intelliwaste-green' : 'bg-intelliwaste-red'}`}
                  style={{ width: `${confidence * 100}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm text-intelliwaste-gray-dark">
                {Math.round(confidence * 100)}% confidence
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm mb-4">
          <h4 className="font-medium mb-2">Disposal Instructions:</h4>
          <p className="text-intelliwaste-gray-dark">
            {isRecyclable 
              ? 'This item should be placed in your recycling bin. Please ensure it is clean and free of contaminants before recycling.'
              : 'This item should be placed in your general waste bin as it cannot be recycled through conventional methods.'}
          </p>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-lg border border-intelliwaste-gray-medium hover:bg-intelliwaste-gray text-intelliwaste-gray-dark transition-colors"
          >
            Try Another Image
          </button>
          
          <a 
            href={isRecyclable ? '/chatbot?q=how+to+recycle+properly' : '/chatbot?q=alternatives+to+non-recyclable+waste'}
            className="px-4 py-2 rounded-lg bg-intelliwaste-blue text-white hover:bg-intelliwaste-blue-dark transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

export default ClassificationResult;
