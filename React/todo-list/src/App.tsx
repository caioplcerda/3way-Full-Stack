import { useState } from "react";
import { Area, Container, Header } from "./App.styles";
import { AddArea } from "./components/AddArea";
import { ListItem } from "./components/ListItem";
import ItemService from "./services/item.service";
import { Item } from "./types/item.types";

function App() {
  let listDB: Item[] = [];

  const [list, setList] = useState<Item[]>(listDB);

  const handleAddTask = (taskName: string) => {
    const newItem = {
      id: list.length + 1,
      name: taskName,
      done: false,
    };
    // Clonar o array list Item
    let newList = [...list];
    newList.push(newItem);
    // Atualiza a lista
    setList(newList);

    // Enviar item para o banco de dados
    createItem(newItem);
  };

  const handleTaskChange = (id: number, done: boolean) => {
    let newList = [...list];
    for (let i in newList) {
      if (newList[i].id === id) {
        newList[i].done = done;
        updateItem(newList[i], id);
      }
    }
    setList(newList);
  };

  const handleTaskDelete = (id: number) => {
    deleteItem(id);
    readItens()
  };

  const readItens = () => {
    ItemService.getAll()
      .then((response: any) => {
        setList(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const createItem = (item: Item) => {
    console.log("item", item);
    ItemService.create(item)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const updateItem = (item: Item, id: any) => {
    ItemService.update(item, id)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteItem = (id: any) => {
    ItemService.delete(id)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <Area>
        <Header>Lista de Tarefas</Header>

        <AddArea onEnter={handleAddTask} />

        <input
          type="button"
          onClick={readItens}
          value=" Carregar Lista de Tarefas"
        />

        {list.map((item, index) => (
          <ListItem key={index} item={item} onChange={handleTaskChange} onDelete={handleTaskDelete} />
        ))}
      </Area>
    </Container>
  );
}

export default App;
