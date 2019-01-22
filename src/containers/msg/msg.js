import React  from 'react';
import { List, Badge } from 'antd-mobile';
import { connect } from 'react-redux';

@connect(
  state => state
)
class Msg extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  getLast(arr) {
    return arr[arr.length - 1]
  }

  render() {
    const msgGroup = {};
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || [];
      msgGroup[v.chatid].push(v)
    });
    const chatList = Object.values(msgGroup);
    const userid = this.props.user._id;
    chatList.sort((a, b) => {
      const a_last = this.getLast(a).create_time;
      const b_last = this.getLast(b).create_time;
      return b_last - a_last;
    })
    // console.log(chatList)
    const Item = List.Item;
    const Brief = Item.Brief;
    return (
      <div>
        <List>
          {
            chatList.map((v, i) => {
              const targetId = v[0].from === userid ? v[0].to : v[0].from;
              const unreadNum = v.filter(v => !v.read && v.to === userid).length
              const lastItem = this.getLast(v)
              if (!this.props.chat.users[targetId]) {
                return null
              }
              return <List key = {i}>
                <Item
                  extra={<Badge text={unreadNum}></Badge>}
                  thumb={require(`../../components/img/${this.props.chat.users[targetId].avatar}.png`)}
                  arrow={'horizontal'}
                  onClick={() => {
                    this.props.history.push(`/chat/${targetId}`)
                  }}
                >
                  <Brief>{this.props.chat.users[targetId].name}</Brief>
                  {lastItem.content}
                </Item>
              </List>
            })
          }
        </List>        
      </div>
    )
  }
}
export default Msg