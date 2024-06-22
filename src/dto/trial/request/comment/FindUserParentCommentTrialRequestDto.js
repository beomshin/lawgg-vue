class FindUserParentCommentTrialRequestDto {
    id
    page
    pageNum

    constructor(
        id,
        page,
        pageNum
    ) {
        this.id = id;
        this.page = page;
        this.pageNum = pageNum;
    }
}

export default FindUserParentCommentTrialRequestDto
