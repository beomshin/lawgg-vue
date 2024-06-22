class EnrollAnonymousCommentBoardRequestDto {

    id
    parentId
    loginId
    password
    content
    emoticon
    depth
    boardCommentId

    constructor(
        id,
        parentId,
        loginId,
        password,
        content,
        emoticon,
        depth,
        boardCommentId
    ) {
        this.id = id;
        this.parentId = parentId;
        this.loginId = loginId;
        this.password = password;
        this.content = content;
        this.emoticon = emoticon;
        this.depth = depth;
        this.boardCommentId = boardCommentId;
    }

}

export default EnrollAnonymousCommentBoardRequestDto
