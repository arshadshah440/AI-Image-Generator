import React, { useState } from "react";
import { Sparkles, Download, Wand2, Image } from "lucide-react";
import axios from "axios";

const AIImageGeneratorForm = () => {
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
      // Note: This is a mock implementation since we can't make actual API calls
      // In a real implementation, you would use your actual API key and endpoint
      //   setTimeout(() => {
      //     // Mock success - in reality this would be your API call
      //     const mockImageUrl =
      //       "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23764ba2;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='512' height='512' fill='url(%23grad)'/%3E%3Ctext x='256' y='256' text-anchor='middle' dy='.3em' font-family='Arial' font-size='24' fill='white'%3EGenerated: " +
      //       prompt.substring(0, 20) +
      //       "%3C/text%3E%3C/svg%3E";
      //     setImageUrl(mockImageUrl);
      //     setLoading(false);
      //   }, 3000);

      // Actual API call would look like this:

      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("output_format", "webp");

      const response = await axios.post(
        "https://api.stability.ai/v2beta/stable-image/generate/ultra",
        formData,
        {
          headers: {
            Authorization:
              "Bearer sk-your-api-key",
            Accept: "image/*",
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "image/webp" });
      const imageObjectUrl = URL.createObjectURL(blob);
      setImageUrl(imageObjectUrl);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to generate image. " +
          (err?.response?.errors || err.message)
      );
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-white font-semibold mb-3 text-lg">
                Describe your vision
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A majestic dragon soaring through aurora-filled skies..."
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
                <Wand2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Creating Magic...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    <span>Generate Image</span>
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Loading Animation */}
          {loading && (
            <div className="mt-8 text-center">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-purple-500/30 rounded-full"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                  <p className="text-white font-medium">
                    Crafting your masterpiece...
                  </p>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Result */}
          {imageUrl && (
            <div className="mt-8 animate-fadeIn">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                    <Image className="w-6 h-6 text-purple-400" />
                    Your Creation is Ready!
                  </h3>
                  <p className="text-gray-300">
                    Click to download your AI-generated artwork
                  </p>
                </div>

                <div
                  className="relative group cursor-pointer"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = imageUrl;
                    link.download = "ai-artwork.webp";
                    link.click();
                  }}
                >
                  <img
                    src={imageUrl}
                    alt="Generated artwork"
                    className="w-full rounded-xl shadow-2xl border border-white/20 transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                    <div className="text-white text-center">
                      <Download className="w-12 h-12 mx-auto mb-2" />
                      <p className="font-semibold">Click to Download</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => {
                      const link = document.createElement("a");
                      link.href = imageUrl;
                      link.download = "ai-artwork.webp";
                      link.click();
                    }}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 px-8 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 font-semibold"
                  >
                    <Download className="w-5 h-5" />
                    Download Artwork
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIImageGeneratorForm;
