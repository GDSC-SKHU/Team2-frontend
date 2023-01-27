import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    margin-top: 0px;
    padding: 3px;
    box-sizing: border-box;
    color: #353535;
  }

  a {
    all: unset;
    cursor: pointer;
  }
  body { 
    margin-top: 0px;
  background-image: url(/rainbow.jpg);
  background-repeat: no-repeat;
  background-size: cover;

  }
`;

export default GlobalStyles;
