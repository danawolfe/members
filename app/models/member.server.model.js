'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Member Schema
 */
var MemberSchema = new Schema({
	namePrefix: {
		type: String,
		default: '',
		trim: true
	},
	firstName: {
		type: String,
		default: '',
		trim: true
	},
	middleName: {
		type: String,
		default: '',
		trim: true
	},
	lastName: {
		type: String,
		default: '',
		trim: true
	},	
	nameSuffix: {
		type: String,
		default: '',
		trim: true
	},
	email: {
		type: String,
		default: '',
		trim: true
	},
	phoneHome: {
		type: String,
		default: '',
		trim: true
	},
	phoneMobile: {
		type: String,
		default: '',
		trim: true
	},
	street1: {
		type: String,
		default: '',
		trim: true
	},
	street2: {
		type: String,
		default: '',
		trim: true
	},
	POBox: {
		type: String,
		default: '',
		trim: true
	},
	city: {
		type: String,
		default: '',
		trim: true
	},
	region: {
		type: String,
		default: '',
		trim: true
	},
	postalCode: {
		type: String,
		default: '',
		trim: true
	},
	country: {
		type: String,
		default: '',
		trim: true
	},
	notes: {
		type: String,
		default: '',
		trim: true
	},
	memberType: {
		type: String, enum: ['Parent','Family','Friend','Honorary','Cadet','Graduate'],
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Member', MemberSchema);