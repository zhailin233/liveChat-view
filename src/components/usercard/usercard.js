import React from 'react';
import { withRouter } from 'react-router-dom';
import { WingBlank, Card, WhiteSpace } from 'antd-mobile';
import { ECANCELED } from 'constants';

@withRouter
class UserCard extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const Header = Card.Header;
    const Body = Card.Body;
    return (
      <div>
        <WingBlank>
          {
            this.props.userList.map(v => (
              console.log(v),
              v.avatar 
                ? (
                    <div>
                      <Card>
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