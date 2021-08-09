import React from 'react';
import { Divider, Grid, Header, Image, List, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class MainProfile extends React.Component {

  render() {
    return (
      <div>
        <Grid columns={2} divided>
          <Grid.Column>
            <Image size='medium rounded image' src={this.props.info.profilePic} wrapped ui={true} centered/>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Header as='h1' textAlign='center'>{this.props.info.firstName} {this.props.info.lastName}</Header>
              <Divider />
              <List centered>
                <List.Item>
                  <List.Icon name='mail' />
                  <List.Content>{this.props.info.email}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='phone' />
                  <List.Content>{this.props.info.phone}</List.Content>
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// Require a document to be passed to this component.
MainProfile.propTypes = {
  info: PropTypes.object.isRequired,
};

export default withRouter(MainProfile);
