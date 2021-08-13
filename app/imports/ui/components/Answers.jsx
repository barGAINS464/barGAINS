import React from 'react';
import { Button, Icon, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Answers } from '../../api/answer/Answers';

/** Renders a single row in the questionnaire table. See pages/MyProfile.jsx for example */
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
};

export default withRouter(Answer);
