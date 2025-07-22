import React, { useState } from "react";
import axios from "axios";
import ImageContainer from "./ImageContainer";
import LoadingContainer from "./LoadingContainer";
import IntroContainer from "./IntroContainer";
import FormContainer from "./FormContainer";

const AIImageGeneratorForm = () => {
  const apiKey = import.meta.env.VITE_STABILITY_API_KEY;

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setImageUrl(null);

    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    setLoading(true);

    try {
      // Actual API call would look like this:

      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("output_format", "webp");

      const response = await axios.post(
        "https://api.stability.ai/v2beta/stable-image/generate/ultra",
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: "image/*",
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "image/webp" });
      const imageObjectUrl = URL.createObjectURL(blob);
      setImageUrl(imageObjectUrl);
      setLoading(false);
    } catch (err) {
      // Log everything to debug what's actually in the error
      var errorMessage = "Failed to generate the image.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 flex items-center justify-center">
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-50">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto w-full">
        {/* Main Container */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <IntroContainer />

          {/* Form */}
          <FormContainer
            handleSubmit={handleSubmit}
            loading={loading}
            prompt={prompt}
            setPrompt={setPrompt}
            error={error}
          />

          {/* Loading Animation */}
          {loading && <LoadingContainer />}

          {/* Result */}
          {imageUrl && <ImageContainer imageUrl={imageUrl} />}
        </div>
      </div>
    </div>
  );
};

export default AIImageGeneratorForm;
