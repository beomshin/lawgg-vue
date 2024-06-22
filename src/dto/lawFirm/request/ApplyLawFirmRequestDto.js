class ApplyLawFirmRequestDto {
    id
    title
    introduction

    constructor(
        id,
        title,
        introduction
    ) {
        this.id = id;
        this.title = title
        this.introduction = introduction
    }
}

export default ApplyLawFirmRequestDto