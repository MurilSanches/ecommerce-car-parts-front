import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', lazy: () => import('./pages/Home').then(m => ({ Component: m.default })) },
      { path: '/categorias', lazy: () => import('./pages/Categories').then(m => ({ Component: m.default })) },
      { path: '/buscar', lazy: () => import('./pages/Search').then(m => ({ Component: m.default })) },
      { path: '/produto/:slug', lazy: () => import('./pages/Product').then(m => ({ Component: m.default })) },
      { path: '/carrinho', lazy: () => import('./pages/Cart').then(m => ({ Component: m.default })) },
      { path: '/checkout', lazy: () => import('./pages/Checkout').then(m => ({ Component: m.default })) },
      { path: '/login', lazy: () => import('./pages/Login').then(m => ({ Component: m.default })) },
      { path: '/registrar', lazy: () => import('./pages/Register').then(m => ({ Component: m.default })) },
      { path: '/quem-somos', lazy: () => import('./pages/static/About').then(m => ({ Component: m.default })) },
      { path: '/privacidade', lazy: () => import('./pages/static/Privacy').then(m => ({ Component: m.default })) },
      { path: '/termos', lazy: () => import('./pages/static/Terms').then(m => ({ Component: m.default })) },
      { path: '/ajuda', lazy: () => import('./pages/static/Help').then(m => ({ Component: m.default })) },
      { path: '/contato', lazy: () => import('./pages/static/Contact').then(m => ({ Component: m.default })) },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration)
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError)
      })
  })
}
