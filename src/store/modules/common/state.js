import cookies from "vue-cookies";
import cookieCont from "@/constants/cookieCont";

export default {
    isLogin: cookies.get(cookieCont.AUTH_COOKIE_NAME) ? true : false, // 로그인 상태 관리 vuex
};
