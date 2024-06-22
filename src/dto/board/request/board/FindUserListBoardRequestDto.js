class FindUserListBoardRequestDto {
    page // 페이지
    type // 라인 타입
    pageNum // 페이지 개수
    topic // 토픽 (new , hot)
    subject // 검색 조건
    keyword // 키워드

    constructor(
        page,
        type,
        pageNum,
        topic,
        subject,
        keyword
    ){
        this.page = page;
        this.type = type;
        this.pageNum = pageNum;
        this.topic = topic;
        this.subject = subject;
        this.keyword = keyword;
    }
}

export default FindUserListBoardRequestDto