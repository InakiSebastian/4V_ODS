import { Module } from "../../../model/module";
import { Teacher } from "../../../model/teacher";

export interface IFourWinds {
    teachers: Teacher[];
    modules: Module[];
}