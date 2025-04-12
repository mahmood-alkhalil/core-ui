import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer'

type SsoState = {
  initializing: boolean;
  initFailed: boolean,
  token: string;
  refreshToken: string;
  authenticated: boolean;
  userId: string;
}

type SsoAction = {
  setInitializing: (initializing: boolean) => void;
  setInitFailed: (failed: boolean) => void,
  setToken: (token: string) => void;
  setRefreshToken: (refresh_token: string) => void;
  setAuthenticated: (authenticated: boolean) => void;
  setUserId: (id: string) => void;
}

export const useSso = create<SsoState & SsoAction>()(
        immer((set) => ({
          initializing: true,
          initFailed: false,
          token: "",
          refreshToken: "",
          authenticated: false,
          userId: "",
          setInitializing: (initializing: boolean) => set(state => {
            state.initializing = initializing
          }),
          setInitFailed: (failed: boolean) => set(state => {
            state.initFailed = failed
          }),
          setToken: (token: string) => set(state => {
            state.token = token
          }),
          setRefreshToken: (refreshToken: string) => set(state => {
            state.refreshToken = refreshToken
          }),
          setAuthenticated: (authenticated: boolean) => set(state => {
            state.authenticated = authenticated
          }),
          setUserId: (id: string) => set(state => {
            state.userId = id
          })
        }))
    )
;