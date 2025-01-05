import { QueryClientProvider } from '@tanstack/react-query'
import '../styles/global.css'
import { queryClient } from '../lib/queryclient'
import { Provider } from 'react-redux'
import store from '../redux/store'

export default function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout ?? ((page) => page)
   
    return getLayout(
      <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      </Provider>
      )
  }