import React from 'react';

import styles from '../../styles/deletar.module.css';

interface DeletarProps {
    db_option: string;
}

const Deletar: React.FC<DeletarProps> = ({ db_option }) => {
    return (
        <div className={styles.container_deletar}>
            <h2>Deletar {db_option}</h2>

            <div>
                <label>Informe o ID:</label>
                <input type="text" />
            </div>

            <button>Deletar</button>
        </div>
    )
}

export default Deletar;