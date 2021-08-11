import React from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Answers } from '../../api/answer/Answers';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Answer extends React.Component {
  removeItem(docID) {
    Answers.collection.remove(docID);
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.answers.question1}</Table.Cell>
        <Table.Cell>{this.props.answers.question2}</Table.Cell>
        <Table.Cell>{this.props.answers.question3}</Table.Cell>
        <Table.Cell>{this.props.answers.question4}</Table.Cell>
        <Table.Cell>
          <Button icon onClick={() => this.removeItem(this.props.answers._id)}>
            <Icon name = "trash" />
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
Answer.propTypes = {
  answers: PropTypes.object.isRequired,
  // Products: PropTypes.object.isRequired,
};
// Products.propTypes = {
//  product: PropTypes.shape({
//    title: PropTypes.string,
//    cost: PropTypes.number,
//    email: PropTypes.string,
//    // closingDate: PropTypes.string,
//    condition: PropTypes.string,
//    description: PropTypes.string,
//  }).isRequired,
//
// };
// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Answer);
