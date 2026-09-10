import { useState } from 'react';
import Landing from './components/Landing';
import DecisionApp from './components/DecisionApp';
import './styles/globals.css';

function App() {
  const [showApp, setShowApp] = useState(false);

  return (
    <>
      {!showApp && <Landing onTryDemo={() => setShowApp(true)} />}
      {showApp && <DecisionApp onClose={() => setShowApp(false)} />}
    </>
  );
}

export default App;
