import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes'; // Updated import statement

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppRoutes /> 
      </Router>
    </ThemeProvider>
  );
}

export default App;
        