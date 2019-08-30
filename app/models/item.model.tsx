import { classToClass } from "class-transformer";

export class ItemModel {
  constructor(
    public id: number = 0,
    public title: string = "",
    public selected: boolean = false,
    public isCompleted: boolean = false
  ) { }
}
