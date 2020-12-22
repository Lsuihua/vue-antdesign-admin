// 用户
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random

// 登录
export function login(data) {
    return new Promise((resolve,reject) =>{
        // 验证登录数据  返回结果
        if(data.username === 'admin' && data.password == '123456'){
            resolve({
                code :1,
                message:'登录成功',
                token:Random.word(26)
            })
        }else{
            reject({
                code:0,
                message:'用户名或密码错误'
            })
        }
    })
}

// 登出
export function logOut(){
    return new Promise((resolve,reject) =>{
        resolve({
            code :1,
            message:'已退出'
        })
    })
}

// 用户列表
export function getUserList(data){
    // mock用户列表 头像，姓名，电话，性别，注册时间，类型
    // 类型 0 | 1 | 2  游客 | 管理员 | 会员
    let userList = [],total = 100,page = data.page|| 1,pageSize = data.pageSize|| 20,
        pageData = {
            total,
            more:total - pageSize * page,
            page,
            pageSize
        };
     for (let i = 0; i < pageSize; i++) {
        let obj = {
            id:i,
            avater:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            role:'0',
            gender:Math.random()>0.5? 1:0,
            name: Random.cname(),
            mobile: Random.string('number',13), // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
            time: Random.date() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
        }
        userList.push(obj)
    }
    return new Promise((resolve,reject) => {
        resolve({
                "code": 1,
                "message": "获取成功",
                "data": userList,
                "page":pageData
            })
    })
}




