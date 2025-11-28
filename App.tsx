import React, { useState, useEffect } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { ImageGenerator } from './components/ImageGenerator';
import { UserProfile } from './components/UserProfile';
import { Home } from './components/Home';
import { SafetyBanner } from './components/SafetyBanner';
import { UserProfile as UserProfileType } from './types';

type Tab = 'home' | 'match' | 'generate' | 'profile';

// Extend AIStudio interface. Window.aistudio is already declared with type AIStudio in the environment.
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
}

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  
  // Lifted state for UserProfile to share verification status with Header
  const [userProfile, setUserProfile] = useState<UserProfileType>({
    name: "Alex",
    age: 28,
    location: "上海",
    isRealNameVerified: true,
    isVideoVerified: false,
    privacySettings: {
      showIncome: false,
      showHousing: true,
      showHobbies: true,
    }
  });

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio) {
        const has = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(has);
      } else {
        // Fallback for environments where window.aistudio is not available
        setHasApiKey(true);
      }
    };
    checkApiKey();
  }, []);

  const handleSelectApiKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // Assume success to mitigate race condition
      setHasApiKey(true);
    }
  };

  if (!hasApiKey) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-3">需要配置 API 密钥</h1>
          <p className="text-gray-600 mb-6 text-sm">
            本应用使用 <strong>Gemini 3 Pro</strong> 进行高质量图像生成。这需要您选择一个与计费项目关联的 API 密钥。
          </p>
          <button 
            onClick={handleSelectApiKey}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all mb-4 shadow-lg shadow-blue-200"
          >
            选择或创建 API 密钥
          </button>
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-blue-500 hover:underline flex items-center justify-center gap-1"
          >
            了解更多关于计费的信息
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  // Mock Authentication Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md text-center">
          <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-6">
            ❤
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">AI 红娘</h1>
          <p className="text-gray-500 mb-8">安全 • 智能 • 免费</p>
          
          <div className="space-y-3">
             <button 
              onClick={() => setIsAuthenticated(true)}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.98 10.279c0 2.946-2.003 5.464-4.73 6.138v-3.79H2.603v-4.66h1.648V6.152c0-2.186 1.082-3.666 3.12-3.666.975 0 1.956.175 1.956.175v2.148h-1.102c-1.084 0-1.422.673-1.422 1.363v1.64h2.422l-.345 4.66H6.848v3.626c2.478-.506 4.333-2.684 4.333-5.275 0-2.97-2.408-5.378-5.378-5.378-2.97 0-5.378 2.408-5.378 5.378z" transform="scale(1.5) translate(-2 -2)"/> 
                <span className="ml-1">微信一键登录</span>
              </svg>
            </button>
            <div className="text-xs text-gray-400 mt-4">
              登录即代表您同意我们的 <span className="underline">服务条款</span> 并接受实名认证。
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-2xl relative">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 bg-rose-500 rounded-lg flex items-center justify-center text-white font-bold">
            AI
          </div>
          <h1 className="text-lg font-bold text-gray-800">红娘</h1>
        </div>
        {userProfile.isVideoVerified ? (
           <div className="flex items-center gap-1 text-xs text-amber-700 font-medium px-2 py-1 bg-amber-50 border border-amber-200 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              金牌认证
           </div>
        ) : (
          <div className="text-xs text-rose-500 font-medium px-2 py-1 bg-rose-50 rounded-full">
            已认证用户
          </div>
        )}
      </header>

      <SafetyBanner />

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {currentTab === 'home' && <Home onNavigate={setCurrentTab} />}
        {currentTab === 'match' && <ChatInterface />}
        {currentTab === 'generate' && <ImageGenerator />}
        {currentTab === 'profile' && (
          <UserProfile 
            profile={userProfile} 
            onUpdateProfile={setUserProfile} 
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-100 flex justify-around items-center p-2 pb-safe sticky bottom-0 z-10">
        <button
          onClick={() => setCurrentTab('home')}
          className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
            currentTab === 'home' ? 'text-rose-500 bg-rose-50' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs mt-1 font-medium">首页</span>
        </button>

        <button
          onClick={() => setCurrentTab('match')}
          className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
            currentTab === 'match' ? 'text-rose-500 bg-rose-50' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="text-xs mt-1 font-medium">聊天</span>
        </button>

        <button
          onClick={() => setCurrentTab('generate')}
          className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
            currentTab === 'generate' ? 'text-rose-500 bg-rose-50' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs mt-1 font-medium">绘图</span>
        </button>

        <button
          onClick={() => setCurrentTab('profile')}
          className={`flex flex-col items-center p-2 rounded-xl transition-colors ${
            currentTab === 'profile' ? 'text-rose-500 bg-rose-50' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs mt-1 font-medium">我的</span>
        </button>
      </nav>
    </div>
  );
};

export default App;