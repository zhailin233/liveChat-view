import React from 'react';
import Boss from '../boss/boss';
import Seeker from '../seeker/seeker';
import Msg from '../msg/msg';
import User from '../user/user';
import { NavBar, Icon } from 'antd-mobile';
import { Route, Switch } from 'react-router-dom';
import NavLinkBar from '../../components/nav-link-bar/nav-link-bar'
import { connect } from 'react-redux';
import { getChatList,msgReceive } from '../../redux/chat.redux';


@connect(
  state => state,
  {getChatList, msgReceive}
)
class DashBoard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount(){
    if(!this.props.chat.chatmsg.length){
        // this.props.getChatList();
        this.props.msgReceive();
    }

}

  render() {
    const {pathname} = this.props.location;
    const user = this.props.user;
    const navList = [
      {
          path:'/boss',
          text:'求职者',
          icon:'boss',
          title:'求职者列表',
          component:Boss,
          hide:user.type === 'seeker'
      },
      {
          path:'/seeker',
          text:'BOSS列表',
          icon:'job',
          title:'BOSS列表',
          component:Seeker,
          hide:user.type === 'boss'
      },
      {
          path:'/msg',
          text:'消息',
          icon:'msg',
          title:'消息列表',
          component:Msg
      },
      {
          path:'/me',
          text:'个人中心',
          icon:'job',
          title:'个人中心',
          component:User
      },
    ];
    return (
      <div>
        {
          pathname !== '/' 
            ? <NavBar mode="dark" className="fixed-header"  icon={<Icon type="left" onClick={() => {
              this.props.history.goBack()
            }}/>} > 
                {
                  navList.find( v => v.path === pathname).title //匹配navList中path和pathname 取出title  头部
                }
              </NavBar>
            : null
        }
        <div style={{marginTop:55,marginBottom:45}}>
          <Switch>
            {
              navList.map(v => (
                <Route key={v.path} path={v.path} component={v.component}></Route>  //身体
              ))
            }
          </Switch>
        </div>
        <div>
          {/**底部 */}
          <NavLinkBar data={navList}></NavLinkBar>  
        </div>
      </div>
    )
  }
}
export default DashBoard