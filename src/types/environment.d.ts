declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        PWD: string;
        NEXT_PUBLIC_MENU_PDF_URL: string;
      }
    }
}

export {}