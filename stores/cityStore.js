import { defineStore } from 'pinia'

export const useCityStore = defineStore('cityStore', {
  state: () => ({
    authUser: null,
  }),
  getters: {
    
  },
  actions: {
    setAuthUser(user) {
        this.authUser = user;
    },
    setAuthUserToNull() {
        this.authUser = null;
    },
  },
})
