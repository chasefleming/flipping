import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { ChakraProvider } from "@chakra-ui/react"
import CustomElement from "./components/CustomElement"

const widgetDivs = document.querySelectorAll(".flipping-widget")
const widgetDivsCustom = document.querySelectorAll(".flipping-widget-custom")

// Inject our React App into each class
widgetDivs.forEach((div) => {
  ReactDOM.render(
    <React.StrictMode>
      <ChakraProvider>
        <App
          address={div.dataset.address}
          amount={div.dataset.amount}
          name={div.dataset.name}
          message={div.dataset.message}
          image={div.dataset.image}
          bgColor={div.dataset.bgColor}
          color={div.dataset.color}
          colorScheme={div.dataset.colorScheme}
          size={div.dataset.size}
        />
      </ChakraProvider>
    </React.StrictMode>,
    div
  )
})

widgetDivsCustom.forEach((div) => {
  const children = div.textContent;

  ReactDOM.render(
    <React.StrictMode>
      <ChakraProvider>
        <CustomElement
          address={div.dataset.address}
          amount={div.dataset.amount}
          name={div.dataset.name}
          message={div.dataset.message}
          image={div.dataset.image}
        >
          {children}
        </CustomElement>
      </ChakraProvider>
    </React.StrictMode>,
    div
  )
})

