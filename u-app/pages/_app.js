import { QueryClientProvider } from '@tanstack/react-query'
import '../styles/global.css'
import { queryClient } from '../lib/queryclient'

export default function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout ?? ((page) => page)
   
    return getLayout(
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      )
  }