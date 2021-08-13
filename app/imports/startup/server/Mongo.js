import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profiles';
import { Items } from '../../api/item/Items';
import { Answers } from '../../api/answer/Answers';
import { Reviews } from '../../api/review/Reviews';

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
function addReviews(data) {
  console.log(`  Adding: Reviews (${data.owner})`);
  Reviews.collection.insert(data);
}
// Initialize the ItemsCollection, ProfilesCollection, AnswersCollection, and ReviewsCollection if empty.
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

if (Reviews.collection.find().count() === 0) {
  if (Meteor.settings.defaultReviews) {
    console.log('Creating default reviews.');
    Meteor.settings.defaultReviews.map(data => addReviews(data));
  }
}
