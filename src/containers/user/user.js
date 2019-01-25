import React from 'react';
import { connect } from 'react-redux';
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import browserCookie from 'browser-cookies'
import { Result, WhiteSpace, List, Button, WingBlank, Modal  } from 'antd-mobile';

@connect(
  state => state.user,
  {logoutSubmit}
)
class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  logout = () => {
    const alert = Modal.alert;
    alert('注销', '确认退出么', [
      {text: '取消', onPress: () => console.log('却笑'), style: 'default'},
      {text: '确认', onPress: () => {
        browserCookie.erase('userid')
        this.props.logoutSubmit()
      }}
    ])
  }
  render() {
    const Item = List.Item;
    const Brief = Item.Brief;
    return this.props.user ? (
        <WingBlank>
          <Result
            img={<img src={require(`../../components/img/${this.props.avatar}.png`)}/>}
            title={this.props.user}
            message={this.props.type === 'boss' ? this.props.company : null}
          />
          <List renderHeader='简介'>
            <Item multipleLine={true}>
              {this.props.title}
              {
                this.props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)
              }
              {
                this.props.money ? <Brief>{this.props.money}</Brief> : null
              }
            </Item>
          </List>
          <WhiteSpace></WhiteSpace>
          <WhiteSpace></WhiteSpace>
          <WhiteSpace></WhiteSpace>
          <Button type='warning' onClick={this.logout}>
            退出登录
          </Button>
        </WingBlank>  
    ) : <Redirect to={this.props.redirectTo}></Redirect>
  }
}
export default User