const router = require('express').Router();
const { Pet } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
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
      where: whereClause,
    });

    // Serialize data so the template can read it
    const pets = petData.map((pet) => pet.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO: Jon updates to add a pet
router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      login_id: req.session.login_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

// TODO: Jon delete a pet
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        login_id: req.session.login_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
