import { handleActions } from 'redux-actions'
import { INCREMENT, DECREMENT, ASYNC_INCREMENT,CHANGE_SHOP_ID } from '../types/counter'

export default handleActions({
  [INCREMENT] (state) {
    return {
      ...state,
      num: state.num + 1
    }
  },
  [DECREMENT] (state) {
    return {
      ...state,
      num: state.num - 1
    }
  },
  [ASYNC_INCREMENT] (state, action) {
    return {
      ...state,
      asyncNum: state.asyncNum + action.payload
    }
  },
  [CHANGE_SHOP_ID](state,action){
    return{
      ...state,
      shopId:action.payload
    }
  }
}, {
  num: 0,
  asyncNum: 0,
  shopId:0,
})
