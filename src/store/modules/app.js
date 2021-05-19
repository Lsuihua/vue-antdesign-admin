import {getToken} from "../../utils/auth";
const app = {
    state:{
        collapsed:false,
        currentMenu:JSON.parse(getToken('currentMenu')) || 0,
        menu:JSON.parse(getToken('menu')) || [],
        menuSelect:[],
        defaultMenuKey:JSON.parse(getToken('menuDfKey')) || [],
        openKey:JSON.parse(getToken('openKeys')) || [],
        breadcrumb:JSON.parse(getToken('breadCrumb')) || [],
        token:''
    },
    mutations:{
        SAVE_TOKEN(state,token){
            state.token = token
        },
        CHANGE_COLLAPSED(state,collapsed){
            state.collapsed = collapsed
        },
        CHANGE_CURRENT_MENU(state,current){
            state.currentMenu = current;
            for(let i=0;i<state.menu.length;i++){
                if(i == state.currentMenu){
                    return state.menuSelect = state.menu[i].children
                }
            }
        },
        SAVE_MENU(state,menu){
            state.menu = menu
        },
        SAVE_MENU_SELECT(state,menuSelect){
            state.menuSelect = menuSelect
        },
        SAVE_BREAD_CRUMB(state,arr){
            state.breadcrumb = arr;
        },
        SAVE_MENU_KEY(state,key){
            state.defaultMenuKey = key;
        },
        SAVE_OPEN_KEY(state,key){
            state.openKey = key;
        }
    },
    actions:{
        CHANGE_COLLAPSED({commit},state){
            commit('CHANGE_COLLAPSED',state);
        },
        CHANGE_CURRENT_MENU({commit},state){
            commit('CHANGE_CURRENT_MENU',state)
        },
        SAVE_MENU({commit},state){
            commit('SAVE_MENU',state)
        },
        SAVE_MENU_SELECT({commit},state){
            commit('SAVE_MENU_SELECT',state)
        },
        SAVE_BREAD_CRUMB({commit},state){
            commit('SAVE_BREAD_CRUMB',state)
        },
        SAVE_MENU_KEY({commit},state){
            commit('SAVE_MENU_KEY',state)
        },
        SAVE_OPEN_KEY({commit},state){
            commit('SAVE_OPEN_KEY',state)
        },
        SAVE_TOKEN({commit},state){
            commit('SAVE_TOKEN',state)
        }
    }
}
export default app




