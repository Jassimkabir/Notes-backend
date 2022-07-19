const router = require('express').Router({ mergeParams: true });
const User = require('../models/user');
const utils = require('../lib/utils');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const addUser = await User.create({
      name: name,
      email: email,
      password: await utils.hashPassword(password),
    });

    res.status(200).send(addUser);
  } catch (error) {
    console.error(error);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    !user && res.status(404).send('User not found');

    const validPassword = await utils.comparePassword(password, user.password);
    !validPassword && res.status(400).send('Wrong password');

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
