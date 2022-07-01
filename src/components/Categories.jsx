import React from 'react';
import PropTypes from 'prop-types';
import { getCategories } from '../services/api';

export default class Categories extends React.Component {
    state ={
      listaCategoria: [],
    }

    async componentDidMount() {
      const listaCategoria = await getCategories();
      this.setState({ listaCategoria });
    }

    render() {
      const { listaCategoria } = this.state;
      const { clickCategory } = this.props;

      return (
        <section>
          {listaCategoria.map((categorie) => (
            <p key={ categorie.id }>
              <input
                data-testid="category"
                onClick={ clickCategory }
                value={ categorie.name }
                name={ categorie.id }
                type="button"
              />
            </p>
          ))}
        </section>
      );
    }
}

Categories.propTypes = {
  clickCategory: PropTypes.func.isRequired,
};
