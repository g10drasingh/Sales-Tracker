import React from 'react';
import { signInWithGoogle } from '../firebase';
import { Button, Card, CardContent, Typography, Box } from '@mui/material';
import { Google } from '@mui/icons-material';

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    signInWithGoogle().catch((error) => {
      console.error("Error signing in with Google: ", error);
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#FFFBFE',
      }}
    >
      <Card sx={{ minWidth: 275, maxWidth: 400 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="div" sx={{ mb: 2 }}>
            Gemini ERP
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Please sign in to continue
          </Typography>
          <Button
            variant="contained"
            startIcon={<Google />}
            onClick={handleLogin}
            sx={{ mt: 2 }}
          >
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;