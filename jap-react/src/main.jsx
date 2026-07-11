import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tokens.css';
import './styles/global.css';
import Loader from './components/Loader.jsx';

const App = lazy(() => import('./App.jsx'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </StrictMode>
);
