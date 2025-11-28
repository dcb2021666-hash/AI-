import React, { useState } from 'react';
import { UserProfile as UserProfileType } from '../types';

interface UserProfileProps {
  profile: UserProfileType;
  onUpdateProfile: (profile: UserProfileType) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ profile, onUpdateProfile }) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const togglePrivacy = (key: keyof typeof profile.privacySettings) => {
    onUpdateProfile({
      ...profile,
      privacySettings: {
        ...profile.privacySettings,
        [key]: !profile.privacySettings[key]
      }
    });
  };

  const handleVideoVerification = () => {
    setIsVerifying(true);
    // Simulate video verification process
    setTimeout(() => {
      onUpdateProfile({
        ...profile,
        isVideoVerified: true
      });
      setIsVerifying(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 p-4 pb-24 overflow-y-auto">
      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`h-16 w-16 rounded-full flex items-center justify-center text-white text-2xl font-bold ring-4 ${profile.isVideoVerified ? 'bg-amber-500 ring-amber-100' : 'bg-rose-500 ring-rose-100'}`}>
            {profile.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-1">
              {profile.name}
              {profile.isVideoVerified && (
                <span title="视频已认证" className="text-amber-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
              {profile.isRealNameVerified && !profile.isVideoVerified && (
                <span title="实名已认证" className="text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                     <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </h2>
            <p className="text-gray-500">{profile.age}岁 • {profile.location}</p>
          </div>
        </div>
        
        {/* Verification Status Banner */}
        <div className={`rounded-xl p-3 flex items-start gap-3 ${profile.isVideoVerified ? 'bg-amber-50 text-amber-800 border border-amber-100' : 'bg-blue-50 text-blue-800 border border-blue-100'}`}>
          <div className="mt-0.5">
            {profile.isVideoVerified ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="flex-1">
             <h4 className="font-semibold text-sm">{profile.isVideoVerified ? '金牌认证用户' : '实名认证用户'}</h4>
             <p className="text-xs opacity-80 mt-1">
               {profile.isVideoVerified 
                 ? "您已完成高级视频认证。您的资料拥有尊贵的金牌标识。" 
                 : "您的身份已验证。添加视频介绍可获得金牌标识。"}
             </p>
          </div>
        </div>
      </div>

      {/* Advanced Verification Section */}
      {!profile.isVideoVerified && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-md p-6 mb-4 text-white relative overflow-hidden">
           <div className="relative z-10">
             <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
               获取金牌认证
               <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full border border-white/30">推荐</span>
             </h3>
             <p className="text-indigo-100 text-sm mb-4">
               录制一段简短的视频介绍以证明真人身份。视频认证用户的匹配率提高3倍。
             </p>
             <button 
                onClick={handleVideoVerification}
                disabled={isVerifying}
                className="bg-white text-indigo-600 font-bold py-2 px-4 rounded-lg text-sm shadow hover:bg-indigo-50 transition-colors flex items-center gap-2 disabled:opacity-80"
             >
                {isVerifying ? (
                  <>
                     <svg className="animate-spin h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    正在认证...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    录制视频介绍
                  </>
                )}
             </button>
           </div>
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        </div>
      )}

      {/* Privacy Settings */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">隐私控制</h3>
        <p className="text-sm text-gray-500 mb-4">控制匹配对象在您资料上看到的内容。</p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
            <span className="text-gray-700">显示收入</span>
            <button 
              onClick={() => togglePrivacy('showIncome')}
              className={`w-11 h-6 flex items-center rounded-full transition-colors duration-200 focus:outline-none ${profile.privacySettings.showIncome ? 'bg-rose-500' : 'bg-gray-300'}`}
            >
              <span className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${profile.privacySettings.showIncome ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
            <span className="text-gray-700">显示住房状况</span>
            <button 
              onClick={() => togglePrivacy('showHousing')}
              className={`w-11 h-6 flex items-center rounded-full transition-colors duration-200 focus:outline-none ${profile.privacySettings.showHousing ? 'bg-rose-500' : 'bg-gray-300'}`}
            >
              <span className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${profile.privacySettings.showHousing ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
            <span className="text-gray-700">显示兴趣爱好</span>
            <button 
              onClick={() => togglePrivacy('showHobbies')}
              className={`w-11 h-6 flex items-center rounded-full transition-colors duration-200 focus:outline-none ${profile.privacySettings.showHobbies ? 'bg-rose-500' : 'bg-gray-300'}`}
            >
              <span className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${profile.privacySettings.showHobbies ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};