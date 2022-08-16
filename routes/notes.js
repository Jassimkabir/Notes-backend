const router = require('express').Router({ mergeParams: true });
const Notes = require('../models/note');
const optimizelyClient = require('../lib/optimizely');

// Add a note
router.post('/:id/add-note', async (req, res) => {
  try {
    const userId = req.params.id;
    const { description, title } = req.body;
    const date = new Date();

    const addNote = await Notes.create({
      description: description,
      date: date,
      user_id: userId,
      title: title,
    });

    res.status(200).send(addNote);
  } catch (error) {
    console.error(error);
  }
});

// Get a note
router.get('/get-note/:id', async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.id;

    const enabled = optimizelyClient.isFeatureEnabled(
      'expand_or_update_note',
      userId,
      {
        user_id: userId,
      }
    );
    if (enabled) {
      const getNote = await Notes.findOne({
        where: {
          id: noteId,
        },
      });

      res.status(200).send(getNote);
    } else {
      res.status(403).send('This feature is not available to you');
    }
  } catch (err) {
    console.error(err);
  }
});

// Get all notes
router.get('/:id/get-all-notes', async (req, res) => {
  try {
    const userId = req.params.id;

    const allnotes = await Notes.findAll({
      where: {
        user_id: userId,
      },
      order: [['date', 'DESC']],
    });

    res.status(200).send(allnotes);
  } catch (err) {
    console.error(err);
  }
});

// Delete a note
router.post('/delete-note/:id', async (req, res) => {
  try {
    const noteId = req.params.id;

    const deleteNote = await Notes.destroy({
      where: {
        id: noteId,
      },
    });

    res.status(200).send('Note deleted');
  } catch (err) {
    console.error(err);
  }
});

// Update a note
router.post('/update-note/:id', async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, description } = req.body;

    const updateNote = await Notes.findOne({
      where: {
        id: noteId,
      },
    });

    updateNote.title = title;
    updateNote.description = description;
    await updateNote.save();

    res.status(200).send(updateNote);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
