import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  IconButton,
  Typography,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Autocomplete,
  LinearProgress,
  Alert,
  Divider,
} from '@mui/material';
import {
  Close as CloseIcon,
  AutoAwesome as AIIcon,
  Save as SaveIcon,
  Label as TagIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { aiApi } from '../../services/api';

const NoteDialog = ({ open, note, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: [],
  });
  const [aiSummary, setAiSummary] = useState('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
  { value: 'Work', label: 'Work', color: '#667eea' },
  { value: 'Personal', label: 'Personal', color: '#764ba2' },
  { value: 'Ideas', label: 'Ideas', color: '#f093fb' },
  { value: 'Study', label: 'Study', color: '#4facfe' },
  { value: 'Tasks', label: 'Tasks', color: '#43e97b' },
  { value: 'Other', label: 'Other', color: '#a0aec0' },
  ];

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || '',
        content: note.content || '',
        category: note.category || '',
        tags: note.tags || [],
      });
      setAiSummary(note.summary || '');
    } else {
      setFormData({
        title: '',
        content: '',
        category: '',
        tags: [],
      });
      setAiSummary('');
    }
    setErrors({});
  }, [note, open]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleTagsChange = (event, newTags) => {
    setFormData(prev => ({
      ...prev,
      tags: newTags,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const saveData = {
      ...formData,
      summary: aiSummary,
    };

    onSave(saveData);
  };

  const handleGenerateSummary = async () => {
    if (!formData.content.trim()) {
      toast.error('Please add some content first');
      return;
    }

    if (formData.content.length < 50) {
      toast.error('Content too short for summarization (minimum 50 characters)');
      return;
    }

    setIsGeneratingSummary(true);
    try {
      const response = await aiApi.summarizeText({
        text: formData.content,
        maxLength: 150,
      });
      setAiSummary(response.data.data.summary);
      toast.success('Summary generated successfully!');
    } catch (error) {
      console.error('Error generating summary:', error);
      toast.error('Failed to generate summary');
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const handleGenerateTags = async () => {
    if (!formData.content.trim()) {
      toast.error('Please add some content first');
      return;
    }

    setIsGeneratingTags(true);
    try {
      const response = await aiApi.generateTags({
        text: `${formData.title} ${formData.content}`,
        maxTags: 5,
      });
      const newTags = response.data.data.tags;
      setFormData(prev => ({
        ...prev,
        tags: [...new Set([...prev.tags, ...newTags])], // Remove duplicates
      }));
      toast.success('Tags generated successfully!');
    } catch (error) {
      console.error('Error generating tags:', error);
      toast.error('Failed to generate tags');
    } finally {
      setIsGeneratingTags(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 4,
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 2,
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {note ? 'Edit Note' : 'Create New Note'}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Title */}
          <TextField
            label="Title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          {/* Category */}
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              label="Category"
              sx={{ borderRadius: 2 }}
              startAdornment={<CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />}
            >
              {categories.map((category) => (
                <MenuItem key={category.value} value={category.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CategoryIcon sx={{ color: category.color, fontSize: 18 }} />
                    {category.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Content */}
          <TextField
            label="Content"
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            error={!!errors.content}
            helperText={errors.content}
            multiline
            rows={8}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          {/* AI Summary Section */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <AIIcon color="primary" />
                AI Summary
              </Typography>
              <Button
                onClick={handleGenerateSummary}
                disabled={isGeneratingSummary || !formData.content.trim()}
                startIcon={<AIIcon />}
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 2,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.50',
                  },
                }}
              >
                {isGeneratingSummary ? 'Generating...' : 'Generate'}
              </Button>
            </Box>

            {isGeneratingSummary && <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />}

            {aiSummary && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Alert
                  severity="info"
                  sx={{
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    borderRadius: 2,
                    '& .MuiAlert-message': {
                      width: '100%',
                    },
                  }}
                >
                  <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                    {aiSummary}
                  </Typography>
                </Alert>
              </motion.div>
            )}
          </Box>

          <Divider />

          {/* Tags */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <TagIcon color="primary" />
                Tags
              </Typography>
              <Button
                onClick={handleGenerateTags}
                disabled={isGeneratingTags || !formData.content.trim()}
                startIcon={<AIIcon />}
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 2,
                  borderColor: 'secondary.main',
                  color: 'secondary.main',
                  '&:hover': {
                    backgroundColor: 'secondary.50',
                  },
                }}
              >
                {isGeneratingTags ? 'Generating...' : 'Generate'}
              </Button>
            </Box>

            {isGeneratingTags && <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />}

            <Autocomplete
              multiple
              freeSolo
              options={[]}
              value={formData.tags}
              onChange={handleTagsChange}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                    key={index}
                    sx={{
                      backgroundColor: 'rgba(102, 126, 234, 0.1)',
                      borderColor: 'primary.main',
                      color: 'primary.main',
                    }}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Add tags..."
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <TagIcon sx={{ mr: 1, color: 'primary.main' }} />
                        {params.InputProps.startAdornment}
                      </>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
              )}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button onClick={onClose} sx={{ borderRadius: 2 }}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{
            borderRadius: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            px: 3,
            '&:hover': {
              background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
            },
          }}
        >
          {note ? 'Update' : 'Create'} Note
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteDialog;