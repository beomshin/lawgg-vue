
const END_POINT = {
    CHECK_ID_SIGN: '/api/public/v1/check/overlap/id',
    SEND_EMAIL_SIGN: '/api/public/v1/send/email',
    VERIFY_EMAIL_SIGN: (txId) => { return `/api/public/v1/verify/email/${txId}` },
    USER_SIGN: '/api/public/v1/enroll/user',
    CHECK_NICK_NAME: '/api/public/v1/check/overlap/nickName',
}

export default END_POINT
