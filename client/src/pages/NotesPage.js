import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Fab,
  TextField,
  InputAdornment,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Fade,
  Skeleton,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  ViewList as ListIcon,
  ViewModule as GridIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// Components
import NoteCard from '../components/notes/NoteCard';
import NoteDialog from '../components/notes/NoteDialog';
import { notesApi } from '../services/api';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [allTags, setAllTags] = useState([]);

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Extract all unique tags when notes change
  useEffect(() => {
    const tags = [...new Set(notes.flatMap(note => note.tags || []))];
    setAllTags(tags);
  }, [notes]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await notesApi.getAllNotes();
      // Defensive: handle both array and paginated object
      let notesArr = [];
      if (Array.isArray(response.data.data)) {
        notesArr = response.data.data;
      } else if (response.data.data && Array.isArray(response.data.data.notes)) {
        notesArr = response.data.data.notes;
      }
      setNotes(notesArr);
    } catch (error) {
      console.error('Error fetching notes:', error);
      toast.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = () => {
    setSelectedNote(null);
    setDialogOpen(true);
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setDialogOpen(true);
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await notesApi.deleteNote(noteId);
      setNotes(notes.filter(note => note._id !== noteId));
      toast.success('Note deleted successfully');
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Failed to delete note');
    }
  };

  const handleSaveNote = async (noteData) => {
    try {
      if (selectedNote) {
        // Update existing note
        const response = await notesApi.updateNote(selectedNote._id, noteData);
        setNotes(notes.map(note => 
          note._id === selectedNote._id ? response.data.data : note
        ));
        toast.success('Note updated successfully');
      } else {
        // Create new note
        const response = await notesApi.createNote(noteData);
        setNotes([response.data.data, ...notes]);
        toast.success('Note created successfully');
      }
      setDialogOpen(false);
    } catch (error) {
      console.error('Error saving note:', error);
      toast.error('Failed to save note');
    }
  };

  const handleSummarizeNote = async (noteId) => {
    try {
      const response = await notesApi.summarizeNote(noteId);
      const updatedNote = response.data.data.note;
      setNotes(notes.map(note => 
        note._id === noteId ? updatedNote : note
      ));
      toast.success('Note summarized successfully');
    } catch (error) {
      console.error('Error summarizing note:', error);
      toast.error('Failed to summarize note');
    }
  };

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Filter notes based on search term and selected tags
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => note.tags?.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <Box sx={{ pt: 10, pb: 4, minHeight: '100vh' }}>
      <Container maxWidth="xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  mb: 2,
                  color: '#fff',
                  textShadow: '0 2px 10px rgba(102, 126, 234, 0.4)',
                }}
              >
                My Notes
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  maxWidth: 600,
                  mx: 'auto',
                }}
              >
                Organize your thoughts, ideas, and insights with AI-powered features
              </Typography>
            </Box>
          </motion.div>

          {/* Search and Filters */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                mb: 4,
                p: 3,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        '& input::placeholder': {
                          color: 'rgba(0, 0, 0, 0.6)',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(e, newView) => newView && setViewMode(newView)}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 2,
                      '& .MuiToggleButton-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                        },
                      },
                    }}
                  >
                    <ToggleButton value="grid">
                      <GridIcon />
                    </ToggleButton>
                    <ToggleButton value="list">
                      <ListIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(255, 255, 255, 0.8)', textAlign: 'right' }}
                  >
                    {filteredNotes.length} of {notes.length} notes
                  </Typography>
                </Grid>
              </Grid>

              {/* Tags Filter */}
              {allTags.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}
                  >
                    Filter by tags:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {allTags.map(tag => (
                      <Chip
                        key={tag}
                        label={tag}
                        onClick={() => handleTagToggle(tag)}
                        variant={selectedTags.includes(tag) ? "filled" : "outlined"}
                        sx={{
                          backgroundColor: selectedTags.includes(tag) 
                            ? 'primary.main' 
                            : 'rgba(255, 255, 255, 0.1)',
                          color: selectedTags.includes(tag) 
                            ? 'white' 
                            : 'rgba(255, 255, 255, 0.8)',
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                          '&:hover': {
                            backgroundColor: selectedTags.includes(tag) 
                              ? 'primary.dark' 
                              : 'rgba(255, 255, 255, 0.2)',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </motion.div>

          {/* Notes Grid/List */}
          <AnimatePresence mode="wait">
            {loading ? (
              <Grid container spacing={3}>
                {[...Array(6)].map((_, index) => (
                  <Grid item xs={12} sm={6} lg={4} key={index}>
                    <Skeleton
                      variant="rectangular"
                      height={200}
                      sx={{
                        borderRadius: 3,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : filteredNotes.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    py: 8,
                    px: 4,
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      mb: 2,
                      fontWeight: 600,
                    }}
                  >
                    {searchTerm || selectedTags.length > 0 
                      ? 'No notes match your search' 
                      : 'No notes yet'}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      mb: 4,
                    }}
                  >
                    {searchTerm || selectedTags.length > 0 
                      ? 'Try adjusting your search or filters' 
                      : 'Create your first note to get started!'}
                  </Typography>
                  {(!searchTerm && selectedTags.length === 0) && (
                    <Fab
                      color="primary"
                      onClick={handleCreateNote}
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          boxShadow: '0 12px 35px rgba(102, 126, 234, 0.5)',
                        },
                      }}
                    >
                      <AddIcon />
                    </Fab>
                  )}
                </Box>
              </motion.div>
            ) : (
              <Grid container spacing={3}>
                {filteredNotes.map((note, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={viewMode === 'grid' ? 6 : 12}
                    lg={viewMode === 'grid' ? 4 : 12}
                    key={note._id}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      layout
                    >
                      <NoteCard
                        note={note}
                        viewMode={viewMode}
                        onEdit={() => handleEditNote(note)}
                        onDelete={() => handleDeleteNote(note._id)}
                        onSummarize={() => handleSummarizeNote(note._id)}
                      />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Floating Action Button */}
        <Fade in={!loading && filteredNotes.length > 0}>
          <Fab
            color="primary"
            onClick={handleCreateNote}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 12px 35px rgba(102, 126, 234, 0.5)',
              },
            }}
          >
            <AddIcon />
          </Fab>
        </Fade>

        {/* Note Dialog */}
        <NoteDialog
          open={dialogOpen}
          note={selectedNote}
          onClose={() => setDialogOpen(false)}
          onSave={handleSaveNote}
        />
      </Container>
    </Box>
  );
};

export default NotesPage;