/*import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('pk_test_d2lsbGluZy1iaXJkLTAuY2xlcmsuYWNjb3VudHMuZGV2JA')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)*/

// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Import the layouts
import RootLayout from './layouts/root-layout';
import DashboardLayout from './layouts/dashboard-layout';

// Import the components
import IndexPage from './routes';
import ContactPage from './routes/contact';
import SignInPage from './routes/sign-in';
import SignUpPage from './routes/sign-up';
import DashboardPage from './routes/dashboard';
import InvoicesPage from './routes/dashboard.invoices';
import DashboardPageSUV from './routes/dashboard-SUV';
import DashboardPageSEDAN from './routes/dashboard-SEDAN';
import DashboardPageMPV from './routes/dashboard-MPV';
import DashboardPageMINI from './routes/dashboard-MINI';



const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <IndexPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/sign-in', element: <SignInPage /> },
      { path: '/sign-up', element: <SignUpPage /> },
      { path: '/dashboard-SUV', element: <DashboardPageSUV />},
      { path: '/dashboard-SEDAN', element: <DashboardPageSEDAN />},
      { path: '/dashboard-MPV', element: <DashboardPageMPV />},
      { path: '/dashboard-MINI', element: <DashboardPageMINI />},
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'invoices', element: <InvoicesPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
