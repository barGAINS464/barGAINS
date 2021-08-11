import React from 'react';
import { Card, Divider, Icon, Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileCards extends React.Component {

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header><Image src={this.props.profile.profilePic} wrapped ui={true} avatar/>{this.props.profile.firstName} {this.props.profile.lastName}</Card.Header>
          <Divider/>
          <Card.Meta>
          </Card.Meta>
          <Card.Description>
            <List>
              <List.Item> <Icon name='mail' />{this.props.profile.email}</List.Item>
              <List.Item><Icon name='phone' />{this.props.profile.phone}</List.Item>
              <List.Item><Link to={`/bprofile/${this.props.profile._id}`}>View User Page</Link></List.Item>
            </List>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ProfileCards.propTypes = {
  profile: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProfileCards);
