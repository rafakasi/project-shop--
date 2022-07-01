import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ListProducts extends React.Component {
  render() {
    const { title, price, thumbnail, id, setProductsCartLocalStorage, free } = this.props;
    return (
      <div data-testid="product">
        <Link data-testid="product-detail-link" to={ `/productdetails/${id}` }>
          <p>{ title }</p>
          <img src={ thumbnail } alt={ title } />
        </Link>
        <p>{ price }</p>
        { free && <p data-testid="free-shipping">Frete Gratis</p> }
        <button
          data-testid="product-add-to-cart"
          onClick={ setProductsCartLocalStorage }
          type="button"
        >
          Adicionar ao carrinho

        </button>
      </div>
    );
  }
}

ListProducts.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  free: PropTypes.string,
  price: PropTypes.number,
}.isRequired;

export default ListProducts;
