import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { GreetingPage } from './pages/GreetingPage/GreetingPage';
import { CatalogEditPage } from './pages/CatalogEditPage/CatalogEditPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { AddCardPage } from './pages/EditCardPage/AddCardPage';
import { CartPage } from './pages/CartPage/CartPage';

function App() {

  return (
    <div className="App">
        <Header />

        <Routes>
          <Route index element={<GreetingPage />} />
          <Route path={'catalog'} element={<CatalogPage />} />
          <Route path={'catalog/edit'} element={<CatalogEditPage />} />
          <Route path={'catalog/:id'} element={<ProductPage />} />
          <Route path={'add-card'} element={<AddCardPage />} />
          <Route path={'cart'} element={<CartPage />} /> 
          {/* <Route path={'form'} element={<Form />} />*/}
        </Routes>
        
      </div>
  )
}

export default App
