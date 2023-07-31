import { uidGenerator } from "helpers/uidGenerator";
import { TodoTypes } from "types";

class TodoItem {
    id:string;
    title: string;
    type: TodoTypes;
    changeData(title:string, type:TodoTypes){
        this.title = title;
        this.type =type;
    }
    constructor(id:string, title:string, type:TodoTypes){
        this.id=id;
        this.title=title;
        this.type=type
    }
}
export class TodoItemPlan extends TodoItem {

    constructor(id:string, title:string, type:TodoTypes.PLAN){
        super(id, title, type);
    }
}
export class TodoItemCompleted extends TodoItem {
    completedDate:Date;

    constructor(id:string, title:string, type:TodoTypes.COMPLETED, completedDate:Date){
        super(id, title, type);
        this.completedDate = completedDate;
    }
}
export class TodoItemProcess extends TodoItem {
    processDate:Date;

    constructor(id:string, title:string, type:TodoTypes.PROCESS, processDate:Date){
        super(id, title, type);
        this.processDate = processDate;
    }
}

export function init(){
    let a = new TodoItem(uidGenerator.generateUID(), 'new task', TodoTypes.COMPLETED);
    let b = new TodoItemPlan(uidGenerator.generateUID(), 'new task', TodoTypes.PLAN);
    console.log(a,b);

}
