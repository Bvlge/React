import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableFooter,
  TablePagination,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Container,
  SelectChangeEvent,
} from '@mui/material';

import { createSvgIcon } from '@mui/material/utils';

import api from '../api';

interface UserData {
  id: number;
  email: string;
  name: string;
  password: string;
}

interface Transaction {
  id: number;
  amount: string; // ou number, se vier como número
  category: string;
  description: string;
  date: string;   // se vier no formato "YYYY-MM-DD"
  type: string;   // ex.: "income" ou "expense"
  user: number;
}

const PlusIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>,
  'Plus',
);

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Campos do formulário para nova transação
  const [amountT, setAmountT] = useState('');
  const [categoryT, setCategoryT] = useState('');
  const [descriptionT, setDescriptionT] = useState('');
  const [dateT, setDateT] = useState('');
  const [typeT, setTypeT] = useState('');

  // Paginação
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  // Função para formatar data: de YYYY-MM-DD para DD/MM/YYYY
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // Função para formatar valor monetário para o padrão brasileiro
  const formatCurrency = (value: number | string) => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numericValue);
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/');
      return;
    }

    async function fetchData() {
      try {
        const userResponse = await api.get<UserData>('/api/users/user/');
        setUser(userResponse.data);

        const transactionsResponse = await api.get<Transaction[]>('/api/transactions/');
        // Ordena as transações: da mais nova para a mais antiga
        const sortedTransactions = transactionsResponse.data.sort((a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setTransactions(sortedTransactions);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar as informações do usuário ou das transações.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [navigate]);

  // Limpa os campos do formulário
  const resetFields = () => {
    setAmountT('');
    setCategoryT('');
    setDescriptionT('');
    setDateT('');
    setTypeT('');
  };

  // Submete nova transação
  const HandleSubmitT = async () => {
    const payload = {
      amount: amountT,
      category: categoryT,
      description: descriptionT,
      date: dateT,
      type: typeT,
    };

    try {
      const response = await api.post<Transaction>('/api/transactions/', payload);
      const newTransaction = response.data;
      // Atualiza e reordena as transações (mais nova primeiro)
      const updatedTransactions = [newTransaction, ...transactions];
      updatedTransactions.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setTransactions(updatedTransactions);
      resetFields();
    } catch (error) {
      console.error(error);
    }
  };

  // Manipula troca de página
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Dados visíveis na tabela, conforme a página
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleRows = transactions.slice(startIndex, endIndex);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Informações do Usuário */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          bgcolor: '#fff',
          borderRadius: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '600px',
          mx: 'auto',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
          {user?.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#777' }}>
          {user?.email}
        </Typography>
      </Box>

      {/* Formulário de Nova Transação */}
      <Card
        sx={{
          maxWidth: '600px',
          mx: 'auto',
          mb: 4,
          borderRadius: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <CardContent>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
            }}
            noValidate
            autoComplete="off"
          >
            {/* Amount */}
            <TextField
              label="Amount"
              type="text"
              size="small"
              value={amountT}
              onChange={(e) => setAmountT(e.target.value)}
              sx={{
                flex: '1 1 45%',
                input: { color: '#333' },
                label: { color: '#555' },
              }}
            />

            {/* Category como Select */}
            <FormControl
              size="small"
              sx={{
                flex: '1 1 45%',
                '& .MuiFormLabel-root.Mui-focused': {
                  color: '#1976d2',
                },
              }}
            >
              <InputLabel sx={{ color: '#555' }}>Category</InputLabel>
              <Select
                label="Category"
                value={categoryT}
                onChange={(e: SelectChangeEvent) => setCategoryT(e.target.value)}
                sx={{
                  color: '#333',
                  backgroundColor: '#fff',
                  '& .MuiSvgIcon-root': {
                    color: '#333',
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: '#fff',
                      '& .MuiMenuItem-root': {
                        color: '#333',
                      },
                      '& .MuiMenuItem-root.Mui-selected': {
                        backgroundColor: '#f5f5f5',
                      },
                    },
                  },
                }}
              >
                <MenuItem value="Salary">Salary</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Rent">Rent</MenuItem>
                <MenuItem value="Transport">Transport</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>

            {/* Description */}
            <TextField
              label="Description"
              type="text"
              size="small"
              value={descriptionT}
              onChange={(e) => setDescriptionT(e.target.value)}
              sx={{
                flex: '1 1 100%',
                input: { color: '#333' },
                label: { color: '#555' },
              }}
            />

            {/* Date */}
            <TextField
              label="Date"
              type="date"
              size="small"
              value={dateT}
              onChange={(e) => setDateT(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{
                flex: '1 1 45%',
                input: { color: '#333' },
                label: { color: '#555' },
              }}
            />

            {/* Type como Select */}
            <FormControl
              size="small"
              sx={{
                flex: '1 1 45%',
                '& .MuiFormLabel-root.Mui-focused': {
                  color: '#1976d2',
                },
              }}
            >
              <InputLabel sx={{ color: '#555' }}>Type</InputLabel>
              <Select
                label="Type"
                value={typeT}
                onChange={(e: SelectChangeEvent) => setTypeT(e.target.value)}
                sx={{
                  color: '#333',
                  backgroundColor: '#fff',
                  '& .MuiSvgIcon-root': {
                    color: '#333',
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: '#fff',
                      '& .MuiMenuItem-root': {
                        color: '#333',
                      },
                      '& .MuiMenuItem-root.Mui-selected': {
                        backgroundColor: '#f5f5f5',
                      },
                    },
                  },
                }}
              >
                <MenuItem value="Income">Income</MenuItem>
                <MenuItem value="Loss">Loss</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              onClick={HandleSubmitT}
              sx={{
                flex: '1 1 100%',
                mt: 1,
                py: 1.5,
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PlusIcon sx={{ mr: 1 }} />
              Add Transaction
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Tabela de Transações */}
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: '800px',
          mx: 'auto',
          bgcolor: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 120, fontWeight: 'bold', color: '#333' }}>Amount</TableCell>
              <TableCell sx={{ width: 150, fontWeight: 'bold', color: '#333' }}>Category</TableCell>
              <TableCell sx={{ width: 200, fontWeight: 'bold', color: '#333' }}>Description</TableCell>
              <TableCell sx={{ width: 120, fontWeight: 'bold', color: '#333' }}>Date</TableCell>
              <TableCell sx={{ width: 100, fontWeight: 'bold', color: '#333' }}>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell sx={{ width: 120, color: '#333' }}>
                  {formatCurrency(tx.amount)}
                </TableCell>
                <TableCell sx={{ width: 150, color: '#333' }}>{tx.category}</TableCell>
                <TableCell sx={{ width: 200, color: '#333' }}>{tx.description}</TableCell>
                <TableCell sx={{ width: 120, color: '#333' }}>
                  {formatDate(tx.date)}
                </TableCell>
                <TableCell sx={{ width: 100, color: '#333' }}>{tx.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={transactions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                colSpan={5}
                rowsPerPageOptions={[]}
                sx={{
                  '& .MuiTablePagination-displayedRows': { color: '#333' },
                  '& .MuiTablePagination-actions': { color: '#333' },
                  '& .MuiTablePagination-selectLabel': { color: '#333' },
                  '& .MuiSvgIcon-root': { color: '#333' },
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;
