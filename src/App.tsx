import './App.scss';
import CardsGrid from './components/CardsGird';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Options from './components/Options';
import CardContextProvider from './components/context/CardContext';

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <h1>Welcome to my gallery</h1>

      <QueryClientProvider client={queryClient}>
        <CardContextProvider>
          <Options />
          <CardsGrid />
        </CardContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
