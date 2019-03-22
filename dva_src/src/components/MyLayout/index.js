import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon, Tooltip } from 'antd';
import { arrayToKeyValue, getUser } from '../../utils/utils';
import { Link, withRouter } from "dva/router";
import MyBreadcrumb from "../MyBreadcrumb";
import MyMenu from "../MyMenu";
import './index.css';

const { Header, Content, Sider, Footer } = Layout;

const totalMenu = [{
  key: 'home',
  title: '首页',
  url: '/home',
  icon: 'home',
}, {
  key: 'totalAchievement',
  title: '数据统计',
  url: '/totalAchievement',
  icon: 'bar-chart',
}, {
  key: 'accountManagement',
  title: '用户管理',
  url: '/accountManagement',
  icon: 'user',
}, {
  key: 'courseManagement',
  title: '课程管理',
  url: '/courseManagement',
  icon: 'calendar',
}, {
  key: 'courseArrangement',
  title: '我的课程',
  url: '/courseArrangement',
  icon: 'calendar',
}, {
  key: 'coachManagement',
  title: '教练管理',
  url: '/coachManagement',
  icon: 'user',
}, {
  key: 'membershipManagement',
  title: '会籍顾问管理',
  url: '/membershipManagement',
  icon: 'user',
}, {
  key: 'potentialClient',
  title: '潜在客户管理',
  url: '/potentialClient',
  icon: 'user',
}, {
  key: 'personalAchievement',
  title: '个人销售业绩',
  url: '/personalAchievement',
  icon: 'bar-chart',
}];

const menuName = getUser().menu && getUser().menu.map(item => {
  let name1 = item.split('_')[0];
  let name2 = item.split('_')[1];
  name2 = name2.substring(0,1).toUpperCase().concat(name2.substring(1));
  return name1.concat(name2);
});

const menu = menuName && totalMenu.filter(menu => menuName.some(_ => _===menu.key)) || [{
  key: 'home',
  title: '首页',
  url: '/home',
  icon: 'home',
}];
// console.log(menuName, menu)

const breadcrumbMap = {
  'home': '首页',
  'totalAchievement': '数据统计',
  'accountManagement': '用户管理',
  'courseArrangement': '我的课程',
  'courseManagement': '课程管理',
  'coachManagement': '教练管理',
  'potentialClient': '潜在客户',
  'membershipManagement': '会籍顾问管理',
  'personalAchievement': '个人销售业绩',
  'member': '会员',
  'my': '我的',
  'edit': '编辑',
};

class MyLayout extends React.Component {

  state = {
    collapse: false,
  };

  onCollapse = (collapsed) => {
    // console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    const { children, history: { location } } = this.props;
    const { pathname } = location;
    // console.log(location)
    // console.log(siderMap)
    // console.log(pathname.split('/'))

    return (
      <Layout
        style={{ minHeight: '100%' }}>
        <Header style={{display: 'flex', justifyContent: 'space-between', background: '#fff'}}>
          <div>健身房企业规范化化管理系统</div>
          <Menu
            mode="horizontal"
            // theme="dark"
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item>
              <Tooltip title="我的">
                <Link to='/my'><Icon type="user" />{getUser().username}</Link>
              </Tooltip>
            </Menu.Item>
            <Menu.Item>
              <Tooltip title="退出账户">
                <a href='/logout'><Icon type="logout" /></a>
              </Tooltip>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider 
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            theme="light"
          >
            <MyMenu menu={menu} location={location}/>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <MyBreadcrumb style={{margin: '16px 0'}} path={pathname} map={breadcrumbMap} />
            <Content style={{
              background: '#fff', padding: 24, margin: 0, minHeight: 280,
            }}>
              {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              健身房企业规范化化管理系统 ©2019 Created by 蓝冰丽
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(connect()(MyLayout));