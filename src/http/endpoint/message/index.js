
const END_POINT = {
    SEND_MESSAGE: '/api/send/message', // 메세지 전송
    REPLY_MESSAGE: '/api/reply/message', // 메세지 수신
    DELETE_SEND_MESSAGE: (id) => { return `/api/delete/send/message/${id}` }, // 발신 메세지 삭제
    DELETE_RECEIVE_MESSAGE: (id) => { return `/api/delete/receive/message/${id}` }, // 수신 메세지 삭제
    FIND_RECEIVE_LIST_MESSAGE: '/api/find/receive/list/message', // 수신 메세지 리스트 조회
    FIND_SEND_LIST_MESSAGE: '/api/find/send/list/message', // 발신 메세지 리스트 조회
    FIND_RECEIVE_MESSAGE: (id) => {  return `/api/find/receive/message/${id}` }, // 수신 메세지 상세 조회
    FIND_SEND_MESSAGE: (id ) => { return `/api/find/send/message/${id}` }, // 발신 메세지 상세 조회
}

export default END_POINT
