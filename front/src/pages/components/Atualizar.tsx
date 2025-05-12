import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../../styles/atualizar.module.css';

interface AtualizarProps {
    db_option: string;
}

const Atualizar: React.FC<AtualizarProps> = ({ db_option }) => {
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
        <div className={styles.container_atualizar}>
            <h2>Atualizar {db_option}</h2>
            
            <div className={styles.campos_para_atualizar}>
            {
                colunas?.map((coluna: string, index: number) => {
                    return (
                        <div key={index} className={styles.campo_atualizar}>
                            <label >Informe {coluna}:</label>
                            <input type="text" />
                        </div>
                    )
                })
            }
            </div>

            <button className={styles.atualizar_button}>Atualizar</button>
        </div>
    )
}

export default Atualizar;