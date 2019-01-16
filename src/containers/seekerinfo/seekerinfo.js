import React, {Component} from 'react';
import { Redirect } from 'react-router-dom'
import { NavBar, WhiteSpace, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from '../../components/avatar-selector/avatar-selector';
import { connect } from 'react-redux';
import { update } from '../../redux/user.redux';

@connect(
  state => state.user,
  {update}
)
class SeekerInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  selectAvatar = (avatarName) => {
    this.setState({
      avatar: avatarName
    })
  }
  onChange = (key, val) => {
    this.setState({
      [key]: val
    })
  }

  render() {
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return (
      <div className='seekerinfo'>
        {/*完善信息成功后，跳转到其他页面*/}
        {
          redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : ''
        }
        <NavBar mode='dark'>
          求职者完善信息
        </NavBar>
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <AvatarSelector selectAvatar={this.selectAvatar}  />
        <WhiteSpace />
        <InputItem onChange={(v) => this.onChange('title', v)}>
          求职岗位
        </InputItem>
        <TextareaItem 
          onChange={v => this.onChange('desc', v) } 
          rows={3} 
          autoHeight 
          title='个人简介'
        >
        </TextareaItem>
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <Button type='primary' onClick={() => {this.props.update(this.state)}}>保存</Button>
      </div>
    )
  }
}

export default SeekerInfo