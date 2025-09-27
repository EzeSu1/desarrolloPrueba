import fs from "node:fs/promises";
import path from "node:path";
import NotificacionesMapper from "../mappers/notificacionesMapper.js";

export class Repository {
    constructor(filePath, mapper) {
        this.filePath = path.join("data", filePath);
        this.mapper = mapper; // función para mapear objetos JSON a instancias
    }

    getAll() {
        return fs.readFile(this.filePath)
            .then(data => {
                const dataObjects = JSON.parse(data);

                return this.mapper(dataObjects);

            });

    }

    findById(id) {
        return this.getAll()
            .then(objetos =>{
                return objetos.find(o => o.id === Number(id))
            })
    }

    save(objeto) {
        return this.getAll()
            .then(objetos=>{
                objeto.id = objetos.length === 0 ? 1 : objetos.length + 1;
                objetos.push(objeto)
                return fs.writeFile(
                    this.filePath,
                    JSON.stringify(objetos))
                    .then(()=>objeto)}
            );
    }



}
