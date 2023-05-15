import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { ChakraProvider } from "@chakra-ui/react"
import CustomElement from "./components/CustomElement"

const widgetDivs = document.querySelectorAll(".flipping-widget")
const widgetDivsCustom = document.querySelectorAll(".flipping-widget-custom")

// Inject our React App into each class
widgetDivs.forEach((div) => {
  const root = createRoot(div)

  root.render(
    <React.StrictMode>
      <div id="flipping-root">
        <ChakraProvider cssVarsRoot='#flipping-root'>
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
      </div>
    </React.StrictMode>
  )
})

widgetDivsCustom.forEach((div) => {
  const children = div.textContent

  const root = createRoot(div)

  root.render(
    <React.StrictMode>
      <div id="flipping-root">
        <ChakraProvider cssVarsRoot='#flipping-root'>
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
      </div>
    </React.StrictMode>
  )
})
