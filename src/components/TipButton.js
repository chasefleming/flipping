import React, { useState } from "react"
import TipModal from "./TipModal"
import { Button } from "@chakra-ui/react"

export default function TipButton({
  address,
  amount,
  name,
  message,
  bgColor,
  size,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const sendTip = async () => {
    console.log("Sending tip...")
    console.log("To:", address)
    console.log("Amount:", amount)
    setIsModalOpen(true)
  }

  const shortenedAddress = address.slice(0, 4) + "..." + address.slice(-3)

  return (
    <div>
      <TipModal
        address={address}
        amount={amount}
        name={name}
        message={message}
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
      <Button colorScheme={bgColor} size={size} onClick={sendTip}>
        Tip {shortenedAddress}
      </Button>
    </div>
  )
}
