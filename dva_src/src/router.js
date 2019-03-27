import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import { Spin, LocaleProvider } from 'antd';
import MyLayout from './components/MyLayout';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { parseQuery } from './utils/utils';

moment.locale('zh-cn');

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large"/>;
});

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={
    props => <Component {...props}/>
  }/>
);

function RouterConfig({ history, app }) {

  const Login = dynamic({
    app,
    models: () => [import('./models/user')],
    component: () => import('./routes/login'),
  });

  const routes = [
    {
      path: '/home',
      component: () => import('./routes/indexPage'),
    },
    {
      path: '/my',
      models: () => [import('./models/user')],
      component: () => import('./routes/my'),
    },
    {
      path: '/accountManagement',
      models: () => [import('./models/accountManagement')],
      component: () => import('./routes/accountManagement'),
    },
    {
      path: '/accountManagement/edit',
      models: () => [import('./models/accountManagement')],
      component: () => import('./routes/accountManagement/edit'),
    },
    {
      path: '/membershipManagement',
      models: () => [import('./models/membershipManagement')],
      component: () => import('./routes/membershipManagement'),
    },
    {
      path: '/membershipManagement/memberEdit',
      models: () => [import('./models/clientManagement'), import('./models/membershipManagement')],
      component: () => import('./routes/membershipManagement/memberEdit'),
    },
    {
      path: '/membershipManagement/potentialEdit',
      models: () => [import('./models/potentialClient'), import('./models/membershipManagement')],
      component: () => import('./routes/membershipManagement/potentialEdit'),
    },
    {
      path: '/clientManagement',
      models: () => [import('./models/clientManagement'), import('./models/membershipManagement')],
      component: () => import('./routes/clientManagement'),
    },
    {
      path: '/clientManagement/edit',
      models: () => [import('./models/clientManagement'), import('./models/membershipManagement')],
      component: () => import('./routes/clientManagement/edit'),
    },
    {
      path: '/potentialClient',
      models: () => [import('./models/potentialClient'), import('./models/membershipManagement')],
      component: () => import('./routes/potentialClient'),
    },
    {
      path: '/potentialClient/edit',
      models: () => [import('./models/potentialClient'), import('./models/membershipManagement')],
      component: () => import('./routes/potentialClient/edit'),
    },
  ];

  history.listen((location) => {
    location.query = parseQuery(location.search);
  });

  return (
      <LocaleProvider locale={zh_CN}>
        <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <MyLayout history={history}>
            {
              routes.map(({ path, ...dynamics }, key) => (
                <PrivateRoute exact key={key} path={path} component={dynamic({
                  app,
                  ...dynamics
                })} />
              ))
            }
          </MyLayout>
        </Switch>
        </Router>
      </LocaleProvider>
  );
}

export default RouterConfig;
