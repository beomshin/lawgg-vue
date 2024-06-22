class EnrollLawFirmBoardRequestDto {
    id // 로펌 아이디
    title // 제목
    content // 내용
    lineType // 라인 타입
    files // 파일

    constructor(
        id,
        title,
        content,
        lineType,
        files
    ){
        this.id = id;
        this.title = title;
        this.content = content;
        this.lineType = lineType;
        this.files = files;
    }
}

export default EnrollLawFirmBoardRequestDto