import "./App.css"
import TipButton from "./components/TipButton"
import "./config/fcl"

function App({ address, amount, name, message, image, bgColor, size }) {
  return (
    <div>
      <TipButton
        address={address}
        amount={amount}
        name={name}
        message={message}
        image={image}
        bgColor={bgColor}
        size={size}
      />
    </div>
  )
}

export default App
