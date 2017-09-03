/*
    Add fish form
*/

import React from 'react';
import autobind from 'autobind-decorator';

@autobind
class AddFishForm extends React.Component{

  createFish(event){
      //1. Zaustavi formu da se submita
      event.preventDefault();
      //2. Uzmi podatke iz forme i napravi objekt od njih
      var fish = {
        name:   this.refs.name.value,
        price:  this.refs.price.value,
        status: this.refs.status.value,
        desc:   this.refs.desc.value,
        image:  this.refs.image.value
      }

      //3. Dodaj ribu na App state
      this.props.addFish(fish);
      this.refs.fishForm.reset();
  }

  render(){
    return(
        <form className="fish-edit" ref="fishForm" onSubmit={this.createFish} >
          <input type="text" ref="name" placeholder="Naziv ribe" />
          <input type="text" ref="price" placeholder="Cijena ribe" />
          <select ref="status">
            <option value="available">Vratia se Šime!</option>
            <option value="unavailable">Prodano!</option>
          </select>
          <textarea type="text" ref="desc" placeholder="Desc"></textarea>
          <input type="text" ref="image" placeholder="URL slike" />
          <button type="submit">Dodaj Ribu</button>
        </form>
    );
  }

}

export default AddFishForm;
