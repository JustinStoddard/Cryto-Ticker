import {
  COINS,
  ADD_COIN,
  REMOVE_COIN,
} from '../actions/coins';

const coins = ( state= [], action ) => {
  switch ( action.type ) {
    case COINS:
      return action.coins
    case ADD_COIN:
      return [...state, action.coin]
    case REMOVE_COIN:
      return state.filter( c => c.id !== action.id )
    default:
      return state
  }
}

export default coins