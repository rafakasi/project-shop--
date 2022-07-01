import React from 'react';
import { Link } from 'react-router-dom';

export default class Cart extends React.Component {
  state = {
    cartProducts: [],
  };

  componentDidMount() {
    this.getProductsInStorage();
  }

  getProductsInStorage = () => {
    const productsInCart = JSON.parse(localStorage.getItem('Products_in_cart'));
    this.setState({
      cartProducts: productsInCart,
    });
  };

  amountSum = (index) => {
    const product = JSON.parse(localStorage.getItem('Products_in_cart'));
    if (product[index].amount < product[index].available_quantity) {
      product[index].amount += 1;
    }
    localStorage.setItem('Products_in_cart', JSON.stringify(product));
    this.getProductsInStorage();
  };

  amountSub = (index) => {
    const product = JSON.parse(localStorage.getItem('Products_in_cart'));
    if (product[index].amount > 1) {
      product[index].amount -= 1;
    }
    localStorage.setItem('Products_in_cart', JSON.stringify(product));
    this.getProductsInStorage();
  };

  render() {
    const { cartProducts, cartAmount } = this.state;
    return (
      <div>
        {!cartProducts ? (
          <div>
            <h1>Carrinho de Compras</h1>
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          </div>
        ) : (
          cartProducts.map((product, index) => (
            <div key={ product.id }>
              <p data-testid="shopping-cart-product-name">{product.title}</p>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>{ cartAmount }</p>
              <p>{`R$: ${product.price} `}</p>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ () => this.amountSub(index) }
              >
                -
              </button>
              <p data-testid="shopping-cart-product-quantity">
                {`Quantidade no carrinho: ${product.amount}`}
              </p>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ () => this.amountSum(index) }
              >
                +
              </button>
            </div>
          ))
        )}
        <div>
          <Link to="/checkout-products">
            <button data-testid="checkout-products" type="button">
              Finalizar compra
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
