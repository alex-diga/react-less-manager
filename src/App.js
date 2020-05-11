import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AuthorizedRoute from './util//AuthorizedRoute';
import PageLayout from './components/layout';
import Login from './view/login';
import NoFound from './view/nofound';
import './App.css';

function App() {
  return (
    <div className="App">
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <Switch>
            <AuthorizedRoute path="/page" component={PageLayout} />
            <Route path="/login" component={Login} />
            <Redirect from="/index" exact to="/login" />
            <Redirect from="/" exact to="/login" />
            <Route component={NoFound} />
          </Switch>
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
