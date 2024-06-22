import get from '../../get'
import post from '../../post'
import HeaderUtils from "@/http/headerUtils";
import EndPoint from '@/http/endpoint'
import ParamsUtils from "@/http/ParamsUtils";

export default  {
    sendMessage: (data) => { // 메세지 전송
        return post(EndPoint.SEND_MESSAGE, data, HeaderUtils.AUTH_HEADER())
    },
    replyMessage: (data) => { // 메세지 수신
        return post(EndPoint.REPLY_MESSAGE, data, HeaderUtils.AUTH_HEADER())
    },
    deleteSendMessage: (data) => { // 발신 메세지 삭제
        return post(EndPoint.DELETE_SEND_MESSAGE(data.id), ParamsUtils.EMPTY, HeaderUtils.AUTH_HEADER())
    },
    deleteReceiveMessage: (data) => { // 수신 메세지 삭제
        return post(EndPoint.DELETE_RECEIVE_MESSAGE(data.id), ParamsUtils.EMPTY, HeaderUtils.AUTH_HEADER())
    },
    findReceiveListMessage: (params) => { // 수신 메세지 리스트 조회
        return get(EndPoint.FIND_RECEIVE_LIST_MESSAGE, params, HeaderUtils.AUTH_HEADER())
    },
    findSendListMessage: (params ) => { // 발신 메세지 리스트 조회
        return get(EndPoint.FIND_SEND_LIST_MESSAGE, params, HeaderUtils.AUTH_HEADER())
    },
    findReceiveMessage: (data) => { // 수신 메세지 상세 조회
        return post(EndPoint.FIND_RECEIVE_MESSAGE(data.id), ParamsUtils.EMPTY, HeaderUtils.AUTH_HEADER())
    },
    findSendMessage: (data) => { // 발신 메세지 상세 조회
        return post(EndPoint.FIND_SEND_MESSAGE(data.id), ParamsUtils.EMPTY, HeaderUtils.AUTH_HEADER())
    }
}
