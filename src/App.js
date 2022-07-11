import './App.css';
import Navbar from './components/navbar/Navbar'
import SearchBox from './components/search/SearchBar'
import ProductListing from './components/productlist/ProductListing';
import AddProduct from './components/addProduct/AddProduct';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Lastsale from './components/sales/Lastsale';
import StockUpdate from './components/updateStocks/StockUpdate'
import Error500 from './components/Error500';
import CheckBill from './components/checkBill/CheckBill';
function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path='/' element={<ProductListing/>} />
          <Route path='/biling' element={< SearchBox />} />
          <Route path='/addproduct' element={<AddProduct />} />
          <Route path='/sales' element={<Lastsale />} />
          <Route path='/updatestock' element={<StockUpdate />} />
          <Route path='/Error500' element={<Error500 />} />
          <Route path='/checkbill' element={<CheckBill/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
