export const BLUETOOTH_CONNECT_REQUEST = 'BLUETOOTH_CONNECT_REQUEST';
export const BLUETOOTH_CONNECT_SUCCESS = 'BLUETOOTH_CONNECT_SUCCESS';
export const BLUETOOTH_CONNECT_FAILURE = 'BLUETOOTH_CONNECT_FAILURE';
export const BLUETOOTH_DATA_RECEIVED = 'BLUETOOTH_DATA_RECEIVED';
export const BLUETOOTH_DISCONNECT = 'BLUETOOTH_DISCONNECT';
// Ajoutez d'autres types d'actions liés à Bluetooth selon vos besoins

// Action pour démarrer la connexion Bluetooth
export const bluetoothConnectRequest = () => {
  return {
    type: BLUETOOTH_CONNECT_REQUEST,
  };
}

// Action pour gérer une connexion réussie
export function bluetoothConnectSuccess(device) {
  return {
    type: BLUETOOTH_CONNECT_SUCCESS,
    payload: { device },
  };
}

// Action pour gérer une erreur de connexion
export function bluetoothConnectFailure(error) {
  return {
    type: BLUETOOTH_CONNECT_FAILURE,
    payload: { error },
    error: true, // Facultatif, pour indiquer que cette action représente une erreur
  };
}

// Action pour déconnecter l'appareil Bluetooth
export function bluetoothDisconnect() {
  return {
    type: BLUETOOTH_DISCONNECT,
  };
}

// Ajoutez cette action pour gérer les données reçues de Bluetooth
export function bluetoothDataReceived(data) {
  return {
    type: BLUETOOTH_DATA_RECEIVED,
    payload: data,
  };
}


// Ajoutez ici d'autres action creators pour les fonctionnalités Bluetooth de votre application
