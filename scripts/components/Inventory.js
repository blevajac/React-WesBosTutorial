/*
    Inventory
*/
import React from 'react';
import AddFishForm from './AddFishForm';
import autobind from 'autobind-decorator';
import Firebase from 'firebase';
const ref = new Firebase('https://react-catch-of-the-day-66729.firebaseio.com/');

@autobind
class Inventory extends React.Component {

  constructor() {
    super();

    this.state = {
      uid: ''
    }
  }

  authenticate(provider) {
    console.log("Pokušaj Autentikacije sa " + provider);
    ref.authWithOAuthPopup(provider, this.authHandler);
  }

  componentWillMount() {
    console.log("Potrebno provjeriti dali možemo log-in");
    var token = localStorage.getItem('token');
    if(token) {
      ref.authWithCustomToken(token,this.authHandler);
    }
  }

  logout() {
    ref.unauth();
    localStorage.removeItem('token');
    this.setState({
      uid : null
    });
  }

  authHandler(err, authData) {
    if(err) {
      console.error(err);
      return;
    }

    // spremi Login token u browzeru
    localStorage.setItem('token',authData.token);

    const storeRef = ref.child(this.props.params.storeId);
    storeRef.on('value', (snapshot)=> {
      var data = snapshot.val() || {};

      // pospremi kao vlastit ako vlasnik ne postoji
      if(!data.owner) {
        storeRef.set({
          owner : authData.uid
        });
      }

      // update our state to reflect the current store owner and user
      this.setState({
        uid : authData.uid,
        owner : data.owner || authData.uid
      });

    });
  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Unseite vaše Login podatke kako bi mogli mijenjati stanje inventoria</p>
        <button className="github" onClick={this.authenticate.bind(this, 'github')}>Log In sa Github</button>
      </nav>
    )
  }

  renderInventory(key) {
    var linkState = this.props.linkState;
    return(
        <div className="fish-edit" key={key}>
            <input type="text" valueLink={linkState('fishes.' + key + '.name')} />
            <input type="text" valueLink={linkState('fishes.' + key + '.price')} />
            <select valueLink={linkState('fishes.'+ key +'.status')} >
              <option value="unavailable">Prodano</option>
              <option value="available">Vratia se Sime</option>
            </select>
            <textarea valueLink={linkState('fishes.' + key + '.desc')} ></textarea>
            <input type="text" valueLink={linkState('fishes.' + key + '.image')} />
            <button onClick={this.props.removeFish.bind(null, key)}>Obriši ribu</button>

        </div>
    );
  }

  render(){
    let logoutButton = <button onClick={this.logout}>Odjavi se!</button>

    //prvo provjeriti dali je korisnik već login
    if(!this.state.uid) {
      return (
        <div>{this.renderLogin()}</div>
      );
    }
    //provjeri dali je to stvaran korisnik ducana
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Oprostite, ali vi niste vlasnik ovog dućana</p>
          {logoutButton}
        </div>
      )
    }

    return(
      <div>
        <h2>Inventory</h2>
        {logoutButton}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        {/* addFish={this.addFish} sallje props dalje svojoj dijeci, no u slućau da inventori ima komponenti može se koristit spread operator {...this.props} */}
        <AddFishForm {...this.props} />
        <button onClick={this.props.loadSamples}>Popuni sa pripremljenim podacima riba</button>
      </div>
    );
  }

}

Inventory.propTypes = {
  addFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  fishes: React.PropTypes.object.isRequired,
  linkState: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired
}

export default Inventory;
