
const END_POINT = {
    FIND_ID_USER: '/api/public/user/find/id', // 회원 아이디 조회
    CHECK_ID_USER: '/api/public/user/check/id', // 회원 로그인/본인인증 조회
    FIND_INFO_USER: '/api/user/find/info', // 회원 정보 조회
    UPDATE_PW_USER: '/api/public/user/update/pw', // 회원 비밀번호 업데이트
    UPDATE_INFO_USER: '/api/user/update/info', // 회원 정보 수정
    UPDATE_USER_PROFILE: '/api/user/update/profile', // 회원 정보 수정
    CHECK_PW_USER: '/api/user/check/pw', // 회원 비밀번호 체크
    FIND_USER_BOARDS: '/api/user/find/boards', // 유저 게시판 조회
    FIND_USER_ALERT: '/api/user/find/alert', // 알림 조회
    UPDATE_ALERT: '/api/user/update/alert', // 알림 읽기
    UPDATE_ALERT_ALL: '/api/user/update/alert/all', // 전체 알림 읽기
}

export default END_POINT
