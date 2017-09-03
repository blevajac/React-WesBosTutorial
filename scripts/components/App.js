/*
    App
*/

import React from 'react';

import Catalyst from 'react-catalyst';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

// Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://react-catch-of-the-day-66729.firebaseio.com/');
// VRATI AUTENTIKACIJU NATRAG NA FIREBASE

//Components
import Header from './Header';
import Fish from './Fish';
import Order from './Order';
import Inventory from './Inventory';

@autobind
class App extends React.Component{

    constructor(){
      super();

      this.state = {
          fishes: {},
          order: {}
      }
    }

    componentDidMount() {
        base.syncState(this.props.params.storeId + '/fishes', {
            context: this,
            state: 'fishes'
        });

        var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);

        if(localStorageRef){
          //update komponent od state da bude jednak sa onim u cemu je localStorage
          this.setState({
              order: JSON.parse(localStorageRef)
          });
        }
    }

    componentWillUpdate(nextProps, nextState){
      localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
    }

    addToOrder(key) {
      //postavlja sebe na +1 ako postoji narudžba, ako ne postoji onda je 1
      this.state.order[key] = this.state.order[key] + 1 || 1;
      this.setState({ orderr: this.state.order })
    }

    removeFromOrder(key) {
      delete this.state.order[key];
      this.setState({
        order : this.state.order
      });
    }

    addFish(fish) {
      //izrada id za svaku ribu pomoću timestampa -> ubudećo preporućljivo koristiti UUID npm
      var timestamp = (new Date()).getTime();

      //update state objekt
      this.state.fishes['fish-' + timestamp] = fish;

      //setState
      this.setState({ fishes: this.state.fishes });
    }

    removeFish(key) {
      if(confirm('jeste li sigurni da zelite izbrisati ribu')){
        this.state.fishes[key] = null;
        this.setState({
            fishes: this.state.fishes
        });
      }
    }

    loadSamples() {
      //funkcija za  popunjavanje stata sa već postojećim podacima
      this.setState ({
          fishes: require('../sample-fishes')
      });
    }

    renderFish(key) {
      return(
        <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
      )
    }

    render() {
      return (
          <div className="catch-of-the-day">
            <div className="menu">
              <Header tagline="Friski Morski Proizvodi" />
              <ul className="list-of-fishes">
                {Object.keys(this.state.fishes).map(this.renderFish)}
              </ul>
            </div>
            <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
            <Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} linkState={this.linkState.bind(this)} removeFish={this.removeFish} {...this.props}/>
          </div>
      );
    }

}

reactMixin.onClass(App, Catalyst.LinkedStateMixin);

export default App;
