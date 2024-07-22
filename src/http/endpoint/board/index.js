
const END_POINT = {
    DELETE_ANONYMOUS_BOARD: '/api/public/board/delete/anonymous', // 익명 게시판 삭제
    DELETE_USER_BOARD: '/api/board/delete/user', // 회원 게시판 삭제
    LOGIN_ANONYMOUS_BOARD: '/api/public/board/login/anonymous', // 익명 게시판 로그인
    LOGIN_USER_BOARD: '/api/board/login/user', // 회원 게시판 로그인
    FIND_ALL_LIST_BOARD: '/api/public/v1/find/boards', // 포지션 게시판 전체 조회
    FIND_USER_LIST_BOARD: '/api/v1/find/my/boards', // 회원 포지션 게시판 조회
    FIND_LAW_FIRM_LIST_BOARD: '/api/public/v1/find/law-firm/boards', // 로펌 포지션 게시판 전체 조회
    FIND_ANONYMOUS_DETAIL_BOARD: (id) => { return `/api/public/v1/find/board/${id}`}, // 게시판 상세 조회 (익명)
    FIND_USER_DETAIL_BOARD: (id) => { return `/api/v1/find/board/${id}` }, // 게시판 상세 조회 (화원)
    ENROLL_USER_BOARD: '/api/v1/enroll/board', // 회원 포지션 게시판 등록
    ENROLL_ANONYMOUS_BOARD: '/api/public/v1/enroll/board', // 익명 포지션 게시판 등록
    ENROLL_LAW_FIRM_BOARD: '/api/v1/enroll/law-firm/board', // 로펌 포지션 게시판 등록
    RECOMMEND_BOARD: '/api/board/recommend', // 게시판 추천
    DELETE_RECOMMEND_BOARD: '/api/board/delete/recommend', // 게시판 추천 삭제
    REPORT_BOARD: '/api/public/board/report', // 게시판 신고
    UPDATE_USER_BOARD: '/api/v1/update/board', // 회원 게시판 수정
    UPDATE_ANONYMOUS_BOARD: '/api/public/v1/update/board' // 익명 게시판 수정
}

export default END_POINT
