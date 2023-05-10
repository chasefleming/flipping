import React, { useCallback, useState } from "react"
import ReactDOM from "react-dom"
import * as fcl from "@onflow/fcl"

export default function TipModal({ address, amount, name, handleClose, isOpen }) {
  const [selectedAmount, setSelectedAmount] = useState(amount)

  const executeTransaction = useCallback(async () => {
    try {
      await fcl.mutate({
        template: "https://flix.flow.com/v1/templates?name=transfer-flow",
        args: (arg, t) => [
          arg(selectedAmount, t.UFix64),
          arg(address, t.Address),
        ],
      })
    } catch (e) {}
  }, [address, selectedAmount])

  return ReactDOM.createPortal(
    <div
      onClick={handleClose}
      style={{ display: isOpen ? "flex" : "none" }}
      className="modal-wrapper"
    >
      <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
        <h2>Send a Tip</h2>
        <h3>To {name}</h3>
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
            {address}
          </div>
        </p>
        <button onClick={executeTransaction}>Send Tip</button>
      </div>
    </div>,
    document.documentElement
  )
}
