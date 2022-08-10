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
import AddBill from './components/productUpdatedDetails/addBill/AddBill';
import RetriveBill from './components/productUpdatedDetails/retriveBill/RetriveBill'
import BillInvoice from './components/billingInvoice/BillInvoice'
import GstBill from './components/GstBill/GstBill'
import { Provider } from 'react-redux'
import { billListReducer } from './components/redux/Reducer.js'
import LogBook from './components/logBook/LogBook.js'
import { createStore } from 'redux'
function App() {
  const Store = createStore(billListReducer)
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path='/' element={<ProductListing />} />
            <Route path='/billing' element={< SearchBox />} />
            <Route path='/addproduct' element={<AddProduct />} />
            <Route path='/sales' element={<Lastsale />} />
            <Route path='/updatestock' element={<StockUpdate />} />
            <Route path='/Error500' element={<Error500 />} />
            <Route path='/checkbill' element={<CheckBill />} />
            <Route path='/addBill' element={<AddBill />} />
            <Route path='/retriveBill' element={<RetriveBill />} />
            <Route path='/billInvoice' element={<BillInvoice />} />
            <Route path='/gstbill' element={<GstBill />} />
            <Route path='/logbook' element={<LogBook />} />

          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
