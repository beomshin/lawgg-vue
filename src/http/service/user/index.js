import post from '@/http/post'
import HeaderUtils from "@/http/headerUtils";
import EndPoint from '@/http/endpoint'
import ParamsUtils from "@/http/ParamsUtils";
import get from "@/http/get";

export default {
    findIdUser: (data) => { // 회원 아이디 조회
        return post(EndPoint.FIND_ID_USER, data, HeaderUtils.NORMAL)
    },
    checkIdUser: (data) => { // 회원 로그인/본인인증 조회
        return post(EndPoint.CHECK_ID_USER, data, HeaderUtils.NORMAL)
    },
    findInfoUser: (accessToken) => { // 회원 정보 조회
        return post(EndPoint.FIND_INFO_USER, ParamsUtils.EMPTY, { Authorization: 'Bearer ' + accessToken })
    },
    updatePwUser: (data) => { // 회원 비밀번호 업데이트
        return post(EndPoint.UPDATE_PW_USER, data, HeaderUtils.NORMAL)
    },
    updateInfoUser: (data) => { // 회원 정보 수정
        return post(EndPoint.UPDATE_INFO_USER, data, HeaderUtils.AUTH_HEADER())
    },
    updateUserProfile: (data) => { // 회원 프로필 수정
        return post(EndPoint.UPDATE_USER_PROFILE, data, HeaderUtils.AUTH_MULTIPART_HEADER())
    },
    checkPwUser: (data) => { // 회원 비밀번호 업데이트
        return post(EndPoint.CHECK_PW_USER, data, HeaderUtils.AUTH_HEADER())
    },
    findUserBoards: (param) => { // 유저 게시판 조회
        return get(EndPoint.FIND_USER_BOARDS, param, HeaderUtils.AUTH_HEADER())
    },
    findUserAlerts: (param) => { // 알림 조회
        return get(EndPoint.FIND_USER_ALERT, param, HeaderUtils.AUTH_HEADER())
    },
    updateAlert: (param) => {
        return post(EndPoint.UPDATE_ALERT, param, HeaderUtils.AUTH_HEADER())
    },
    updateAlertAll: () => {
        return post(EndPoint.UPDATE_ALERT_ALL, ParamsUtils.EMPTY, HeaderUtils.AUTH_HEADER())
    }
}
