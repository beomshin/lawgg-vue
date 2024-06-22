class ReportBoardRequestDto {
    id // 게시판 아이디
    content

    constructor(
        id,
        content
    ) {
        this.id = id;
        this.content = content;
    }
}

export default ReportBoardRequestDto
