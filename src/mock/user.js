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
    return {
        url: '/logOut',
        type: 'post',
        data: {
        "code": 1,
        "msg": "退出成功"
        }
    }
}

// 用户列表
export function getUserList(){
    // mock用户列表 头像，姓名，电话，性别，注册时间，类型
    // 类型 0 | 1 | 2  游客 | 管理员 | 会员
    let userList = [],
        pageData = {};
     for (let i = 0; i < 20; i++) {
        let newNewsObject = {
            avater:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            type:'0',
            ussername: Random.ctitle(), // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
            mobile: Random.cparagraph(), // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
            createdTime: Random.date() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
        }
        newsList.push(newNewsObject)
    }
    return {
        url: '/login',
        type: 'post',
        data: {
            "code": 1,
            "msg": "获取成功",
            "data": userList,
            pageData
        }
    }
}

const createUser = function (req){
    
}




