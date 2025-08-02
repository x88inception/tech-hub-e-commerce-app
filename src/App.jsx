import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Products from './components/Products';
import Users from './components/Users';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ProductDetails from './components/ProductDetails';

const AppContent = () => {
  const { darkMode } = useTheme();
const theme = createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    primary: {
      main: '#9B00FF',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: darkMode ? '#9B00FF' : '#BB33FF',
    },
    background: {
      default: darkMode ? '#000000' : '#FFFFFF',
      paper: darkMode ? '#121212' : '#FFFFFF',
    },
    text: {
      primary: darkMode ? '#9B00FF' : '#000000',
      secondary: darkMode ? '#FFFFFF' : '#9B00FF',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#9B00FF',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#7A00CC',
            boxShadow: '0 0 8px #9B00FF',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: darkMode ? '#000000' : '#9B00FF',
          color: darkMode ? '#9B00FF' : '#FFFFFF',
          boxShadow: darkMode ? '0 0 10px #9B00FF' : 'none',
        },
      },
    },
  },
});




  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Navigation />
          <ProtectedRoute>
            <Routes>
              <Route path="/products" element={<Products />} />
              <Route path="/users" element={<Users />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/login" element={<Navigate to="/products" replace />} />
              <Route path="/products/:id" element={<ProductDetails />} />

            </Routes>
          </ProtectedRoute>
          <Routes>
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </MUIThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
