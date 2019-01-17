import React from 'react';
import { connect } from 'react-redux';
import UserCard from '../../components/usercard/usercard';
import { getUserList } from '../../redux/chatuser.redux'

@connect(
  state => state.chatuser,
  {getUserList}
)
class Boss extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount = () => {
    this.props.getUserList('seeker')
  }

  render() {
    return (
      <div>
        <UserCard userList={this.props.userList} />
      </div>
    )
  }
}

export default Boss