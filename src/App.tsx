import Box from '@mui/material/Box';
import AppRoutes from "./routes";

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const App = () => {
    return (
        <Box>
            <ThemeProvider theme={theme}>
                <AppRoutes />
            </ThemeProvider>
        </Box>
    );
};

export default App;
