
import React, { useState } from 'react';
import Layout from '../components/Layout';
import ImageUploader from '../components/imageRecognition/ImageUploader';
import ClassificationResult from '../components/imageRecognition/ClassificationResult';
import { Camera, Upload, Info, Check, X } from 'lucide-react';

const ImageRecognition = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [wasteType, setWasteType] = useState<'recyclable' | 'non-recyclable' | null>(null);
  const [confidence, setConfidence] = useState(0);
  
  const handleImageSelected = (file: File) => {
    // Start the "analysis"
    setIsAnalyzing(true);
    setWasteType(null);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // Random classification for demo purposes
      const isRecyclable = Math.random() > 0.5;
      setWasteType(isRecyclable ? 'recyclable' : 'non-recyclable');
      setConfidence(0.75 + Math.random() * 0.2); // Random confidence between 75% and 95%
      setIsAnalyzing(false);
    }, 2500);
  };
  
  const handleReset = () => {
    setWasteType(null);
    setConfidence(0);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 rounded-full bg-intelliwaste-blue/10 text-intelliwaste-blue text-sm font-medium mb-4">
              Image Recognition
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Identify Waste Materials Instantly
            </h1>
            <p className="text-intelliwaste-gray-dark max-w-2xl mx-auto">
              Upload a photo of any waste item, and our advanced AI will instantly classify it as recyclable or non-recyclable.
            </p>
          </div>
          
          {/* How it works */}
          <div className="mb-12 p-6 rounded-xl bg-intelliwaste-gray border border-intelliwaste-gray-medium">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Info size={20} className="text-intelliwaste-blue" />
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 rounded-full bg-intelliwaste-blue flex items-center justify-center text-white mb-3">
                  <Camera size={24} />
                </div>
                <h3 className="font-medium mb-2">Upload Image</h3>
                <p className="text-sm text-intelliwaste-gray-dark">
                  Take a photo or upload an image of the waste item you want to identify.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 rounded-full bg-intelliwaste-blue flex items-center justify-center text-white mb-3">
                  <Upload size={24} />
                </div>
                <h3 className="font-medium mb-2">AI Analysis</h3>
                <p className="text-sm text-intelliwaste-gray-dark">
                  Our AI processes the image and analyzes the waste material characteristics.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 rounded-full bg-intelliwaste-blue flex items-center justify-center text-white mb-3">
                  {wasteType === 'recyclable' ? <Check size={24} /> : wasteType === 'non-recyclable' ? <X size={24} /> : <Check size={24} />}
                </div>
                <h3 className="font-medium mb-2">Get Results</h3>
                <p className="text-sm text-intelliwaste-gray-dark">
                  Receive instant classification and proper disposal instructions for your waste item.
                </p>
              </div>
            </div>
          </div>
          
          {/* Image uploader */}
          <ImageUploader onImageSelected={handleImageSelected} />
          
          {/* Classification results */}
          <ClassificationResult 
            isLoading={isAnalyzing}
            wasteType={wasteType}
            confidence={confidence}
            onReset={handleReset}
          />
          
          {/* Tips section */}
          {wasteType && (
            <div className="mt-12 p-6 rounded-xl bg-white border border-intelliwaste-gray-medium shadow-glass-sm">
              <h2 className="text-xl font-semibold mb-4">Waste Management Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-intelliwaste-blue/10 flex items-center justify-center text-intelliwaste-blue flex-shrink-0">
                    <Check size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Always Clean Before Recycling</h3>
                    <p className="text-sm text-intelliwaste-gray-dark">
                      Rinse containers and remove food residue before recycling to prevent contamination.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-intelliwaste-blue/10 flex items-center justify-center text-intelliwaste-blue flex-shrink-0">
                    <Check size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Check Local Guidelines</h3>
                    <p className="text-sm text-intelliwaste-gray-dark">
                      Recycling rules vary by location, so check with your local facility for specific requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ImageRecognition;
