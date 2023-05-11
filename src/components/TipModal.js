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
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Text,
  CircularProgress,
  CircularProgressLabel,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Image,
  Stack,
  Link,
  Center,
} from "@chakra-ui/react"

export default function TipModal({
  address,
  amount,
  name,
  message,
  image,
  handleClose,
  isOpen,
}) {
  const [selectedAmount, setSelectedAmount] = useState(amount)
  const [txId, setTxId] = useState(null)
  const [txError, setTxError] = useState(null)
  const [txProgress, setTxProgress] = useState(null)

  const closeModal = useCallback(() => {
    setTxId(null)
    setTxProgress(null)
    handleClose()
  })

  const executeTransaction = useCallback(async () => {
    try {
      setTxError(null)
      const txId = await fcl.mutate({
        template: "https://flix.flow.com/v1/templates?name=transfer-flow",
        args: (arg, t) => [
          arg(selectedAmount, t.UFix64),
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
          setTxError(
            "Something went wrong. Please check the recipient address is valid, and that you have sufficient FLOW to tip."
          )
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
        <ModalBody pt="0">
          {txId === null && (
            <>
              <Stack direction="row" align="center" pb="4">
                {image && (
                  <Box pr="4">
                    <Image
                      width="150px"
                      borderRadius="full"
                      objectFit="cover"
                      src={image}
                    />
                  </Box>
                )}
                <Text fontSize="2xl" as="i" color="grey" className="modal-row">
                  {'"'}
                  {message}
                  {'"'}
                </Text>
              </Stack>
              <Box maxW='sm' borderWidth='1px' borderRadius='lg' p={3}>
                <Text className="modal-row">
                  <span>
                    <Text as="b">{"To: "}</Text> {address}
                  </span>
                </Text>
                <Text pb={4} className="modal-row">
                  <span>
                    <Text as="b">{"Amount: "}</Text> {selectedAmount}
                    {" FLOW"}
                  </span>
                </Text>
                <Box pt={8} pb={2}>
                  <Slider
                    aria-label="slider-ex-6"
                    min={1}
                    max={20}
                    defaultValue={selectedAmount}
                    onChange={(val) => setSelectedAmount(val)}
                  >
                    <SliderMark value={5} {...labelStyles}>
                      5 FLOW
                    </SliderMark>
                    <SliderMark value={10} {...labelStyles}>
                      10 FLOW
                    </SliderMark>
                    <SliderMark value={15} {...labelStyles}>
                      15 FLOW
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
                    ? "Transaction Complete! Thanks for Flipping"
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
        {txError && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>An error occurred</AlertTitle>
            <AlertDescription>{txError}</AlertDescription>
          </Alert>
        )}
        <Center>
          <Link href='https://github.com/chasefleming/flipping' isExternal>
            <Text fontSize='xs' pb={2} pt={5} color="grey">Add Flipping to Your Site</Text>
          </Link>
        </Center>
      </ModalContent>
    </Modal>,
    document.documentElement
  )
}
