class FindUserListMyLawFirmRequestDto {
    id
    page
    pageNum
    subject
    keyword

    constructor(
        id,
        page,
        pageNum,
        subject,
        keyword
    ) {
        this.id = id;
        this.page = page;
        this.pageNum = pageNum;
        this.subject = subject;
        this.keyword = keyword
    }
}

export default FindUserListMyLawFirmRequestDto