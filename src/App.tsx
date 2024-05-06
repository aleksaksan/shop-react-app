import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { GreetingPage } from './pages/GreetingPage/GreetingPage';
import { CatalogEditPage } from './pages/CatalogEditPage/CatalogEditPage';

function App() {

  return (
    <div className="App">
        <Header />

        <Routes>
          <Route index element={<GreetingPage />} />
          <Route path={'catalog'} element={<CatalogPage />} />
          <Route path={'catalog/edit'} element={<CatalogEditPage />} />
          {/* <Route path={':id'} element={<ProductPage />} />
          <Route path={'form'} element={<Form />} />
          <Route path={'cart'} element={<CartPage />} /> */}
        </Routes>
        
      </div>
  )
}

export default App
