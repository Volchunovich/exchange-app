import React, { Suspense } from 'react';
import { Switch, Redirect, Route } from 'react-router';
import Login from './Login/Login';
import Registration from './Registration/Registration';

const AuthRouter = () => {
  return (
    <Suspense fallback='Loading...'>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Registration} />
        <Redirect to='/dashboard' />
      </Switch>
    </Suspense>
  );
};

export default AuthRouter;
