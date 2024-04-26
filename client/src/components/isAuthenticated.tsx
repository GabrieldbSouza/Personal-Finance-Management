import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import jwt from 'jsonwebtoken'

export function PrivateRoute({ children }: any) {

  const token = localStorage.getItem("token");
  const isAuthenticated = !!token; 
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}
