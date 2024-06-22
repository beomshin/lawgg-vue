import get from '../../get'
import post from '../../post'
import HeaderUtils from "@/http/headerUtils";
import EndPoint from '@/http/endpoint'
import ParamsUtils from "@/http/ParamsUtils";

export default {
    deleteAnonymousBoard: (data) => { // 익명 게시판 삭제
        return post(EndPoint.DELETE_ANONYMOUS_BOARD, data, HeaderUtils.NORMAL)
    },
    deleteUserBoard: (data) => { // 회원 게시판 삭제
        return post(EndPoint.DELETE_USER_BOARD, data, HeaderUtils.AUTH_HEADER())
    },
    loginAnonymousBoard: (data) => { // 익명 게시판 로그인
        return post(EndPoint.LOGIN_ANONYMOUS_BOARD, data, HeaderUtils.NORMAL);
    },
    loginUserBoard: (data) => { // 회원 게시판 로그인
        return post(EndPoint.LOGIN_USER_BOARD, data, HeaderUtils.AUTH_HEADER())
    },
    findAllListBoard: (params) => { // 포지션 게시판 전체 조회
        return get(EndPoint.FIND_ALL_LIST_BOARD, params, HeaderUtils.NORMAL)
    },
    findUserListBoard: (params) => { // 회원 포지션 게시판 조회
        return get(EndPoint.FIND_USER_LIST_BOARD, params, HeaderUtils.AUTH_HEADER())
    },
    findLawFirmListBoard: (params) => { // 포지션 게시판 전체 조회
        return get(EndPoint.FIND_LAW_FIRM_LIST_BOARD, params, HeaderUtils.NORMAL)
    },
    findAnonymousDetailBoard: (params) => { // 게시판 상세 조회 (익명)
        return get(EndPoint.FIND_ANONYMOUS_DETAIL_BOARD(params.id), ParamsUtils.EMPTY, HeaderUtils.NORMAL)
    },
    findUserDetailBoard: (params) => { // 게시판 상세 조회 (화원)
        return get(EndPoint.FIND_USER_DETAIL_BOARD(params.id), ParamsUtils.EMPTY, HeaderUtils.AUTH_HEADER())
    },
    enrollUserBoard: (data) => { // 회원 포지션 게시판 등록
        return post(EndPoint.ENROLL_USER_BOARD, data, HeaderUtils.AUTH_HEADER())
    },
    enrollAnonymousBoard: (data) => { // 익명 포지션 게시판 등록
        return post(EndPoint.ENROLL_ANONYMOUS_BOARD, data, HeaderUtils.NORMAL)
    },
    enrollLawFirmBoard: (data) => { // 로펌 포지션 게시판 등록
        return post(EndPoint.ENROLL_LAW_FIRM_BOARD, data, HeaderUtils.AUTH_MULTIPART_HEADER())
    },
    recommendBoard: (data) => { // 게시판 추천
        return post(EndPoint.RECOMMEND_BOARD, data, HeaderUtils.AUTH_HEADER())
    },
    deleteRecommendBoard: (data) => { // 게시판 추천 삭제
        return post(EndPoint.DELETE_RECOMMEND_BOARD, data, HeaderUtils.AUTH_HEADER())
    },
    reportBoard: (data) => { // 게시판 신고
        return post(EndPoint.REPORT_BOARD, data, HeaderUtils.NORMAL)
    },
    updateUserBoard: (data) => { // 회원 게시판 수정
        return post(EndPoint.UPDATE_USER_BOARD, data, HeaderUtils.AUTH_HEADER())
    },
    updateAnonymousBoard: (data) => { // 익명 게시판 수정
        return post(EndPoint.UPDATE_ANONYMOUS_BOARD, data, HeaderUtils.AUTH_HEADER())
    }
}
