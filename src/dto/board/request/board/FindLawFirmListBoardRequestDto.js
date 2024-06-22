class FindLawFirmListBoardRequestDto {
    id // 로펌 아이디
    page // 페이지
    pageNum // 페이지 개수
    topic // 토픽 (new , hot)
    subject // 검색 조건
    keyword // 키워드

    constructor(
        id,
        page,
        pageNum,
        topic,
        subject,
        keyword
    ){
        this.id = id
        this.page = page;
        this.pageNum = pageNum;
        this.topic = topic;
        this.subject = subject;
        this.keyword = keyword;
    }

}

export default FindLawFirmListBoardRequestDto