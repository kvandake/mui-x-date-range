import { ExamplePage } from '../pages';
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { useMemo } from 'react';

export function App() {
  const theme = useMemo(() => createTheme(), []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <ExamplePage />
      </Container>
    </ThemeProvider>
  );
}

export default App;
