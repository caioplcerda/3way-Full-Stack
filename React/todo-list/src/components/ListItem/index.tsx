
import { Item } from '../../types/item.types';
import { Container } from './styles';

// Forma de passar valor de um componente para outro
type Props = {
  item: Item; 
  onChange:(id: number, done: boolean) => void;
  onDelete:(id: number) => void;
};

export const ListItem = ({ item, onChange, onDelete }: Props) => {

  return (
    <Container done={item.done}>
      <button type='button' onClick={(e) => onDelete(item.id)}>X</button>
      <input type="checkbox" checked={item.done} onChange={(e) => onChange(item.id, e.target.checked)} />
      <label> {item.name}</label>
    </Container>
  );
};
