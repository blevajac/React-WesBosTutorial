/*
    Fish komponenta
*/

import React from 'react';
import h from '../helpers';
import autobind from 'autobind-decorator';

@autobind
class Fish extends React.Component{

    onButtonClick() {
      console.log('Dodaje se riba', this.props.index);
      //this.props.addToOrder(this.props.index); ili
      var key = this.props.index;
      this.props.addToOrder(key);

    }

    render() {
      var details = this.props.details;
      var isAvailable = (details.status === 'available' ? true : false);
      //gumb koji će biti skriven kada ribe nema na stanju (prodana) (isAvailable === false);
      var buttonText = (isAvailable ? 'Dodaj na narudžbu' : 'Prodano');

      return(
        <li className="menu-fish">
          <img src={details.image} alt={details.name} />
          <h3 className="fish-name">
            {details.name}
            <span className="price">{h.formatPrice(details.price)}</span>
          </h3>
          <p>{details.desc}</p>
          <button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
        </li>
      );
    }

}

export default Fish;
