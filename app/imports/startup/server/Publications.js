import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Items } from '../../api/item/Items';
import { Profiles } from '../../api/profile/Profiles';
import { Answers } from '../../api/answer/Answers';
import { Reviews } from '../../api/review/Reviews';

/** User-level publication. */
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Items.userPublicationName, function () {
  if (this.userId) {
    return Items.collection.find({ });
  }
  return this.ready();
});

Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    return Profiles.collection.find({ });
  }
  return this.ready();
});

Meteor.publish(Answers.userPublicationName, function () {
  if (this.userId) {
    return Answers.collection.find({ });
  }
  return this.ready();
});

Meteor.publish(Reviews.userPublicationName, function () {
  if (this.userId) {
    return Reviews.collection.find({ });
  }
  return this.ready();
});

/** Admin-level publication. */
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Items.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Items.collection.find();
  }
  return this.ready();
});

Meteor.publish(Profiles.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Profiles.collection.find();
  }
  return this.ready();
});

Meteor.publish(Answers.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Answers.collection.find();
  }
  return this.ready();
});

Meteor.publish(Reviews.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Reviews.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
