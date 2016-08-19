var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Init locals
	locals.section = 'videos';
	locals.page.title = 'Videos - NYCNode';
	locals.data = {
		videos: [],
	};
	
	// Load the posts
	view.on('init', function(next) {
		
		var q = keystone.list('Video').model.find().sort('sortOrder');
		
		q.exec((err, results) => {
			locals.data.videos = results;
			next(err);
		});
		
	});
	
	// Render the view
	view.render('site/videos');
	
}
