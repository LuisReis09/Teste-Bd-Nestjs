import React from 'react';
import { useEffect, useState } from 'react';

import styles from '../../styles/criar.module.css';

interface CriarProps {
    db_option: string;
}

const Criar: React.FC<CriarProps> = ({ db_option }) => {
    const [colunas, setColunas] = useState<string[] | null>(null);
    
        async function fetchColunas() {
            const response = await fetch(`http://localhost:4000/${db_option}/colunas`);
            const data = await response.json();
            console.log(data);
            setColunas(data);
        }
    
        useEffect(() => {
            fetchColunas();
        }, [db_option]);

    return (
        <div className={styles.container_criar}>
            <h2>Criar {db_option}</h2>

            <div className={styles.campos_para_criar}>
            {
                colunas?.map((coluna: string, index: number) => {
                    if (coluna === 'id') {
                        return null;
                    }

                    return (
                        <div key={index} className={styles.campo_criar}>
                            <label >Informe {coluna}:</label>
                            <input type="text" />
                        </div>
                    )
                })
            }
            </div>

            <button className={styles.criar_button}>Criar</button>
        </div>
    )
}

export default Criar;