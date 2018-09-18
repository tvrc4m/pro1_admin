import req from '@/utils/request'

// 获取邀请码列表
export function getCodes(params={}){
    return req.post(process.env.API_URL+"/api/admin/author/code",params)
}

// 获取邀请码详情
export function getCode(code_id:Number){
    return req.post(process.env.API_URL+"/api/admin/author/code/detail",{code_id})
}

// 添加新邀请码
export function addCode(params={}){
    return req.post(process.env.API_URL+"/api/admin/author/code/add",params)
}

// 编辑邀请码信息
export function editCode(params={}){
    return req.post(process.env.API_URL+"/api/admin/author/code/edit",params)
}

// 删除邀请码
export function delCode(code_id:Number){

    return req.post(process.env.API_URL+"/api/admin/author/code/del",{code_id})
}