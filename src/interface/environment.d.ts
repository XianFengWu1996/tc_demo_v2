declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
      NEXT_PUBLIC_MENU_PDF_URL: string;
      NEXT_PUBLIC_CLOUD_FUNC_URL: string;
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
      NEXT_PUBLIC_FIREBASE_API_KEY: string;
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
      NEXT_PUBLIC_FIREBASE_DATABASE_URL: string;
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
      NEXT_PUBLIC_FIREBASE_APP_ID: string;
      NEXT_PUBLIC_MAP_API: string;
      NEXT_PUBLIC_FULLDAY_MENU: string;
      NEXT_PUBLIC_LUNCH_MENU: string;
      NEXT_PUBLIC_LUNCH_END: number;

      NEXT_PUBLIC_STORE_LAT: number;
      NEXT_PUBLIC_STORE_LNG: number;
      NEXT_PUBLIC_PUB_TOKEN: string;
    }
  }
}

export {};
