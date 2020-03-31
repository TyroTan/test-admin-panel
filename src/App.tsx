import React from 'react';
import {
  // BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
  Redirect,
  // Redirect,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bs4dashboard/assets/css/animate.min.css';
import 'bs4dashboard/assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0';
import 'bs4dashboard/assets/css/demo.css';
import 'bs4dashboard/assets/css/pe-icon-7-stroke.css';
// import './App.css';
import asyncComponent from './views_helper/asyncComponent';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const App: React.FC = (): any => {
  return (
    // <BrowserRouter basename={window.location.pathname || ''}>
    <BrowserRouter basename={window.location.pathname || ''}>
      <Switch>
        <Route
          path="/login"
          component={
            asyncComponent(
              {
                requiresAuth: true,
                ifAuthedRedirectTo: '/admin/dashboard',
              },
              (): DynamicImportType => import('containers/LoginForm'),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ) as any
          }
          // render={(props): React.ReactElement => <AdminLayout {...props} />}
        />
        <Route
          path="/admin"
          component={
            asyncComponent(
              {
                requiresAuth: true,
              },
              (): DynamicImportType => import('bs4dashboard/layouts/Admin.jsx'),
              // import('src/bs3dashboard/layouts/Admin')
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ) as any
          }
          // render={(props): React.ReactElement => <AdminLayout {...props} />}
        />
        <Route
          path="/admin/dashboard"
          component={
            asyncComponent(
              {
                requiresAuth: true,
              },
              (): DynamicImportType => import('bs4dashboard/layouts/Admin.jsx'),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ) as any
          }
          // render={(props): React.ReactElement => <AdminLayout {...props} />}
        />

        <Redirect from="/" to="/admin/dashboard" />

        <Route
          component={
            asyncComponent(
              {
                requiresAuth: true,
                ifAuthedRedirectTo: '/admin/dashboard',
              },
              (): DynamicImportType => import('containers/LoginForm'),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ) as any
          }
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
