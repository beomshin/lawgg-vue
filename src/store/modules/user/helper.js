export default {
    name: 'user',
    getters: [
        'getUserInfo', 'getAlert'
    ],
    mutations: [
        'setUserInfo', 'updateUserNickName', 'updateProfile', 'updateBoardCount', 'updateTrialCount', 'updateCommentCount', 'updateAlerts', 'updateReadAlert', 'updateReadAlertAll', 'updateReadAlertFind', 'updateUserAuthFlag', 'updateUserEmail'
    ]
}
