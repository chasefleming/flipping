import './App.css';
import TipButton from './components/TipButton';

function App({ address, amount }) {
  return (
    <div>
      <TipButton address={address} amount={amount} />
    </div>
  );
}

export default App;
