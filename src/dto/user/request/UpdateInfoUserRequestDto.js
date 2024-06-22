class UpdateInfoUserRequestDto {
    nickName
    password
    email

    constructor(
        nickName,
        password,
        email
    ) {
        this.nickName = nickName;
        this.password = password;
        this.email = email
    }
}

export default UpdateInfoUserRequestDto
