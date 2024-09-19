import axios from "axios";
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from "../schema/cripto-schema";
import { Pair } from "../types";

export async function getCryptos() {
    const cryptoUrl = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`;
    const { data: { Data } } = await axios(cryptoUrl);
    const result = CryptoCurrenciesResponseSchema.safeParse(Data);
    if (result.success) {
        return result.data
    }
}

export async function getPrice(pair: Pair) {
    const pairUrl = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.criptocurrency}&tsyms=${pair.currency}`;
    const { data: { DISPLAY } } = await axios(pairUrl);
    const result = CryptoPriceSchema.safeParse(DISPLAY[pair.criptocurrency][pair.currency])
    if (result.success) {
        return result.data
    }
}