import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { makeServer } from './mirage/config';

// Start Mirage JS server in all environments
makeServer({ 
  environment: import.meta.env.PROD ? 'production' : 'development' 
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);