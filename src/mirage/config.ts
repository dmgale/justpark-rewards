import { createServer } from 'miragejs';
import { parkingRoutes } from './routes/parking-routes';

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    routes() {
      this.namespace = 'api';
      
      // Only add timing delay in development
      if (environment === 'development') {
        this.timing = 400;
      }

      // Register parking routes
      parkingRoutes(this);

      // Passthrough for specific external APIs
      this.passthrough('https://api.maptiler.com/**');
      this.passthrough('https://maps.googleapis.com/**');
      
      // Passthrough for any request not starting with /api (e.g., static assets)
      this.passthrough((request) => {
        return !request.url.startsWith('/api');
      });
    },
  });

  console.log(`🎭 Mirage JS server started in ${environment} mode`);
  return server;
}