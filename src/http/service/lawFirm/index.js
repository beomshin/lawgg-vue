import get from '../../get'
import post from '../../post'
import HeaderUtils from "@/http/headerUtils";
import EndPoint from '@/http/endpoint'
import ParamsUtils from "@/http/ParamsUtils";


export default  {
    applyLawFirm: (data) => { // 로펌 신청하기
        return post(EndPoint.APPLY_LAW_FIRM, data, HeaderUtils.AUTH_HEADER());
    },
    confirmLawFirm: (data) => { // 로펌 신청 접수하기
        return post(EndPoint.CONFIRM_LAW_FIRM, data, HeaderUtils.AUTH_HEADER());
    },
    enrollLawFirm: (data) => { // 로펌 만들기
        return post(EndPoint.ENROLL_LAW_FIRM, data, HeaderUtils.AUTH_MULTIPART_HEADER());
    },
    deleteLawFirm: (data) => { // 로펌 삭제하기
        return post(EndPoint.DELETE_LAW_FIRM, data, HeaderUtils.AUTH_HEADER());
    },
    quitLawFirm: (data) => { // 로펌 탈퇴하기
        return post(EndPoint.QUIT_LAW_FIRM, data, HeaderUtils.AUTH_HEADER());
    },
    userDeleteLawFirm: (data) => { // 로펌 회원 탈퇴시키기
        return post(EndPoint.USER_DELETE_LAW_FIRM, data, HeaderUtils.AUTH_HEADER());
    },
    findAllLawFirmList: (params) => { // 로펌 리스트 조회하기
        return get(EndPoint.FIND_ALL_LAW_FIRM_LIST, params, HeaderUtils.NORMAL);
    },
    findUserLawFirmDetail: (params) => { // 로펌 상세 조회하기
        return get(EndPoint.FIND_USER_LAW_FIRM_DETAIL(params.id), ParamsUtils.EMPTY, HeaderUtils.AUTH_HEADER());
    },
    findAnonymousLawFirmDetail: (params) => { // 로펌 상세 조회하기
        return get(EndPoint.FIND_ANONYMOUS_LAW_FIRM_DETAIL(params.id), ParamsUtils.EMPTY, HeaderUtils.NORMAL);
    },
    findMyLawFirm: () => { // 내 로펌 정보 조회
        return get(EndPoint.FIND_MY_LAW_FIRM, ParamsUtils.EMPTY, HeaderUtils.AUTH_HEADER());
    },
    findApplyListMyLawFirm: (params) => { // 로펌 지원자 리스트 조회하기
        return get(EndPoint.FIND_APPLY_LIST_MY_LAW_FIRM, params, HeaderUtils.AUTH_HEADER());
    },
    findUserListMyLawFirm: (params) => { // 로펌 유저 리스트 조회하기
        return get(EndPoint.FIND_USER_LIST_MY_LAW_FIRM, params, HeaderUtils.AUTH_HEADER());
    },
    activeLawFirm: (data) => { // 로펌 활성화&비활성화 하기
        return post(EndPoint.ACTIVE_LAW_FIRM, data, HeaderUtils.AUTH_HEADER());
    },
    updateLawFirm: (data) => { // 로펌 수정하기
        return post(EndPoint.UPDATE_LAW_FIRM, data, HeaderUtils.AUTH_MULTIPART_HEADER());
    },
    cancelLawFirm: (data) => { // 로펌 취소하기
        return post(EndPoint.CANCEL_LAW_FIRM, data, HeaderUtils.AUTH_HEADER());
    }
}
