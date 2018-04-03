import axios from 'axios';

export const COINS = "COINS";
export const ADD_COIN = "ADD_COIN";
export const REMOVE_COIN = "REMOVE_COIN";

export const getCoins = () => {
  return (dispatch) => {
    axios.get('/api/coins')
      .then( ({ data: coins, headers }) => {
        dispatch({ type: COINS, coins, headers })
      })
  }
}

export const addCoin = (coin) => {
  return (dispatch) => {
    axios.post('/api/coins', { coin })
      .then( ({ data: coin, headers }) => {
        dispatch({ type: ADD_COIN, coin, headers})
      })
  }
}

export const reoveCoins = (id) => {
  return (dispatch) => {
    axios.put(`/api/coins/${id}`)
      .then( ({ headers }) => {
        dispatch({ type: REMOVE_COIN, id, headers })
      })
  }
}