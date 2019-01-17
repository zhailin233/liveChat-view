import React from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import { WingBlank, List, InputItem, WhiteSpace, Radio, Button } from 'antd-mobile';
import './register.css'
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux';
import HocForm from '../../components/hoc-form/hoc-form';

const RadioItem = Radio.RadioItem;
@connect(
  state => state.user,  //将state.user映射到 Register组件
  {register}    //HocForm 返回后的组件Register操作映射到register 通过调用register 操作Action
)
@HocForm  //将Register 组件传入 <Register  handleChange = {this.handleChange} state={this.state} { ...this.props }/>
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => {
    this.props.handleChange('type', 'seeker')
  }
  handleRegister = () => {
    this.props.register(this.props.state)
  }  

  render() {
    return (
      <div>
        {
          this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : ''
        }
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem onChange={value => {this.props.handleChange('user', value)}}>用户名</InputItem>
            <InputItem onChange={value => {this.props.handleChange('pwd', value)}} type='password'>密码</InputItem>
            <InputItem onChange={value => {this.props.handleChange('repeatPwd', value)}} type='password'>确认密码</InputItem>
          </List>
          <WhiteSpace />
          <p className='register-role'>选择角色</p>
          <List>
            <RadioItem 
              checked={this.props.state.type === 'seeker'} 
              onChange={() => {this.props.handleChange('type', 'seeker')}}
            >
              求职者
            </RadioItem>
            <RadioItem
              checked={this.props.state.type === 'boss'}
              onChange={() => {this.props.handleChange('type', 'boss')}}
            >
              BOSS
            </RadioItem>
          </List>
          <WhiteSpace />
          <Button type='primary' onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}
export default Register