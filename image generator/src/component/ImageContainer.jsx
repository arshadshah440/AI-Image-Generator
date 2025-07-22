import { Download, Image } from "lucide-react";
import React from "react";

const ImageContainer = ({imageUrl}) => {
  const DownloadImage = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "ai-artwork.webp";
    link.click();
  };
  return (
    <div>
      {" "}
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
            onClick={DownloadImage}
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
              onClick={DownloadImage}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 px-8 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              <Download className="w-5 h-5" />
              Download Artwork
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageContainer;
