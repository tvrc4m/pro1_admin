import req from '@/utils/request'

export type TypeContent={
    id:Number,
    author_id:Number,
    type:Number,
    password:String,
    url:String,
    date_add:Number,
    create_time:String
}

// 获取内容列表
export function getContents(params={}){
    return req.post(process.env.API_URL+"/api/admin/content/index",params)
}

// 获取内容详情
export function getContent(content_id:Number){
    return req.post(process.env.API_URL+"/api/admin/content/index/detail",{content_id})
}

// 添加新内容
export function addContent(params={}){
    return req.post(process.env.API_URL+"/api/admin/content/index/add",params)
}

// 删除内容
export function delContent(content_id:Number){
    return req.post(process.env.API_URL+"/api/admin/content/index/del",{content_id})
}
// 修改
export function editContent(content:TypeContent){
    // let params={content_id:code.id,expired_date:code.date_expired,contents:code.contents}
    // return req.post(process.env.API_URL+"/api/admin/content/index/edit",params)
}
