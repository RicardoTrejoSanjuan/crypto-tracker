import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { CryptoCurrency, CryptoPrice, Pair } from './types';
import { getCryptos, getPrice } from './services/CryptoServices';

const initalCryptoPrice: CryptoPrice = {
    CHANGEPCT24HOUR: '',
    HIGHDAY: '',
    IMAGEURL: '',
    LASTUPDATE: '',
    LOWDAY: '',
    PRICE: '',
}

type CriptoStore = {
    cryptoCurrencies: CryptoCurrency[],
    cryptoPrice: CryptoPrice,
    loading: boolean,
    fetchCryptos: () => Promise<void>,
    fetchData: (pair: Pair) => Promise<void>
    cleanData: () => void
}

export const useCryptoStore = create<CriptoStore>()(devtools((set) => ({
    cryptoCurrencies: [],
    cryptoPrice: initalCryptoPrice,
    loading: false,

    fetchCryptos: async() => {
        const cryptoCurrencies = await getCryptos();
        set(() => ({
            cryptoCurrencies
        }))
    },

    fetchData: async(pair) => {
        set(() => ({
            loading: true
        }))
        const cryptoPrice = await getPrice(pair);
        set(() => ({
            cryptoPrice,
            loading: false
        }))
    },

    cleanData: () => {
        set(() => ({
            cryptoPrice: initalCryptoPrice
        }))
    }
})))