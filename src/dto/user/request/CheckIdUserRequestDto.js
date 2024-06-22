class CheckIdUserRequestDto {

    loginId
    error_code;
    error_msg;
    imp_uid;
    merchant_uid;
    pg_provider;
    pg_type;
    success;

    constructor(loginId, imp) {
        this.loginId = loginId;
        this.error_code = imp.error_code;
        this.error_msg = imp.error_msg;
        this.imp_uid = imp.imp_uid;
        this.merchant_uid = imp.merchant_uid;
        this.pg_provider = imp.pg_provider;
        this.pg_type = imp.pg_type;
        this.success = imp.success;
    }

}

export default CheckIdUserRequestDto
