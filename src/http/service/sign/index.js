import get from '../../get'
import post from '../../post'
import HeaderUtils from '../../headerUtils'
import EndPoint from '../../endpoint'

export default {
    checkIdSign: (params) => {
        return get(EndPoint.CHECK_ID_SIGN, params, HeaderUtils.NORMAL)
    },
    sendEmailSign: (data) => {
        return post(EndPoint.SEND_EMAIL_SIGN, data, HeaderUtils.NORMAL)
    },
    verifyEmailSign: (data) => {
        return get(EndPoint.VERIFY_EMAIL_SIGN(data.txId), data.getParams(), HeaderUtils.NORMAL)
    },
    userSign: (data) => {
        return post(EndPoint.USER_SIGN, data, HeaderUtils.NORMAL)
    },
    checkNickname: (params) => {
        return get(EndPoint.CHECK_NICK_NAME, params, HeaderUtils.NORMAL)
    },
}
