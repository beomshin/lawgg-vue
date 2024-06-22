class EnrollUserTrialRequestDto {
    title
    plaintiff // 원고
    defendant // 피고
    subheading
    plaintiffOpinion
    defendantOpinion
    content
    files
    isLawFirm

    constructor(
        title,
        plaintiff,
        defendant,
        subheading,
        plaintiffOpinion,
        defendantOpinion,
        content,
        files,
        isLawFirm
    ) {
        this.title = title;
        this.plaintiff = plaintiff;
        this.defendant = defendant;
        this.subheading = subheading;
        this.plaintiffOpinion = plaintiffOpinion;
        this.defendantOpinion = defendantOpinion;
        this.content = content;
        this.files = files
        this.isLawFirm = isLawFirm
    }
}

export default EnrollUserTrialRequestDto
