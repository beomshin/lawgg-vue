class DeleteUserCommentBoardRequestDto {
    id
    password

    constructor(
        id,
        password
    ) {
        this.id = id;
        this.password = password;
    }
}

export default DeleteUserCommentBoardRequestDto