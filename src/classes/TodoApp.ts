import { TodoItemData, TodoItemType, TodoTypes } from "types";
import { TodoItemCompleted, TodoItemPlan, TodoItemProcess } from "./TodoItem";
import { getProxyList } from "helpers/proxyList";
import { uidGenerator } from "helpers/uidGenerator";
import { formatDateTime } from "helpers/formatDataTime";


interface TodoAppElements{
    addTodoPopup:HTMLElement;
    openPopupButton:HTMLElement;
    addTodoButton:HTMLElement;
    closePopupButton:HTMLElement;             
    inputNameElement:HTMLInputElement;  
    inputTypeElement:HTMLSelectElement
}
export class TodoApp {
    items: TodoItemType[];
    todoAppElements:TodoAppElements
    constructor(elements:TodoAppElements){
        this.items = getProxyList<TodoItemType>(
            document.querySelector('.todo-list'), 
            (item:any)=>{
                let typeData=``;
                let selectClass = 'todo-item__type--plan'

                if(item.type===TodoTypes.COMPLETED){
                    typeData=`<div class="todo-item__type-data">
                        Finish on ${formatDateTime(item.completedDate)}
                    </div>`
                    selectClass="todo-item__type--completed"

                }
                if(item.type===TodoTypes.PROCESS){
                    typeData=`<div class="todo-item__type-data">
                        Starts on ${formatDateTime(item.processDate)}
                    </div>`
                    selectClass="todo-item__type--process"

                }
                
                let deleteButton =  `<button class="btn todo-item__delete" data-remove-id=${item.id}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px"><path d="M 20.5 4 A 1.50015 1.50015 0 0 0 19.066406 6 L 14.640625 6 C 12.803372 6 11.082924 6.9194511 10.064453 8.4492188 L 7.6972656 12 L 7.5 12 A 1.50015 1.50015 0 1 0 7.5 15 L 8.2636719 15 A 1.50015 1.50015 0 0 0 8.6523438 15.007812 L 11.125 38.085938 C 11.423352 40.868277 13.795836 43 16.59375 43 L 31.404297 43 C 34.202211 43 36.574695 40.868277 36.873047 38.085938 L 39.347656 15.007812 A 1.50015 1.50015 0 0 0 39.728516 15 L 40.5 15 A 1.50015 1.50015 0 1 0 40.5 12 L 40.302734 12 L 37.935547 8.4492188 C 36.916254 6.9202798 35.196001 6 33.359375 6 L 28.933594 6 A 1.50015 1.50015 0 0 0 27.5 4 L 20.5 4 z M 14.640625 9 L 33.359375 9 C 34.196749 9 34.974746 9.4162203 35.439453 10.113281 L 36.697266 12 L 11.302734 12 L 12.560547 10.113281 A 1.50015 1.50015 0 0 0 12.5625 10.111328 C 13.025982 9.4151428 13.801878 9 14.640625 9 z M 11.669922 15 L 36.330078 15 L 33.890625 37.765625 C 33.752977 39.049286 32.694383 40 31.404297 40 L 16.59375 40 C 15.303664 40 14.247023 39.049286 14.109375 37.765625 L 11.669922 15 z"/></svg>
                </button>`
                
                let options = ``;
                Object.values(TodoTypes).forEach(item1=>{
                    options=options+`<option ${item1===item.type?"selected":""} value="${item1}">${item1}</option>`
                });
                
             

                return ` <div class="todo-item" data-id="${item.id}">
                    <div class="todo-item__name">${item.title}</div>
                    <div class="todo-item__footer">
                        <div class="todo-item__type-wrapper">
                            <select class="todo-item__type ${selectClass}"  data-select-id=${item.id}>
                                ${options}
                            </select>
                        </div>
                       ${typeData}
                    </div>
                    ${deleteButton}
                </div>`
            }
        );
        this.todoAppElements = elements;
        this.closePopupListener = this.closePopupListener.bind(this);
        this.overlayPopupListener = this.overlayPopupListener.bind(this);
        this.generateNewTodoItem = this.generateNewTodoItem.bind(this);
        this.openPopupListener = this.openPopupListener.bind(this);
        this.addTodoListener = this.addTodoListener.bind(this);
        this.removeListener = this.removeListener.bind(this);
        this.addItem = this.addItem.bind(this);
        this.inputListener = this.inputListener.bind(this);
        this.changeListener = this.changeListener.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.initSelect();
        this.initListeners();
        this.initGetData();
    }

