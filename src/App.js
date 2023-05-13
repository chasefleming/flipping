import TipButton from "./components/TipButton"
import "./config/fcl"

function App({ address, amount, name, message, image, bgColor, color, colorScheme, size }) {
  return (
    <div>
      <TipButton
        address={address}
        amount={amount}
        name={name}
        message={message}
        image={image}
        bgColor={bgColor}
        color={color}
        colorScheme={colorScheme}
        size={size}
      />
    </div>
  )
}

export default App
