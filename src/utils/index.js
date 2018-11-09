import axios from "axios"

export const getImgTypeFromUrl = url => {
    return url.match(/\.(jpeg|jpg|gif|png)$/)[0]
}

export const axiosProxy = (data) => axios({ method: "POST", url: 'https://py.yuyuko.me/axios', data });
