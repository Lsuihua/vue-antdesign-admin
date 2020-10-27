// user api
import https from '@/utils/request'

function getUserList(data){
    return https({
        method: 'post',
        url:'/users-list',
        data
    })
}