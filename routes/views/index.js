const keystone = require('keystone');
const moment = require('moment');

const Meetup = keystone.list('Meetup');
const RSVP = keystone.list('RSVP');
const Video = keystone.list('Video');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'home';
	locals.meetup = {};
	locals.page.title = 'Welcome to NYCNode';
	locals.videos = [];

	locals.rsvpStatus = {};

	locals.user = req.user;

	// Load the first, NEXT meetup

	view.on('init', function(next) {
		Meetup.model.findOne()
			.where('state', 'active')
			.sort('-startDate')
			.exec(function(err, activeMeetup) {
				locals.activeMeetup = activeMeetup;
				next();
			});
	});

	// Load the first, PAST meetup

	view.on('init', function(next) {
		Meetup.model.findOne()
			.where('state', 'past')
			.sort('-startDate')
			.exec(function(err, pastMeetup) {
				locals.pastMeetup = pastMeetup;
				next();
			});
	});

	// Load an RSVP
	view.on('init', function(next) {

		if (!req.user || !locals.activeMeetup) return next();

		RSVP.model.findOne()
			.where('who', req.user._id)
			.where('meetup', locals.activeMeetup)
			.exec(function(err, rsvp) {
				locals.rsvpStatus = {
					rsvped: rsvp ? true : false,
					attending: rsvp && rsvp.attending ? true : false
				}
				return next();
			});
	});

	// Load the three most recent videos

	view.on('init', function(next) {
		Video.model.find()
			.sort('-startDate')
			.limit(3)
			.exec(function(err, videos) {
				locals.videos = videos;
				next();
			});
	});

	// Decide which to render
	view.on('render', function(next) {
		locals.meetup = locals.activeMeetup || locals.pastMeetup;
		if (locals.meetup) {
			locals.meetup.populateRelated('talks[who] rsvps[who]', next);
		} else {
			next();
		}
	});
	
	view.render('site/index');
}
