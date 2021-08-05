import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The ProfileAccountsCollection.
 */
class ProfileAccountsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfileAccountsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      date: Date,
      phoneAreaCode: Number,
      phoneMid: Number,
      phoneLast: Number,
      username: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ProfileAccounts Collection.
 * @type {ProfileAccountsCollection}
 */
export const ProfileAccounts = new ProfileAccountsCollection();
