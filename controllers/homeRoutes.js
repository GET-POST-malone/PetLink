const router = require('express').Router();
const { Pet, Login } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with login data
    const petData = await Pet.findAll({
      include: [
        {
          model: Login,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const pets = petData.map((pet) => pet.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      pets,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// add route to petsearch page
router.get('/petsearch', withAuth, async (req, res) => {
  // add Pet.findAll with where id = the ids passed in (response.query.id)
  try {
    res.render('petsearch', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await Login.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Pet }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
