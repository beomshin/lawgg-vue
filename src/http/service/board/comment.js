import get from '@/http/get'
import post from '@/http/post'
import HeaderUtils from "@/http/headerUtils";
import EndPoint from '@/http/endpoint'
import ParamsUtils from "@/http/ParamsUtils";

export default {
    deleteAnonymousCommentBoard: (data) => { // 익명 게시판 댓글 삭제
        return post(EndPoint.DELETE_ANONYMOUS_COMMENT_BOARD, data, HeaderUtils.NORMAL);
    },
    deleteUserCommentBoard: (data) => { // 회원 게시판 댓글 삭제
        return post(EndPoint.DELETE_USER_COMMENT_BOARD, data, HeaderUtils.AUTH_HEADER());
    },
    enrollUserCommentBoard: (data) => { // 회원 게시판 댓글 등록
        return post(EndPoint.ENROLL_USER_COMMENT_BOARD, data, HeaderUtils.AUTH_HEADER());
    },
    enrollAnonymousCommentBoard: (data) => { // 익명 게시판 댓글 등록
        return post(EndPoint.ENROLL_ANONYMOUS_COMMENT_BOARD, data, HeaderUtils.NORMAL)
    },
    findAnonymousAllCommentBoard: (params) => { // 게시판 댓글 전체 조회(익명)
        return get(EndPoint.FIND_ANONYMOUS_ALL_COMMENT_BOARD(params.id), ParamsUtils.EMPTY, HeaderUtils.NORMAL);
    },
    findUserAllCommentBoard: (params) => { // 게시판 댓글 전체 조회(회원)
        return get(EndPoint.FIND_USER_ALL_COMMENT_BOARD(params.id), ParamsUtils.EMPTY, HeaderUtils.AUTH_HEADER());
    },
    findAnonymousParentCommentBoard: (params) => { // 게시판 부모 댓글 조회(익명)
        return get(EndPoint.FIND_ANONYMOUS_PARENT_COMMENT_BOARD(params.id), params, HeaderUtils.NORMAL);
    },
    findUserParentCommentBoard: (params) => { // 게시판 부모 댓글 조회(회원)
        return get(EndPoint.FIND_USER_PARENT_COMMENT_BOARD(params.id), params, HeaderUtils.AUTH_HEADER());
    },
    findAnonymousChildrenCommentBoard: (params) => { // 게시판 자식 댓글 조회(익명)
        return get(EndPoint.FIND_ANONYMOUS_CHILDREN_COMMENT_BOARD(params.id), params, HeaderUtils.NORMAL);
    },
    findUserChildrenCommentBoard: (params) => { // 게시판 자식 댓글 조회(회원)
        return get(EndPoint.FIND_USER_CHILDREN_COMMENT_BOARD(params.id), params, HeaderUtils.AUTH_HEADER());
    },
    reportCommentBoard: (data) => { // 게시판 댓글 신고
        return post(EndPoint.REPORT_COMMENT_BOARD, data, HeaderUtils.NORMAL);
    },
    updateAnonymousCommentBoard: (data) => { // 익명 게시판 댓글 수정
        return post(EndPoint.UPDATE_ANONYMOUS_COMMENT_BOARD, data, HeaderUtils.NORMAL)
    },
    updateUserCommentBoard: (data) => { // 회원 게시판 댓글 수정
        return post(EndPoint.UPDATE_USER_COMMENT_BOARD, data, HeaderUtils.AUTH_HEADER());
    }
}
