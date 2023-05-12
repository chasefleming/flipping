import React, { useState } from "react"
import TipModal from "./TipModal"

export default function CustomElement({
    address,
    amount,
    name,
    message,
    image,
    children,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const sendTip = async () => {
        setIsModalOpen(true)
    }

    return (
        <>
            <TipModal
                address={address}
                amount={amount}
                name={name}
                message={message}
                image={image}
                isOpen={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            />
            <div onClick={sendTip}>{children}</div>
        </>
    )
}