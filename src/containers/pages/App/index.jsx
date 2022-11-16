// Libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from '../../../config/redux/store';
import { Provider } from 'react-redux';

// Pages
import Dashboard from '../dashboard';
import Login from '../login';
import Register from '../register';
import TambahBarang from '../tambahBrg';

// Component
import NavbarComponent from '../../../components/molecule/navbar';
import UbahBarang from '../ubahBarang';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/tambah_brg' element={<TambahBarang />} />
          <Route path='/ubah_barang/:id' element={<UbahBarang  />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
