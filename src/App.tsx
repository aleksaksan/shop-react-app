import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { GreetingPage } from './pages/GreetingPage/GreetingPage';

function App() {

  return (
    <div className="App">
        <Header />

        <Routes>
          <Route index element={<GreetingPage />} />
          <Route path={'products'} element={<CatalogPage />} />
          {/* <Route path={':id'} element={<ProductPage />} />
          <Route path={'form'} element={<Form />} />
          <Route path={'cart'} element={<CartPage />} /> */}
        </Routes>
        
      </div>
  )
}

export default App
