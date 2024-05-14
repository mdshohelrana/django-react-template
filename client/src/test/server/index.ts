export const initMocks = async () => {
  if (import.meta.env.VITE_API_MOCKING === 'true') {
    if (typeof window === 'undefined') {
      const { server } = await import('./server');
      server.listen();
    } else {
      const { worker } = await import('./browser');
      worker.start();
    }
  }
};
