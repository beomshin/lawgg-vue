class EnrollUserBoardRequestDto {
    title // 제목
    content // 내용
    lineType // 라인 타입
    files // 파일
    isLawFirm

    constructor(
        title,
        content,
        lineType,
        files,
        isLawFirm
    ){
        this.title = title;
        this.content = content;
        this.lineType = lineType;
        this.files = files;
        this.isLawFirm = isLawFirm
    }
}

export default EnrollUserBoardRequestDto