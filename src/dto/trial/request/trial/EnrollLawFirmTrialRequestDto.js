class EnrollLawFirmTrialRequestDto {
    title
    plaintiff // 원고
    defendant // 피고
    playVideo // 비디오
    subheading
    plaintiffOpinion
    defendantOpinion
    content
    files

    constructor(
        title,
        plaintiff,
        defendant,
        playVideo,
        subheading,
        plaintiffOpinion,
        defendantOpinion,
        content,
        files
    ) {
        this.title = title;
        this.plaintiff = plaintiff;
        this.defendant = defendant;
        this.playVideo = playVideo;
        this.subheading = subheading;
        this.plaintiffOpinion = plaintiffOpinion;
        this.defendantOpinion = defendantOpinion;
        this.content = content;
        this.files = files
    }
}

export default EnrollLawFirmTrialRequestDto
