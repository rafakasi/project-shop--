import React from 'react';
import { Link } from 'react-router-dom';
import Categories from './Categories';
import ListProducts from './ListProducts';
import { getProductsFromCategoryAndQuery, getClickCategories } from '../services/api';

export default class Home extends React.Component {
    state = {
      nome: '',
      listaProdutos: [],
      qttCart: 0,
    }

    componentDidMount() {
      this.amountCart();
    }

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({
        [name]: value,
      });
    }

    searchProducts = async () => {
      const { nome } = this.state;
      const listaProdutos = await getProductsFromCategoryAndQuery('', nome);
      this.setState({
        listaProdutos: listaProdutos.results,
      });
    }

    clickCategory = async ({ target }) => {
      const { name } = target;
      const productsCat = await getClickCategories(name);
      this.setState({ listaProdutos: productsCat.results });
    }

    setProductsCartLocalStorage = (cartProduct) => {
      const cartStorage = JSON.parse(localStorage.getItem('Products_in_cart'));
      if (!cartStorage) {
        cartProduct.amount = 1;
        localStorage.setItem('Products_in_cart', JSON.stringify([cartProduct]));
        return this.amountCart();
      }
      if (cartStorage.some((product) => cartProduct.id === product.id)) {
        const index = cartStorage.findIndex((products) => cartProduct.id === products.id);
        cartStorage[index].amount += 1;
        localStorage.setItem('Products_in_cart', JSON.stringify([...cartStorage]));
        return this.amountCart();
      }
      if (cartStorage.length > 0) {
        cartProduct.amount = 1;
        localStorage.setItem('Products_in_cart',
          JSON.stringify([...cartStorage, cartProduct]));
        return this.amountCart();
      }
    };

    amountCart = () => {
      const productsInCart = JSON.parse(localStorage.getItem('Products_in_cart'));
      const validCart = productsInCart === null ? [] : productsInCart;
      const soma = validCart
        .reduce((acc, value) => { acc += Number(value.amount); return acc; }, 0);
      this.setState({
        qttCart: soma,
      });
    }

    render() {
      const { listaProdutos, qttCart } = this.state;
      return (
        <div>
          <input
            data-testid="query-input"
            type="text"
            name="nome"
            onChange={ this.handleChange }
          />
          <button
            onClick={ this.searchProducts }
            data-testid="query-button"
            type="submit"
          >
            Pesquisar
          </button>
          <Link data-testid="shopping-cart-button" to="/cart">
            Carrinho
            <p data-testid="shopping-cart-size">{ qttCart }</p>
          </Link>
          <h1 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
          <Categories clickCategory={ this.clickCategory } />
          <section>
            {listaProdutos.length === 0
            && <p>Nenhum produto foi encontrado</p>}
            {listaProdutos.map((product) => (
              <ListProducts
                key={ product.id }
                setProductsCartLocalStorage={
                  () => this.setProductsCartLocalStorage(product)
                }
                id={ product.id }
                title={ product.title }
                thumbnail={ product.thumbnail }
                price={ product.price }
                free={ product.shipping.free_shipping }
              />))}
          </section>
        </div>
      );
    }
}
