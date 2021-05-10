import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
body {
    margin: auto;
}

* {
    font-family: 'Roboto';
}

#root {
    padding-left: 40px;
    padding-right: 40px;
}

a {
    text-decoration: none;
    word-wrap: break-word;   
}

a:hover {
    text-decoration: underline
}

input {
    width: 100%;
    max-width: 400px;
    height: 50px;
    border-radius: 6px;
}

button {
    padding: 10px
}

@keyframes spinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
}
  }

#spinner {
    min-width: 40px;
    min-height: 40px;
    border: 5px solid rgba(255, 255, 255, 0.1);
    border-right: 5px solid orange;
    border-radius: 50%;
    animation: spinner 1s linear infinite;
  }

`
