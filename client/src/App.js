import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

// Components
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import NotesPage from './pages/NotesPage';
import theme from './theme/theme';

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

function App() {
  const [mode, setMode] = useState('light');

  const handleToggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <Box
        sx={{
          minHeight: '100vh',
          background: mode === 'dark'
            ? 'linear-gradient(135deg, #232946 0%, #181824 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          {/* Floating Orbs */}
          <motion.div
            style={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: mode === 'dark' ? 'rgba(35, 41, 70, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            style={{
              position: 'absolute',
              top: '60%',
              left: '70%',
              width: '160px',
              height: '160px',
              borderRadius: '50%',
              background: mode === 'dark' ? 'rgba(24, 24, 36, 0.18)' : 'rgba(255, 255, 255, 0.08)',
              filter: 'blur(32px)',
            }}
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </Box>
        <Navbar mode={mode} onToggleTheme={handleToggleTheme} />
        <Box sx={{ pt: { xs: 8, md: 10 } }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/notes" 
              element={
                <motion.div
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <NotesPage />
                </motion.div>
              } 
            />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
              
}

export default App;