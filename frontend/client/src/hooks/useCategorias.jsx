import { useQuery } from "@tanstack/react-query";
import { getCategorias } from "../services/CategoriasService";

// Hook reutilizable para toda la app
export const useCategorias = () => {
    return useQuery({
        queryKey: ["categorias"],       // cache único
        queryFn: getCategorias,         // tu fetch
        staleTime: 1000 * 60 * 10,      // 10 min sin refetch
        cacheTime: 1000 * 60 * 30,      // 30 min en memoria
        refetchOnWindowFocus: false,    // evita refetch al cambiar de pestaña (opcional)
    });
};