declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_API_KEY: string;
      NOVA_POSHTA_API_KEY: string;
    }
  }
}
export = NodeJS;
