/*
    Store picker
*/

import React from 'react';
import { History } from 'react-router'; //mixin
import h from '../helpers';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

@autobind
class StorePicker extends React.Component{

  goToStore(event) {
    event.preventDefault();

    //dohvati podatke sa inputa
    var storeId = this.refs.storeId.value;
    //preći sa store pickera na App
    this.history.pushState(null, '/store/' + storeId);

  }

  render(){
    return(
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Molim vas udite u ducan</h2>
          <input type="text" ref="storeId" defaultValue={h.getFunName()} required />
          <input type="submit" />
        </form>
    )
  }

}

reactMixin.onClass(StorePicker, History);

export default StorePicker;
