var _ = require('lodash');
var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Videos Model
 * ===========
 */

var Video = new keystone.List('Video', {
	track: true,
	sortable: true,
	sortContext: 'Meetup:videos',
	autokey: { path: 'key', from: 'name', unique: true }
});

Video.add({
  externalId: { type: String, wysiwyg: true },
	externalVideoId: { type: String, wysiwyg: true },
	description: { type: Types.Html, wysiwyg: true },
	images: {
		thumbnail: {
			desktop: { type: String, wysiwyg: true },
			mobile: { type: String, wysiwyg: true },
		}, 
	},
	state: { type: String, wysiwyg: true },
	title: { type: String, wysiwyg: true },
});

/**
 * Relationships
 * =============
 */

Video.relationship({ ref: 'VideoComment', refPath: 'video', path: 'comments' });

/**
 * Registration
 * ============
 */

Video.defaultColumns = 'title|20%, description|20%';
Video.register();
