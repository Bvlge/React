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
  Button
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
  amount: string;      // ou number, se vier como número
  category: string;
  description: string;
  date: string;        // se vier no formato "YYYY-MM-DD"
  type: string;        // ex.: "income" ou "expense"
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

  const [amountT, setAmountT] = useState('');
  const [categoryT, setCategoryT] = useState('');
  const [desctriptionT, setDescriptionT] = useState('');
  const [dateT, setDateT] = useState('');
  const [typeT, setTypeT] = useState('');

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
        setTransactions(transactionsResponse.data);

      } catch (err) {
        console.error(err);
        setError('Erro ao carregar as informações do usuário ou das transações.');

      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [navigate]);

  function resetFields () {
    setAmountT('');
    setCategoryT('');
    setDescriptionT('');
    setDateT('');
    setTypeT('');
  }

  function HandleSubmitT () {
    const payload = {
        "amount": amountT,
        "category": categoryT,
        "description": desctriptionT,
        "date": dateT,
        "type": typeT
    };

    try {
        const response = api.post('/api/transactions/', payload);
        console.log(response);

        resetFields();

    } catch (error) {
        console.error(error);
    }

  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Box
      width="100dvw"
      minHeight="100dvh"
      padding="1rem"
      display="flex"
      flexDirection="column"
      alignItems="center"     
      justifyContent="flex-start" 
      boxSizing="border-box"
    >
      {/* Informações do usuário */}
      <h1>{user?.name}</h1>
      <h2>{user?.email}</h2>

      <Box
      
      >
        <Box
  sx={{
    marginTop: 2,
    width: '100%',   
    gap: 1,     
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  {/* Amount */}
  <TextField
    label="Amount"
    type="text"
    size='small'
    value={amountT}
    onChange={(e) => setAmountT(e.target.value)}
  />

  {/* Category */}
  <TextField
    label="Category"
    type="text"
    size='small'
    value={categoryT}
    onChange={(e) => setCategoryT(e.target.value)}
  />

  {/* Description */}
  <TextField
    label="Description"
    type="text"
    size='small'
    value={desctriptionT}
    onChange={(e) => setDescriptionT(e.target.value)}
  />

  {/* Date */}
  <TextField
    label="Date"
    type="date"
    size='small'
    value={dateT}
    onChange={(e) => setDateT(e.target.value)}
    InputLabelProps={{ shrink: true }} // Para exibir label acima mesmo com valor
  />

  {/* Type */}
  <TextField
    label="Type"
    type="text"
    size='small'
    value={typeT}
    onChange={(e) => setTypeT(e.target.value )}
  />

    <Button
        onClick={HandleSubmitT}
    >
        <PlusIcon />
    </Button>
</Box>

      </Box>

      {/* Tabela de transações */}
      <TableContainer
        component={Paper}
        sx={{
          marginTop: 2,
          maxWidth: '70%',   
          width: '100%',        
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'black' }}>ID</TableCell>
              <TableCell sx={{ color: 'black' }}>Amount</TableCell>
              <TableCell sx={{ color: 'black' }}>Category</TableCell>
              <TableCell sx={{ color: 'black' }}>Description</TableCell>
              <TableCell sx={{ color: 'black' }}>Date</TableCell>
              <TableCell sx={{ color: 'black' }}>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.id}</TableCell>
                <TableCell>{tx.amount}</TableCell>
                <TableCell>{tx.category}</TableCell>
                <TableCell>{tx.description}</TableCell>
                <TableCell>{tx.date}</TableCell>
                <TableCell>{tx.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
