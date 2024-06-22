import HeaderUtils from "@/http/headerUtils";
import EndPoint from '@/http/endpoint'
import post from "@/http/post";

export default  {
    fileUpload: (data) => {
        return post(EndPoint.FILE_UPLOAD, data, HeaderUtils.MULTIPART_HEADER)
    }
}
