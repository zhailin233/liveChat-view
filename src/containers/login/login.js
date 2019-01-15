import React from 'react';
import { Redirect } from 'react-router-dom';  //路由重定向
import Logo from '../../components/logo/logo';
import './login.css';
import { login } from '../../redux/user.redux';
import { WingBlank, WhiteSpace, List, InputItem, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import HocForm from '../../components/hoc-form/hoc-form'

@connect(
  state => state.user,
  {login}
)
@HocForm
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleLogin = () => {
    this.props.login(this.props.state)
  }
  register = () => {
    this.props.history.push('/register')
  }


  render() {
    return (
      <div>
        { 
          (this.props.redirectTo && this.props.redirectTo !== '/login') 
            ? <Redirect to={this.props.redirectTo}></Redirect> : ''
        }
        <div className='logo-wrapper'>
          <Logo />
        </div>
        <div>  
          <WingBlank>
            <List>
              <InputItem onChange={value => {this.props.handleChange('user', value)}}>用户</InputItem>
              <InputItem onChange={value => {this.props.handleChange('pwd', value)}} type='password'>密码</InputItem>
            </List>
            <WhiteSpace />
            <Button type='primary' onClick={this.handleLogin}>登录</Button> 
            <WhiteSpace />
            <Button onClick={this.register}>注册</Button>
          </WingBlank>
        </div>
      </div>
    )
  }
}

export default Login