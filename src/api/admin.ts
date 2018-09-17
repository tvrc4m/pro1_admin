import req from '@/utils/request'

export function login(nickname:String,password:String){
    return req.post(process.env.API_URL+"/api/admin/account/login",{
        nickname,password
    })
}