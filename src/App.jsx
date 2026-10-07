import { useState, useMemo } from "react";
import "./App.css";

function CurrencyConverter() {
  const rates = {
    USD: 1,
    EUR: 1.127,
    GBP: 1.320,
    JPY: 157.9,
    INR: 96.3,
  };

  const currencies = {
    USD: { name: "US Dollar", symbol: "$", flag: "🇺🇸" },
    EUR: { name: "Euro", symbol: "€", flag: "🇪🇺" },
    GBP: { name: "British Pound", symbol: "£", flag: "🇬🇧" },
    JPY: { name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
    INR: { name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  };

  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const convertedAmount = useMemo(() => {
    return (amount / rates[fromCurrency]) * rates[toCurrency];
  }, [amount, fromCurrency, toCurrency]);

  const exchangeRate = rates[toCurrency] / rates[fromCurrency];

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value === "" ? "" : Number(value));
  };

  const clearAmount = () => {
    setAmount("");
  };

  return (
    <main className="app">
      <div className="converter-card">
        <div className="header">
          <div className="logo">↗</div>
          <span className="badge">CURRENCY CONVERTER</span>
          <h1>Convert currencies<br />with ease.</h1>
          <p className="subtitle">
            Fast and simple currency conversion for everyday use.
          </p>
        </div>

        <div className="converter-box">
          <label>Amount</label>

          <div className="amount-input">
            <span className="amount-symbol">
              {currencies[fromCurrency].symbol}
            </span>

            <input
              type="number"
              min="0"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
            />

            {amount !== "" && (
              <button className="clear-button" onClick={clearAmount}>
                ×
              </button>
            )}
          </div>

          <div className="currency-row">
            <div className="currency-field">
              <label>From</label>

              <div className="select-wrapper">
                <span className="flag">
                  {currencies[fromCurrency].flag}
                </span>

                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                >
                  {Object.keys(currencies).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency} — {currencies[currency].name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              className="swap-button"
              onClick={swapCurrencies}
              aria-label="Swap currencies"
            >
              ⇄
            </button>

            <div className="currency-field">
              <label>To</label>

              <div className="select-wrapper">
                <span className="flag">
                  {currencies[toCurrency].flag}
                </span>

                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  {Object.keys(currencies).map((currency) => (
                    <option key={currency} value={currency}>
                      {currency} — {currencies[currency].name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="result">
            <div className="result-label">
              <span>Converted amount</span>
              <span>{currencies[toCurrency].flag}</span>
            </div>

            <div className="result-amount">
              {currencies[toCurrency].symbol}
              {amount === "" ? "0.00" : convertedAmount.toFixed(2)}
            </div>

            <p className="result-currency">
              {currencies[toCurrency].name} ({toCurrency})
            </p>
          </div>

          <div className="rate-info">
            <span>
              1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
            </span>

            <span className="rate-status">
              ● Reference rate
            </span>
          </div>
        </div>

        <footer>
          <span>Built with React</span>
          <span>•</span>
          <span>freeCodeCamp Project</span>
        </footer>
      </div>
    </main>
  );
}

export default CurrencyConverter;