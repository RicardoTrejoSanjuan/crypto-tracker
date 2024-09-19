import { ChangeEvent, FormEvent, useState } from "react";
import { currencies } from "../data/db";
import { useCryptoStore } from "../store";
import { Pair } from "../types";
import ErrorMessage from "./ErrorMessage";


export default function CryptoSearchForm() {

    const { cryptoCurrencies, fetchData, cleanData } = useCryptoStore();
    const [pair, setPair] = useState<Pair>({
        currency: '',
        criptocurrency: ''
    })
    const [error, setError] = useState('');

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (Object.values(pair).includes('')) {
            setError('Fileds are required!');
            cleanData();
            return;
        }
        setError('');
        fetchData(pair);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            { error && <ErrorMessage>{error}</ErrorMessage> }
            <div className="field">
                <label htmlFor="currency">Currency:</label>
                <select
                    name="currency"
                    id="currency"
                    onChange={handleChange}
                    value={pair.currency} >
                    <option value="">- Select -</option>
                    {
                        currencies.map(currency => (
                            <option key={currency.code} value={currency.code}>{currency.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className="field">
                <label htmlFor="criptocurrency">Cripto:</label>
                <select
                    name="criptocurrency"
                    id="criptocurrency"
                    onChange={handleChange}
                    value={pair.criptocurrency} >
                    <option value="">- Select -</option>
                    {
                        cryptoCurrencies.map(crypto => (
                            <option
                                key={crypto.CoinInfo.Id}
                                value={crypto.CoinInfo.Name} >
                                    {crypto.CoinInfo.FullName}
                            </option>
                        ))
                    }
                </select>
            </div>
            <button type="submit">Price</button>
        </form>
    )
}
