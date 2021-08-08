import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = {
      padding: '40px 0 40px 0',
      color: 'white' };
    return (
      <footer>
        <div style={divStyle} className="ui center aligned container">
              barGAINS <br />
              Developed by<br />
              Alyssandra Cabading, Tyler Chinen, Austin Chong, Glen Larita <br />
        </div>
      </footer>
    );
  }
}

export default Footer;
