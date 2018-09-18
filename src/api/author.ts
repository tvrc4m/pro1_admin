import req from '@/utils/request'

// 获取用户列表
export function getAuthors(params={}){
    return req.post(process.env.API_URL+"/api/admin/author",params)
}


// 获取用户详情
export function getAuthor(author_id:Number){
    return req.post(process.env.API_URL+"/api/admin/author/index/detail",{author_id})
}

// 添加新用户
export function addAuthor(params={}){
    return req.post(process.env.API_URL+"/api/admin/author/index/add",params)
}

// 编辑用户信息
export function editAuthor(params={}){
    return req.post(process.env.API_URL+"/api/admin/author/index/edit",params)
}

// 删除用户
export function delAuthor(author_id:Number){

    return req.post(process.env.API_URL+"/api/admin/author/index/del",{author_id})
}