import React, { useState } from 'react';
import { generateDreamPartnerImage } from '../services/geminiService';
import { ImageResolution, GeneratedImage } from '../types';

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [resolution, setResolution] = useState<ImageResolution>(ImageResolution.RES_1K);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const imageUrl = await generateDreamPartnerImage(prompt, resolution);
      
      if (imageUrl) {
        const newImage: GeneratedImage = {
          url: imageUrl,
          prompt,
          resolution,
          createdAt: new Date()
        };
        setHistory(prev => [newImage, ...prev]);
      } else {
        setError("生成图片失败。模型可能正忙。");
      }
    } catch (err) {
      setError("生成图片时发生错误。");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 p-4 overflow-y-auto pb-24">
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">理想伴侣画像</h2>
        <p className="text-gray-500 text-sm mb-6">
          描述你梦中的伴侣或特定场景，我们先进的 AI 将为你将其可视化。
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="例如：一位看起来很善良的医生在山里徒步，背景是日落..."
              className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-rose-500 h-24 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">分辨率</label>
            <div className="flex gap-2">
              {Object.values(ImageResolution).map((res) => (
                <button
                  key={res}
                  onClick={() => setResolution(res)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors border ${
                    resolution === res
                      ? 'bg-rose-50 border-rose-500 text-rose-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {res}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-rose-300 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                正在生成...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                生成图片
              </>
            )}
          </button>
          
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>

      {/* Gallery */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 px-1">生成历史</h3>
        {history.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>暂无生成记录</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {history.map((img, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <img src={img.url} alt={img.prompt} className="w-full h-auto object-cover" />
                <div className="p-4">
                  <p className="text-sm text-gray-800 line-clamp-2">{img.prompt}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{img.resolution}</span>
                    <span className="text-xs text-gray-400">{img.createdAt.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};