class VerifyEmailSignRequestDto {
    txId
    code

    constructor(txId, code) {
        this.txId = txId;
        this.code = code;
    }

    getParams() {
        return { code: this.code }
    }
}

export default VerifyEmailSignRequestDto
