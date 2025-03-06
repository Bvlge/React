import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Container,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Home = () => {
  const navigate = useNavigate();

  const menuOptions = [
    {
      title: 'Dashboard',
      description: 'Visualize suas transações e saldo.',
      icon: <DashboardIcon fontSize="large" sx={{ color: '#1976d2' }} />,
      route: '/dashboard',
    },
    {
      title: 'Estatísticas',
      description: 'Veja resumos e análises financeiras.',
      icon: <BarChartIcon fontSize="large" sx={{ color: '#1976d2' }} />,
      route: '/statistics',
    },
    {
      title: 'Despesas Mensais',
      description: 'Acompanhe as despesas por mês.',
      icon: <MonetizationOnIcon fontSize="large" sx={{ color: '#1976d2' }} />,
      route: '/monthly-expense',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ece9e6, #ffffff)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}
      >
        Bem-vindo ao Bvlge
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        sx={{ color: '#555', mb: 4 }}
      >
        Escolha uma das opções abaixo para começar.
      </Typography>

      <Container maxWidth="md">
        <Grid container spacing={4} justifyContent="center">
          {menuOptions.map((option, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  borderRadius: 2,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <CardActionArea
                  onClick={() => navigate(option.route)}
                  sx={{ p: 2 }}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>{option.icon}</Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}
                    >
                      {option.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      {option.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
