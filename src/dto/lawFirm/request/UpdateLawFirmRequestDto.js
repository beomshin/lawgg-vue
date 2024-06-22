class UpdateLawFirmRequestDto {

    id
    introduction
    profile
    background

    constructor(
        id,
        introduction,
        profile,
        background
    ) {
        this.id = id;
        this.introduction = introduction;
        this.profile = profile
        this.background = background
    }
}

export default UpdateLawFirmRequestDto