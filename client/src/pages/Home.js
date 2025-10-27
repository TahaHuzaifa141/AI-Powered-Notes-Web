import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  Notes as NotesIcon,
  AutoAwesome as AIIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  CloudSync as CloudIcon,
  Search as SearchIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <NotesIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Smart Note Taking',
      description: 'Create, edit, and organize your notes with an intuitive interface designed for productivity.',
    },
    {
      icon: <AIIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'AI Summarization',
      description: 'Generate intelligent summaries of your notes using advanced AI technology.',
    },
    {
      icon: <SearchIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'Powerful Search',
      description: 'Find any note instantly with our advanced search and filtering capabilities.',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
      title: 'Lightning Fast',
      description: 'Built with modern technologies for optimal performance and responsiveness.',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'error.main' }} />,
      title: 'Secure & Private',
      description: 'Your notes are encrypted and stored securely with industry-standard protocols.',
    },
    {
      icon: <CloudIcon sx={{ fontSize: 40, color: 'info.main' }} />,
      title: 'Cloud Sync',
      description: 'Access your notes from anywhere with automatic cloud synchronization.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
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
    <Box sx={{ pt: 10, pb: 8 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Box
            sx={{
              textAlign: 'center',
              mb: 8,
              mt: 4,
            }}
          >
            <motion.div variants={itemVariants}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  fontWeight: 800,
                  mb: 3,
                  color: '#fff',
                  textShadow: '0 4px 20px rgba(102, 126, 234, 0.5)',
                }}
              >
                AI-Powered Notes
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Typography
                variant="h5"
                sx={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 4,
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                Transform your note-taking experience with AI-powered summarization, 
                intelligent organization, and beautiful design.
              </Typography>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowIcon />}
                  onClick={() => navigate('/notes')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                    color: '#fff',
                    textShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 12px 35px rgba(102, 126, 234, 0.5)',
                    },
                  }}
                >
                  Add Notes
                </Button>
              </Box>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Chip 
                  label="React" 
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }} 
                />
                <Chip 
                  label="Node.js" 
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }} 
                />
                <Chip 
                  label="MongoDB" 
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }} 
                />
                <Chip 
                  label="OpenAI" 
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }} 
                />
              </Box>
            </motion.div>
          </Box>

          {/* Features Section */}
          <Box sx={{ mb: 8 }}>
            <motion.div variants={itemVariants}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  textAlign: 'center',
                  mb: 6,
                  color: '#fff',
                  textShadow: '0 2px 10px rgba(102, 126, 234, 0.4)',
                }}
              >
                Powerful Features
              </Typography>
            </motion.div>

            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.03,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: 4,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 80,
                            height: 80,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                            border: '1px solid rgba(102, 126, 234, 0.2)',
                            mb: 3,
                            mx: 'auto',
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            mb: 2,
                            textAlign: 'center',
                            color: 'text.primary',
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            textAlign: 'center',
                            lineHeight: 1.6,
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* CTA Section */}
          <motion.div variants={itemVariants}>
            <Box
              sx={{
                textAlign: 'center',
                p: 6,
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: 'rgba(255, 255, 255, 0.95)',
                }}
              >
                Ready to Get Started?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  mb: 4,
                  maxWidth: 500,
                  mx: 'auto',
                }}
              >
                Join thousands of users who are already transforming their note-taking 
                experience with AI-powered features.
              </Typography>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowIcon />}
                onClick={() => navigate('/notes')}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 35px rgba(102, 126, 234, 0.5)',
                  },
                }}
              >
                Start Taking Notes
              </Button>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;