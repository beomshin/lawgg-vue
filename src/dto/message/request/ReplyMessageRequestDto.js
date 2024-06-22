class ReplyMessageRequestDto {
    id
    title
    content

    constructor(
        id,
        title,
        content
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
    }
}

export default ReplyMessageRequestDto
