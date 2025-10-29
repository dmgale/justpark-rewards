
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'

// Start Mirage JS server in development mode only
if (import.meta.env.DEV) {
  import('./mirage/config').then(({ makeServer }) => {
    makeServer();
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);