import React, { Suspense, useState, useEffect } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { useStore } from '../utils/ioc.util';
import { AuthStore } from './Auth/Auth.store';
import DashboardRouter from './Dashboard/Dashboard.router';
import AuthRouter from './Auth/Auth.router';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { IntlProvider } from 'react-intl';

import * as sourceOfTruth from '../compiled-lang/en.json';
import { LanguageStore } from './Dashboard/Header/Language.store';
import { observer } from 'mobx-react';
import Platform from './Platform/Platform';
type LocaleMessages = typeof sourceOfTruth;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    },
  })
);

function loadLocaleData(locale: string) {
  switch (locale) {
    case 'ru':
      return import('../compiled-lang/ru.json');
    default:
      return import('../compiled-lang/en.json');
  }
}

const RootRouter = () => {
  const classes = useStyles();
  const languageStore = useStore(LanguageStore);
  const authStore = useStore(AuthStore);
  const [messages, setMessages] = useState<LocaleMessages | null>(null);

  useEffect(() => {
    loadLocaleData(languageStore.currentLanguage).then(setMessages);
  }, [languageStore.currentLanguage]);

  useEffect(() => {
    async function fn() {
      await authStore.getAccessToken();
    }
    fn();
  }, [authStore]);

  return messages ? (
    <IntlProvider
      locale={languageStore.currentLanguage}
      defaultLocale='en'
      messages={messages}>
      <div className={classes.root}>
        <Suspense fallback='Loading...'>
          <Switch>
            <Route
              path='/dashboard'
              render={() =>
                authStore.canAccessDashboard ? (
                  <DashboardRouter />
                ) : (
                  <Redirect to='/login' />
                )
              }
            />
            <Route
              exact
              path='/transactions/:token'
              component={(props: RouteComponentProps<{ token: string }>) => (
                <Platform token={props.match.params.token} />
              )}
            />
            <Route
              path='/'
              render={() =>
                authStore.canAccessAuth ? (
                  <AuthRouter />
                ) : (
                  <Redirect to='/dashboard' />
                )
              }
            />
          </Switch>
        </Suspense>
      </div>
    </IntlProvider>
  ) : null;
};

export default observer(RootRouter);
