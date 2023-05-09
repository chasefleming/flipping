import React, { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import TipModal from "./TipModal"

export default function TipButton({ address, amount }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const sendTip = async () => {
    console.log("Sending tip...")
    console.log("To:", address)
    console.log("Amount:", amount)
    setIsModalOpen(true)
  }

  return (
    <div>
      <TipModal
        address={address}
        amount={amount}
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
      <button onClick={sendTip}>Tip {address}</button>
    </div>
  )
}
