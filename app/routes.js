 // app/routes.js

	module.exports = function(app, passport) {
		// route for home page
	app.get('/', function(req, res) {
		res.sendfile('./public/views/login.html'); // supply full path cause sendfile does not use static folder concept.
		
	});

	// route for login form
	// route for processing the login form
	// route for signup form
	// route for processing the signup form

	// route for showing the profile page
	/*app.get('/login', isLoggedIn, function(req, res) {
		res.sendfile('./public/views/login.html');
			//user : req.user // get the user out of session and pass to template
	});*/

 	/*app.get('/login', function(req,res){
 		res.sendfile('./public/views/login.html');
 	});*/
 	
 	/*app.get('/views/:name', function(req,res){
 		var name = req.params.name;
 		res.render(name);
 	});*/

 	app.get('/home', function(req,res){
 		var userobj = {id 		: req.user.google.id,
		token	: req.user.google.token,
		email	: req.user.google.email,
		name	: req.user.google.name };
		console.log("data: " + JSON.stringify(userobj));
		req.session.user = userobj;
 		//$scope.myUser = req.user; // get the user out of session and pass to template
 		res.render('index',{title : 'title is working', myuser : userobj});
 		
 	});

    // route for logging out
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// facebook routes
	// twitter routes

	// =====================================
	// GOOGLE ROUTES =======================
	// =====================================
	// send to google to do the authentication
	// profile gets us their basic information including their name
	// email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/oauth2callback',
            passport.authenticate('google', {
                    successRedirect : '/home',
                    failureRedirect : '/'
            }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
