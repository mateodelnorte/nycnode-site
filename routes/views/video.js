var keystone = require('keystone');

var Video = keystone.list('Video');
// var PostComment = keystone.list('PostComment');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// Init locals
	locals.section = 'videos';
	locals.filters = {
		video: req.params.video
	};

	view.on('init', function(next) {

		Video.model.findOne()
			.where('key', locals.filters.video)
			.exec(function(err, video) {

				if (err) return res.err(err);
				if ( ! video) return res.notfound('Video not found');

				// Allow admins or the author to see draft posts
				if (video.state == 'published' || (req.user && req.user.isAdmin) || (req.user && video.author && (req.user.id == video.author.id))) {
					locals.video = video;
					locals.page.title = `NYCNode - ${video.title}`;
				} else {
					return res.notfound('Video not found');
				}

				next();

			});

	});

	// Load recent videos
	// view.query('data.videos',
	// 	Video.model.find()
	// 		.where('state', 'published')
	// 		.sort('-publishedDate')
	// );

	// view.on('post', { action: 'create-comment' }, function(next) {

	// 	// handle form
	// 	var newPostComment = new PostComment.model({
	// 			post: locals.post.id,
	// 			author: locals.user.id
	// 		}),
	// 		updater = newPostComment.getUpdateHandler(req, res, {
	// 			errorMessage: 'There was an error creating your comment:'
	// 		});

	// 	updater.process(req.body, {
	// 		flashErrors: true,
	// 		logErrors: true,
	// 		fields: 'content'
	// 	}, function(err) {
	// 		if (err) {
	// 			locals.validationErrors = err.errors;
	// 		} else {
	// 			req.flash('success', 'Your comment has been added successfully.');
	// 			return res.redirect('/blog/post/' + locals.post.slug);
	// 		}
	// 		next();
	// 	});

	// });

	// Render the view
	view.render('site/video');

}
