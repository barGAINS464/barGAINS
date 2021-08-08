import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profile';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addProfile(data) {
  console.log(`  Adding: ${data.firstName} (${data.owner})`);
  Profiles.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfile) {
    console.log('Creating default profile.');
    Meteor.settings.defaultProfile.map(data => addProfile(data));
  }
}
