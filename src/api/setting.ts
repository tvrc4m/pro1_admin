import req from '@/utils/request'


// 获取设置
export function getSetting(){
    return req.post(process.env.API_URL+"/api/admin/setting/index/get",{})
}

// 保存设置
export function saveSetting(settings){
    return req.post(process.env.API_URL+"/api/admin/setting/index/save",{settings})   
}