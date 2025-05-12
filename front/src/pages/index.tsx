import styles from '../styles/index.module.css';
import { useState } from 'react';

import Atualizar from './components/Atualizar';
import Criar from './components/Criar';
import Deletar from './components/Deletar';
import Listar from './components/Listar';

export default function Home() {
  const [db_option, setDbOption] = useState('clientes');
  const [db_action, setDbAction] = useState('criar');

  return (
    <div className={styles.container} >
      <header>
        Manipulador de Banco de Dados Simples
      </header>

      <div className={styles.options_box}>
          <select onChange={(e) => setDbOption(e.target.value)}>
            <option value="clientes">Clientes</option>
            <option value="produtos">Produtos</option>
            <option value="pedidos">Pedidos</option>
          </select>
        
          <select onChange={(e) => setDbAction(e.target.value)}>
            <option value="criar">Criar</option>
            <option value="listar">Listar</option>
            <option value="atualizar">Atualizar</option>
            <option value="deletar">Deletar</option>
          </select>

      </div>

      <>
        {db_action === 'criar'     && <Criar db_option={db_option} />}
        {db_action === 'listar'    && <Listar db_option={db_option} />}
        {db_action === 'atualizar' && <Atualizar db_option={db_option} />}
        {db_action === 'deletar'   && <Deletar db_option={db_option} />}
      </>
    </div>
  );
}
