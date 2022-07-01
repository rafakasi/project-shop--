import React, { Component } from 'react';

class Checkout extends Component {
  render() {
    return (
      <form>
        <label htmlFor="fullname">
          Nome Completo:
          <input
            type="text"
            id="fullname"
            name="fullname"
            data-testid="checkout-fullname"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            data-testid="checkout-email"
          />
        </label>
        <label htmlFor="cpf">
          CPF:
          <input
            type="text"
            id="cpf"
            name="cpf"
            data-testid="checkout-cpf"
          />
        </label>
        <label htmlFor="telefone">
          Telefone:
          <input
            type="text"
            id="telefone"
            name="telefone"
            data-testid="checkout-phone"
          />
        </label>
        <label htmlFor="cep">
          CEP:
          <input
            type="text"
            id="cep"
            name="cep"
            data-testid="checkout-cep"
          />
        </label>
        <label htmlFor="endereço">
          Endereço:
          <input
            type="text"
            id="endereço"
            name="endereço"
            data-testid="checkout-address"
          />
        </label>
      </form>
    );
  }
}

export default Checkout;
