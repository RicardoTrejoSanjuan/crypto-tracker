import { useMemo } from "react";
import { useCryptoStore } from "../store"
import Spinner from "./Spinner";

export default function CryptoPriceDisplay() {

  const { cryptoPrice, loading } = useCryptoStore();
  const hasResult = useMemo(() => !Object.values(cryptoPrice).includes(''), [cryptoPrice])
  return (
    <div className="result-wrapper">
      {
        loading ? <Spinner /> :
        hasResult && (
          <>
            <h2>Quotation</h2>
            <div className="result">
              <img
                src={`https://cryptocompare.com/${cryptoPrice.IMAGEURL}`}
                alt="Img Crypto" />
              <div>
                <p>The price is: <span>{cryptoPrice.PRICE}</span></p>
                <p>Highest price of the day: <span>{cryptoPrice.HIGHDAY}</span></p>
                <p>Lowest price of the day: <span>{cryptoPrice.LOWDAY}</span></p>
                <p>Last 24 hours change: <span>{cryptoPrice.CHANGEPCT24HOUR}</span></p>
                <p>Last update: <span>{cryptoPrice.LASTUPDATE}</span></p>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}
