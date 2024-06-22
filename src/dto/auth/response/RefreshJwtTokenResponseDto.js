class RefreshJwtTokenResponseDto {

    accessToken;
    expiredTime;
    resultCode;
    resultMsg;

    constructor(
        accessToken,
        expiredTime,
        resultCode,
        resultMsg
    ) {
        this.accessToken = accessToken;
        this.expiredTime = expiredTime;
        this.resultCode = resultCode;
        this.resultMsg = resultMsg;
    }

}

export default RefreshJwtTokenResponseDto
