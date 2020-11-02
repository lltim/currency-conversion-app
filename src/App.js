import React, { useEffect, useState } from 'react';
import './index.css';
import './App.css';
import CurrencyRow from './CurrencyRow'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'

const BASE_URL = 'https://api.exchangeratesapi.io/latest'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })
  }, [])

  useEffect(() => {
    if (fromCurrency === toCurrency && fromCurrency!= null) {
      setExchangeRate(1)
    } else if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <div className='App'>
      <header className='App-header'>
      <Container>
        <h1>Currency Converter</h1>
        <Row>
          <Col>
            <h2>From</h2>
            <CurrencyRow 
              currencyOptions={currencyOptions}
              selectedCurrency={fromCurrency}
              onChangeCurrency={e => setFromCurrency(e.target.value)}
              onChangeAmount={handleFromAmountChange}
              amount={fromAmount}
            />
          </Col>
          <Col className='arrow-div'>
            <i class="fas fa-long-arrow-alt-right"></i>
            <i class="fas fa-long-arrow-alt-left"></i>
          </Col>
          <Col>
            <h2>To</h2>
            <CurrencyRow 
              currencyOptions={currencyOptions}
              selectedCurrency={toCurrency}
              onChangeCurrency={e => setToCurrency(e.target.value)}
              onChangeAmount={handleToAmountChange}
              amount={toAmount}
            />
          </Col>
        </Row>
      </Container>
      </header>
    </div>
  );
}

export default App;
