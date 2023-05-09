import './App.css';
import TipButton from './components/TipButton';
import './config/fcl';

function App({ address, amount, bgColor, size }) {
  return (
    <div>
      <TipButton 
        address={address} 
        amount={amount} 
        bgColor={bgColor}
        size={size}
      />
    </div>
  );
}

export default App;
