import { useNavigate } from 'react-router-dom';
import { useState } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import api from '../api';

const Login = () => {

    const navigate = useNavigate();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    async function login() {
        try {
          // Faz a requisição ao endpoint para obter os tokens
          const response = await api.post('api/users/token/', { email, password });
          
          // Se chegar até aqui sem lançar exceção, significa que deu certo (status 2xx).
          const { access, refresh } = response.data;
          
          // Salva tokens no localStorage, se existirem
          if (access) {
            localStorage.setItem('access_token', access);
          }
          if (refresh) {
            localStorage.setItem('refresh_token', refresh);
          }
    
          // Redireciona para a dashboard
          navigate('/dashboard');
    
        } catch (error) {
          // Se cair no catch, significa que a requisição deu erro
          console.error(error);
          alert('Falha no login. Verifique suas credenciais ou tente novamente.');
        }
      };

    return(
        <Box
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
        
            height={'100dvh'}
            width={'100dvw'}

            bgcolor={'background.default'}
            sx={{ overflow: 'hidden', boxSizing: 'border-box' }}
        >
            <Box width={'100%'} >
                <Box padding={'0.15rem'} bgcolor={'secondary.main'}/>

                <Box
                    display={'flex'}
                    justifyContent={'center'}
                    
                    width={'100%'}
                    paddingTop={'2rem'}
                    paddingBottom={'2rem'}

                    bgcolor={'primary.main'}
                    color={'background.default'}
                >
                    <h1>Sign In</h1>
                </Box>

                <Box padding={'0.15rem'} bgcolor={'secondary.main'}/>
            </Box>

            <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}

                minWidth={'25%'}
                minHeight={'50%'}

                gap={'1rem'}
            >
                <TextField 
                    variant="outlined"
                    margin="dense"
                    label="E-mail"
                    value={email}
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}

                    sx={{ 
                        input: { color: 'black' },
                        label: { color: 'grey'  } 
                    }}
                />
                <TextField 
                    variant="outlined"
                    margin="dense"
                    label="Senha"
                    value={password}
                    fullWidth
                    onChange={(e) => setPassword(e.target.value)}

                    sx={{ 
                        input: { color: 'black' },
                        label: { color: 'grey'  } 
                    }}
                />
            </Box>

            <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}

                minWidth={'15%'}
            >
                <Button
                    variant="contained"
                    
                    onClick={() => login()}
                    fullWidth
                    
                    sx={{
                        backgroundColor: 'secondary.main'
                    }}
                >
                    Sign In
                </Button>
            </Box>
        </Box>
    ); 
};

export default Login;
