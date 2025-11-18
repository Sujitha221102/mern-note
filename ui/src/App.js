import { Route, Routes } from 'react-router';
import './App.css';
import Home from './pages/Home';
import 'antd/dist/reset.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
