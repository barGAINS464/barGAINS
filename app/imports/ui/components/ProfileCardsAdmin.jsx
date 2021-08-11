import React from 'react';
import { Card, Divider, Icon, Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListItemsAdmin.jsx. */
class ProfileCardsAdmin extends React.Component {
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
            </List>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
ProfileCardsAdmin.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileCardsAdmin;
