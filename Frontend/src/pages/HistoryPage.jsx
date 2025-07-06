import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Container,
  Grid,
  Chip,
  Avatar,
  Divider,
  Paper,
  IconButton,
  Fade,
  Skeleton
} from '@mui/material';
import {
  VideoCall as VideoCallIcon,
  Schedule as ScheduleIcon,
  PlayArrow as PlayArrowIcon,
  History as HistoryIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components for enhanced design
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease-in-out',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
  },
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: theme.spacing(4),
  borderRadius: '0 0 24px 24px',
  marginBottom: theme.spacing(3),
}));

const EmptyStateContainer = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(6),
  borderRadius: 16,
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
}));

export default function HistoryPage() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const LoadingSkeleton = () => (
    <Grid container spacing={3}>
      {[1, 2, 3].map((item) => (
        <Grid item xs={12} md={6} lg={4} key={item}>
          <Card sx={{ borderRadius: 4 }}>
            <CardContent>
              <Skeleton variant="text" width="60%" height={32} />
              <Skeleton variant="text" width="80%" height={24} sx={{ mt: 1 }} />
              <Skeleton variant="rectangular" width="100%" height={40} sx={{ mt: 2, borderRadius: 2 }} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header Section */}
      <HeaderSection>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton
                onClick={() => routeTo('/')}
                sx={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <ArrowBackIcon />
              </IconButton>
              <HistoryIcon sx={{ fontSize: 32 }} />
              <Typography variant="h4" fontWeight="bold">
                Meeting History
              </Typography>
            </Box>
            <Chip
              label={`${meetings.length} meetings`}
              variant="outlined"
              sx={{ color: 'white', borderColor: 'white' }}
            />
          </Box>
        </Container>
      </HeaderSection>

      <Container maxWidth="lg" sx={{ pb: 4 }}>
        {loading ? (
          <LoadingSkeleton />
        ) : meetings.length === 0 ? (
          <Fade in timeout={600}>
            <EmptyStateContainer elevation={0}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  margin: '0 auto 16px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              >
                <HistoryIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h5" gutterBottom fontWeight="bold" color="text.primary">
                No Meeting History
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                You haven't joined any meetings yet. Start by creating or joining a meeting!
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => routeTo('/')}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  },
                }}
              >
                Go to Home
              </Button>
            </EmptyStateContainer>
          </Fade>
        ) : (
          <Grid container spacing={3}>
            {meetings.map((meeting, idx) => (
              <Grid item xs={12} md={6} lg={4} key={meeting._id || idx}>
                <Fade in timeout={300 + idx * 100}>
                  <StyledCard>
                    <CardContent sx={{ p: 3 }}>
                      <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <Avatar
                          sx={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                          }}
                        >
                          <VideoCallIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Video Meeting
                          </Typography>
                          <Chip
                            label={meeting.meetingCode}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(255, 255, 255, 0.2)',
                              color: 'white',
                              fontWeight: 'bold',
                            }}
                          />
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

                      <Box display="flex" alignItems="center" gap={1}>
                        <ScheduleIcon sx={{ fontSize: 18, opacity: 0.8 }} />
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          {formatDate(meeting.date)}
                        </Typography>
                      </Box>
                    </CardContent>

                    <CardActions sx={{ p: 3, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={<PlayArrowIcon />}
                        onClick={() => routeTo(`/${meeting.meetingCode}`)}
                        sx={{
                          borderRadius: 3,
                          py: 1.5,
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          fontWeight: 'bold',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.3)',
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.2s ease-in-out',
                        }}
                      >
                        Rejoin Meeting
                      </Button>
                    </CardActions>
                  </StyledCard>
                </Fade>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}