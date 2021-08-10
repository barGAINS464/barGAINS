import React from 'react';
import { Card, Image, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProductShop extends React.Component {

  render() {
    return (
      <Card centered>
        <Card.Content>
          <Image className='cardImage' src={this.props.product.image} wrapped ui={true} rounded/>
          <Divider/>
          <Card.Header className='cardSpace'> {this.props.product.title} ${this.props.product.cost} </Card.Header>
          <Divider/>
          <Card.Meta>
              Contact: {this.props.product.email}
          </Card.Meta>
          <Card.Meta>
            Category: {this.props.product.category}
          </Card.Meta>
          <Card.Description>
            <b>Condition:</b> &nbsp; {this.props.product.condition}
          </Card.Description>
          <Card.Description>
            <b>Description:</b> &nbsp; {this.props.product.description}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ProductShop.propTypes = {
  product: PropTypes.object.isRequired,
  Products: PropTypes.object.isRequired,
};
// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProductShop);
