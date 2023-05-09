import React, { useCallback, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import * as fcl from "@onflow/fcl"

export default function TipModal({ address, amount, handleClose, isOpen }) {
  const executeTransaction = useCallback(async () => {
    await fcl.mutate({
      template: "https://flix.flow.com/v1/templates?name=transfer-flow",
      args: (arg, t) => [arg(amount, t.UFix64), arg(address, t.Address)],
    })
  }, [address, amount])

  return ReactDOM.createPortal(
    <div
      onClick={handleClose}
      style={{ display: isOpen ? "flex" : "none" }}
      className="modal-wrapper"
    >
      <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
        <button onClick={executeTransaction}>Send Tip</button>
      </div>
    </div>,
    document.documentElement
  )
}
