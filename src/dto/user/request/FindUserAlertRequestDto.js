class FindUserAlertRequestDto {
    page;
    pageNum;
    keyword

    constructor(page, pageNum, keyword) {
        this.page = page;
        this.pageNum = pageNum
        this.keyword = keyword
    }
}

export default FindUserAlertRequestDto