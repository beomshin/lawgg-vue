<template>
  <div ref="summernote" id="summernote"></div>
</template>

<script>

import commonUtils from "@/utils/commonUtils";
import commonCont from "@/constants/commonCont";
import service from "@/http/service";

export default {
  name: "Summernote",
  mounted() {
    if (this.$route.path == '/position/edit') {
      this.createNote()
    }
  },
  activated() {
    this.createNote()
  },
  deactivated() {
    window.$(this.$refs.summernote).summernote('reset');
  },
  destroyed() {
    window.$(this.$refs.summernote).summernote('reset');
  },
  methods: {
    handleFileChange(file) { // 파일 등록
      if (file.size > commonCont.FILE_MAX_SIZE) { // 사이즈 검사
        alert(`파일 크기가 3MB를 초과했습니다.`)
        return false;
      }

      const ext = commonUtils.getExt(file.name)
      if (!ext) {
        return false; // 확장자 검사
      }
      return true
    },
    f_SkipTags_html(input, allowed) {
      // 허용할 태그는 다음과 같이 소문자로 넘겨받습니다. (<a><b><c>)
      allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
      let tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
          commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
      return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
      });
    },
    createNote() {
      window.$('#summernote').summernote({
        height: 300,
        focus: false,                  // 에디터 로딩후 포커스를 맞출지 여부
        lang: "ko-KR",					// 한글 설정
        placeholder: '게시글 내용을 작성해주세요. (최대 1000자)',	//placeholder 설정
        callbacks: {
          onImageUpload: (files) => {
            if(files && files.length > 0) {
              for(let val of files) {
                if (!this.handleFileChange(val)) return;
              }
              service.fileUpload(files).then(res => {
                if (res.data.resultCode == '00000') {
                  this.$emit('uploadFile', res.data.files)
                  for(let val of res.data.files) window.$('#summernote').summernote("insertImage", val.path)
                } else {
                  alert('파일 업로드를 실패 하였습니다.')
                }
              })
              .catch(() => {
                alert('파일 업로드를 실패 하였습니다.')
              })
            }
          },
          onChange: (contents) => {
            let status = false;
            let textCnt = 0; //총 글자수
            let maxCnt = 1000; //최대 글자수
            let editorText = this.f_SkipTags_html(contents); //에디터에서 태그를 삭제하고 내용만 가져오기
            editorText = editorText.replace(/\s/gi,""); //줄바꿈 제거
            editorText = editorText.replace(/&nbsp;/gi, ""); //공백제거

            textCnt = editorText.length
            if(maxCnt > 0) {
              if(textCnt > maxCnt) {
                status = true;
              }
            }

            if(status) {
              window.$('#summernote').summernote("code", contents.substring(0, contents.length - 1))
            }
          }
        }
      })
      // window.$('.note-view').remove();
      // window.$('.note-fontname').remove();
      // window.$('.note-color').remove();
    }
  }
}
</script>

<style scoped>

</style>