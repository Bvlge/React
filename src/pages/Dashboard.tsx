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
  TablePagination
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

  // States para os campos do formulário
  const [amountT, setAmountT] = useState('');
  const [categoryT, setCategoryT] = useState('');
  const [desctriptionT, setDescriptionT] = useState('');
  const [dateT, setDateT] = useState('');
  const [typeT, setTypeT] = useState('');

  // Estado para paginação da tabela (somente a página, pois as linhas são fixas em 5)
  const [page, setPage] = useState(0);

  // Quantidade fixa de linhas por página
  const rowsPerPage = 5;

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

  // Função para limpar os campos do formulário após criar uma nova transação
  function resetFields() {
    setAmountT('');
    setCategoryT('');
    setDescriptionT('');
    setDateT('');
    setTypeT('');
  }

  // Função para submeter os dados de uma nova transação
  async function HandleSubmitT() {
    const payload = {
      amount: amountT,
      category: categoryT,
      description: desctriptionT,
      date: dateT,
      type: typeT
    };

    try {
      // Espera a resposta da criação
      const response = await api.post<Transaction>('/api/transactions/', payload);
      
      // Se a API retorna a nova transação criada, podemos atualizar o estado local:
      const newTransaction = response.data;
      // Adiciona a nova transação ao final do array atual
      setTransactions((prev) => [...prev, newTransaction]);

      resetFields();
    } catch (error) {
      console.error(error);
    }
  }

  // Lida com a troca de página na paginação
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  // Fatiamento dos dados conforme a página atual (page) e quantidade fixa de linhas (rowsPerPage)
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleRows = transactions.slice(startIndex, endIndex);

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
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="50%"
        paddingBottom="1rem"
        paddingTop="1rem"
      >
        <h1>{user?.name}</h1>
        <h2>{user?.email}</h2>
      </Box>

      {/* Inputs para criar nova transação */}
      <Box
        sx={{
          width: '100%',
          maxWidth: '50%',
          mt: 3,
          mb: 3,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'center'
        }}
      >
        {/* Amount */}
        <TextField
          label="Amount"
          type="text"
          size="small"
          value={amountT}
          onChange={(e) => setAmountT(e.target.value)}
          sx={{
            input: { color: 'black' },
            label: { color: 'grey' }
          }}
        />

        {/* Category */}
        <TextField
          label="Category"
          type="text"
          size="small"
          value={categoryT}
          onChange={(e) => setCategoryT(e.target.value)}
          sx={{
            input: { color: 'black' },
            label: { color: 'grey' }
          }}
        />

        {/* Description */}
        <TextField
          label="Description"
          type="text"
          size="small"
          value={desctriptionT}
          onChange={(e) => setDescriptionT(e.target.value)}
          sx={{
            input: { color: 'black' },
            label: { color: 'grey' }
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
            input: { color: 'black' },
            label: { color: 'grey' }
          }}
        />

        {/* Select para escolher o tipo (Income ou Loss) */}
        <FormControl 
          size="small" 
          sx={{ minWidth: 170 }}
        >
          <InputLabel sx={{ color: 'grey' }}>
            Type
          </InputLabel>

          <Select
            label="Type"
            value={typeT}
            onChange={(e) => setTypeT(e.target.value)}
            sx={{
              color: 'black'
            }}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Loss">Loss</MenuItem>
          </Select>
        </FormControl>

        {/* Botão para criar a transação */}
        <Button
          variant="contained"
          onClick={HandleSubmitT}
          sx={{ minWidth: '3rem' }}
        >
          <PlusIcon />
        </Button>
      </Box>

      {/* Tabela de transações (com paginação sem opção de alterar linhas por página) */}
      <TableContainer
        component={Paper}
        sx={{
          marginTop: 2,
          maxWidth: '50%',
          width: '100%'
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 120, color: 'black' }}>Amount</TableCell>
              <TableCell sx={{ width: 150, color: 'black' }}>Category</TableCell>
              <TableCell sx={{ width: 200, color: 'black' }}>Description</TableCell>
              <TableCell sx={{ width: 120, color: 'black' }}>Date</TableCell>
              <TableCell sx={{ width: 100, color: 'black' }}>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell sx={{ width: 120, color: 'black' }}>{tx.amount}</TableCell>
                <TableCell sx={{ width: 150, color: 'black' }}>{tx.category}</TableCell>
                <TableCell sx={{ width: 200, color: 'black' }}>{tx.description}</TableCell>
                <TableCell sx={{ width: 120, color: 'black' }}>{tx.date}</TableCell>
                <TableCell sx={{ width: 100, color: 'black' }}>{tx.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={transactions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_event, newPage) => handleChangePage(newPage)}
                colSpan={5}
                rowsPerPageOptions={[]}
                sx={{
                  '& .MuiTablePagination-displayedRows': {
                    color: 'black',
                  },
                  '& .MuiTablePagination-actions': {
                    color: 'black',
                  },
                  '& .MuiTablePagination-actions .MuiSvgIcon-root': {
                    color: 'black',
                  },
                  '& .MuiTablePagination-selectLabel': {
                    color: 'black',
                  }
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
