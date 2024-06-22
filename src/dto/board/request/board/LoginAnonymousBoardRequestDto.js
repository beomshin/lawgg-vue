class LoginAnonymousBoardRequestDto {
    id // 게시판 아이디
    password // 게시판 비밀번호

    constructor(
        id,
        password
    ) {
        this.id = id;
        this.password = password;
    }
}

export default LoginAnonymousBoardRequestDto
