import React, { useCallback, useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import * as fcl from "@onflow/fcl"

export default function TipModal({ address, amount, handleClose, isOpen }) {
  const [selectedAmount, setSelectedAmount] = useState(amount)
  const [selectedAddress, setSelectedAddress] = useState(address)

  const executeTransaction = useCallback(async () => {
    await fcl.mutate({
      template: "https://flix.flow.com/v1/templates?name=transfer-flow",
      args: (arg, t) => [
        arg(selectedAmount, t.UFix64),
        arg(selectedAddress, t.Address),
      ],
    })
  }, [selectedAddress, selectedAmount])

  return ReactDOM.createPortal(
    <div
      onClick={handleClose}
      style={{ display: isOpen ? "flex" : "none" }}
      className="modal-wrapper"
    >
      <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
        <p>
          <div className="modal-row">
            {"Tip: "}
            <input
              value={selectedAmount}
              onChange={(e) => setSelectedAmount(e.target.value)}
            ></input>
            {" FLOW"}
          </div>
        </p>
        <p>
          <div className="modal-row">
            {"To: "}
            <input
              value={selectedAddress}
              onChange={(e) => setSelectedAddress(e.target.value)}
            ></input>
          </div>
        </p>
        <button onClick={executeTransaction}>Send Tip</button>
      </div>
    </div>,
    document.documentElement
  )
}
