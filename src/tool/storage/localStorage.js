//设置localStorage
export function set(name, val) {
        localStorage.setItem(name, JSON.stringify(val))
}
//获取localStorage
export function get(name){
        return JSON.parse(localStorage.getItem(name))
}
//追加localStorage
export function add(name, addVal) {
        let oldVal = Storage.get(name)
        let newVal = oldVal.concat(addVal)
        Storage.set(name, newVal)
}
export default {
        set,get,add
}
