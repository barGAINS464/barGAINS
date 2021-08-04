import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '40px 0 40px 0' };
    return (
      <footer>
        <div style={divStyle} className="ui center aligned container">
          <hr />
              barGAINS<br />
              Developed by:<br />
              Alyssandra Cabading, Tyler Chinen, Austin Chong, and Glen Larita<br />
        </div>
      </footer>
    );
  }
}

export default Footer;
