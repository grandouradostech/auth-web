import Input from '@/app/_components/input';
import * as S from './styles';
import { LayoutDashboard } from 'lucide-react';
import { ColumnProps, DynamicTable } from '@/app/_components/table';
interface IRegisterTaskData {
  id: number;
  excluido_em: string;
  tarefa_id_original: number;
  placa: string;
  km_tarefa: string;
  tipo_combustivel_tarefa: string;
  usuario_criador_tarefa: string;
  excluido_por: string;
  motivo_exclusao: string;
}

const columns: ColumnProps<IRegisterTaskData>[] = [
  {
    header: 'APP',
    key: 'app',
    sortable: true,
  },
  {
    header: 'Ação',
    key: 'app',
    sortable: true,
  },
  {
    header: 'Usuário',
    key: 'app',
    sortable: true,
  },
  {
    header: 'Atualização',
    key: 'app',
    sortable: true,
  },
  {
    header: 'Motivo da Exclusão',
    key: 'motivo_exclusao',
    sortable: true,
    render: (val) => (
      <div style={{ maxWidth: '250px', fontSize: '13px', color: '#666', lineHeight: '1.4' }}>
        {val}
      </div>
    )
  },

];
export default function () {

  return <S.Container>
    <h1> <LayoutDashboard size={30} /> GD HUB</h1>
    <div className="input">

      <Input label='' placeholder='Encontre o que esta buscando...' />
    </div>

  </S.Container>
}