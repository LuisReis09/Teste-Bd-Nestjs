import React from 'react';
import { useEffect, useState } from 'react';

import styles from '../../styles/listar.module.css';

interface ListarProps {
    db_option: string;
}

const Listar: React.FC<ListarProps> = ({ db_option }) => {
    const [colunas, setColunas] = useState<string[] | null>(null);
    const [dados, setDados] = useState<any>(null);

    async function fetchColunas() {
            const response = await fetch(`http://localhost:4000/${db_option}/colunas`);
            const data = await response.json();
            console.log(data);
            setColunas(data);
        }

    async function fetchDados() {
            const response = await fetch(`http://localhost:4000/${db_option}/listar`);
            const data = await response.json();
            setDados(data);
        }
    
        useEffect(() => {
            fetchColunas();
            fetchDados();
        }, [db_option]);

    return (
        <div className={styles.container_listar}>
            <h2>Listar {db_option}</h2>

            <table>
                <thead>
                    <tr>
                        {
                            colunas &&
                            colunas.map((coluna: string, index: number) => {
                                return (
                                    <th key={index}>
                                        {coluna}
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        dados &&
                        dados.map((linha: any, index: number) => {
                            return (
                                <tr key={index}>
                                    {
                                        colunas?.map((coluna: string, index: number) => {
                                            return (
                                                <td key={index}>
                                                    {linha[coluna]}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Listar;