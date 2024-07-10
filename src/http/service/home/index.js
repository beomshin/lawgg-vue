import get from '../../get'
import HeaderUtils from "@/http/headerUtils";
import EndPoint from '@/http/endpoint'
import ParamsUtils from "@/http/ParamsUtils";

export default  {
    main: function () {
        return get(EndPoint.MAIN, ParamsUtils.EMPTY, HeaderUtils.NORMAL);
    }
}
