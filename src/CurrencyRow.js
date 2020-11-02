import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'

export default function CurrencyRow(props) {
    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
    } = props

    return (
        <div className='currencyRow'>
            <InputGroup>
                <input type='number' className='input' value={amount} onChange={onChangeAmount} />
                <select value={selectedCurrency} onChange={onChangeCurrency}>
                    {currencyOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </InputGroup>
        </div>
    )
}
