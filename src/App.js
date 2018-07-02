import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout, Breadcrumb, Icon, Menu } from 'antd';
import { Link, browserHistory } from 'react-router';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      isableText: false
    }
  }

  handleClick() {
    let { isableText } = this.state;
    isableText = isableText ?  false : true;
    this.setState({
      isableText
    });
  }

  handleHistory() {
    browserHistory.push('/ordermanage/orderlist');
  }

  render() {
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Icon type="pie-chart" />
                <span>商品管理</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="desktop" />
                <span>订单管理</span>
              </Menu.Item>
              <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>数据分析</span></span>}
            >
              <Menu.Item key="3"><Link to="/ordermanage/orderlist">数据看板</Link></Menu.Item>
              <Menu.Item key="4" onClick={() => this.handleHistory()}>商户合作</Menu.Item>
              <Menu.Item key="5">销售日志</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>运营管理</span></span>}
            >
              <Menu.Item key="6">代订座POI池</Menu.Item>
              <Menu.Item key="7">规则查询</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={<span><Icon type="user" /><span>促销管理</span></span>}
            >
              <Menu.Item key="8">促销黑名单</Menu.Item>
              <Menu.Item key="9">促销列表</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
      </div>
    );
  }
}

export default App;
