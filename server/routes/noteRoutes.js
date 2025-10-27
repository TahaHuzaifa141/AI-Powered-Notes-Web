const express = require('express');
const { body } = require('express-validator');
const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  toggleFavorite,
  toggleArchive,
  getNotesStats
} = require('../controllers/noteController');

const router = express.Router();

// Validation middleware
const validateNote = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('content')
    .trim()
    .isLength({ min: 1, max: 10000 })
    .withMessage('Content must be between 1 and 10000 characters'),
  body('category')
    .optional()
    .isIn(['Personal', 'Work', 'Study', 'Ideas', 'Tasks', 'Other'])
    .withMessage('Category must be one of: Personal, Work, Study, Ideas, Tasks, Other'),
  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be one of: Low, Medium, High'),
  body('color')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Color must be a valid hex color'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .isLength({ max: 30 })
    .withMessage('Each tag must be 30 characters or less')
];

const validateUpdateNote = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 1, max: 10000 })
    .withMessage('Content must be between 1 and 10000 characters'),
  body('category')
    .optional()
    .isIn(['Personal', 'Work', 'Study', 'Ideas', 'Tasks', 'Other'])
    .withMessage('Category must be one of: Personal, Work, Study, Ideas, Tasks, Other'),
  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be one of: Low, Medium, High'),
  body('color')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Color must be a valid hex color'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .isLength({ max: 30 })
    .withMessage('Each tag must be 30 characters or less')
];

// Routes

// @route   GET /api/notes/stats
// @desc    Get notes statistics
// @access  Public
router.get('/stats', getNotesStats);

// @route   GET /api/notes
// @desc    Get all notes with pagination, search, and filtering
// @access  Public
router.get('/', getNotes);

// @route   GET /api/notes/:id
// @desc    Get single note
// @access  Public
router.get('/:id', getNote);

// @route   POST /api/notes
// @desc    Create new note
// @access  Public
router.post('/', validateNote, createNote);

// @route   PUT /api/notes/:id
// @desc    Update note
// @access  Public
router.put('/:id', validateUpdateNote, updateNote);

// @route   DELETE /api/notes/:id
// @desc    Delete note
// @access  Public
router.delete('/:id', deleteNote);

// @route   PATCH /api/notes/:id/favorite
// @desc    Toggle note favorite status
// @access  Public
router.patch('/:id/favorite', toggleFavorite);

// @route   PATCH /api/notes/:id/archive
// @desc    Toggle note archive status
// @access  Public
router.patch('/:id/archive', toggleArchive);

module.exports = router;