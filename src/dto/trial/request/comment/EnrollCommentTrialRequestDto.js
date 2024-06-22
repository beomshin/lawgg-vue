class EnrollCommentTrialRequestDto {
    id
    parentId
    content
    emoticon
    depth
    trialCommentId

    constructor(
        id,
        parentId,
        content,
        emoticon,
        depth,
        trialCommentId
    ) {
        this.id = id;
        this.parentId = parentId;
        this.content = content;
        this.emoticon = emoticon;
        this.depth = depth;
        this.trialCommentId = trialCommentId
    }
}

export default EnrollCommentTrialRequestDto
