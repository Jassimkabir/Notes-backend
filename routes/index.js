const router = require('express').Router({ mergeParams: true });
const Note = require('../models/note');
const Notes = require('../models/note');

// Add a note
router.post('/add-note', async (req, res) => {
  try {
    const { description } = req.body;
    const date = new Date();

    const addNote = await Note.create({
      description: description,
      date: date,
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

    const getNote = await Notes.findOne({
      where: {
        id: noteId,
      },
    });

    res.status(200).send(getNote);
  } catch (err) {
    console.error(err);
  }
});

// Get all notes
router.get('/get-all-notes', async (req, res) => {
  try {
    const allnotes = await Notes.findAll();

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
    const { description } = req.body;

    const updateNote = await Note.findOne({
      where: {
        id: noteId,
      },
    });

    updateNote.description = description;
    await updateNote.save();

    res.status(200).send(updateNote);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
