const OpenAI = require('openai');
const Note = require('../models/Note');
const { validationResult } = require('express-validator');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @desc    Generate summary for note content
// @route   POST /api/ai/summarize
// @access  Public
const summarizeText = async (req, res) => {
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

    const { text, maxLength = 150 } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        status: 'error',
        message: 'OpenAI API key not configured'
      });
    }

    // Check if text is long enough to summarize
    if (text.length < 50) {
      return res.status(400).json({
        status: 'error',
        message: 'Text is too short to summarize. Minimum 50 characters required.'
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that creates concise, informative summaries. 
                   Summarize the given text in ${maxLength} characters or less. 
                   Focus on the key points and main ideas. 
                   Make it clear and well-structured.`
        },
        {
          role: "user",
          content: `Please summarize this text: ${text}`
        }
      ],
      max_tokens: Math.floor(maxLength / 2), // Roughly 2 characters per token
      temperature: 0.3,
    });

    const summary = completion.choices[0].message.content.trim();

    res.status(200).json({
      status: 'success',
      data: {
        summary,
        originalLength: text.length,
        summaryLength: summary.length,
        compressionRatio: ((text.length - summary.length) / text.length * 100).toFixed(1)
      }
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);

    // Handle specific OpenAI errors
    if (error.status === 401) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid OpenAI API key'
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        status: 'error',
        message: 'OpenAI API rate limit exceeded. Please try again later.'
      });
    }

    if (error.status === 400) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid request to OpenAI API'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Error generating summary',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};

// @desc    Summarize and update note
// @route   POST /api/ai/summarize-note/:id
// @access  Public
const summarizeNote = async (req, res) => {
  try {
    const { maxLength = 150 } = req.body;
    
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        status: 'error',
        message: 'Note not found'
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        status: 'error',
        message: 'OpenAI API key not configured'
      });
    }

    // Check if note content is long enough
    if (note.content.length < 50) {
      return res.status(400).json({
        status: 'error',
        message: 'Note content is too short to summarize. Minimum 50 characters required.'
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that creates concise, informative summaries. 
                   Summarize the given note content in ${maxLength} characters or less. 
                   Focus on the key points and main ideas. 
                   Make it clear and well-structured.`
        },
        {
          role: "user",
          content: `Please summarize this note titled "${note.title}": ${note.content}`
        }
      ],
      max_tokens: Math.floor(maxLength / 2),
      temperature: 0.3,
    });

    const summary = completion.choices[0].message.content.trim();

    // Update note with summary
    note.summary = summary;
    note.lastSummarized = new Date();
    await note.save();

    res.status(200).json({
      status: 'success',
      message: 'Note summarized successfully',
      data: {
        note,
        summary,
        originalLength: note.content.length,
        summaryLength: summary.length,
        compressionRatio: ((note.content.length - summary.length) / note.content.length * 100).toFixed(1)
      }
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);

    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid note ID'
      });
    }

    // Handle specific OpenAI errors
    if (error.status === 401) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid OpenAI API key'
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        status: 'error',
        message: 'OpenAI API rate limit exceeded. Please try again later.'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Error summarizing note',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};

// @desc    Generate smart tags for text
// @route   POST /api/ai/generate-tags
// @access  Public
const generateTags = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { text, maxTags = 5 } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        status: 'error',
        message: 'OpenAI API key not configured'
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that generates relevant tags for text content. 
                   Generate up to ${maxTags} relevant, concise tags (1-2 words each) for the given text. 
                   Return only the tags separated by commas, nothing else.
                   Focus on key topics, themes, and categories.`
        },
        {
          role: "user",
          content: `Generate tags for this text: ${text}`
        }
      ],
      max_tokens: 50,
      temperature: 0.3,
    });

    const tagsString = completion.choices[0].message.content.trim();
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);

    res.status(200).json({
      status: 'success',
      data: { tags }
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);

    res.status(500).json({
      status: 'error',
      message: 'Error generating tags',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};

// @desc    Get AI usage statistics
// @route   GET /api/ai/stats
// @access  Public
const getAIStats = async (req, res) => {
  try {
    const summarizedNotes = await Note.countDocuments({ 
      summary: { $exists: true, $ne: '' } 
    });
    
    const totalNotes = await Note.countDocuments();
    const summarizationRate = totalNotes > 0 ? (summarizedNotes / totalNotes * 100).toFixed(1) : 0;

    const recentSummaries = await Note.find({ 
      lastSummarized: { $exists: true } 
    })
    .sort({ lastSummarized: -1 })
    .limit(5)
    .select('title lastSummarized');

    res.status(200).json({
      status: 'success',
      data: {
        summarizedNotes,
        totalNotes,
        summarizationRate: `${summarizationRate}%`,
        recentSummaries
      }
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching AI statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : {}
    });
  }
};

module.exports = {
  summarizeText,
  summarizeNote,
  generateTags,
  getAIStats
};