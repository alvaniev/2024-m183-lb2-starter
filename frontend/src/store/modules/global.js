const state = {
  isAlertOn: false,
  alertmsg: "barbar",
  alertcolor: "error"
};

const getters = {
  getAlertmsg() {
    return state.alertmsg;
  },
  getAlertcolor() {
    return state.alertcolor;
  },
  getAlertState() {
    return state.isAlertOn;
  },
 };

const mutations = {
  setAlert(state, alertData) {
    state.alertmsg = alertData.msg;
    state.alertcolor = alertData.color,
    state.isAlertOn = true;
  },
  resetAlert(state) {
    state.isAlertOn = false;
  } 
};



export default {
  state,
  mutations,
  getters
};
