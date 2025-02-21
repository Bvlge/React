import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Landing = () => {

    const navigate = useNavigate();

    const SignIn = () => {
        navigate('/login');
    };

    const SignUp = () => {
        navigate('/register');
    };

    return (
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
                    <h1>B V L G E</h1>
                </Box>

                <Box padding={'0.15rem'} bgcolor={'secondary.main'}/>
            </Box>

            <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                
                gap={'1rem'}
                marginTop={'3rem'}

                width={'15%'}
            >
                <Button 
                    variant="contained" 
                    fullWidth
                    onClick={SignIn}
                    sx={{
                        backgroundColor: 'secondary.main',
                        color: 'text.snow'
                    }}
                >
                    Sign In
                </Button>

                <Button 
                    variant="text" 
                    fullWidth
                    onClick={SignUp}
                    sx={{
                        color: '#8B0000'
                    }}
                >
                    Sign Up
                </Button>
            </Box>

        </Box>
    );
};

export default Landing;