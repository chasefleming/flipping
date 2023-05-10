import "./App.css"
import TipButton from "./components/TipButton"
import "./config/fcl"

function App({ address, amount, name, message, bgColor, size }) {
  const shortenedAddress = address.slice(0, 4) + "..." + address.slice(-3)

  return (
    <div>
      <TipButton
        address={shortenedAddress}
        amount={amount}
        name={name}
        message={message}
        bgColor={bgColor}
        size={size}
      />
    </div>
  )
}

export default App
