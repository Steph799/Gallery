import './App.scss';
import CardsGrid from './components/CardsGird';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Options from './components/Options';

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <h1>welcome to my gallery</h1>
      <QueryClientProvider client={queryClient}>
        <Options />
        <CardsGrid />
      </QueryClientProvider>
    </div>
  );
}

export default App;
