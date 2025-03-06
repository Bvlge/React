import { useNavigate } from 'react-router-dom';
import { useState } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import api from '../api';

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordC, setShowPasswordC] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowPasswordC = () => {
    setShowPasswordC((prev) => !prev);
  };

  const resetFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
  };

  async function register() {
    // Remova tokens antigos para evitar que sejam enviados automaticamente
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    const payload = {
      email: email,
      name: name,
      password: password,
    };

    try {
      const response = await api.post('/api/users/register/', payload);
      console.log("Usuário registrado:", response.data);
      resetFields();
      navigate('/login');
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert('Ocorreu um erro ao registrar. Verifique o console para mais detalhes.');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100dvh"
      width="100dvw"
      bgcolor="background.default"
      sx={{ overflow: 'hidden', boxSizing: 'border-box' }}
    >
      <Box width="100%">
        <Box padding="0.15rem" bgcolor="secondary.main" />
        <Box
          display="flex"
          justifyContent="center"
          width="100%"
          paddingTop="2rem"
          paddingBottom="2rem"
          bgcolor="primary.main"
          color="background.default"
        >
          <h1>Sign Up</h1>
        </Box>
        <Box padding="0.15rem" bgcolor="secondary.main" />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minWidth="25%"
        minHeight="50%"
        marginTop="1.5rem"
        marginBottom="1.5rem"
        gap="1rem"
      >
        <TextField
          variant="outlined"
          margin="dense"
          label="Nome & Sobrenome"
          value={name}
          fullWidth
          onChange={(e) => setName(e.target.value)}
          sx={{
            input: { color: 'black' },
            label: { color: 'grey' }
          }}
        />
        <TextField
          variant="outlined"
          margin="dense"
          label="Email"
          value={email}
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            input: { color: 'black' },
            label: { color: 'grey' }
          }}
        />
        <TextField
          variant="outlined"
          margin="dense"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          value={password}
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{
            input: { color: 'black' },
            label: { color: 'grey' }
          }}
        />
        <TextField
          variant="outlined"
          margin="dense"
          label="Confirmar Senha"
          type={showPasswordC ? 'text' : 'password'}
          value={passwordConfirm}
          fullWidth
          onChange={(e) => setPasswordConfirm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPasswordC}
                  edge="end"
                >
                  {showPasswordC ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
          sx={{
            input: { color: 'black' },
            label: { color: 'grey' }
          }}
        />
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minWidth="15%"
      >
        <Button
          variant="contained"
          onClick={() => register()}
          fullWidth
          sx={{ backgroundColor: 'secondary.main' }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
