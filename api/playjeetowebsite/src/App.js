import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import BaseTemplate from './Pages/Layouts/BaseTemplate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseTemplate />}>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
