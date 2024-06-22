
const END_POINT = {
    CHECK_ID_SIGN: '/api/public/sign/check/id',
    SEND_EMAIL_SIGN: '/api/public/sign/send/email',
    VERIFY_EMAIL_SIGN: (txId) => { return `/api/public/sign/verify/email/${txId}` },
    USER_SIGN: '/api/public/sign/user',
    CHECK_NICK_NAME: '/api/public/sign/check/nickName',
}

export default END_POINT
