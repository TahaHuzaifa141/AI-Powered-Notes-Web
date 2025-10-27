const Note = require('../models/Note');
const { validationResult } = require('express-validator');

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public (will be private when auth is added)
const getNotes = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      category, 
      priority,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      archived = false,
      favorites = false
    } = req.query;

    // Build query object
    const query = { isArchived: archived === 'true' };
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (priority && priority !== 'All') {
      query.priority = priority;
    }
    
    if (favorites === 'true') {
      query.isFavorite = true;
    }

    let notesQuery;

    // Handle search
    if (search) {
      notesQuery = Note.searchNotes(search);
    } else {
      notesQuery = Note.find(query);
    }

    // Apply sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    notesQuery = notesQuery.sort(sortOptions);

    // Apply pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    notesQuery = notesQuery.skip(skip).limit(parseInt(limit));

    const notes = await notesQuery;
    const total = await Note.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        notes,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalNotes: total,
          hasNextPage: skip + notes.length < total,
          hasPrevPage: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching notes',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};

// @desc    Get single note
// @route   GET /api/notes/:id
// @access  Public
const getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        status: 'error',
        message: 'Note not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { note }
    });
  } catch (error) {
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid note ID'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Error fetching note',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};

// @desc    Create new note
// @route   POST /api/notes
// @access  Public
const createNote = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, content, tags, category, priority, color } = req.body;

    const note = await Note.create({
      title,
      content,
      tags: tags || [],
      category: category || 'Other',
      priority: priority || 'Medium',
      color: color || '#ffffff'
    });

    res.status(201).json({
      status: 'success',
      message: 'Note created successfully',
      data: { note }
    });
  } catch (error) {
    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'Duplicate field value entered'
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Error creating note',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};

// @desc    Update note
// @route   PUT /api/notes/:id
// @access  Public
const updateNote = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return updated document
        runValidators: true // Run schema validators
      }
    );

    if (!note) {
      return res.status(404).json({
        status: 'error',
        message: 'Note not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Note updated successfully',
      data: { note }
    });
  } catch (error) {
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid note ID'
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Error updating note',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};

// @desc    Delete note
// @route   DELETE /api/notes/:id
// @access  Public
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);

    if (!note) {
      return res.status(404).json({
        status: 'error',
        message: 'Note not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Note deleted successfully',
      data: { deletedNote: note }
    });
  } catch (error) {
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid note ID'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Error deleting note',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};

// @desc    Toggle note favorite status
// @route   PATCH /api/notes/:id/favorite
// @access  Public
const toggleFavorite = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        status: 'error',
        message: 'Note not found'
      });
    }

    await note.toggleFavorite();

    res.status(200).json({
      status: 'success',
      message: `Note ${note.isFavorite ? 'added to' : 'removed from'} favorites`,
      data: { note }
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid note ID'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Error toggling favorite',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};

// @desc    Archive/Unarchive note
// @route   PATCH /api/notes/:id/archive
// @access  Public
const toggleArchive = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        status: 'error',
        message: 'Note not found'
      });
    }

    note.isArchived = !note.isArchived;
    await note.save();

    res.status(200).json({
      status: 'success',
      message: `Note ${note.isArchived ? 'archived' : 'unarchived'} successfully`,
      data: { note }
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid note ID'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Error toggling archive',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};

// @desc    Get notes statistics
// @route   GET /api/notes/stats
// @access  Public
const getNotesStats = async (req, res) => {
  try {
    const stats = await Note.aggregate([
      {
        $group: {
          _id: null,
          totalNotes: { $sum: 1 },
          archivedNotes: {
            $sum: { $cond: [{ $eq: ['$isArchived', true] }, 1, 0] }
          },
          favoriteNotes: {
            $sum: { $cond: [{ $eq: ['$isFavorite', true] }, 1, 0] }
          },
          totalWords: { $sum: '$wordCount' },
          avgWordsPerNote: { $avg: '$wordCount' }
        }
      }
    ]);

    const categoryStats = await Note.aggregate([
      { $match: { isArchived: false } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        overview: stats[0] || {
          totalNotes: 0,
          archivedNotes: 0,
          favoriteNotes: 0,
          totalWords: 0,
          avgWordsPerNote: 0
        },
        categoryBreakdown: categoryStats
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  toggleFavorite,
  toggleArchive,
  getNotesStats
};