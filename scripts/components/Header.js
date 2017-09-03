/*
    Header
*/

import React from 'react';

class Header extends React.Component {
  render() {
    console.log(this.props);
    return(
      <header className="top">
        <h1>
            Ulov
            <span className="ofThe">
              <span className="of">**</span>
              <span className="the">**</span>
            </span>
            dana
        </h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    );
  }
}

Header.propTypes = {
  tagline: React.PropTypes.string.isRequired
}

export default Header;
