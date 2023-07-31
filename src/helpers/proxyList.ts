import { TodoItemType } from "types";
import { createElementFromText } from "./createElementFromText";

function saveToStorage<T>(id:string, data:T) {
    window.localStorage.setItem(`save-id-${id}`, JSON.stringify(data))
}

export function getProxyList<T extends TodoItemType>(todoListDom:HTMLElement, getElementTemplate:(item:T)=>string ):T[] {
    return new Proxy<T[]>([], {
        get:(target, prop, val) => {
            saveToStorage(todoListDom.id, target)
            if (prop === 'splice') {
                console.log("SPLICE", val);
                const origMethod = target[prop];
                return function (...args:[number, number]) {
                    console.log('splicedElement', args);
                    let splicedElement:HTMLElement = document.querySelector(`[data-id="${val[args[0]].id}"]`)
                    if(splicedElement){
                        splicedElement.remove()
                    }
                    origMethod.apply(target, args);
                    saveToStorage(todoListDom.id, target)
                }
            }
            return Reflect.get(target, prop, val);
        },
        set:(target, prop:string|symbol, val:T, receiver):boolean => {
            saveToStorage(todoListDom.id, target)
            if(!Number.isNaN(Number(prop))){
                target[Number(prop)] = val;
                let newTemplate = getElementTemplate(val);
                let findedHtmlElement:HTMLElement = document.querySelector(`[data-id="${val.id}"]`)
                if(findedHtmlElement){
                    findedHtmlElement.replaceWith(createElementFromText(newTemplate))
                }else{
                    todoListDom.insertAdjacentHTML("beforeend", newTemplate)
                }
                saveToStorage(todoListDom.id, target)
                return true
            }else{
                return true
            }
        }
    })
}