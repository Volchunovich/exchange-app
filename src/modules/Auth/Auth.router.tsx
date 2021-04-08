import React, { Suspense } from 'react';
import { Switch, Redirect, Route } from 'react-router';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import { useAuthStyles } from './Auth.styles';

const AuthRouter = () => {
  const classes = useAuthStyles();
  return (
    <div className={classes.root}>
      <Suspense fallback='Loading...'>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Registration} />
          <Redirect to='/dashboard' />
        </Switch>
      </Suspense>
    </div>
  );
};

export default AuthRouter;
