import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profiles';
import { Items } from '../../api/item/Items';
import { Answers } from '../../api/answer/Answers';

/* eslint-disable no-console */
// disabled as eslint was providing warnings about unexpected console statements.

// Initialize the database with a default data document.
function addItem(data) {
  console.log(`  Adding: ${data.title} (${data.email})`);
  Items.collection.insert(data);
}
function addProfile(data) {
  console.log(`  Adding: ${data.firstName} (${data.email})`);
  Profiles.collection.insert(data);
}
function addAnswers(data) {
  console.log(`  Adding: Questionnaire (${data.owner})`);
  Answers.collection.insert(data);
}
// Initialize the ItemsCollection, ProfilesCollection, and AnswersCollection if empty.
if (Items.collection.find().count() === 0) {
  if (Meteor.settings.defaultItems) {
    console.log('Creating default items.');
    Meteor.settings.defaultItems.map(data => addItem(data));
  }
}

if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.map(data => addProfile(data));
  }
}

if (Answers.collection.find().count() === 0) {
  if (Meteor.settings.defaultAnswers) {
    console.log('Creating default answers.');
    Meteor.settings.defaultAnswers.map(data => addAnswers(data));
  }
}
