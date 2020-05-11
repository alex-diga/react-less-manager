import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { flatRouter } from '../../route'

function PageContainer() {
  return (
    <Switch>
      {
        flatRouter().map((item, index) => {
          return (
            <Route key={index} exact={item.exact} path={item.path} component={item.component} />
          )
        })
      }
    </Switch>
  )
}

export default PageContainer