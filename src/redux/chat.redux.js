import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://192.168.88.174:3000');


const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';  //接收
const MSG_READ = 'MSG_READ'   //读取

const initState = {
  chatmsg: [],
  users: {},
  unread: 0,  //
}

export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {...state, chatmsg: action.payload.data, users: action.payload.users, 
        unread: action.payload.data.filter(v => !v.read && v.to === action.payload.userid).length};
    case MSG_RECV:
      const n = action.payload.to === action.userid ? 1 : 0;
      return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n};
    case MSG_READ:
      const {from, num} = action.payload
      return {...state, chatmsg: state.chatmsg.map(v => ({...v, read: from === v.from ? true : v.read})), 
        unread: state.unread - num};
    default:
      return state
  }
}

function msgList(data, users, userid) {
  return {
    type: MSG_LIST,
    payload: {data, users, userid}
  }
}

function receiveMsg(msg, userid) {
  return {
    type: MSG_RECV,
    payload: msg, userid
  }
}

function msgRead(from, userid, num) {
  return {
    type: MSG_READ,
    payload: {from, userid, num}
  }
}

export function msgReceive() {
  return (dispatch, getState) => {
    socket.on('receivemsg', (data) => {
      const userid = getState().user_id;
      dispatch(receiveMsg(data, userid))
    })
  }
}

export function sendMsg(from, to, msg) {
  return dispatch => {
    socket.emit('sendmsg', {from, to, msg})
  } 
}

export function getChatList() {
  return (dispatch, getState) => {
    axios.get('/users/getmsglist')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          const userid = getState().user._id;
          dispatch(msgList(res.data.data, res.data.users, userid))
        }
      })
  }
}

export function readMsg(from) {
  return (dispatch, getState) => {
    axios.post('/users/readmsg', {from})
      .then(res => {
        const userid = getState().user_id;
        if(res.status === 200 && res.data.code === 0) {
          const num = res.data.num;
          dispatch(msgRead(from, userid, num))
        }
      })
  }
}
