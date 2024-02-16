import { createSlice } from '@reduxjs/toolkit';

// Initialisation de l'état initial du slice
const initialState = {
  devices: [], // Liste des appareils découverts
  selectedDevice: null, // Appareil actuellement connecté
  data: [] // Données reçues de l'appareil connecté
};

const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState,
  reducers: {
    discoveredDevice: (state, action) => {
      // Ajoute l'appareil découvert à la liste des appareils, évite les doublons
      const deviceExists = state.devices.some(device => device.id === action.payload.id);
      if (!deviceExists) {
        state.devices.push(action.payload);
      }
    },
    setSelectedDevice: (state, action) => {
      // Définit l'appareil sélectionné pour la connexion
      state.selectedDevice = action.payload;
    },
    clearDevices: (state) => {
      // Réinitialise la liste des appareils découverts
      state.devices = [];
    },
    receivedData: (state, action) => {
      // Ajoute les données reçues à l'état
      state.data.push(action.payload);
    },
  },
});

export const { discoveredDevice, setSelectedDevice, clearDevices, receivedData } = bluetoothSlice.actions;

export default bluetoothSlice.reducer;
