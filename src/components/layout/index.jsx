import React from 'react';
import { Layout } from 'antd'
import PageMenu from '../menu'
import PageContainer from '../container'
import PageHeader from '../header'
import './index.less';

const { Content, Sider } = Layout;

function PageLayout() {
  return (
    <Layout style={{ width: '100%', height: '100%', minWidth: '1360px' }}>
      <Sider className="leftSiderBox" style={{ backgroundColor: '#fff' }}>
        <div className="systemLogo">
          <img className="logoImg" src={require("../../assets/img/logo1.svg")} alt="" />
        </div>
        <PageMenu />
      </Sider>
      <Layout style={{ overflow: 'hidden' }}>
        <PageHeader />
        <Content style={{ overflowX: 'hidden', overflowY: 'auto', padding: '32px 32px 0' }}>
          <PageContainer />
        </Content>
      </Layout>
    </Layout>
  );
}

export default PageLayout
