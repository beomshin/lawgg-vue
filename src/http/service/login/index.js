import post from '../../post'
import HeaderUtils from "@/http/headerUtils";
import EndPoint from '@/http/endpoint'

export default {
    normalLogin: (data) => {
        return post(EndPoint.NORMAL_LOGIN, data, HeaderUtils.NORMAL)
    },
    googleLogin: () => {
        window.location.href = `${EndPoint.GOOGLE_LOGIN}`
    },
    naverLogin: () => {
        window.location.href = `${EndPoint.NAVER_LOGIN}`
    },
    kakaoLogin: () => {
        window.location.href = `${EndPoint.KAKAO_LOGIN}`
    }
}
