class FindUserListTrialRequestDto {
    page
    pageNum
    topic
    subject
    keyword

    constructor(
        page,
        pageNum,
        topic,
        subject,
        keyword
    ) {
        this.page = page;
        this.pageNum = pageNum;
        this.topic = topic;
        this.subject = subject;
        this.keyword = keyword;
    }
}

export default FindUserListTrialRequestDto
