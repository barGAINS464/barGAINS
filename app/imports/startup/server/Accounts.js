import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(email, password, role, firstName, lastName, phone) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
    profile: {
      name1: firstName,
      name2: lastName,
      phoneNumber: phone,
    },
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccount) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccount.map(({ email, password, role, name1, name2, phoneNumber }) => createUser(email, password, role, name1, name2, phoneNumber));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
