import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profiles';
import { Items } from '../../api/item/Items';

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

// Initialize the ItemsCollection and ProfilesCollection if empty.
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
