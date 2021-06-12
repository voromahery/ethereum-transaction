import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
body {
    margin: auto;
}

* {
    font-family: 'Roboto', Sans-Serif;
}


#root {
    padding-left: 20px;
    padding-right: 20px;
}

a {
    text-decoration: none; 
    
}

a:hover {
    text-decoration: underline
}

input {
    width: 100%;
    max-width: 400px;
    height: 32px;
    border-radius: 6px;
    border: solid 1px black;
}

button {
    padding: 8px;
    cursor: pointer;
    font-weight: 700;
    margin-bottom: 20px;
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
    border-right: 5px solid lightblue;
    border-radius: 50%;
    animation: spinner 1s linear infinite;
  }

.detail {
    max-width: max-content;
    margin: 0;
}

@media (min-width: 375px) {
    #root {
        padding-left: 40px;
        padding-right: 40px;
    }

    input {
        height: 50px;
        border: solid 2px black;
    }

    button {
        padding: 17px;
    }
}

`
