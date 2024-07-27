import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import OrderForm from './components/OrderForm';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div style={{ padding: '5px'}}>
                <div>
                    
                    <OrderForm />
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;