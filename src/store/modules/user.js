import {getToken} from "../../utils/auth";
const user = {
    state:{
        userInfo:JSON.parse(getToken('userInfo')) || null
    },
    mutations:{
        SAVE_USER_INFO(state,data){
            state.userInfo = data
        }
    },
    actions:{
        SAVE_USER_INFO({commit},data){
            commit('SAVE_USER_INFO',data)
        }
    }
}

export default user