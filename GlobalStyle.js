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

`
