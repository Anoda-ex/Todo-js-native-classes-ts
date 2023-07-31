import { TodoItemCompleted, TodoItemPlan, TodoItemProcess } from "classes/TodoItem";

export enum TodoTypes{
    PLAN = "План",
    COMPLETED = "Виконано",
    PROCESS = "В процесі"
}
export interface TodoItemData{
    id:string,
    title:string,
    type:TodoTypes,
    processDate?: Date
    completedDate?: Date
}
export type TodoItemType = TodoItemProcess | TodoItemCompleted | TodoItemPlan

declare global  {
    interface ProxyConstructor {
        new <TSource extends object, TTarget extends object>(target: TSource, handler: ProxyHandler<TSource>): TTarget;
    }
}