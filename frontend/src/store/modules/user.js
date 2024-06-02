const state = {
  jwt: null,
  id: null,
  username: null,
  firstname: null,
  lastname: null,
  role: null,
  avatar: null
};

const getters = {
  getUserFirstname() {
    return state.firstname;
  },
  getUserLastname() {
    return state.lastname;
  },
  getUserId() {
    return state.id;
  },
  getUsername() {
    return state.username;
  },
  getUserJWT() {
    return state.jwt;
  },
  getUserAvatar() {
    return state.avatar;
  },
  getUserRole() {
    return state.role;
  },
  getAuthentificationState() {
    let authenticationState = false;
    if (state.jwt) {
      authenticationState = true
    }
    return authenticationState;
  }
};

const mutations = {
  unsetUser(state) {
    state.jwt = null;
    state.username =  null;
    state.id  = null;
    state.firstname = null;
    state.lastname = null;
    state.role = null;
    state.avatar = null;
  },
  setUser(state, userData) {
    state.jwt = userData.jwt;
    state.username = userData.username;
    state.id = userData.id;
    state.firstname = userData.firstname;
    state.lastname = userData.lastname;
    state.role = userData.role;
    state.avatar = userData.avatar;
  },
};

const actions = {
  login({ commit }, auth) {
    return fetch(`${process.env.VUE_APP_BACKEND}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: auth.username,
        pwd: auth.pwd
      })
    })
      .then(response => {
        if (response.status != 200) {
          const error = new Error(response.statusText); 
          error.statusCode = response.status;
          throw error;
        } else {
          return response.json()
        }
      })
      .then(resbody => {
        commit("setUser", resbody);
        commit("setAlert", {msg: "Login successful", color: "success"});
      })
      .catch(err => {
        commit("setAlert", {msg: err.message, color: "warning"});
      });
  }
};


export default {
  state,
  getters,
  mutations,
  actions,
};
