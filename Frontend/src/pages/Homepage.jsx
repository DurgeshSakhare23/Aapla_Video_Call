import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // ✅ Make sure path is correct
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Card,
  CardContent,
  Avatar,
  Chip,
  Fade,
  Grid,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme
} from '@mui/material';

import {
  History as HistoryIcon,
  VideoCall as VideoCallIcon,
  ExitToApp as LogoutIcon,
  PlayArrow as PlayArrowIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  HighQuality as QualityIcon
} from '@mui/icons-material';

import { styled } from '@mui/material/styles';

// Styled components
const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  position: 'relative',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
}));

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
}));

const MainCard = styled(Card)(() => ({
  borderRadius: 24,
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  overflow: 'visible',
}));

const FeatureCard = styled(Card)(() => ({
  borderRadius: 16,
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
}));

const JoinButton = styled(Button)(() => ({
  borderRadius: 16,
  padding: '12px 32px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  textTransform: 'none',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
  },
  transition: 'all 0.3s ease-in-out',
}));

const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 16,
    background: 'rgba(255, 255, 255, 0.9)',
    '& fieldset': {
      borderColor: 'rgba(102, 126, 234, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(102, 126, 234, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#667eea',
    },
  },
}));

export default function HomeComponent() {
  const [meetingCode, setMeetingCode] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { addToUserhistory } = useContext(AuthContext); // ✅ get from context

  const handleJoinVideoCall = async () => {
    if (!meetingCode.trim()) return;
    try {
      await addToUserhistory(meetingCode); // ✅ add to history
      navigate(`/${meetingCode}`);
    } catch (e) {
      console.error('Failed to add to history', e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/auth');
  };

  const handleHistoryClick = () => {
    navigate('/history');
  };

  const features = [
    {
      icon: <QualityIcon sx={{ fontSize: 32, color: '#667eea' }} />,
      title: 'HD Quality',
      description: 'Crystal clear video and audio quality'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 32, color: '#667eea' }} />,
      title: 'Secure',
      description: 'End-to-end encrypted meetings'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 32, color: '#667eea' }} />,
      title: 'Fast',
      description: 'Quick and reliable connections'
    }
  ];

  return (
    <GradientBackground>
      <StyledAppBar position="static" elevation={0}>
        <Toolbar>
          <Box display="flex" alignItems="center" gap={2} flexGrow={1}>
            <Avatar sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              width: 40,
              height: 40
            }}>
              <VideoCallIcon />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
              Aapla Video Call
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              sx={{
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
              }}
              onClick={handleHistoryClick}
            >
              <HistoryIcon />
            </IconButton>
            {!isMobile && (
              <Typography variant="body2" sx={{ color: 'white', mx: 1 }}>
                History
              </Typography>
            )}

            <IconButton
              sx={{
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
              }}
              onClick={handleLogout}
            >
              <LogoutIcon />
            </IconButton>
            {!isMobile && (
              <Typography variant="body2" sx={{ color: 'white', mx: 1 }}>
                Logout
              </Typography>
            )}
          </Box>
        </Toolbar>
      </StyledAppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4} alignItems="center" minHeight="80vh">
          <Grid item xs={12} md={6}>
            <Fade in timeout={800}>
              <MainCard>
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 3
                    }}
                  >
                    Providing Quality Video Call Just like Quality Education
                  </Typography>

                  <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                    Connect with people worldwide through our secure and reliable video calling platform
                  </Typography>

                  <Box display="flex" gap={2} mb={3} flexDirection={isMobile ? 'column' : 'row'}>
                    <StyledTextField
                      fullWidth
                      value={meetingCode}
                      onChange={(e) => setMeetingCode(e.target.value)}
                      label="Meeting Code"
                      variant="outlined"
                      placeholder="Enter meeting code"
                    />
                    <JoinButton
                      variant="contained"
                      size="large"
                      onClick={handleJoinVideoCall}
                      startIcon={<PlayArrowIcon />}
                      disabled={!meetingCode.trim()}
                      sx={{ minWidth: isMobile ? '100%' : 'auto' }}
                    >
                      Join Meeting
                    </JoinButton>
                  </Box>

                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Chip label="Start Instant Meeting" clickable />
                    <Chip label="Schedule Meeting" clickable />
                  </Box>
                </CardContent>
              </MainCard>
            </Fade>
          </Grid>

          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Box
                component="img"
                src="/logo3.png"
                alt="Video Call Illustration"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                  maxWidth: '400px',
                  margin: '0 auto',
                  display: 'block'
                }}
              />
            </Fade>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade in timeout={1200 + index * 200}>
                <FeatureCard>
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Avatar sx={{ width: 64, height: 64, margin: '0 auto 16px' }}>
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </GradientBackground>
  );
}
