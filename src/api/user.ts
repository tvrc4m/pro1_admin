import req from '@/utils/request'

// 获取用户列表
export function getUsers(params={}){
    return req.post(process.env.API_URL+"/api/admin/user",params)
}

// 获取用户详情
export function getUser(uid:Number){
    return req.post(process.env.API_URL+"/api/admin/user/index/detail",{uid})
}

// 添加新用户
export function addUser(params={}){
    return req.post(process.env.API_URL+"/api/admin/user/index/add",params)
}

// 编辑用户信息
export function editUser(params={}){
    return req.post(process.env.API_URL+"/api/admin/user/index/edit",params)
}

// 删除用户
export function delUser(uid:Number){

    return req.post(process.env.API_URL+"/api/admin/user/index/del",{uid})
}