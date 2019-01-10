import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index';

const state = {}
export default function configStore () {
  const store = createStore(
    rootReducer,
    compose(  // 组合多个函数
      applyMiddleware(thunk),  //输入一个中间件数组，返回一个函数
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
  return store
} 