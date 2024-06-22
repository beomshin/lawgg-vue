import get from '../../get'
import HeaderUtils from "@/http/headerUtils";
import EndPoint from '@/http/endpoint'
import ParamsUtils from "@/http/ParamsUtils";
import post from "@/http/post";

export default  {
    authReissue: () => {
        return get(EndPoint.AUTH_REISSUE, ParamsUtils.EMPTY, HeaderUtils.NORMAL)
    },
    authCertifications: (data) => {
        return post(EndPoint.AUTH_CERTIFICATIONS, data, HeaderUtils.AUTH_HEADER())
    },
    publicAuthCertifications: (data) => {
        return post(EndPoint.PUBLIC_AUTH_CERTIFICATIONS, data, HeaderUtils.NORMAL)
    }
}
