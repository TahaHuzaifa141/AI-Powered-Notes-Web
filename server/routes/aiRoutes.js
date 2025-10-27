const express = require('express');
const { body } = require('express-validator');
const {
  summarizeText,
  summarizeNote,
  generateTags,
  getAIStats
} = require('../controllers/aiController');

const router = express.Router();

// Validation middleware
const validateSummarization = [
  body('text')
    .trim()
    .isLength({ min: 50, max: 10000 })
    .withMessage('Text must be between 50 and 10000 characters for summarization'),
  body('maxLength')
    .optional()
    .isInt({ min: 50, max: 500 })
    .withMessage('Max length must be between 50 and 500 characters')
];

const validateTagGeneration = [
  body('text')
    .trim()
    .isLength({ min: 10, max: 10000 })
    .withMessage('Text must be between 10 and 10000 characters for tag generation'),
  body('maxTags')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Max tags must be between 1 and 10')
];

const validateNoteSummarization = [
  body('maxLength')
    .optional()
    .isInt({ min: 50, max: 500 })
    .withMessage('Max length must be between 50 and 500 characters')
];

// Routes

// @route   GET /api/ai/stats
// @desc    Get AI usage statistics
// @access  Public
router.get('/stats', getAIStats);

// @route   POST /api/ai/summarize
// @desc    Generate summary for provided text
// @access  Public
router.post('/summarize', validateSummarization, summarizeText);

// @route   POST /api/ai/summarize-note/:id
// @desc    Summarize specific note and update it
// @access  Public
router.post('/summarize-note/:id', validateNoteSummarization, summarizeNote);

// @route   POST /api/ai/generate-tags
// @desc    Generate smart tags for text
// @access  Public
router.post('/generate-tags', validateTagGeneration, generateTags);

module.exports = router;