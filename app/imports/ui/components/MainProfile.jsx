import React from 'react';
import { Grid, Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class MainProfile extends React.Component {
  removeItem(InfoID) {
    this.props.profiles.collection.remove(InfoID);
  }

  render() {
    return (
      <Grid id='my-profile' verticalAlign='middle' textAlign='center' container>
        <Item.Group>
          <Item>
            <Item.Image size='medium' src={this.props.info.image} />
            <Item.Content>
              <Item.Header textAlign={'left'}>{this.props.info.firstName} {this.props.info.lastName}</Item.Header>
              <Item.Meta>
                <span className='email'>{this.props.info.email}</span>
              </Item.Meta>
            </Item.Content>
          </Item>
          <Item>
            <Link to={`/edit/${this.props.info._id}`}>Edit</Link>
          </Item>
        </Item.Group>
      </Grid>
    );
  }
}

MainProfile.propTypes = {
  info: PropTypes.object.isRequired,
  profiles: PropTypes.object.isRequired,
};

export default withRouter(MainProfile);
