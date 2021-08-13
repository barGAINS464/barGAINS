import React from 'react';
import { Button, Card, Divider, Header, Icon, Image, Label, List, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ProfileCards extends React.Component {
  render() {
    return (
      <div>
        <Segment>
          <Label color='black' size='large' ribbon>Seller Contact</Label>
          <Card centered>
            <Card.Content>
              <Image size='medium rounded image' src={this.props.pc.profilePic} wrapped ui={true} centered/>
              <Header as='h1' textAlign='center'>{this.props.pc.firstName} {this.props.pc.lastName}</Header>
              <Divider />
              <List centered>
                <List.Item>
                  <List.Icon name='mail' />
                  <List.Content>{this.props.pc.email}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='phone' />
                  <List.Content>{this.props.pc.phone}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Content><Header as='h4'>Questionnaire: {this.props.pc.questionnaire}</Header></List.Content>
                </List.Item>
              </List>
            </Card.Content>
            <Card.Content>
              <Button compact as={Link} to={`/bprofile/${this.props.pc._id}`} color='teal' basic attached>
                <Button.Content><Icon name='eye'/>View Seller Page</Button.Content>
              </Button>
            </Card.Content>
          </Card>
        </Segment>
      </div>
    );
  }
}

// Require a document to be passed to this component.
ProfileCards.propTypes = {
  pc: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(ProfileCards);
