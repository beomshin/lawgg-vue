class FindLawFirmListTrialRequestDto {
    id
    page
    pageNum
    topic
    subject
    keyword

    constructor(
        id,
        page,
        pageNum,
        topic,
        subject,
        keyword
    ) {
        this.id = id;
        this.page = page;
        this.pageNum = pageNum;
        this.topic = topic;
        this.subject = subject;
        this.keyword = keyword;
    }
}

export default FindLawFirmListTrialRequestDto