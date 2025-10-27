import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import {
  Notes as NotesIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  AccountCircle,
  Brightness4,
  Brightness7,
  Settings,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

// Hide AppBar on scroll
function HideOnScroll({ children, window }) {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = ({ mode, onToggleTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const menuItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Notes', path: '/notes', icon: <NotesIcon /> },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Box
              onClick={() => navigate('/')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                mr: 4,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  boxShadow: '0 4px 14px rgba(102, 126, 234, 0.3)',
                }}
              >
                <NotesIcon sx={{ color: 'white', fontSize: 24 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                AI Notes
              </Typography>
            </Box>
          </motion.div>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {menuItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  startIcon={item.icon}
                  onClick={() => navigate(item.path)}
                  sx={{
                    color: isActivePath(item.path) 
                      ? 'primary.main' 
                      : 'rgba(255, 255, 255, 0.9)',
                    fontWeight: isActivePath(item.path) ? 600 : 500,
                    backgroundColor: isActivePath(item.path) 
                      ? 'rgba(255, 255, 255, 0.2)' 
                      : 'transparent',
                    backdropFilter: isActivePath(item.path) ? 'blur(10px)' : 'none',
                    border: isActivePath(item.path) 
                      ? '1px solid rgba(255, 255, 255, 0.3)' 
                      : '1px solid transparent',
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Actions */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            <Tooltip title="Toggle theme">
              <IconButton
                color="inherit"
                onClick={onToggleTheme}
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>

            {/* Profile icon removed as requested */}
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              onClick={handleMobileMenuOpen}
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
          PaperProps={{
            sx: {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 2,
              mt: 1.5,
              minWidth: 200,
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
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <Avatar sx={{ width: 24, height: 24, mr: 2 }}>U</Avatar>
            Profile
          </MenuItem>
          <MenuItem>
            <Settings sx={{ width: 24, height: 24, mr: 2 }} />
            Settings
          </MenuItem>
          <MenuItem onClick={onToggleTheme}>
            {mode === 'dark' ? <Brightness7 sx={{ width: 24, height: 24, mr: 2 }} /> : <Brightness4 sx={{ width: 24, height: 24, mr: 2 }} />}
            Toggle Theme
          </MenuItem>
        </Menu>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
          PaperProps={{
            sx: {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 2,
              mt: 1.5,
              minWidth: 200,
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
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                color: isActivePath(item.path) ? 'primary.main' : 'text.primary',
                fontWeight: isActivePath(item.path) ? 600 : 400,
              }}
            >
              <Box sx={{ mr: 2, display: 'flex' }}>{item.icon}</Box>
              {item.label}
            </MenuItem>
          ))}
          <MenuItem>
            <AccountCircle sx={{ width: 24, height: 24, mr: 2 }} />
            Profile
          </MenuItem>
          <MenuItem>
            <Settings sx={{ width: 24, height: 24, mr: 2 }} />
            Settings
          </MenuItem>
        </Menu>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;