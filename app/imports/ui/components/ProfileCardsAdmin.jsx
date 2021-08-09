import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
class ProfileCardsAdmin extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.profiles.firstName}</Table.Cell>
        <Table.Cell>{this.props.profiles.lastName}</Table.Cell>
        <Table.Cell>{this.props.profiles.phone}</Table.Cell>
        <Table.Cell>{this.props.profiles.owner}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
ProfileCardsAdmin.propTypes = {
  profiles: PropTypes.object.isRequired,
};

export default ProfileCardsAdmin;
