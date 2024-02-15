export const BLUETOOTH_CONNECT_REQUEST = 'BLUETOOTH_CONNECT_REQUEST';
export const BLUETOOTH_CONNECT_SUCCESS = 'BLUETOOTH_CONNECT_SUCCESS';
export const BLUETOOTH_CONNECT_FAILURE = 'BLUETOOTH_CONNECT_FAILURE';
export const BLUETOOTH_DATA_RECEIVED = 'BLUETOOTH_DATA_RECEIVED';
export const BLUETOOTH_DISCONNECT = 'BLUETOOTH_DISCONNECT';
// Ajoutez d'autres types d'actions li�s � Bluetooth selon vos besoins

// Action pour d�marrer la connexion Bluetooth
export const bluetoothConnectRequest = () => {
  return {
    type: BLUETOOTH_CONNECT_REQUEST,
  };
}

// Action pour g�rer une connexion r�ussie
export function bluetoothConnectSuccess(device) {
  return {
    type: BLUETOOTH_CONNECT_SUCCESS,
    payload: { device },
  };
}

// Action pour g�rer une erreur de connexion
export function bluetoothConnectFailure(error) {
  return {
    type: BLUETOOTH_CONNECT_FAILURE,
    payload: { error },
    error: true, // Facultatif, pour indiquer que cette action repr�sente une erreur
  };
}

// Action pour d�connecter l'appareil Bluetooth
export function bluetoothDisconnect() {
  return {
    type: BLUETOOTH_DISCONNECT,
  };
}

// Ajoutez cette action pour g�rer les donn�es re�ues de Bluetooth
export function bluetoothDataReceived(data) {
  return {
    type: BLUETOOTH_DATA_RECEIVED,
    payload: data,
  };
}


// Ajoutez ici d'autres action creators pour les fonctionnalit�s Bluetooth de votre application
