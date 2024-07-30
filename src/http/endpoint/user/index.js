
const END_POINT = {
    FIND_ID_USER: '/api/public/v1/find/user/id', // 회원 아이디 조회
    CHECK_ID_USER: '//api/public/v1/verify/user', // 회원 로그인/본인인증 조회
    FIND_INFO_USER: '/api/v1/find/user/info', // 회원 정보 조회
    UPDATE_PW_USER: '/api/public/v1/update/user/password', // 회원 비밀번호 업데이트
    UPDATE_INFO_USER: '/api/v1/update/user/info', // 회원 정보 수정
    UPDATE_USER_PROFILE: '/api/V1/update/user/profile', // 회원 정보 수정
    CHECK_PW_USER: '/api/v1/verify/password', // 회원 비밀번호 체크
    FIND_USER_BOARDS: '/api/v1/find/find/user/boards', // 유저 게시판 조회
    FIND_USER_ALERT: '/api/v1/find/user/alerts', // 알림 조회
    UPDATE_ALERT: '/api/v1/update/user/alert', // 알림 읽기
    UPDATE_ALERT_ALL: '/api/v1/update/read/user/alerts', // 전체 알림 읽기
}

export default END_POINT
