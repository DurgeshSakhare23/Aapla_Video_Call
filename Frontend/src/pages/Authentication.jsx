import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Snackbar, Alert, Fade, Slide } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  VideoCall as VideoCallIcon,
  Visibility,
  VisibilityOff,
  PersonAdd,
  Login as LoginIcon
} from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext';

// Custom styled components
const GradientBackground = styled(Box)({
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
});

const GlassPaper = styled(Paper)({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: 24,
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 16,
    background: 'rgba(255, 255, 255, 0.8)',
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
});

const AuthButton = styled(Button)({
  borderRadius: 16,
  padding: '12px 32px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  textTransform: 'none',
  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
  },
});

const TabButton = styled(Button)(({ active }) => ({
  borderRadius: 20,
  padding: '8px 24px',
  margin: '0 8px',
  textTransform: 'none',
  fontWeight: 'bold',
  transition: 'all 0.3s ease-in-out',
  background: active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(102, 126, 234, 0.1)',
  color: active ? 'white' : '#667eea',
  '&:hover': {
    background: active ? 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)' : 'rgba(102, 126, 234, 0.2)',
    transform: 'translateY(-1px)',
  },
}));

const FloatingShape = styled(Box)(({ size, top, left, delay }) => ({
  position: 'absolute',
  width: size,
  height: size,
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.1)',
  top: top,
  left: left,
  animation: `float 6s ease-in-out infinite ${delay}s`,
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' },
  },
}));

const defaultTheme = createTheme();

export default function Authentication() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    const handleAuth = async () => {
        try {
            if (formState === 0) {
                let result = await handleLogin(username, password);
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername('');
                setMessage(result);
                setOpen(true);
                setError('');
                setFormState(0);
                setPassword('');
                setName('');
            }
        } catch (err) {
            console.log(err);
            let message = err.response?.data?.message || 'An error occurred';
            setError(message);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleAuth();
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <GradientBackground>
                {/* Floating Background Elements */}
                <FloatingShape size="100px" top="10%" left="10%" delay={0} />
                <FloatingShape size="80px" top="20%" left="80%" delay={1} />
                <FloatingShape size="60px" top="70%" left="15%" delay={2} />
                <FloatingShape size="120px" top="60%" left="85%" delay={1.5} />

                <Grid container component="main" sx={{ height: '100vh' }}>
                    {/* Left Side - Hero Section */}
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 4,
                            position: 'relative',
                        }}
                    >
                        <Fade in timeout={1000}>
                            <Box sx={{ textAlign: 'center', zIndex: 1 }}>
                                <Avatar
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        margin: '0 auto 24px',
                                        background: 'rgba(255, 255, 255, 0.2)',
                                        backdropFilter: 'blur(10px)',
                                        border: '2px solid rgba(255, 255, 255, 0.3)',
                                    }}
                                >
                                    <VideoCallIcon sx={{ fontSize: 40, color: 'white' }} />
                                </Avatar>
                                
                                <Typography
                                    variant="h2"
                                    component="h1"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: 'white',
                                        mb: 2,
                                        textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                                    }}
                                >
                                    Aapla Video Call
                                </Typography>
                                
                                <Typography
                                    variant="h5"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        mb: 4,
                                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                                    }}
                                >
                                    Connect with people worldwide through secure video calls
                                </Typography>
                                
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 3,
                                        justifyContent: 'center',
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    {[
                                        { label: 'HD Quality', icon: '🎥' },
                                        { label: 'Secure', icon: '🔐' },
                                        { label: 'Fast', icon: '⚡' },
                                    ].map((feature, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                backdropFilter: 'blur(10px)',
                                                padding: '8px 16px',
                                                borderRadius: 20,
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                            }}
                                        >
                                            <Typography sx={{ fontSize: 20 }}>{feature.icon}</Typography>
                                            <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                                                {feature.label}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Fade>
                    </Grid>

                    {/* Right Side - Authentication Form */}
                    <Grid item xs={12} sm={8} md={5}>
                        <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', p: 2 }}>
                            <Slide direction="left" in timeout={800}>
                                <GlassPaper elevation={0} sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
                                    <Box
                                        sx={{
                                            p: 4,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                m: 1,
                                                width: 56,
                                                height: 56,
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            }}
                                        >
                                            {formState === 0 ? <LoginIcon /> : <PersonAdd />}
                                        </Avatar>

                                        <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                                            {formState === 0 ? 'Welcome Back' : 'Create Account'}
                                        </Typography>

                                        {/* Tab Buttons */}
                                        <Box sx={{ mb: 3 }}>
                                            <TabButton
                                                active={formState === 0}
                                                onClick={() => setFormState(0)}
                                            >
                                                Sign In
                                            </TabButton>
                                            <TabButton
                                                active={formState === 1}
                                                onClick={() => setFormState(1)}
                                            >
                                                Sign Up
                                            </TabButton>
                                        </Box>

                                        <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                                            {formState === 1 && (
                                                <Fade in timeout={300}>
                                                    <StyledTextField
                                                        margin="normal"
                                                        required
                                                        fullWidth
                                                        id="name"
                                                        label="Full Name"
                                                        name="name"
                                                        value={name}
                                                        autoFocus
                                                        onChange={(e) => setName(e.target.value)}
                                                        onKeyPress={handleKeyPress}
                                                    />
                                                </Fade>
                                            )}

                                            <StyledTextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="username"
                                                label="Username"
                                                name="username"
                                                value={username}
                                                autoFocus={formState === 0}
                                                onChange={(e) => setUsername(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                            />

                                            <StyledTextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="password"
                                                label="Password"
                                                value={password}
                                                type={showPassword ? 'text' : 'password'}
                                                onChange={(e) => setPassword(e.target.value)}
                                                onKeyPress={handleKeyPress}
                                                id="password"
                                                InputProps={{
                                                    endAdornment: (
                                                        <Button
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            sx={{ minWidth: 'auto', p: 1 }}
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </Button>
                                                    ),
                                                }}
                                            />

                                            {error && (
                                                <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
                                                    {error}
                                                </Alert>
                                            )}

                                            <AuthButton
                                                type="button"
                                                fullWidth
                                                variant="contained"
                                                sx={{
                                                    mt: 3,
                                                    mb: 2,
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    '&:hover': {
                                                        background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                                                    },
                                                }}
                                                onClick={handleAuth}
                                                disabled={!username || !password || (formState === 1 && !name)}
                                            >
                                                {formState === 0 ? 'Sign In' : 'Create Account'}
                                            </AuthButton>

                                            {formState === 0 && (
                                                <FormControlLabel
                                                    control={<Checkbox value="remember" color="primary" />}
                                                    label="Remember me"
                                                    sx={{ mt: 1 }}
                                                />
                                            )}
                                        </Box>
                                    </Box>
                                </GlassPaper>
                            </Slide>
                        </Box>
                    </Grid>
                </Grid>

                <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    onClose={() => setOpen(false)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        onClose={() => setOpen(false)}
                        severity="success"
                        sx={{
                            width: '100%',
                            borderRadius: 2,
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        {message}
                    </Alert>
                </Snackbar>
            </GradientBackground>
        </ThemeProvider>
    );
}