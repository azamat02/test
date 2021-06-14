import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

export default class PaymentForm extends React.Component {
    state = {
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    };

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        let { name, value } = e.target;

        if (name == "name"){
            this.setState({ [name]: value.toUpperCase() });
        }
        if (name == "expiry"){
            if (value.length == 2) {
                e.target.value = value + ' / '
            }
            if (value.length == 5) {
                e.target.value = value.substring(0, 2)
            }
            // Leave only numbers
            value = value.replace(/\D/g,'');
            this.setState({ [name]: value })
        }
        else {
            this.setState({ [name]: value });
        }
    }

    render() {
        return (
            <div id="PaymentForm" className="grid grid-cols-2 gap-4 pr-32">
                <Cards
                    cvc={this.state.cvc}
                    expiry={this.state.expiry}
                    focused={this.state.focus}
                    name={this.state.name}
                    number={this.state.number}
                />
                <form>
                    <input
                        className="border-gray-400 border-2 mt-2 focus:outline-none rounded-md py-2 block focus:ring-indigo-500 focus:border-indigo-500 w-full px-4 sm:text-md"
                        type="tel"
                        name="number"
                        maxLength='16'
                        placeholder="Card Number"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    />
                    <input
                        className="border-gray-400 mt-4 border-2 focus:outline-none rounded-md py-2 block focus:ring-indigo-500 focus:border-indigo-500 w-full px-4 sm:text-md"
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            className="border-gray-400 mt-4 border-2 focus:outline-none rounded-md py-2 focus:ring-indigo-500 focus:border-indigo-500 px-4 sm:text-md"
                            type="text"
                            name="expiry"
                            maxLength='7'
                            placeholder="Expire date"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                        />
                        <input
                            className="border-gray-400 mt-4 border-2 focus:outline-none rounded-md py-2 focus:ring-indigo-500 focus:border-indigo-500 px-4 sm:text-md"
                            type="password"
                            name="cvv"
                            maxLength='3'
                            placeholder="Expire date"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                        />
                    </div>
                </form>
            </div>
        );
    }
}
