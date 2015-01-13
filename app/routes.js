module.exports = function(app, passport){

	// =====================================
    // HOME PAGE (with login links) ========
    // =====================================
	app.get('/', function(req, res){
		res.render('index.ejs');
	});
	// =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form

	app.get('/login',function(req, res){

		res.render('login.ejs', { message: req.flash('loginMessage')});

	});
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup',function(req, res){
    	res.render('signup.ejs',{ message: req.flash('signupMessage')});
    });
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res){
    	res.render('profile.ejs',{
    		user: req.user
    	});
    });
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout',function(req, rest){
    	req.logout();
    	res.redirect('/');
    });

    app.post('/signup',passport.authenticate('local-signup',{
    	successRedirect : '/profile',
    	failureRedirect : '/signup',
    	failureFlas: true
    }));

    app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
    }));


};

function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();


	res.redirect('/');
}