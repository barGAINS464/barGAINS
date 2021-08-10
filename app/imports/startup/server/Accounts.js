import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */
// disabled as eslint was providing an warning stating that there were unexpected console statements on lines 8, 28, adn 31.

function createUser(email, password, role, firstName, lastName, phone) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
    profile: {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    },
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

// When running app for first time, pass a settings file to set up a default user account.
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, password, role, firstName, lastName, phone }) => createUser(email, password, role, firstName, lastName, phone));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
