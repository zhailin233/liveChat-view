import React from 'react';
import { Redirect } from 'react-router-dom'
import { NavBar, WhiteSpace, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from '../../components/avatar-selector/avatar-selector';
import { connect } from 'react-redux';
import { update } from '../../redux/user.redux'

@connect(
  state => state.user,
  {update}
)
class BossInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {  //默认为空 不然用户不填某一项会报错 
      title:"",
      company:"",
      money:"",
      desc:"",
      avatar:""
    }
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
    const path =this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return (
      <div>
         {/*完善信息成功后，跳转到其他页面*/}
        {
          redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : ''
        }    
        <NavBar>
          BOSS完善信息
        </NavBar>
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <AvatarSelector selectAvatar={this.selectAvatar}/>
        <WhiteSpace />
        <InputItem onChange={(v) => this.onChange('title', v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={(v) => this.onChange('company', v)}>
          公司名称
        </InputItem>
        <InputItem onChange={(v) => this.onChange('money', v)}>
          薪资范围
        </InputItem>
        <TextareaItem 
          title='职位要求'
          rows={3}
          autoHeight
          onChange={(v) => this.onChange('desc', v)}
        >

        </TextareaItem>
        <Button type='primary' onClick={() => {this.props.update(this.state)}}>保存</Button>
      </div>
    )
  }
} 

export default BossInfo