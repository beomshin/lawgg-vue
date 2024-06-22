class FindAllLawFirmListRequestDto {

    page
    pageNum
    subject
    keyword

    constructor(
        page,
        pageNum,
        subject,
        keyword
    ) {
        this.page = page;
        this.pageNum = pageNum;
        this.subject = subject;
        this.keyword = keyword
    }

}

export default FindAllLawFirmListRequestDto