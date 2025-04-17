import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type NatsState = {
  initializing: boolean;
  initFailed: boolean;
  connectionName: string;
  connected: boolean;
  coreEngineId: string;
};

type NatsAction = {
  setInitializing: (initializing: boolean) => void;
  setInitFailed: (failed: boolean) => void;
  setConnectionName: (name: string) => void;
  setCoreEngineId: (name: string) => void;
  setConnected: (connected: boolean) => void;
};

export const useNats = create<NatsAction & NatsState>()(
  immer((set) => ({
    initializing: true,
    initFailed: false,
    connectionName: "",
    connected: false,
    coreEngineId: "",
    setInitializing: (initializing: boolean) =>
      set((state) => {
        state.initializing = initializing;
      }),
    setInitFailed: (failed: boolean) =>
      set((state) => {
        state.initFailed = failed;
      }),
    setConnectionName: (name: string) =>
      set((state) => {
        state.connectionName = name;
      }),
    setCoreEngineId: (coreEngineId: string) =>
      set((state) => {
        state.coreEngineId = coreEngineId;
      }),
    setConnected: (connected: boolean) =>
      set((state) => {
        state.connected = connected;
      }),
  }))
);
