import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Breadcrumb, Icon, Tooltip } from 'antd';
import { arrayToKeyValue } from '../../utils/utils';
import { Link, withRouter } from "dva/router";
import MyBreadcrumb from "../MyBreadcrumb";
import MyMenu from "../MyMenu";
import './index.css';

const { Header, Content, Sider, Footer } = Layout;

const menu = [{
  key: 'home',
  title: '首页',
  url: '/home',
  icon: 'home',
}, {
//   key: 'activity',
//   title: '活动管理',
//   url: '/activity',
//   icon: 'file',
//   children: [{
//     key: 'template',
//     title: 'h5模板',
//     url: '/template',
//     icon: 'file',
//   }],
// }, {
  key: 'statics',
  title: '数据统计',
  url: '/statics',
  icon: 'bar-chart',
}, {
  key: 'manage',
  title: '用户管理',
  url: '/manage',
  icon: 'user',
}, {
  key: 'courseManage',
  title: '我的课程',
  url: '/courseManage',
  icon: 'calendar',
}];

const breadcrumbMap = {
  'home': '首页',
  'statics': '数据统计',
  'manage': '用户管理',
  'potentialClient': '潜在客户',
  'vip': '会员',
  'courseManage': '我的课程',
};

class MyLayout extends React.Component {

  state = {
    collapse: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
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
                <Link to='/my'><Icon type="user" /></Link>
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