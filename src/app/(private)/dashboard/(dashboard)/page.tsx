import Input from '@/app/_components/input';
import * as S from './styles';
import { LayoutDashboard } from 'lucide-react';

export default function () {

  return <S.Container>
    <h1> <LayoutDashboard size={30} /> GD HUB</h1>
    <div className="input">

      <Input label='' placeholder='Encontre o que esta buscando...' />
    </div>
  </S.Container>
}