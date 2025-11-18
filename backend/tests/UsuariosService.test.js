import { beforeEach, expect } from "@jest/globals"
import {Usuario} from "../models/entities/usuario"

describe("UsuariosService", ()=>{
    let mockRepo
    beforeEach(()=>{
        mockRepo ={
        save : jest.fn(),
        findById : jest.fn()

    }})
    
    test("Crear usuario",()=>{
        const nuevo_usuario={
            id: 1,
            nombre: "Juan Perez",
            email: "juan.perez@example.com",
            telefono: "1122334455",
            tipo: "VENDEDOR",
            fecha_alta: "2025-09-20T13:33:04.302Z"
        }
        
        mockRepo.save.mockResolvedValue(nuevo_usuario);
        return mockRepo.save(nuevo_usuario)
            .then(usuario=>{
                expect(mockRepo.save).toHaveBeenCalledWith(nuevo_usuario)
                expect(mockRepo.save).toHaveBeenCalledTimes(1)
                expect(usuario).toEqual(nuevo_usuario)
            })

    })
    test("Obtener un usuario por id", () => {
        const usuario = {
            id: 1,
            nombre: "Juan Perez",
            email: "juan.perez@example.com",
            telefono: "1122334455",
            tipo: "VENDEDOR",
            fecha_alta: "2025-09-20T13:33:04.302Z"
        }

        mockRepo.findById.mockResolvedValue(usuario);

        return mockRepo.findById(1)
            .then((usuario) => {
                expect(mockRepo.findById).toHaveBeenCalledWith(1);
                expect(mockRepo.findById).toHaveBeenCalledTimes(1)
                expect(usuario).toEqual(
                    {
                        id: 1,
                        nombre: "Juan Perez",
                        email: "juan.perez@example.com",
                        telefono: "1122334455",
                        tipo: "VENDEDOR",
                        fecha_alta: "2025-09-20T13:33:04.302Z"
                    }
            );
            });
    });

})