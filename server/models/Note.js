const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Note title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  
  content: {
    type: String,
    required: [true, 'Note content is required'],
    maxlength: [10000, 'Content cannot be more than 10000 characters']
  },
  
  summary: {
    type: String,
    maxlength: [500, 'Summary cannot be more than 500 characters']
  },
  
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot be more than 30 characters']
  }],
  
  category: {
    type: String,
    enum: ['Personal', 'Work', 'Study', 'Ideas', 'Tasks', 'Other'],
    default: 'Other'
  },
  
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  
  isArchived: {
    type: Boolean,
    default: false
  },
  
  isFavorite: {
    type: Boolean,
    default: false
  },
  
  color: {
    type: String,
    default: '#ffffff',
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please provide a valid hex color']
  },
  
  lastSummarized: {
    type: Date
  },
  
  // For future user authentication
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    // Not required for now, but ready for multi-user support
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for word count
noteSchema.virtual('wordCount').get(function() {
  return this.content ? this.content.split(/\s+/).length : 0;
});

// Virtual for reading time (average 200 words per minute)
noteSchema.virtual('readingTime').get(function() {
  const wordsPerMinute = 200;
  const minutes = Math.ceil(this.wordCount / wordsPerMinute);
  return minutes;
});

// Index for better search performance
noteSchema.index({ title: 'text', content: 'text', tags: 'text' });
noteSchema.index({ createdAt: -1 });
noteSchema.index({ category: 1 });
noteSchema.index({ isFavorite: -1, createdAt: -1 });

// Pre-save middleware to auto-generate tags from content
noteSchema.pre('save', function(next) {
  if (this.isModified('content') && this.tags.length === 0) {
    // Simple auto-tag generation based on common keywords
    const content = this.content.toLowerCase();
    const autoTags = [];
    
    if (content.includes('meeting') || content.includes('call')) autoTags.push('meeting');
    if (content.includes('todo') || content.includes('task')) autoTags.push('task');
    if (content.includes('idea') || content.includes('brainstorm')) autoTags.push('idea');
    if (content.includes('project')) autoTags.push('project');
    if (content.includes('deadline') || content.includes('due')) autoTags.push('deadline');
    
    this.tags = [...new Set([...this.tags, ...autoTags])];
  }
  next();
});

// Static method to get notes by category
noteSchema.statics.getByCategory = function(category) {
  return this.find({ category, isArchived: false })
             .sort({ createdAt: -1 })
             .limit(50);
};

// Static method to search notes
noteSchema.statics.searchNotes = function(query) {
  return this.find({
    $text: { $search: query },
    isArchived: false
  }).sort({ score: { $meta: 'textScore' } });
};

// Instance method to toggle favorite
noteSchema.methods.toggleFavorite = function() {
  this.isFavorite = !this.isFavorite;
  return this.save();
};

// Instance method to archive note
noteSchema.methods.archive = function() {
  this.isArchived = true;
  return this.save();
};

module.exports = mongoose.model('Note', noteSchema);