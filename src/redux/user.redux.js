import axios from 'axios';
import {getRedirectToUrl} from '../util/util';  
import { Toast } from 'antd-mobile';

const initialState = {
  redirectTo: '',
  user: '',
  pwd: '',
  repeatPwd: '',
  type: '',
  msg: '',
};
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';

//reducer
export function user (state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...state, msg: '', redirectTo: getRedirectToUrl(action.payload), ...action.payload}
    case ERROR_MSG:
      return {...state, msg: '', isAuth: false, msg: action.msg}
    case LOAD_DATA:
      return {...state, ...action.payload} 
    case LOGOUT:
      return {...initialState, redirectTo: `/login`} 
    default:
      return state; 
  } 
};

// action creater 
function errorMsg(msg) {
  return {
    msg,
    type: ERROR_MSG
  }
}

//登录，注册，完善信息都dispatch这个action
function authSuccess(obj) {
  const {pwd, ...data} = obj;
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}

function loadData(data) {
  return {
    type: LOAD_DATA,
    payload: data
  }
}

function logOut(data) {
  return {
    type: LOGOUT,
    payload: data
  }
}

export function logoutSubmit() {
  return {
    type: LOGOUT
  }
}
//注册
export function register({user, pwd, repeatPwd, type}) {
  if (!user || !pwd || !type) {
    Toast.info('用户名或密码不能为空', 1);
    return errorMsg('用户名或密码不能为空')
  } else if (pwd !== repeatPwd) {
    Toast.info('两次输入的密码不一致', 1)
    return errorMsg('两次输入的密码不一致')
  }
  return dispatch => {
    axios.post('/users/register', {
      user, pwd, type
    }).then(res => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          dispatch(authSuccess({user, pwd, type}))
        } else {
          if (res.data.msg) {
            Toast.info(res.data.msg, 1)
          }
          dispatch(errorMsg(res.data.msg))
        }
      }
    })
  }
}

//登录
export function login({user, pwd}) {
  if (!user || !pwd) {
    Toast.info('用户名或密码不能为空', 1)
    return errorMsg('用户名或密码不能为空')
  }
  return dispatch => {
    axios.post(`/users/login`, { 
      user, pwd
    }).then(res => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          if (res.data.msg) {
            Toast.info(res.data.msg, 1)
            dispatch(errorMsg(res.data.msg))
          }
        } 
      }
    })
  }
}

// 完善信息
export function update(data) {
  // console.log(data)
  return dispatch => {
    axios.post(`/users/update`, {data})
      .then(res => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            // console.log(res)
            dispatch(authSuccess(res.data.data))
          } else {
            if (res.data.msg) {
              Toast.info(res.data.msg, 1)
              dispatch(errorMsg(res.data.msg))
            }  
          }
        } 
      })
  }
}

//校验用户信息
export function userInfo(data) {
  return dispatch => {
    dispatch(loadData(data))
  }
}
