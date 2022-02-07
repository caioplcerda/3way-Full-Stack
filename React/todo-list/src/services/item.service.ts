import http from "../http-commons";
import { Item } from "../types/item.types";

class ItemDataService {
    getAll() {
        return http.get<Item[]>("/itens");
    }

    getById(id: any){
        return http.get<Item>(`/itens/${id}`)
    }

    create(data: Item) {
        return http.post<Item>("/itens", data);
    }

    update(data: Item, id: any){
        return http.put<any>(`/itens/${id}`, data);
    }

    delete(id: any){
        return http.delete<Item>(`/itens/${id}`)
    }

}

export default new ItemDataService();