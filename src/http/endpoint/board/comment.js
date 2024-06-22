
const END_POINT = {
    DELETE_ANONYMOUS_COMMENT_BOARD: '/api/public/board/delete/anonymous/comment', // 익명 게시판 댓글 삭제
    DELETE_USER_COMMENT_BOARD: '/api/board/delete/user/comment', // 회원 게시판 댓글 삭제
    ENROLL_USER_COMMENT_BOARD: '/api/board/enroll/user/comment', // 회원 게시판 댓글 등록
    ENROLL_ANONYMOUS_COMMENT_BOARD: '/api/public/board/enroll/anonymous/comment', // 익명 게시판 댓글 등록
    FIND_ANONYMOUS_ALL_COMMENT_BOARD: (id) => { return `/api/public/board/find/anonymous/all/comment/${id}` }, // 게시판 댓글 전체 조회(익명)
    FIND_USER_ALL_COMMENT_BOARD: (id) => { return `/api/board/find/user/all/comment/${id}` }, // 게시판 댓글 전체 조회(회원)
    FIND_ANONYMOUS_PARENT_COMMENT_BOARD: (id) => { return `/api/public/board/find/anonymous/parent/comment/${id}` }, // 게시판 부모 댓글 조회(익명)
    FIND_USER_PARENT_COMMENT_BOARD: (id) => { return `/api/board/find/user/parent/comment/${id}` }, // 게시판 부모 댓글 조회(회원)
    FIND_ANONYMOUS_CHILDREN_COMMENT_BOARD: (id) => { return `/api/public/board/find/anonymous/children/comment/${id}` }, // 게시판 자식 댓글 조회(익명)
    FIND_USER_CHILDREN_COMMENT_BOARD: (id) => { return `/api/board/find/user/children/comment/${id}` }, // 게시판 자식 댓글 조회(회원)
    REPORT_COMMENT_BOARD: '/api/public/board/report/comment', // 게시판 댓글 신고
    UPDATE_ANONYMOUS_COMMENT_BOARD: '/api/public/board/update/anonymous/comment', // 익명 게시판 댓글 수정
    UPDATE_USER_COMMENT_BOARD: '/api/board/update/user/comment' // 회원 게시판 댓글 수정
}

export default END_POINT
