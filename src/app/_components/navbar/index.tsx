'use client';

import * as S from './styles';
import Link from 'next/link';
import { UserCircle } from 'lucide-react';

export default function NavBar() {
  return <S.Container>

    <div className="logo">logo</div>
    <ul>
      <li><Link href={"#"}>Biblioteca</Link></li>
      <li><Link href={"#"}>Documentação</Link></li>
      <li><Link href={"#"}>Chamandos</Link></li>
      <li><Link href={"#"}>Gerenciamnto</Link></li>
      <li className='profile'><Link href={"#"}><UserCircle size={25} /></Link></li>

    </ul>


  </S.Container>
}