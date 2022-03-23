const router = require('express').Router();
const { Pet, Login } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  console.log('hit the route');
  try {
    // Get all pets

    let whereClause = {};

    // adds key:value to object for each query

    // add city
    if (req.query.city) {
      whereClause.city = req.query.city;
    }

    // add species
    if (req.query.species) {
      whereClause.species = req.query.species;
    }

    // add age
    if (req.query.age) {
      whereClause.age = req.query.age;
    }

    // add sex
    if (req.query.sex) {
      whereClause.sex = req.query.sex;
    }

    // add size
    if (req.query.size) {
      whereClause.size = req.query.size;
    }

    // find all including all queries in where clause object
    const petData = await Pet.findAll({
      include: [
        {
          model: Login,
          required: true,
          where: whereClause,
        },
      ],
    });

    // Serialize data so the template can read it
    const pets = petData.map((pet) => pet.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  const pet = {
    ...req.body,
    login_id: req.session.user_id,
  };
  try {
    const petData = await Pet.create(pet);

    res.status(200).json(petData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Put to update a pet
router.put('/:id', async (req, res) => {
  console.log(req);
  try {
    let petData = await Pet.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!petData[0]) {
      res.status(404).json({ message: 'No pet with this id!' });
      return;
    }
    res.status(200).json(petData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a pet
router.delete('/:id', withAuth, async (req, res) => {
  console.log('you hit the delete');
  try {
    const petData = await Pet.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!petData) {
      res.status(404).json({ message: 'No pet found with this id!' });
      return;
    }

    res.status(200).json(petData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
