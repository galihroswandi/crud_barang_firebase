// Libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from '../../config/redux/store';
import { Provider } from 'react-redux';

// Pages
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';
import Register from '../pages/register';
import TambahBarang from '../pages/tambahBrg';

// Component
import UbahBarang from '../pages/ubahBarang';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/tambah_brg' element={<TambahBarang />} />
          <Route path='/ubah_barang/:id' element={<UbahBarang />} />
          <Route path='/delivery' element={<fiturNotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
