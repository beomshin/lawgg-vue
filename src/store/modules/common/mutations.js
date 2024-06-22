export default {
    successLogin: (state) => {
        state.isLogin = true
    },
    successLogout: (state) => {
        state.isLogin = false
    }
};
