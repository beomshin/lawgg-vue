class UpdateAnonymousCommentBoardRequestDto {

    id
    password
    content

    constructor(
        id,
        password,
        content
    ) {
        this.id = id;
        this.password = password;
        this.content = content;
    }

}

export default UpdateAnonymousCommentBoardRequestDto