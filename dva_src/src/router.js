import React from 'react';
import { Router, Route, Switch, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import { Card, Spin, LocaleProvider } from 'antd';
import MyLayout from './components/MyLayout';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { parseQuery } from './utils/utils';

moment.locale('zh-cn');

const { ConnectedRouter } = routerRedux;

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large"/>;
  // return <Card loading={true}/>;
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
      models: () => [import('./models/accountManagement'), import('./models/coachManagement')],
      component: () => import('./routes/accountManagement/edit'),
    },
    {
      path: '/totalAchievement',
      models: () => [import('./models/totalAchievement')],
      component: () => import('./routes/totalAchievement'),
    },
    {
      path: '/totalAchievement/potentialClient',
      models: () => [import('./models/totalAchievement')],
      component: () => import('./routes/totalAchievement/potentialClient'),
    },
    {
      path: '/totalAchievement/member',
      models: () => [import('./models/totalAchievement')],
      component: () => import('./routes/totalAchievement/member'),
    },
    {
      path: '/courseArrangement',
      models: () => [import('./models/courseArrangement')],
      component: () => import('./routes/courseArrangement'),
    },
    {
      path: '/courseManagement',
      models: () => [import('./models/courseManagement')],
      component: () => import('./routes/courseManagement'),
    },
    {
      path: '/courseManagement/edit',
      models: () => [import('./models/courseManagement'), import('./models/coachManagement')],
      component: () => import('./routes/courseManagement/edit'),
    },
    {
      path: '/coachManagement',
      models: () => [import('./models/coachManagement')],
      component: () => import('./routes/coachManagement'),
    },
    {
      path: '/membershipManagement',
      models: () => [import('./models/membershipManagement')],
      component: () => import('./routes/membershipManagement'),
    },
    {
      path: '/personalAchievement',
      models: () => [import('./models/personalAchievement')],
      component: () => import('./routes/personalAchievement'),
    },
    {
      path: '/potentialClient',
      models: () => [import('./models/potentialClient'), import('./models/accountManagement')],
      component: () => import('./routes/potentialClient'),
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
