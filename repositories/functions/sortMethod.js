export function sortMethod(sort) {
    const sortOptions = {
        precio_asc: { precio: 1 },
        precio_desc: { precio: -1 }
    }
    return sortOptions[sort] ||  { fechaCreacion: 1 }
}