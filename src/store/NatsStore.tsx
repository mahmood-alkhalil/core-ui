import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type NatsState = {
  initializing: boolean;
  initFailed: boolean;
  connectionName: string;
  connected: boolean;
};

type NatsAction = {
  setInitializing: (initializing: boolean) => void;
  setInitFailed: (failed: boolean) => void;
  setConnectionName: (name: string) => void;
  setConnected: (connected: boolean) => void;
};

export const useNats = create<NatsAction & NatsState>()(
  immer((set) => ({
    initializing: true,
    initFailed: false,
    connectionName: "",
    connected: false,
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
    setConnected: (connected: boolean) =>
      set((state) => {
        state.connected = connected;
      }),
  }))
);
