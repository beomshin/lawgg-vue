import get from '../../get'
import post from '../../post'
import post2 from '../../post2'
import HeaderUtils from "@/http/headerUtils";
import EndPoint from '@/http/endpoint'
import ParamsUtils from "@/http/ParamsUtils";


export default {
    loginUserTrial: (data) => { // 트라이얼 로그인 (회원)
        return post(EndPoint.LOGIN_USER_TRIAL, data, HeaderUtils.AUTH_HEADER())
    },
    deleteUserTrial: (data) => { // 트라이얼 게시판 삭제(회원)
        return post(EndPoint.DELETE_USER_TRIAL, data, HeaderUtils.AUTH_HEADER())
    },
    enrollUserTrial: (data) => { // 회원 트라이얼 등록
        return post2(EndPoint.ENROLL_USER_TRIAL, data, HeaderUtils.AUTH_HEADER())
    },
    enrollLawFirmTrial: (data) => { // 로펌 트라이얼 등록
        return post(EndPoint.ENROLL_LAW_FIRM_TRIAL, data, HeaderUtils.AUTH_HEADER())
    },
    findAllListTrial: (params) => { // 트라이얼 게시판 전체 조회
        return get(EndPoint.FIND_ALL_LIST_TRIAL, params, HeaderUtils.NORMAL)
    },
    findUserListTrial: (params) => { // 회원 트라이얼 게시판 조회
        return get(EndPoint.FIND_USER_LIST_TRIAL, params, HeaderUtils.AUTH_HEADER())
    },
    findLawFirmListTrial: (params) => { // 로펌 트라이얼 게시판 전체 조회
        return get(EndPoint.FIND_LAW_FIRM_LIST_TRIAL, params, HeaderUtils.NORMAL)
    },
    findAnonymousDetailTrial: (params) => { // 트라이얼 게시판 상세 조회(익명)
        return get(EndPoint.FIND_ANONYMOUS_DETAIL_TRIAL(params.id), ParamsUtils.EMPTY, HeaderUtils.NORMAL)
    },
    findUserDetailTrial: (params) => { // 트라이얼 게시판 상세 조회(화원)
        return get(EndPoint.FIND_USER_DETAIL_TRIAL(params.id), ParamsUtils.EMPTY, HeaderUtils.AUTH_HEADER())
    },
    recommendTrial: (data) => { // 트라이얼 게시판 추천
        return post(EndPoint.RECOMMEND_TRIAL, data, HeaderUtils.AUTH_HEADER())
    },
    deleteRecommendTrial: (data) => { // 트라이얼 추천 삭제
        return post(EndPoint.DELETE_RECOMMEND_TRIAL, data, HeaderUtils.AUTH_HEADER())
    },
    reportTrial: (data) => { // 트라이얼 신고
        return post(EndPoint.REPORT_TRIAL, data, HeaderUtils.NORMAL)
    },
    voteTrial: (data) => { // 트라이얼 투표
        return post(EndPoint.VOTE_TRIAL, data, HeaderUtils.AUTH_HEADER())
    },
    updateTrial: (data) => { // 트라이얼 수정
        return post(EndPoint.UPDATE_TRIAL, data, HeaderUtils.AUTH_MULTIPART_HEADER())
    },
    updateLiveTrial: (data) => { // 트라이얼 재판 시작
        return post(EndPoint.UPDATE_LIVE_TRIAL, data, HeaderUtils.AUTH_HEADER())
    },
    updateEndTrial: (data) => { // 트라이얼 재판 시작
        return post(EndPoint.UPDATE_END_TRIAL, data, HeaderUtils.AUTH_HEADER())
    },
    uploadVideo: (data) => {
        return post(EndPoint.UPLOAD_VIDEO_TRIAL, data, HeaderUtils.AUTH_MULTIPART_HEADER())
    }

}
