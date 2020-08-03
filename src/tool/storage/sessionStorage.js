export function set(name, val) {
        sessionStorage.setItem(name, JSON.stringify(val))
}
//设置sessionStorage
export function get(name){
        let value=sessionStorage.getItem(name);
        return JSON.parse(value)
}
//设置sessionStorage
export function add(name, addVal) {
        let oldVal = Storage.get(name)
        let newVal = oldVal.concat(addVal)
        Storage.set(name, newVal)
}
export default {
        set,get,add
}
