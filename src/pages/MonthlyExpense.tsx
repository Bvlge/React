import { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import api from '../api';

interface CategoryExpense {
  category: string;
  year_month: string;
  avg_expense: number;
  total_expense: number;
  count: number;
}

const CategoryExpenses = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [expenses, setExpenses] = useState<CategoryExpense[]>([]);
  const [error, setError] = useState('');

  const fetchCategoryExpenses = async () => {
    try {
      const response = await api.get<CategoryExpense[]>('/api/statistics/category-expenses/', {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      });
      setExpenses(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Erro ao buscar as despesas por mês.');
      setExpenses([]);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="2rem"
      sx={{ backgroundColor: '#f0f2f5', minHeight: '100vh' }}
    >
      <Typography variant="h4" mb={4} sx={{ color: '#333', fontWeight: 'bold' }}>
        Despesas por Mês
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
        <Button variant="contained" onClick={fetchCategoryExpenses} sx={{ padding: '0.75rem 2rem' }}>
          Buscar
        </Button>
      </Box>

      {error && (
        <Typography color="error" mb={4}>
          {error}
        </Typography>
      )}

      {expenses.length > 0 && (
        <TableContainer component={Paper} sx={{ width: '100%', maxWidth: '800px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#333', fontWeight: 'bold' }}>Categoria</TableCell>
                <TableCell sx={{ color: '#333', fontWeight: 'bold' }}>Ano/Mês</TableCell>
                <TableCell sx={{ color: '#333', fontWeight: 'bold' }}>Despesa Média</TableCell>
                <TableCell sx={{ color: '#333', fontWeight: 'bold' }}>Despesa Total</TableCell>
                <TableCell sx={{ color: '#333', fontWeight: 'bold' }}>Contagem</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: '#555' }}>{item.category}</TableCell>
                  <TableCell sx={{ color: '#555' }}>{item.year_month}</TableCell>
                  <TableCell sx={{ color: '#555' }}>{formatCurrency(item.avg_expense)}</TableCell>
                  <TableCell sx={{ color: '#555' }}>{formatCurrency(item.total_expense)}</TableCell>
                  <TableCell sx={{ color: '#555' }}>{item.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default CategoryExpenses;
