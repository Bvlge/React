import { useNavigate } from 'react-router-dom';
import { useState } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import api from '../api';

const Register = () => {

    const navigate = useNavigate();

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordConfirm, setPasswordConfirm ] = useState(""); 

    const resetFields = () => {
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
    };

    async function register() {
        const payload = {
            "email": email,
            "name": name,
            "password": password,
        };
          
        try {
            const response = await api.post('/api/users/register/', payload);
            console.log(response);

            resetFields();
            navigate('/login');

        } catch (error) {
            console.error("Erro ao cadastrar: ", error);
    
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
                    <h1>Sign Up</h1>
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

                marginTop={'1.5rem'}
                marginBottom={'1.5rem'}

                gap={'1rem'}
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
                        label: { color: 'grey'  } 
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
                <TextField 
                    variant="outlined"
                    margin="dense"
                    label="Confirmar Senha"
                    value={passwordConfirm}
                    fullWidth
                    onChange={(e) => setPasswordConfirm(e.target.value)}

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
                
                    onClick={() => register()}
                    fullWidth

                    sx={{
                        backgroundColor: 'secondary.main'
                    }}
                >
                    Sign Up
                </Button>
            </Box>
        </Box>
    ); 
};

export default Register;
