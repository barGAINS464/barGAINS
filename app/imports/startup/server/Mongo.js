import { Meteor } from 'meteor/meteor';
import { Items } from '../../api/item/Items.js';
// import { ProfileAccounts } from '../../api/profile/ProfileAccount';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addItem(data) {
  console.log(`  Adding: ${data.title} (${data.email})`);
  Items.collection.insert(data);
  // ProfileAccounts.collection.insert(data);
}

// Initialize the ItemsCollection if empty.
if (Items.collection.find().count() === 0) {
  if (Meteor.settings.defaultItems) {
    console.log('Creating default items.');
    Meteor.settings.defaultItems.map(data => addItem(data));
  }
}
