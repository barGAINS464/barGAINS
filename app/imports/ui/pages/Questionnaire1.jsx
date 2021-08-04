import React from 'react';
import { Grid, Button } from 'semantic-ui-react';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    return (
      <Grid celled>
        <Grid.Row>
          <Grid.Column width={3}>
            <h1>Questionnaire</h1><br/>
            <h4>Before proceeding, please fill out this COVID-19 questionnaire for safety purposes. Once completed, the seller will receive your questionnaire and determine if it is safe to meet.</h4>
          </Grid.Column>
          <Grid.Column width={13}>
            <h2>Are you isolating or quarantining because you tested positive for COVID-19 or are you worried that you may be sick or exposed to COVID-19?</h2>
            <Button>Yes</Button>
            <Button>No</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
