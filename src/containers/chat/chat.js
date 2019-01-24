import React from 'react';
import { NavBar, Icon, List, InputItem, Grid } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {getChatList,sendMsg,msgReceive,readMsg} from '../../redux/chat.redux'
import { getChatId } from '../../util/util';


@connect(
  state => state,
  {getChatList,sendMsg,msgReceive,readMsg}
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: [],
    }
  }
  componentDidMount(){
    if(!this.props.chat.chatmsg.length){
        this.props.getChatList();
        this.props.msgReceive();
    }
    this.fixedBug()
  }
  componentWillUnmount(){
      
      const to = this.props.match.params.user;
      this.props.readMsg(to)
  }

  handleSubmit = () => {
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg(from, to, msg)
    this.setState({
      showEmoji: false,
      text: ''
    })
  }
  fixedBug(){  // 解决点击笑脸BUG
    setTimeout(()=>{
        window.dispatchEvent(new Event('resize'))
    },0)
  }

  render() {
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
      .split(' ')
      .filter(v => v)
      .map(v => ({text: v}))
    
    const userid = this.props.match.params.user;
    const currentChatId = getChatId(userid, this.props.user._id);
    const chatMsg = this.props.chat.chatmsg.filter(v => v.chatid === currentChatId);
    const Item = List.Item;
    const users = this.props.chat.users;
    if (!users[userid]) {
      return null
    }

    return (
      <div style={{ padding: '45px 0' }}>
        <NavBar
          mode='dark'
          icon={<Icon type='left' />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          {users[userid].name}
        </NavBar>
        <div>
          {
            chatMsg.map(v => {
              const avatar = require(`../../components/img/${users[v.from].avatar}.png`)
              return v.from === userid ? (
                <List key={v._id}>
                  <Item
                    thumb={avatar}
                  >
                    {v.content}
                  </Item>
                </List>
              ) : (
                <List key={v._id}>
                  <Item>
                    <Item
                      extra={<img src={avatar}/>}
                    >
                      {v.content}
                    </Item>
                  </Item>
                </List>
              )
            })
          }
        </div>
        <div style={{ 
              zIndex: 10,
              position: 'fixed',
              bottom: 0,
              width:'100%',
              }}>
          <List>
            <InputItem 
              placeholder='请输入'
              value={this.state.text}
              onChange={(v) => {
                this.setState({
                  text: v
                })
              }}
              extra={
                <div>
                  <span
                    style={{fontSize:12,marginRight:15}}
                    onClick={() => {
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      })
                      this.fixedBug()
                    }}
                  >
                    😃
                  </span>
                  <span
                    onClick={this.handleSubmit}
                  >发送</span>
                </div>
              }
            />
          </List>
          {
            this.state.showEmoji 
              ? <Grid
                  data={emoji}
                  columnNum={9}
                  carouselMaxRow={4}
                  isCarousel={true}          
                  onClick={(e) => {
                    this.setState({
                      text: this.state.text + e.text
                    })
                  }}
                />
              : null                         
          }
        </div>
      </div>
    )
  }
}
export default Chat