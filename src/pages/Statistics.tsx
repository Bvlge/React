import { useState } from 'react';
import { Box, Card, CardContent, Grid, TextField, Button, Typography } from '@mui/material';
import api from '../api';

interface StatisticsData {
  total_receitas: number;
  total_despesas: number;
  saldo: number;
  categoria_mais_frequente: string;
  total_transacoes: number;
  media_transacao: number;
}

const Statistics = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [stats, setStats] = useState<StatisticsData | null>(null);
  const [error, setError] = useState('');

  const fetchStatistics = async () => {
    try {
      const response = await api.get<StatisticsData>('/api/statistics/', {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      });
      setStats(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Erro ao buscar as estatísticas.');
      setStats(null);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="2rem"
      sx={{
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" mb={4} sx={{ color: '#333', fontWeight: 'bold' }}>
        Estatísticas
      </Typography>

      <Box display="flex" gap={2} mb={4} flexWrap="wrap" justifyContent="center">
        <TextField
          label="Data Inicial"
          type="date"
          InputLabelProps={{
            shrink: true,
            style: { color: '#333' },
          }}
          InputProps={{
            style: { color: '#333', backgroundColor: '#fff' },
          }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={{ borderRadius: '4px' }}
        />
        <TextField
          label="Data Final"
          type="date"
          InputLabelProps={{
            shrink: true,
            style: { color: '#333' },
          }}
          InputProps={{
            style: { color: '#333', backgroundColor: '#fff' },
          }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          sx={{ borderRadius: '4px' }}
        />
        <Button variant="contained" onClick={fetchStatistics} sx={{ padding: '0.75rem 2rem' }}>
          Buscar
        </Button>
      </Box>

      {error && (
        <Typography color="error" mb={4}>
          {error}
        </Typography>
      )}

      {stats && (
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ backgroundColor: '#fff' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }} gutterBottom>
                  Resumo Financeiro
                </Typography>
                <Typography variant="body1" sx={{ color: '#555', mb: 1 }}>
                  <strong>Total Receitas:</strong> {formatCurrency(stats.total_receitas)}
                </Typography>
                <Typography variant="body1" sx={{ color: '#555', mb: 1 }}>
                  <strong>Total Despesas:</strong> {formatCurrency(stats.total_despesas)}
                </Typography>
                <Typography variant="body1" sx={{ color: '#555', mb: 1 }}>
                  <strong>Saldo:</strong> {formatCurrency(stats.saldo)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ backgroundColor: '#fff' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }} gutterBottom>
                  Outras Informações
                </Typography>
                <Typography variant="body1" sx={{ color: '#555', mb: 1 }}>
                  <strong>Categoria Mais Frequente:</strong> {stats.categoria_mais_frequente}
                </Typography>
                <Typography variant="body1" sx={{ color: '#555', mb: 1 }}>
                  <strong>Total Transações:</strong> {stats.total_transacoes}
                </Typography>
                <Typography variant="body1" sx={{ color: '#555', mb: 1 }}>
                  <strong>Média Transação:</strong> {formatCurrency(stats.media_transacao)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Statistics;
