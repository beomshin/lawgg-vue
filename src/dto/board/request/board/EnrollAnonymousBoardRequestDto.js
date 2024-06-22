class EnrollAnonymousBoardRequestDto {
    id // 익명 아이디
    password // 익명 패스워드
    title // 제목
    content // 내용
    lineType // 라인 타입
    files // 파일

    constructor(
        id,
        password,
        title,
        content,
        lineType,
        files
    ){
        this.id = id;
        this.password = password;
        this.title = title;
        this.content = content;
        this.lineType = lineType;
        this.files = files;
    }

}

export default EnrollAnonymousBoardRequestDto