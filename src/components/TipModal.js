import React, { useCallback, useEffect, useState } from "react"
import ReactDOM from "react-dom"
import * as fcl from "@onflow/fcl"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Lorem,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Text,
  Highlight,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react"

export default function TipModal({
  address,
  amount,
  name,
  message,
  handleClose,
  isOpen,
}) {
  const [selectedAmount, setSelectedAmount] = useState(amount)

  const [txId, setTxId] = useState(null)
  const [txProgress, setTxProgress] = useState(null)
  const [txError, setTxError] = useState(null)

  const closeModal = useCallback(() => {
    setTxId(null)
    setTxProgress(null)
    setTxError(null)
    handleClose()
  })

  const executeTransaction = useCallback(async () => {
    try {
      const txId = await fcl.mutate({
        template: "https://flix.flow.com/v1/templates?name=transfer-flow",
        args: (arg, t) => [
          arg(Number(selectedAmount).toFixed(1), t.UFix64),
          arg(address, t.Address),
        ],
      })
      setTxId(txId)
    } catch (e) {}
  }, [address, selectedAmount])

  useEffect(() => {
    if (txId) {
      setTxProgress(0)
      return fcl.tx(txId).subscribe((tx) => {
        if (tx.errorMessage) {
          setTxError("Error: " + tx.errorMessage)
          setTxProgress(null)
          setTxId(null)
          return
        }

        switch (true) {
          case fcl.tx.isSealed(tx):
            setTxProgress(100)
            return
          case fcl.tx.isExecuted(tx):
            setTxProgress(75)
            return
          case fcl.tx.isFinalized(tx):
            setTxProgress(25)
            return
          case fcl.tx.isPending(tx):
            setTxProgress(25)
            return
        }
      })
    }
  }, [txId])

  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  }

  useEffect(() => {
    setSelectedAmount(amount)
  }, [amount])

  return ReactDOM.createPortal(
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {"Send a tip to: "}
          {name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {txId === null && (
            <>
              <Text pb={4} className="modal-row">
                {message}
              </Text>
              <Text className="modal-row">
                {"To: "}
                {address}
              </Text>
              <Text pb={4} className="modal-row">
                {"Amount: "}
                {selectedAmount}
              </Text>
              <Box pt={8} pb={2}>
                <Slider
                  aria-label="slider-ex-6"
                  min={1}
                  defaultValue={selectedAmount}
                  onChange={(val) => setSelectedAmount(val)}
                >
                  <SliderMark value={25} {...labelStyles}>
                    25 FLOW
                  </SliderMark>
                  <SliderMark value={50} {...labelStyles}>
                    50 FLOW
                  </SliderMark>
                  <SliderMark value={75} {...labelStyles}>
                    75 FLOW
                  </SliderMark>
                  <SliderMark
                    value={selectedAmount}
                    textAlign="center"
                    bg="blue.500"
                    borderRadius="5"
                    color="white"
                    mt="-10"
                    ml="-5"
                    w="20"
                  >
                    {selectedAmount} FLOW
                  </SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box>
            </>
          )}
          {txProgress !== null &&
            (txProgress === 0 ? (
              <>
                <CircularProgress isIndeterminate color="blue.400" />
                <Text className="modal-row">{"Submitting Transaction..."}</Text>
              </>
            ) : (
              <>
                <CircularProgress value={txProgress} color="blue.400">
                  <CircularProgressLabel>{txProgress}%</CircularProgressLabel>
                </CircularProgress>
                <Text className="modal-row">
                  {txProgress === 100
                    ? "Transaction Complete!"
                    : "Transaction is Executing..."}
                </Text>
              </>
            ))}
        </ModalBody>
        {txProgress !== null ? (
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        ) : (
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={executeTransaction}>
              Send
            </Button>
            <Button variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>,
    document.documentElement
  )
}
