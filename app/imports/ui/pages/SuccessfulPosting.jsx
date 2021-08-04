import React from 'react';
import { Container } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class SuccessfulPosting extends React.Component {
  render() {
    return (
      <Container>
        <h1>Your item has been successfully posted!</h1><br/>
        <h3>Users will now be able to see your item for sale</h3>
      </Container>
    );
  }
}
