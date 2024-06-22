import get from '@/http/get'
import post from '@/http/post'
import HeaderUtils from "@/http/headerUtils";
import EndPoint from '@/http/endpoint'
import ParamsUtils from "@/http/ParamsUtils";


export default  {
    deleteCommentTrial: (data) => { // 트라이얼 댓글 삭제 (회원)
        return post(EndPoint.DELETE_COMMENT_TRIAL, data, HeaderUtils.AUTH_HEADER())
    },
    enrollCommentTrial: (data) => { // 트라이얼 댓글 등록 (회원)
        return post(EndPoint.ENROLL_COMMENT_TRIAL, data, HeaderUtils.AUTH_HEADER())
    },
    findAnonymousAllCommentTrial: (params) => { // 트라이얼 게시판 댓글 전체 조회(익명)
        return get(EndPoint.FIND_ANONYMOUS_ALL_COMMENT_TRIAL(params.id), ParamsUtils.EMPTY, HeaderUtils.NORMAL)
    },
    findUserAllCommentTrial: (params) => { // 트라이얼 게시판 댓글 전체 조회(회원)
        return get(EndPoint.FIND_USER_ALL_COMMENT_TRIAL(params.id), ParamsUtils.EMPTY, HeaderUtils.AUTH_HEADER())
    },
    findAnonymousParentCommentTrial: (params) => { // 트라이얼 게시판 부모 댓글 조회(익명)
        return get(EndPoint.FIND_ANONYMOUS_PARENT_COMMENT_TRIAL(params.id), params, HeaderUtils.NORMAL)
    },
    findUserParentCommentTrial: (params) => { // 트라이얼 게시판 부모 댓글 조회(회원)
        return get(EndPoint.FIND_USER_PARENT_COMMENT_TRIAL(params.id), params, HeaderUtils.AUTH_HEADER())
    },
    findAnonymousChildrenCommentTrial: (params) => { // 트라이얼 게시판 자식 댓글 조회(익명)
        return get(EndPoint.FIND_ANONYMOUS_CHILDREN_COMMENT_TRIAL(params.id), params, HeaderUtils.NORMAL)
    },
    findUserChildrenCommentTrial: (params) => { // 트라이얼 게시판 자식 댓글 조회(회원)
        return get(EndPoint.FIND_USER_CHILDREN_COMMENT_TRIAL(params.id), params, HeaderUtils.AUTH_HEADER())
    },
    reportCommentTrial: (data) => { // 트라이얼 댓글 신고
        return post(EndPoint.REPORT_COMMENT_TRIAL, data, HeaderUtils.AUTH_HEADER())
    },
    updateCommentTrial: (data) => { // 트라이얼 댓글 수정
        return post(EndPoint.UPDATE_COMMENT_TRIAL, data, HeaderUtils.AUTH_HEADER())
    }

}
