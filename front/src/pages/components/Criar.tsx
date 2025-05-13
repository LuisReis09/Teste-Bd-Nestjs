import React from 'react';
import { useEffect, useState } from 'react';

import styles from '../../styles/criar.module.css';

interface CriarProps {
    db_option: string;
}

const Criar: React.FC<CriarProps> = ({ db_option }) => {
    const [colunas, setColunas] = useState<string[] | null>(null);
    const [valores, setValores] = useState<{ [key: string]: string }>({});
    
        async function fetchColunas() {
            const response = await fetch(`http://localhost:4000/${db_option}/colunas`);
            const data = await response.json();
            console.log(data);
            setColunas(data);
        }
    
        useEffect(() => {
            setValores({});
            fetchColunas();
        }, [db_option]);

    const handleChange = (coluna: string, value: string) => {
        setValores((prev) => ({
            ...prev,
            [coluna]: value
        }));
    }

    async function Criar(){
        if (db_option == "pedidos"){
            const response = await fetch(`http://localhost:4000/${db_option}/verificar/${valores.clienteId}/${valores.produtoId}`);
            const data = await response.json();
            if(data.verificado == false){
                alert("Cliente ou produto não existe");
                return;
            }
            valores['valor_total'] = String(data.preco * Number(valores.quantidade));
        }


        const response = await fetch(`http://localhost:4000/${db_option}/criar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(valores),
        });

        const result = await response.json();
        console.log('Criado:', result);
    }

    return (
        <div className={styles.container_criar}>
            <h2>Criar {db_option}</h2>

            <div className={styles.campos_para_criar}>
            {
                colunas?.map((coluna: string, index: number) => {
                    if (coluna === 'id' || coluna === "valor_total") {
                        return null;
                    }

                    valores[coluna];

                    return (
                        <div key={index} className={styles.campo_criar}>
                            <label >Informe {coluna}:</label>
                            <input type="text" onChange={(e) => {handleChange(coluna, e.target.value)}}/>
                        </div>
                    )
                })
            }
            </div>

            <button className={styles.criar_button} onClick={Criar}>Criar</button>
        </div>
    )
}

export default Criar;