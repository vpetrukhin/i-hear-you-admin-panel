export const appConfig = {
  api: {
    baseUrl: import.meta.env.PROD
      ? import.meta.env.VITE_API_BASE_URL
      : undefined,
  },
};
