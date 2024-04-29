const express = require('express');
const router = express.Router();
const userModel = require("./users");
const passport = require('passport');
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));

const upload=require('./multer');

const postModel=require('./post');

router.get('/', function(req, res, next) {
  res.render('home',{nav:false});
});

const Post = require('./post');

// Assuming you have your express app setup

router.get('/search', async (req, res) => {
    const searchText = req.query.searchText; // Assuming search text is passed as a query parameter

    try {
        const posts = await postModel.find({ title: { $regex: searchText, $options: 'i' } }).populate('user').exec();
        res.render('searchResults', { posts }); // Render a view with the search results
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/search1', function(req, res,next) {
  res.render('search1',{nav:false});
});
router.get('/shivpicture', function(req, res,next) {
  res.render('shiv picture',{nav:false});
});
router.get('/partyinvite', function(req, res,next) {
  res.render('party invite',{nav:false});
});
router.get('/foodphotography', function(req, res,next) {
  res.render('Food photography',{nav:false});
});
router.get('/saraswatipictures', function(req, res,next) {
  res.render('Saraswati',{nav:false});
});
router.get('/Today', function(req, res, next) {
  res.render('Today',{nav:false});
});
router.get('/index', function(req, res, next) {
  res.render('index',{nav:false});
});
router.get('/dashboard', isLoggedIn, function(req, res, next) {
  res.render('dashboard',{nav:false});
});
router.get('/dashboard1', function(req, res, next) {
  res.render('dashboard1',{nav:false});
});
router.get('/profile', isLoggedIn, async function(req, res, next) {
  try {
    // Find the user and populate their posts
    const user = await userModel
      .findOne({ "username": req.session.passport.user })
      .populate('posts');
    
    // Assuming you have a variable named `nav` that should be passed to the template
    const nav = true;
    
    res.render('profile', { nav: nav, user: user });
  } catch (error) {
    // Handle any errors that occur during rendering
    console.error('Error rendering profile:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/show/posts', isLoggedIn, async function(req, res, next) {
  try {
    // Find the user and populate their posts
    const user = await userModel
      .findOne({ "username": req.session.passport.user })
      .populate('posts');
    
    // Assuming you have a variable named `nav` that should be passed to the template
    const nav = true;
    
    res.render('show', { nav: nav, user: user });
  } catch (error) {
    // Handle any errors that occur during rendering
    console.error('Error rendering profile:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/feed', isLoggedIn, async function(req, res, next) {
  try {
    const user = await userModel.findOne({"username": req.session.passport.user});
    const posts = await postModel.find().populate('user');
    const nav = true;
    res.render('feed', {user, nav: nav, posts});
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});



router.get('/add', isLoggedIn, async function(req, res, next) {
 
    const user = await userModel.findOne({"username": req.session.passport.user});
    // Assuming you have a variable `nav` that should be passed to the template
    const nav = true;
    res.render('add', {user: user, nav: nav});
  
});

router.post('/createpost', isLoggedIn,upload.single("postimage") ,async function(req, res, next) {
 
  const user = await userModel.findOne({ "username": req.session.passport.user });

  let imageFileName = "";
  if (req.file) {
      imageFileName = req.file.filename;
  }
  
  const post = await postModel.create({
      user: user._id,
      title: req.body.title,
      description: req.body.description,
      image: imageFileName,
  });
user.posts.push(post._id);
await user.save();
const nav = true;
    res.render('profile', {user: user, nav: nav});
});
router.post('/fileupload',isLoggedIn, upload.single('image'), async function(req, res, next) {
 const user= await  userModel.findOne( {"username": req.session.passport.user});
 user. profileImage=req.file.filename;
  await user.save()
  res.redirect("/profile");
});

router.get('/register', function(req, res,next) {
  res.render('register',{nav:false});
});

router.post('/register', (req, res, next) => {
  const data = new userModel({
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact,
    name: req.body.fullname,
  });

  userModel.register(data, req.body.password)
  .then(function(registerduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/dashboard");
  })
})

});

router.post('/login', passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/",
}));

router.get('/logout', function(req, res, next) {
  req.logout(function(err){
    return next(err);
  });
  res.redirect('/');
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

module.exports = router;
