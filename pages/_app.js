
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import WithAction from './Navbar/Navbar'

export default function App({ Component, pageProps }) {
  return <ChakraProvider>
      <Provider store={store}>
        <WithAction />
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  

}

