class UpdateAnonymousBoardRequestDto {
    id // 게시판 아이디
    password // 게시판 패스워드
    title // 제목
    content // 내용
    addFiles // 추가 파일

    constructor(
        id,
        password,
        title,
        content,
        addFiles
    ){
        this.id = id;
        this.password = password;
        this.title = title;
        this.content = content;
        this.addFiles = addFiles;
    }
}

export default UpdateAnonymousBoardRequestDto