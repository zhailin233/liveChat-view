import React from 'react'
import Axios from 'axios';
import { connect } from 'react-redux';
import { userInfo } from '../../redux/user.redux'
//由于authroute组件不是路由组件，所以要引入withRouter，获取路由对象
import { withRouter } from 'react-router-dom'

@withRouter
@connect(
  null,
  {userInfo}
)
class Authroute extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const publicList = ['/login', 'register'];
    const pathname = this.props.location.path;

    if (publicList.indexOf(pathname) !== -1) {
      return null
    } else {
      Axios.get('/users/info').then((res) => {
        let data = res.data
        if (res.status === 200) {
          if (data.code === 1) {
            this.props.history.push('/login')
          } else {
            this.props.userInfo(data.data)
          }
        }
      })
    }
  }

  render() {
    return (
      <div></div>
    )
  }
}
export default Authroute

