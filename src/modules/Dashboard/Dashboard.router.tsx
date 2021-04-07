import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import Exchange from './Exchange/Exchange';
import Transactions from './Transactions/Transactions';
import Profile from './Profile/Profile';
import Balance from './Balance/Balance';

const DashboardRouter = () => {
  return (
    <DashboardLayout>
      <Suspense fallback='Loading...'>
        <Switch>
          <Route exact path='/dashboard/exchange' component={Exchange} />
          <Route exact path='/dashboard/balance' component={Balance} />
          <Route
            exact
            path='/dashboard/transactions'
            component={Transactions}
          />
          <Route exact path='/dashboard/profile' component={Profile} />
          <Redirect to='/dashboard/balance' />
        </Switch>
      </Suspense>
    </DashboardLayout>
  );
};

export default DashboardRouter;
