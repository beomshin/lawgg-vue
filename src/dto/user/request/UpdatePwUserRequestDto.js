class UpdatePwUserRequestDto {
    loginId
    password

    constructor(
        loginId,
        password
    ) {
        this.loginId = loginId;
        this.password = password;
    }
}

export default UpdatePwUserRequestDto
