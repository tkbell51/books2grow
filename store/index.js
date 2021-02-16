import Vue from 'vue'
export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  },
}

// save our state (isPanel open or not)
export const store = Vue.observable({
  isSearchOpen: false,
})

// We call toggleNav anywhere we need it in our app
export const mutations = {
  toggleNav() {
    store.isSearchOpen = !store.isSearchOpen
  },
}
