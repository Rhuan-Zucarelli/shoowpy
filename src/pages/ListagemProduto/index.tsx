import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card } from '../../components/Card'
import { Menu } from '../../components/Menu'
import { Type } from 'typescript'

interface interfData {
    "id": string,
    "id_categoria": number,
    "nome": string,
    "valor": string,
    "promo": string,
    "promoNumber": string,
    "imagemg": string,
    "imagemp": string
}

export enum FilterType {
    TELEFONIA = 1,
    ELETRODOMESTICO = 2
}

export const ListagemProduto = (props:{type:FilterType}) => {

    const [dataProduto, setProduto] = useState<Array<interfData>>([]);

    useEffect(() => {
        axios.get('http://localhost:3001/produtos')
            .then((response) => {
                const Filterpage = response.data.filter((prod:any)=> prod.id_categoria === props.type)
                setProduto(Filterpage)
            })
            .catch((erro) => {
                console.log(erro)
            })
    }, [props, dataProduto])

    return (
        <>
            <Menu />
            <div
                style={{
                    paddingLeft: '6%',
                    paddingRight: '6%'
                }}
            >
                <h2>Produtos em destaque</h2>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}
                >
                    {
                        dataProduto.map((produto) =>  (
                            <Card
                                id={produto.id}
                                nome={produto.nome}
                                valor={produto.valor}
                                promo={produto.promo}
                                imagem={produto.imagemp}
                            />
                        ))
                    }

                </div>

            </div>
        </>
    )
}
