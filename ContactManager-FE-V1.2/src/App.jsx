import { BrowserRouter, Route, Routes, Navigate } from 'react-router'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import PageNotFound from './components/PageNotFound'

export default function App() { 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}
