import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The AnswersCollection. It encapsulates state and variable values for stuff.
 */
class AnswersCollection {
  constructor() {
    // The name of this collection.
    this.name = 'AnswersCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      question1: {
        type: String,
        allowedValues: ['Yes', 'No'],
      },
      question2: {
        type: String,
        allowedValues: ['Yes', 'No'],
      },
      question3: {
        type: String,
        allowedValues: ['Yes', 'No'],
      },
      question4: {
        type: String,
        allowedValues: ['Yes', 'No'],
      },
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the AnswersCollection.
 * @type {AnswersCollection}
 */
export const Answers = new AnswersCollection();
