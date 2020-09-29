'use strict';

const mongoose = require('mongoose');
const {Schema} = mongoose;

const eventSchema = new Schema({
      Event_Name: {
        type: String,
        default: 'Event Name',
        required: 'Event name cannot be empty.'
      },
      Event_Description: {
        type: String,
        default: 'Event Description'
      },
      Event_Type: {
        type: String,
        default: 'Event Type',
        required: 'Event type cannot be empty.'
      },
      Event_Version: {
        type: Number,
        default: '0',
        required: 'Event version cannot be empty.'
      },
      Assessment_Date: {
        type: Date,
        default: Date.now,
        required: 'Assessment date cannot be empty.'
      },
      Organization_Name: {
        type: String,
        default: 'Organization Name',
        required: 'Organization name cannot be empty.'
      },
      Security_Classification: {
        type: String,
        default: 'Security Classification',
        required: "Security classification cannot be empty."
      },
      Event_Classification:{
        type: String,
        default: 'Event Classification',
        required: "Event classification cannot be empty."
      },
      Declassification_Date:{
        type: Date,
        default: Date.now,
        required: "Date cannot be empty."
      },
      Customer_Name: {
        type: String,
        required: "Customer name cannot be empty."
      },
      Archive_Status:{
        type: String,
        default: 'Archive',
        required: "Archive status cannot be empty."
      },
    },
    {collection: 'event'}
);

module.exports = mongoose.model('event',eventSchema);
