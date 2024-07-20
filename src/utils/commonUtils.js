import cookies from "vue-cookies";
import cookieCont from "@/constants/cookieCont";
import store from "@/store";
import commonHelper from "@/store/modules/common/helper";
import service from "@/http/service";
import userHelper from "@/store/modules/user/helper";

export default {
    globalCheckResultCode: (resultCode) => {
        if (!resultCode) {
            alert('일시적인 문제가 발생했습니다.')
            return false
        }

        if (resultCode == '00000') return true

        if (resultCode == '17003' || resultCode == '17002') {
            alert('아이디 또는 비밀번호가 틀립니다.')
            return false
        }
        else if (resultCode == '10001') {
            alert('이미 존재하는 아이디 입니다.')
            return false
        }
        else if (resultCode == '10002') {
            alert('이메일 인증에 실패했습니다.')
            return false
        }
        else if (resultCode == "10027") {
            alert('삭제된 게시판 입니다.')
            return false
        }
        else if (resultCode == "10010") {
            alert('정지된 게시판 입니다.')
            return false
        }
        else if (resultCode == '10051') {
            alert('삭제된 트라이얼 입니다.')
            return false
        }
        else if (resultCode == "10052") {
            alert('정지된 게시판 입니다.')
            return false
        }
        else if (resultCode == '10016') { // 포지션
            alert('이미 게시판을 추천했습니다.')
            return false
        }
        else if (resultCode == '10049') { // 트라이얼
            alert('이미 게시판을 추천했습니다.')
            return false
        }
        else if (resultCode == '10017') {
            alert('이미 게시판을 신고했습니다.')
            return false;
        }
        else if (resultCode == '10015') {
            alert('게시판 신고에 실패했습니다.')
            return false;
        }
        else if (resultCode == '10004') {
            alert('계정 조회에 실패했습니다.')
            return false;
        }
        else if (resultCode == '10007') {
            alert('비밀번호가 일치하지 않습니다.')
            return false;
        }
        else if (resultCode == '10040') {
            alert('게시판이 존재하지 않습니다.')
            return false
        }
        else if (resultCode == '10006') {
            alert('기존에 비밀번호와 동일합니다.')
            return false
        }
        else if (resultCode == '10055') {
            alert('닉네임이 중복됩니다.')
            return false
        }
        else if (resultCode == '17000') {
            alert('문제가 발생했습니다.')
            return false
        } else if (resultCode == '2006') {
            alert('정지된 계정입니다.')
            return false
        } else if (resultCode == '2007') {
            alert('삭제된 계정입니다.')
            return false
        } else {
            alert('문제가 발생했습니다. 잠시후 다시 시도해주세요.')
            return false
        }
    },
    successLogin(accessToken) {
        cookies.set(cookieCont.AUTH_COOKIE_NAME, accessToken, '1h')
        store.commit(`${commonHelper.name}/successLogin`)
        service.findInfoUser(accessToken).then(res => {
            if (this.globalCheckResultCode(res.data.resultCode)) {
                store.commit(`${userHelper.name}/setUserInfo`, res.data.user)
            }
        })
    },
    formatDate(dateStr) {
        const date = new Date(dateStr);
        const today = new Date();
        if (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
        ) {
            // If the date is today, format as "hh:mm:ss"
            return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(
                -2
            )}:${('0' + date.getSeconds()).slice(-2)}`;
        } else {
            // Otherwise, format as "yyyy-mm-dd"
            return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${(
                '0' + date.getDate()
            ).slice(-2)}`;
        }
    },
    isWithinOneHour(dateString) {
        // 입력받은 날짜와 시간 문자열을 Date 객체로 변환합니다.
        const date = new Date(dateString);
        // 현재 날짜와 시간을 구합니다.
        const now = new Date();
        // 입력받은 날짜와 현재 날짜의 차이를 밀리초 단위로 계산합니다.
        const diff = now.getTime() - date.getTime();
        // 차이가 1시간 이내인지 확인합니다.
        return diff >= 0 && diff <= 60 * 60 * 1000;
    },
    getExt(fileName) {
        const arr = ['gif', 'jpg', 'png', 'bmp', 'jpeg', 'webp', 'tiff', 'svg', 'ico'];
        const ext =  fileName.split('.').pop().toLowerCase();
        if(!arr.includes(ext)) {
            alert(ext + '파일은 업로드 하실 수 없습니다.');
            return null
        }
        return ext
    },
    getExtVideo(fileName) {
        const arr = ['mp4', 'avi', 'mov', 'wmv', 'mpg', 'mkv', 'webm', 'flv', 'mpeg', 'mpg'];
        const ext =  fileName.split('.').pop().toLowerCase();
        if(!arr.includes(ext)) {
            alert(ext + '파일은 업로드 하실 수 없습니다.');
            return null
        }
        return ext
    },
    getExtReplay(fileName) {
        const arr = ['rofl'];
        const ext =  fileName.split('.').pop().toLowerCase();
        if(!arr.includes(ext)) {
            alert(ext + '파일은 업로드 하실 수 없습니다.');
            return null
        }
        return ext
    },
    isWithTime(dateString, time) {
        // 입력받은 날짜와 시간 문자열을 Date 객체로 변환합니다.
        const date = new Date(dateString);
        // 현재 날짜와 시간을 구합니다.
        const now = new Date();
        // 입력받은 날짜와 현재 날짜의 차이를 밀리초 단위로 계산합니다.
        const diff = now.getTime() - date.getTime();
        // 차이가 1시간 이내인지 확인합니다.
        return diff >= 0 && diff <= time;
    },
    isAbove19(dateOfBirth) {
        // 오늘 날짜 생성
        const today = new Date();

        // yyyyMMdd 형식의 문자열을 Date 객체로 변환
        const year = parseInt(dateOfBirth.substr(0, 4), 10);
        const month = parseInt(dateOfBirth.substr(4, 2), 10) - 1; // 월은 0부터 시작하므로 1을 빼줍니다.
        const day = parseInt(dateOfBirth.substr(6, 2), 10);
        const birthDate = new Date(year, month, day);

        // 나이 계산
        let age = today.getFullYear() - birthDate.getFullYear();

        // 생일이 아직 오지 않았으면 한 살을 빼줍니다.
        if (
            today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        // 나이가 19세 이상인지 확인
        return age >= 19;
    }
}
