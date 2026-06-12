import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export default function ProtectedRoute() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}