const router = require('express').Router({ mergeParams: true });
const passport = require('passport');
const User = require('../models/user');
const optimizelyClient = require('../lib/optimizely');
// const utils = require('../lib/utils');

// // Register
// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const addUser = await User.create({
//       name: name,
//       email: email,
//       password: await utils.hashPassword(password),
//     });

//     res.status(200).send(addUser);
//   } catch (error) {
//     console.error(error);
//   }
// });

// // Login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({
//       where: {
//         email: email,
//       },
//     });
//     !user && res.status(404).send('User not found');

//     const validPassword = await utils.comparePassword(password, user.password);
//     !validPassword && res.status(400).send('Wrong password');

//     res.status(200).send(user);
//   } catch (error) {
//     console.error(error);
//   }
// });

router.get('/login/success', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Login success',
    user: req.user,
  });
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Login failed',
  });
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect(process.env.REACT_APP_URL);
});

// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.REACT_APP_URL,
    failureRedirect: '/login/failed',
  })
);

// Github Auth
router.get('/github', passport.authenticate('github', { scope: ['profile'] }));
router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: process.env.REACT_APP_URL,
    failureRedirect: '/login/failed',
  })
);

// Get User
router.get('/:id', async (req, res) => {
  try {
    const getUser = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).send(getUser);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
