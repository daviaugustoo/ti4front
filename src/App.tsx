import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Children } from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Global from './Global';
import Login from './pages/Login';
import { useState } from 'react';

// interface PrivateRouteProps {
//   children: ReactNode
// }
// function PrivateRoute({ children }: PrivateRouteProps) {
//   if (!localStorage.getItem('token')) {
//     return <Navigate to="/login" replace />
//   }

//   return children
// }



export default function App() {

  const [loading, setLoading] = useState(false)
  const PrivateRoute = ({ children }: any) => {
    if (localStorage.getItem('token')) {
      return children;
    }
    return <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Login />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/:page"
          element={
            <PrivateRoute>
              <Global />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

