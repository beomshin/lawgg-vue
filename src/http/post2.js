import axios from "../plugins/axios2"

export default (url, data, headers) => {
    return axios({
        method: 'post'
        , headers: headers
        , url: url
        , data: data
    })
        .then(res => {
            return res;
        })
}
