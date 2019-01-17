import React from 'react';
import { getUserList } from '../../redux/chatuser.redux'
import { connect } from 'react-redux'
import UserCard from '../../components/usercard/usercard'

@connect(
  state => state.chatuser,
  {getUserList}
)
class Seeker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount = () => {
    this.props.getUserList('boss')

  }

  render() {
    console.log(this.props.userList)

    return (
      <div>
        <UserCard userList={this.props.userList} />
      </div>
    )
  }
}
export default Seeker