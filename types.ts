export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface UserProfile {
  name: string;
  age: number;
  location: string;
  isRealNameVerified: boolean;
  isVideoVerified: boolean;
  privacySettings: {
    showIncome: boolean;
    showHousing: boolean;
    showHobbies: boolean;
  };
}

export enum ImageResolution {
  RES_1K = '1K',
  RES_2K = '2K',
  RES_4K = '4K'
}

export interface GeneratedImage {
  url: string;
  prompt: string;
  resolution: ImageResolution;
  createdAt: Date;
}