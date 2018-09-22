import req from '@/utils/request'

export type TypeCode={
    id:Number,
    code_id:Number,
    lable?:String;
    user_id:Number,
    user_phone?:String,
    count?:Number,
    code:String,
    year:Number,
    month:Number,
    date_expired:String,
    date_add:Number,
    expired_time:String,
    create_time:String,
    authors:Array<{id:Number,name:String}>
}

// 获取邀请码列表
export function getCodes(params={}){
    return req.post(process.env.API_URL+"/api/admin/author/code",params)
}

// 获取邀请码详情
export function getCode(code_id:Number){
    return req.post(process.env.API_URL+"/api/admin/author/code/detail",{code_id})
}

// 添加新邀请码
export function addCode(code:TypeCode,count:Number){
    var params=Object.assign(code,{count})
    return req.post(process.env.API_URL+"/api/admin/author/code/add",params)
}

// 删除邀请码
export function delCode(code_id:Number){
    return req.post(process.env.API_URL+"/api/admin/author/code/del",{code_id})
}
// 修改
export function editCode(code:TypeCode){
    let params={code_id:code.id,expired_date:code.date_expired,authors:code.authors}
    return req.post(process.env.API_URL+"/api/admin/author/code/edit",params)
}

// 分配邀请码给用户
export function assginUser(uid:Number,code_id:Number){
    return req.post(process.env.API_URL+"/api/admin/author/code/assign",{uid,code_id})  
}

// 批量修改
export function multiEdit(params){
    return req.post(process.env.API_URL+"/api/admin/author/code/multiedit",params)
}

// 批量添加
export function multiAdd(params){
    return req.post(process.env.API_URL+"/api/admin/author/code/multiadd",params)
}

export function multiDel(codes){
    return req.post(process.env.API_URL+"/api/admin/author/code/multidel",{codes})    
}

export function changeExpired(code_id:Number,expired_date){
    return req.post(process.env.API_URL+"/api/admin/author/code/changeexipred",{code_id,expired_date})    
}

export function unassign(uid:Number,code_id:Number){
    return req.post(process.env.API_URL+"/api/admin/author/code/unassign",{uid,code_id})     
}


