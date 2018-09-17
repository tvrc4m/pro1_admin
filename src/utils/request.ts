
import axios, { AxiosResponse } from 'axios'
import qs from 'qs'
import {Message,MessageBox} from 'element-ui'
import router from '@/router/index'

const service = axios.create({
    baseURL: process.env.BASE_URL,
    // withCredentials: true
})

service.interceptors.request.use(request=>{
    request.data.token=localStorage.getItem("token")
    request.data=qs.stringify(request.data)
    return request
},error=>{
    Promise.reject(error)
})

service.interceptors.response.use(
    (response) => {
        console.log(response)
        if(response.status==200){
            if(response.data['err_no']!=0){
                if(response.data['err_no']==1001){
                    router.push("/user/login")
                }else if(response.data['err_no']==1002){
                    this.confirm("登录已失效,需要重新登录","登录提示",{
                    }).then(()=>{
                        router.push("/user/login")
                    })          
                }else{
                    this.$message({
                        message:response.data['err_msg'],
                        type:"error"
                    })
                }
            }else{
                return response.data
            }
        }else{
            this.$message({
                message:"请求异常",
                type:"error"
            })
        }
    },
    (error: any) => {
        console.log('fetch',error.config.url,error.config.params,'error. error:',error)
        return Promise.reject(error)
    }
)

export default service

