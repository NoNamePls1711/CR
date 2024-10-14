import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
import CarDetailsPage from './Components/CarDetailsPage';
import BookingPage from './Components/BookingPage';
import PaymentPage from './Components/PaymentPage';
import ConfirmationPage from './Components/ConfirmationPage';
import LoginPage from './Components/LoginPage'; // เพิ่มหน้า Login
import ProtectedRoute from './Components/ProtectedRoute'; // นำเข้า ProtectedRoute

export default function MainApp() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/loginPage" element={<LoginPage />} />
      
      {/* ป้องกันเส้นทางโดยใช้ ProtectedRoute */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      />
      <Route
        path="/details"
        element={
          <ProtectedRoute>
            <CarDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking"
        element={
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/confirmation"
        element={
          <ProtectedRoute>
            <ConfirmationPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
