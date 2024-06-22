class UpdateTrialRequestDto {

    subheading
    plaintiffOpinion
    defendantOpinion
    content
    addFiles
    deleteFiles

    constructor(
        subheading,
        plaintiffOpinion,
        defendantOpinion,
        content,
        addFiles,
        deleteFiles
    ) {
        this.subheading = subheading;
        this.plaintiffOpinion = plaintiffOpinion;
        this.defendantOpinion = defendantOpinion;
        this.content = content;
        this.addFiles = addFiles;
        this.deleteFiles = deleteFiles;
    }
}

export default UpdateTrialRequestDto
