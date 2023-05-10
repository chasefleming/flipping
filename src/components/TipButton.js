import React, { useState } from "react"
import TipModal from "./TipModal"
import { Button } from '@chakra-ui/react'

export default function TipButton({ address, amount, name, bgColor, size }) {
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
        name={name}
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
      <Button 
        colorScheme={bgColor} 
        size={size}
        onClick={sendTip}>Tip {address}</Button>
    </div>
  )
}