    generateNewTodoItem({id, title, type, completedDate, processDate}:TodoItemData): TodoItemType {
        let newTodoItem: null | TodoItemType = null;
        if(type === TodoTypes.COMPLETED){
            newTodoItem = new TodoItemCompleted(id, title, type, completedDate || new Date());
        }else if(type === TodoTypes.PROCESS){
            newTodoItem = new TodoItemProcess(id,  title, type, processDate || new Date());
        }else if(type===TodoTypes.PLAN){
            newTodoItem = new TodoItemPlan(id, title, type,)
        }
        return newTodoItem
    }

    addItem({id, title, type, completedDate, processDate}:TodoItemData):void{
        let newTodoItem = this.generateNewTodoItem({id, title, type, completedDate, processDate})
        if(newTodoItem){
            this.items.push(newTodoItem);
        }
    }

    removeItem(id:string){
        let findIndex: number = this.items.findIndex((item:TodoItemType)=>item.id===id);
        if(findIndex>-1){
            this.items.splice(findIndex, 1);
        }
    }

    changeItem(id:string, {title, type}:TodoItemData){
        let findIndex: number = this.items.findIndex((item:TodoItemType)=>item.id===id);
        if(findIndex>-1){
            let newTodoItem = this.generateNewTodoItem({id, title, type});
            this.items[findIndex] = newTodoItem; 
        }
    }

    initListeners(){    

        this.todoAppElements.openPopupButton.addEventListener('click', this.openPopupListener);
        this.todoAppElements.closePopupButton.addEventListener('click', this.closePopupListener);
        this.todoAppElements.addTodoPopup.addEventListener('click', this.overlayPopupListener);
        this.todoAppElements.inputNameElement.addEventListener('input', this.inputListener)
        this.todoAppElements.addTodoButton.addEventListener('click', this.addTodoListener)
        document.addEventListener('click', this.removeListener);
        document.addEventListener('click', this.changeListener);
        this.inputListener()
    }

    initSelect(){
        let select = document.querySelector('.add-form__input select')
        Object.values(TodoTypes).forEach((item, index)=>{
            let newOption = document.createElement('option')
            if(index===0){
                newOption.selected = true;
            }
            newOption.value = item;
            newOption.innerText=item;
            select.append(newOption)
        })
    }

    openPopupListener(){
        this.inputListener();
        this.todoAppElements.addTodoPopup.classList.add('active');
    }

    closePopupListener(){
        this.todoAppElements.addTodoPopup.classList.remove('active');
        this.todoAppElements.inputNameElement.value = "";
    }

    removeListener(event:any){
        let closestElement = event.target.closest(".todo-item__delete");
        if(closestElement){
            this.removeItem(closestElement.getAttribute('data-remove-id'));
        }
    }

    inputListener(){
        if(this.todoAppElements.inputNameElement.value.length === 0){
            this.todoAppElements.addTodoButton.classList.add("disabled");
        }else{
            this.todoAppElements.addTodoButton.classList.remove("disabled");
        }
    }

    addTodoListener(){
        this.addItem({
            id: uidGenerator.generateUID(), 
            title: this.todoAppElements.inputNameElement.value,
            type: this.todoAppElements.inputTypeElement.value as TodoTypes
        });
        this.closePopupListener();
    }

    changeListener(event:any){
        let closestElement = event.target.closest(".todo-item__type");
        if(closestElement){
            let newType = closestElement.value;
            let id = closestElement.getAttribute('data-select-id');
            let currentElement = this.items.find(item=>item.id===id)
            if(currentElement.type!==newType){
                this.changeItem(
                    id,
                    {
                        id:id,
                        title:currentElement.title,
                        type:closestElement.value
                    }
                )
            }
        }
    }

    overlayPopupListener(event:any){
        if(event.target.id === this.todoAppElements.addTodoPopup.id){
            this.closePopupListener();
        }
    }
    initGetData(){
        let data = window.localStorage.getItem(`save-id-todo-list`)
        if(data){
            // try {
                let parsedData:TodoItemData[] = JSON.parse(data)
                parsedData.forEach(item=>{
                    this.addItem({...item, completedDate: item.completedDate && new Date(item.completedDate), processDate: item.processDate && new Date(item.processDate)})
                })
            // } catch (error) {
                
            // }
        }
    }
  
}

