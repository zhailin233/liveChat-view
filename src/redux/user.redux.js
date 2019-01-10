import axios from 'axios';
import getRedirectToUrl from '../util/util';
import { Toast } from 'antd-mobile';

const initialState = {
  redirectTO: '',
  user: '',
  pwd: '',
  repeatPwd: '',
  type: '',
  msg: '',
}
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';

export function user (state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {...state, msg: '', redirectTO: getRedirectToUrl(action.payload), ...action.payload}
  }
}

