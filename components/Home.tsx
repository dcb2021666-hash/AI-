import React from 'react';

interface HomeProps {
  onNavigate: (tab: 'match' | 'generate') => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50 overflow-y-auto pb-24">
      {/* Welcome Section */}
      <div className="bg-white p-6 pb-4">
        <h1 className="text-2xl font-bold text-gray-800">早安，Alex 👋</h1>
        <p className="text-gray-500 text-sm mt-1">今天为你准备了 3 位优质推荐</p>
      </div>

      {/* Daily Match Card */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-3">今日精选</h2>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="h-48 bg-gray-200 relative group">
            {/* Placeholder for image */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
               </svg>
            </div>
             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                <h3 className="text-xl font-bold">Sarah, 26</h3>
                <p className="text-sm opacity-90">产品经理 • 杭州</p>
             </div>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="bg-rose-50 text-rose-600 text-xs px-2 py-1 rounded-full">喜欢旅行</span>
              <span className="bg-rose-50 text-rose-600 text-xs px-2 py-1 rounded-full">猫奴</span>
              <span className="bg-rose-50 text-rose-600 text-xs px-2 py-1 rounded-full">咖啡控</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              "希望能找到一个周末一起探店，分享生活点滴的人..."
            </p>
            <button 
              onClick={() => onNavigate('match')}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-xl transition-colors shadow-md"
            >
              和她打招呼
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2">
        <h2 className="text-lg font-bold text-gray-800 mb-3">快捷功能</h2>
        <div className="grid grid-cols-2 gap-3">
           <button 
             onClick={() => onNavigate('generate')}
             className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:bg-gray-50 transition"
           >
              <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                 </svg>
              </div>
              <span className="font-semibold text-gray-800 text-sm">AI 绘图</span>
              <span className="text-xs text-gray-400 mt-1">描绘理想伴侣</span>
           </button>
           <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center opacity-60">
               <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                 </svg>
              </div>
              <span className="font-semibold text-gray-800 text-sm">情感咨询</span>
              <span className="text-xs text-gray-400 mt-1">即将上线</span>
           </div>
        </div>
      </div>
    </div>
  );
};