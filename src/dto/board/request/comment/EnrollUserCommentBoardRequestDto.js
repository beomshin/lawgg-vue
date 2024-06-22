class EnrollUserCommentBoardRequestDto {

    id
    parentId
    content
    emoticon
    depth
    boardCommentId

    constructor(
        id,
        parentId,
        content,
        emoticon,
        depth,
        boardCommentId
    ) {
        this.id = id;
        this.parentId = parentId;
        this.content = content;
        this.emoticon = emoticon;
        this.depth = depth;
        this.boardCommentId = boardCommentId
    }
}

export default EnrollUserCommentBoardRequestDto

