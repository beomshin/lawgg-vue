import get from '../../get'
import HeaderUtils from "@/http/headerUtils";
import EndPoint from '@/http/endpoint'
import ParamsUtils from "@/http/ParamsUtils";

export default  {
    home: () => {
        return get(EndPoint.HOME, ParamsUtils.EMPTY, HeaderUtils.NORMAL)
    },
    hot: () => {
        return get(EndPoint.HOT, ParamsUtils.EMPTY, HeaderUtils.NORMAL)
    }
}
