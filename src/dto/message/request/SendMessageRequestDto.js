class SendMessageRequestDto {
    receiver
    title
    content

    constructor(
        receiver,
        title,
        content
    ) {
        this.receiver = receiver;
        this.title = title;
        this.content = content;
    }
}

export default SendMessageRequestDto
