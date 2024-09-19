import { useEffect } from "react";
import CryptoSearchForm from "./components/CryptoSearchForm"
import { useCryptoStore } from "./store";
import CryptoPriceDisplay from "./components/CryptoPriceDisplay";

function App() {

  const { fetchCryptos } = useCryptoStore();

  useEffect(() => {
    fetchCryptos()
  }, [])
  
  return (
    <>
      <div className="container">
        <h1 className="app-title">Crypto <span>Tracker</span></h1>
        {/* <p>CryptoQuote is an intuitive and easy-to-use app that provides users with real-time quotes of the top cryptocurrencies. With a user-friendly interface and instant updates, CryptoQuote helps you stay on top of the market and make informed decisions about your cryptocurrency investments</p> */}
        <div className="content">
          <CryptoSearchForm  />
          <CryptoPriceDisplay />
        </div>
      </div>
    </>
  )
}

export default App
