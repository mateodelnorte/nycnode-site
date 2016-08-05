var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Video Comments Model
 * ===================
 */

var VideoComment = new keystone.List('VideoComment', {
	nocreate: true
});

VideoComment.add({
	video: { type: Types.Relationship, ref: 'Video', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	date: { type: Types.Date, default: Date.now, index: true },
	content: { type: Types.Markdown }
});


/**
 * Registration
 * ============
 */

VideoComment.defaultColumns = 'video, author, date|20%';
VideoComment.register();
