import { classToClass } from "class-transformer";

export class MovieModel {
  constructor(
    public id: number = 0,
    public title: string = "",
    public overview: string = ""
  ) { }
}
