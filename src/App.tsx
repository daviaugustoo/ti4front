import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Global from './Global';
import Login from './pages/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <Login />
            }
          />
          <Route
            path="/:page"
            element={
              <Global />
            }
          />
          <Route
            path="/"
            element={
              <Global />
            }
          />

        </Routes >
      </BrowserRouter >
    </>
  );
}

export default App;
