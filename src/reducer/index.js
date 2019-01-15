import { combineReducers } from 'redux';
import { user } from '../redux/user.redux';
import { chatuser } from '../redux/chatuser.redux';
import { chat } from '../redux/chat.redux';

const rootReducer = combineReducers({  //把多个reducer函数合并成一个reducer函数
  user, 
  chat,
  chatuser
})
export default rootReducer

