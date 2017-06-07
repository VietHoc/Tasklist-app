export class Tasks {
    list_id: number;
    id: number;
    title: string;
    complete: boolean = false;

    constructor(values: Object ={}) {
        Object.assign(this, values);
    }
}