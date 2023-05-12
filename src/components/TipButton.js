import React, { useState } from "react"
import TipModal from "./TipModal"
import { Button } from "@chakra-ui/react"

export default function TipButton({
  address,
  amount,
  name,
  message,
  image,
  bgColor,
  color,
  colorScheme,
  size,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const sendTip = async () => {
    setIsModalOpen(true)
  }

  return (
    <div>
      <TipModal
        address={address}
        amount={amount}
        name={name}
        message={message}
        image={image}
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
      <Button backgroundColor={bgColor} color={color} colorScheme={colorScheme} size={size} onClick={sendTip}>
        Tip {address}
      </Button>
    </div>
  )
}
