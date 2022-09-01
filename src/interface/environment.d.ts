declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
      NEXT_PUBLIC_MENU_PDF_URL: string;
      NEXT_PUBLIC_CLOUD_FUNC_URL: string;
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
    }
  }
}

export {};
