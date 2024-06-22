export default {
    setUserInfo(state, userInfo) {
        state.userInfo = userInfo
    },
    updateUserNickName(state, nickName) {
        state.userInfo.nickName = nickName;
    },
    updateProfile(state, profile) {
        state.userInfo.profile = profile
    },
    updateBoardCount(state, count) {
        state.userInfo.boardCount += count
    },
    updateTrialCount(state, count) {
        state.userInfo.trialCount += count
    },
    updateCommentCount(state, count) {
        state.userInfo.commentCount += count
    },
    updateAlerts(state, alerts) {
        state.alerts = alerts
    },
    updateReadAlert(state, index) {
        state.alerts[index].readFlag = 1
    },
    updateReadAlertAll(state) {
        state.alerts.forEach(it => {
            it.readFlag = 1
        })
    },
    updateReadAlertFind(state, id) {
        state.alerts.find(it => {
            if (it.id == id) {
                it.readFlag = 1
            }
        })
    },
    updateUserAuthFlag(state, flag) {
        state.userInfo.authFlag = flag
    },
    updateUserEmail(state, email) {
        state.userInfo.email = email
    }
}
;
