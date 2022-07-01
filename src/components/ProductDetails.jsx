import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getDetailsProductId } from '../services/api';

export default class ProductDetails extends React.Component {
    state = {
      detailsProduct: [],
      email: '',
      nota: '',
      resenha: '',
      comments: [],
      qttCart: 0,
      freeShipping: false,
    };

    async componentDidMount() {
      this.getCommentsLocalStorage();
      this.amountCart();
      await this.getDetails();
    }

    getDetails = async () => {
      const { match: { params: { id } } } = this.props;
      const detailsProduct = await getDetailsProductId(id);
      this.setState({
        detailsProduct,
        freeShipping: detailsProduct.shipping.free_shipping,
      });
    };

    getCommentsLocalStorage = () => {
      const comment = JSON.parse(localStorage.getItem('Comments_details_product'));
      this.setState({
        comments: comment,
      });
    }

    setCommentsLocalStorage = (productId) => {
      const comment = JSON.parse(localStorage.getItem('Comments_details_product'));
      if (!comment) {
        return localStorage
          .setItem('Comments_details_product', JSON.stringify([productId]));
      }
      if (comment.length > 0) {
        return localStorage
          .setItem('Comments_details_product', JSON
            .stringify([...comment, productId]));
      }
    }

    saveComment = () => {
      const { email, nota, resenha } = this.state;
      const comentario = { email, nota, resenha };
      this.setCommentsLocalStorage(comentario);
      this.setState({
        email: '',
        nota: '',
        resenha: '',
      }, () => this.getCommentsLocalStorage());
    }

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({
        [name]: value,
      });
    }

    setProductsCartLocalStorage = (cartProduct) => {
      const cartStorage = JSON.parse(localStorage.getItem('Products_in_cart'));
      if (!cartStorage) {
        cartProduct.amount = 1;
        localStorage.setItem('Products_in_cart', JSON.stringify([cartProduct]));
      } else if (cartStorage.some((product) => cartProduct.id === product.id)) {
        const index = cartStorage.findIndex((products) => cartProduct.id === products.id);
        cartStorage[index].amount += 1;
        localStorage.setItem('Products_in_cart', JSON.stringify([...cartStorage]));
      } else if (cartStorage.length > 0) {
        cartProduct.amount = 1;
        localStorage.setItem('Products_in_cart',
          JSON.stringify([...cartStorage, cartProduct]));
      }
      return this.amountCart();
    };

    amountCart = () => {
      const productsInCart = JSON.parse(localStorage.getItem('Products_in_cart'));
      const validCart = productsInCart === null ? [] : productsInCart;
      const soma = validCart
        .reduce((acc, value) => { acc += Number(value.amount); return acc; }, 0);
      console.log(soma);
      this.setState({
        qttCart: soma,
      });
    }

    render() {
      const { detailsProduct, comments, resenha, email,
        qttCart, freeShipping } = this.state;

      return (
        <div>
          <h1>Detalhes</h1>
          <Link data-testid="shopping-cart-button" to="/cart">
            Carrinho
            <p data-testid="shopping-cart-size">{ qttCart }</p>
          </Link>
          <h3 data-testid="product-detail-name">{ detailsProduct.title }</h3>
          {freeShipping && <p data-testid="free-shipping">Frete Gratis</p>}
          <p>
            R$:
            {' '}
            { detailsProduct.price }
          </p>
          <img src={ detailsProduct.thumbnail } alt={ detailsProduct.title } />
          <p>{ detailsProduct.warranty }</p>
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ () => this.setProductsCartLocalStorage(detailsProduct) }
          >
            Adicionar ao carrinho

          </button>
          <div>
            <form>
              <label htmlFor="email">
                Email:
                <input
                  type="email"
                  id="email"
                  value={ email }
                  name="email"
                  data-testid="product-detail-email"
                  onChange={ this.handleChange }
                />
              </label>
              <input
                type="radio"
                value="1"
                name="nota"
                id="nota"
                data-testid="1-rating"
                onChange={ this.handleChange }
              />
              1
              <input
                type="radio"
                value="2"
                name="nota"
                id="nota"
                data-testid="2-rating"
                onChange={ this.handleChange }
              />
              2
              <input
                type="radio"
                value="3"
                name="nota"
                id="nota"
                data-testid="3-rating"
                onChange={ this.handleChange }
              />
              3
              <input
                type="radio"
                value="4"
                name="nota"
                id="nota"
                data-testid="4-rating"
                onChange={ this.handleChange }
              />
              4
              <input
                type="radio"
                value="5"
                name="nota"
                id="nota"
                data-testid="5-rating"
                onChange={ this.handleChange }
              />
              5
              <label htmlFor="resenha">
                Resenha:
                <textarea
                  id="resenha"
                  name="resenha"
                  value={ resenha }
                  data-testid="product-detail-evaluation"
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="button"
                data-testid="submit-review-btn"
                onClick={ this.saveComment }
              >
                Enviar avaliação

              </button>
            </form>
            {!comments ? (null) : comments.map((productId) => (
              <div key={ productId.email }>
                <p>{ productId.email }</p>
                <p>{ productId.nota }</p>
                <p>{ productId.resenha }</p>
              </div>
            ))}

          </div>
        </div>
      );
    }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
