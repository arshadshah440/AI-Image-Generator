import { Sparkles } from "lucide-react";
import React from "react";

const IntroContainer = () => {
  return (
    <>
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            AI Image Studio
          </h1>
        </div>
        <p className="text-gray-300 text-lg">
          Transform your imagination into stunning visuals with AI
        </p>
      </div>
    </>
  );
};

export default IntroContainer;
