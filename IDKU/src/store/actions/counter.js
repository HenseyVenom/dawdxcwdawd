import { ASYNC_INCREMENT,CHANGE_SHOP_ID } from '../types/counter'
import { createAction } from 'redux-actions'

export const asyncInc = createAction(ASYNC_INCREMENT, () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(1)
    }, 1000)
  })
})

export const changeShopId = createAction(CHANGE_SHOP_ID,(shopId)=>{
  return new Promise(resolve => {
    resolve(shopId)
  })
})

