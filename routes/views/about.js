var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.section = 'about';
	locals.page.title = 'NYC Node - The NYC Node.js Meetup - About';
	
	locals.organisers = [
		{ name: 'Matt Walters', image: 'https://avatars3.githubusercontent.com/u/554847?v=3&s=460', twitter: 'mateodelnorte',       title: 'Lead Organizer' },
		// { name: 'Thinkmill', image: '/images/organiser-thinkmill.jpg',     twitter: 'thethinkmill', title: 'Site coordinator' },
		// { name: 'Gil Davidson',     image: '/images/organiser-gil_davidson.jpg',     twitter: 'iamnotyourbroom',   title: 'Atlassian coordinator' },
		// { name: 'Adam Ahmed',    image: '/images/organiser-adam_ahmed.jpg',    twitter: 'hitsthings',   title: 'Atlassian coordinator' },
		// { name: 'Lachlan Hardy', image: '/images/organiser-lachlan_hardy.jpg', twitter: 'lachlanhardy', title: 'Community coordinator' }
	]
	
	view.render('site/about');
	
}
