export function setToken(key,value){
    return sessionStorage.setItem(key,value)
}

export function getToken(key){
    return sessionStorage.getItem(key)
}

export function removeToken (key) {
    if(key){
        return sessionStorage.removeItem(key)
    }else{
        return sessionStorage.clear()
    }
}