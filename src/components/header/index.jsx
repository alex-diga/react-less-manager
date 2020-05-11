import React from 'react';
import axios from 'axios'
import { message } from 'antd'
import { withRouter } from 'react-router-dom'
import './index.less';
function PageHeader(props) {
  const signOutFn = () => {
    signOut().then(res => {
      if (res.code === 0) {
        props.history.replace('/login')
        localStorage.clear()
      } else {
        message.error(res.msg)
      }
    })
  }
  return (
    <div className="pageheader">
      <div className="signout" onClick={signOutFn}>
        <img className='img' src={require('../../assets/img/signout.png')} alt="" />
        退出系统
      </div>
    </div>
  );
}

export default withRouter(PageHeader);

function signOut() {
  return axios.post('/api/sign-out')
}