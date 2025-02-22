import { useState } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Register = () => {

    const [ nome, setNome ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ senha, setSenha ] = useState("");
    const [ senhaConfirm, setSenhaConfirm ] = useState(""); 

    const Register = () => {
        //...
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
                    value={nome}
                    fullWidth
                    onChange={(e) => setNome(e.target.value)}

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
                    value={senha}
                    fullWidth
                    onChange={(e) => setSenha(e.target.value)}

                    sx={{ 
                        input: { color: 'black' },
                        label: { color: 'grey'  } 
                    }}
                />
                <TextField 
                    variant="outlined"
                    margin="dense"
                    label="Confirmar Senha"
                    value={senhaConfirm}
                    fullWidth
                    onChange={(e) => setSenhaConfirm(e.target.value)}

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
                
                    onClick={Register}
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
