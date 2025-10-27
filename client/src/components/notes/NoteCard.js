import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Chip,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  AutoAwesome as SummarizeIcon,
  ExpandMore as ExpandIcon,
  Schedule as TimeIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const NoteCard = ({ note, viewMode, onEdit, onDelete, onSummarize }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  const [floatingSummaryOpen, setFloatingSummaryOpen] = useState(false);

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(note);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(note._id);
    handleMenuClose();
  };

  const handleSummarize = async () => {
    setSummarizing(true);
    try {
      await onSummarize(note._id);
    } finally {
      setSummarizing(false);
    }
    handleMenuClose();
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const isListView = viewMode === 'list';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <Card
        sx={{
          height: '100%',
          cursor: 'pointer',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 3,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
            '& .note-actions': {
              opacity: 1,
            },
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(135deg, ${
              note.category === 'work' ? '#667eea' :
              note.category === 'personal' ? '#764ba2' :
              note.category === 'ideas' ? '#f093fb' :
              '#667eea'
            } 0%, ${
              note.category === 'work' ? '#764ba2' :
              note.category === 'personal' ? '#667eea' :
              note.category === 'ideas' ? '#f093fb' :
              '#764ba2'
            } 100%)`,
          },
        }}
        onClick={() => !anchorEl && onEdit(note)}
      >
        <CardContent sx={{ p: 3, pb: isListView ? 3 : 2 }}>
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 2,
            }}
          >
            <Typography
              variant={isListView ? 'h6' : 'h6'}
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                lineHeight: 1.3,
                flex: 1,
                mr: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: isListView ? 1 : 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {note.title}
            </Typography>
            
            <IconButton
              className="note-actions"
              size="small"
              onClick={handleMenuOpen}
              sx={{
                opacity: 0,
                transition: 'opacity 0.2s ease',
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <MoreIcon />
            </IconButton>
          </Box>

          {/* Content */}
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              lineHeight: 1.6,
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: isListView ? 2 : 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {truncateText(note.content, isListView ? 200 : 150)}
          </Typography>

          {/* Summary Button & Floating Card */}
          {note.summary && (
            <>
              <Box sx={{ mb: 2 }}>
                <button
                  style={{
                    padding: '6px 16px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(102,126,234,0.15)',
                    fontSize: '0.95rem',
                    marginLeft: 4,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFloatingSummaryOpen(true);
                  }}
                >
                  <SummarizeIcon style={{ verticalAlign: 'middle', marginRight: 6 }} />
                  Summary
                </button>
              </Box>
              {floatingSummaryOpen && (
                <Box
                  sx={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: 320,
                    maxWidth: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    boxShadow: 8,
                    p: 3,
                    zIndex: 1400,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 1, color: 'primary.main', fontWeight: 700 }}>
                    AI Summary
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary', fontStyle: 'italic', mb: 2 }}>
                    {note.summary}
                  </Typography>
                  <button
                    style={{
                      alignSelf: 'flex-end',
                      padding: '4px 12px',
                      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                    }}
                    onClick={() => setFloatingSummaryOpen(false)}
                  >
                    Close
                  </button>
                </Box>
              )}
            </>
          )}

          {/* Tags */}
          {Array.isArray(note.tags) && note.tags.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {Array.isArray(note.tags) ? note.tags.slice(0, isListView ? 6 : 3).map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(102, 126, 234, 0.1)',
                      color: 'primary.main',
                      border: '1px solid rgba(102, 126, 234, 0.2)',
                      fontSize: '0.75rem',
                      height: 24,
                    }}
                  />
                )) : null}
                {Array.isArray(note.tags) && note.tags.length > (isListView ? 6 : 3) && (
                  <Chip
                    label={`+${note.tags.length - (isListView ? 6 : 3)}`}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                      height: 24,
                    }}
                  />
                )}
              </Box>
            </Box>
          )}

          {/* Footer */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pt: 1,
              borderTop: '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary' }}
              >
                {dayjs(note.updatedAt).fromNow()}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {note.summary && (
                <Tooltip title={expanded ? 'Hide summary' : 'Show summary'}>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpanded(!expanded);
                    }}
                    sx={{
                      transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      color: 'primary.main',
                    }}
                  >
                    <ExpandIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}

              {note.category && (
                <Chip
                  label={note.category}
                  size="small"
                  sx={{
                    fontSize: '0.7rem',
                    height: 20,
                    backgroundColor: 
                      note.category === 'work' ? 'rgba(102, 126, 234, 0.1)' :
                      note.category === 'personal' ? 'rgba(118, 75, 162, 0.1)' :
                      'rgba(0, 0, 0, 0.04)',
                    color: 
                      note.category === 'work' ? 'primary.main' :
                      note.category === 'personal' ? 'secondary.main' :
                      'text.secondary',
                    border: 
                      note.category === 'work' ? '1px solid rgba(102, 126, 234, 0.2)' :
                      note.category === 'personal' ? '1px solid rgba(118, 75, 162, 0.2)' :
                      '1px solid rgba(0, 0, 0, 0.1)',
                  }}
                />
              )}
            </Box>
          </Box>
        </CardContent>

        {/* Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          onClick={(e) => e.stopPropagation()}
          PaperProps={{
            sx: {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 2,
              minWidth: 160,
              '& .MuiMenuItem-root': {
                borderRadius: 1,
                mx: 1,
                my: 0.5,
                '&:hover': {
                  backgroundColor: 'rgba(102, 126, 234, 0.1)',
                },
              },
            },
          }}
        >
          <MenuItem onClick={handleEdit}>
            <EditIcon sx={{ fontSize: 18, mr: 1 }} />
            Edit
          </MenuItem>
          <MenuItem 
            onClick={handleSummarize}
            disabled={summarizing || !note.content || note.content.length < 50}
          >
            <SummarizeIcon sx={{ fontSize: 18, mr: 1 }} />
            {summarizing ? 'Summarizing...' : 'AI Summary'}
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <DeleteIcon sx={{ fontSize: 18, mr: 1 }} />
            Delete
          </MenuItem>
        </Menu>
      </Card>
    </motion.div>
  );
};

export default NoteCard;