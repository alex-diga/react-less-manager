import React from 'react'
// import { connect } from 'react-redux'
import axios from 'axios'
import Qs from 'qs'
import MD5 from 'blueimp-md5'
import { Form, Icon, Input, Button, message } from 'antd'
import './index.less';

function Login(props) {
  const { getFieldDecorator } = props.form;
  const handleSubmit = (e) => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(MD5(values.password))
        let obj = { ...values }
        obj.password = MD5(values.password)
        signIn(obj).then(res => {
          if (res.code === 0) {
            props.history.push('/page')
          } else {
            message.error(res.msg)
          }
        })
      }
    })
  }

  return (
    <div className="pageLogin">
      <div className="loginBox">
        <img className="loginImg" src={require('../../assets/img/logo1.png')} alt="" />
        <div className="loginFormBox">
          <h1 className='systemName'>管理系统</h1>
          <Form onSubmit={handleSubmit} className="loginForm">
            {/* <Form.Item label="用户名:"> */}
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入账号!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.55)' }} />}
                  placeholder="账号"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {/* <Form.Item label="密 码:"> */}
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请输入密码!'
                  },
                  // {
                  //   pattern: /^[a-zA-Z][a-zA-Z0-9_-]{0,9}$/,
                  //   message: '请输入以字母开头最长不超过10位的码值，可以包含中划线‘-’下划线‘_’、大小写字母及数字'
                  // }
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.55)' }} />}
                  type="password"
                  placeholder="请输入密码"
                />,
              )}
            </Form.Item>
            <Form.Item className="submitButtonBox">
              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}


export default Form.create({})(Login)

// const stateToProps = (state) => {
//   return {
//     sysSignIn: state.system.sysSignIn,
//   }
// }

// const dispatchToProps = (dispatch) => {
//   return {
//     // 设置系统登录登出状态
//     setSysSignIn(data) {
//       let action = {
//         type: 'sysSignIn',
//         sysSignIn: data
//       }
//       dispatch(action)
//     }
//   }
// }


// export default connect(stateToProps, dispatchToProps)(Form.create({})(Login))

function signIn(data) {
  return axios.post('/api/sign-in', Qs.stringify(data),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  )
}