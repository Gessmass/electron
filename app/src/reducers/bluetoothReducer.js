const initialState = {
  data: null,
  error: null
}

const bluetoothReducer = (state= initialState, action) => {
  switch (action.type){
    case 'BLUETOOTH_DATA_RECEIVED' :
      return {...state, data: action.payload};
    case 'BLUETOOTH_CONNECT_FAILURE':
      return {...state, error: action.error}
    default :
      return state;
  }
}

export default bluetoothReducer