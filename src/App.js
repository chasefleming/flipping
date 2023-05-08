import './App.css';
import TipButton from './components/TipButton';
import './config/fcl';

function App({ address, amount }) {
  return (
    <div>
      <TipButton address={address} amount={amount} />
    </div>
  );
}

export default App;
