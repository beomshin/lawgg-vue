class SignUserRequestDto {

    loginId
    password
    nickName
    personalPeriod

    constructor(
        loginId,
        password,
        nickName,
        personalPeriod
    ) {
        this.loginId = loginId;
        this.password = password;
        this.nickName = nickName;
        this.personalPeriod = personalPeriod;
    }

}

export default SignUserRequestDto