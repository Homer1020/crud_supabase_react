import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './style.css'
import UsersPage from './pages/Users'
import App from './App'
import UserCreate from './pages/UserCreate'
import UserEdit from './pages/UserEdit'
import Error from './pages/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <UsersPage />
      },
      {
        path: '/usuarios/crear',
        element: <UserCreate />
      },
      {
        path: '/usuarios/:id/editar',
        element: <UserEdit />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider
      router={ router }
    />
  </React.StrictMode>,
)
