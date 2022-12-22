
import { ChakraProvider } from '@chakra-ui/react'
export default function App({ Component, pageProps }) {
  return <div>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  </div>

}
