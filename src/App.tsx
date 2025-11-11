import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './store';
import theme from './theme';
import SearchPage from './pages/SearchPage';
import AnimeDetailPage from './pages/AnimeDetailPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/anime/:id" element={<AnimeDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
