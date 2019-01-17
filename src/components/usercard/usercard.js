import React from 'react';
import { withRouter } from 'react-router-dom';
import { WingBlank, Card, WhiteSpace } from 'antd-mobile';
import { ECANCELED } from 'constants';

@withRouter
class UserCard extends React.Component {
  constructor(props) {
    super(props)
  }

  handleChat = (v) => {
    this.props.history.push(`/chat/${v._id}`)
  }

  render() {
    const Header = Card.Header;
    const Body = Card.Body;
    return (
      <div>
        <WingBlank>
          {
            this.props.userList.map(v => (
              v.avatar 
                ? (
                    <div key={v._id}>
                      <Card onClick={this.handleChat.bind(this, v)}>
                        <Header
                          title={v.user}
                          thumb={require(`../../components/img/${v.avatar}.png`)}
                          extra={v.title}
                        >
                        
                        </Header>
                        <Body>
                          {v.type === 'boss' ? <div>公司：{v.company}</div> : ''}
                          {v.desc.split('\n').map(e => (
                            <div key={e}>{e}</div>
                          ))}
                          {v.type === 'boss' ? <div>薪资：{v.company}</div> : ''}
                        </Body>
                      </Card>
                      <WhiteSpace/>
                    </div>
                  )
                : ''
            ))
          }
        </WingBlank>
      </div>
    )
  }
}

export default UserCard