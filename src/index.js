import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';

const widgetDivs = document.querySelectorAll('.flipping-widget');

// Inject our React App into each class
widgetDivs.forEach(div => {
    ReactDOM.render(
      <React.StrictMode>
        <ChakraProvider>
          <App 
            address={div.dataset.address} 
            amount={div.dataset.amount}
            name={div.dataset.name}
            bgColor={div.dataset.bgColor}
            size={div.dataset.size}
          />
        </ChakraProvider>
      </React.StrictMode>,
        div
    );
});