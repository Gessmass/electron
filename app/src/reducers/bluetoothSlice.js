import { createSlice } from '@reduxjs/toolkit';

// Initialisation de l'�tat initial du slice
const initialState = {
  devices: [], // Liste des appareils d�couverts
  selectedDevice: null, // Appareil actuellement connect�
  data: [] // Donn�es re�ues de l'appareil connect�
};

const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState,
  reducers: {
    discoveredDevice: (state, action) => {
      // Ajoute l'appareil d�couvert � la liste des appareils, �vite les doublons
      const deviceExists = state.devices.some(device => device.id === action.payload.id);
      if (!deviceExists) {
        state.devices.push(action.payload);
      }
    },
    setSelectedDevice: (state, action) => {
      // D�finit l'appareil s�lectionn� pour la connexion
      state.selectedDevice = action.payload;
    },
    clearDevices: (state) => {
      // R�initialise la liste des appareils d�couverts
      state.devices = [];
    },
    receivedData: (state, action) => {
      // Ajoute les donn�es re�ues � l'�tat
      state.data.push(action.payload);
    },
  },
});

export const { discoveredDevice, setSelectedDevice, clearDevices, receivedData } = bluetoothSlice.actions;

export default bluetoothSlice.reducer;
