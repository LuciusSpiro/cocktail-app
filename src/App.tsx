import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CocktailProvider } from './hooks/useCocktails';
import { ShoppingListProvider } from './hooks/useShoppingList';
import { SaveActionProvider } from './hooks/useSaveAction';
import { AppLayout } from './components/Layout';
import { BarOverview } from './pages/BarOverview';
import { CocktailEditor } from './pages/CocktailEditor';
import { ShoppingList } from './pages/ShoppingList';
import { Settings } from './pages/Settings';

function App() {
  return (
    <BrowserRouter basename="/cocktail-app">
      <CocktailProvider>
        <ShoppingListProvider>
          <SaveActionProvider>
            <AppLayout>
              <Routes>
                <Route path="/" element={<BarOverview />} />
                <Route path="/cocktail/new" element={<CocktailEditor />} />
                <Route path="/cocktail/:id" element={<CocktailEditor />} />
                <Route path="/shopping" element={<ShoppingList />} />
              <Route path="/settings" element={<Settings />} />
              </Routes>
            </AppLayout>
          </SaveActionProvider>
        </ShoppingListProvider>
      </CocktailProvider>
    </BrowserRouter>
  );
}

export default App;
