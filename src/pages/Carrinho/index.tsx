import React, { useCallback, useEffect, useState } from 'react'
import { Menu } from '../../components/Menu'
import { FaTrash } from 'react-icons/fa'
import { Button, TBTr, THTh, THtr, Table, Td, TextButton } from './styles'

interface interfProdutos {
	id_categoria: number
	total: number

	id: string
	imagemg: string
	imagemp: string
	nome: string
	promo: string
	promoNumber: string
	quantidade: string
	valor: string
}

export const Carrinho = () => {

	const [dataCarrinho, setDataCarrinho] = useState<Array<interfProdutos>>([])
	const [valorTotal, setValorTotal] = useState<number>(0)

	const atualizaValorTotal = useCallback(
		(carrinho: Array<interfProdutos>) => {
			let total = 0

			carrinho.forEach((produto) => {
				total = produto.total + total
			})
			setValorTotal(total)

		}, [])
	// function atualizaValorTotal(
	//     carrinho: Array<interfProdutos>
	// ) {
	//     let total = 0


	//     carrinho.forEach((produto) => {
	//         total = produto.total + total
	//     })
	//     setValorTotal(total)

	//     console.log(valorTotal)

	// }

	useEffect(() => {
		let lsCarrinho = localStorage.getItem(
			'@shoowpy:carrinho'
		)
		let carrinho: any = null

		if (typeof lsCarrinho === 'string') {
			carrinho = JSON.parse(lsCarrinho)
		}

		if (carrinho) {
			setDataCarrinho(carrinho)
			atualizaValorTotal(carrinho)
		}

	}, [])

	function removerProdutoCarrinho(id: string) {
		let carrinho = dataCarrinho.filter((produto) => (
			produto.id !== id
		))

		localStorage.setItem(
			'@shoowpy:carrinho',
			JSON.stringify(carrinho)
		)

		setDataCarrinho(carrinho)
		atualizaValorTotal(carrinho)
	}
	const limparCarrinho = () => {
		localStorage.removeItem(
			'@shoowpy:carrinho'
		)
		setDataCarrinho([])
	}

	return (
		<>
			<Menu />
			<div
				style={{
					paddingLeft: '6%',
					paddingRight: '6%',
					marginTop: 20,
					marginBottom: 40
				}}
			>
				<h2>Carrinho de compras</h2>

				<Table>
					<thead>
						<THtr>
							<THTh
								style={{
									minWidth: 300
								}}
							>Nome do Produto</THTh>
							<THTh>Quantidade</THTh>
							<THTh>Vlr Unit.</THTh>
							<THTh>Vlr Total.</THTh>
							<THTh>Ações</THTh>
						</THtr>
					</thead>
					<tbody>

						{
							dataCarrinho.map((produto) => {
								return (
									<TBTr key={produto.id}>
										<Td width={300}>{produto.nome}</Td>
										<Td>{produto.quantidade}</Td>
										<Td>{produto.promo}</Td>
										<Td>{produto.total}</Td>
										<Td>
											<Button
												type='button'
												onClick={() => {
													removerProdutoCarrinho(produto.id)
												}}
											>
												<TextButton>
													<FaTrash />
												</TextButton>
											</Button>
										</Td>
									</TBTr>
								)
							})
						}

					</tbody>
					<tfoot>
						<TBTr>
							<Td width={300}>Valor Total</Td>
							<Td></Td>
							<Td></Td>
							<Td>{valorTotal}</Td>
							<Td></Td>
						</TBTr>
					</tfoot>
				</Table>

				{
					dataCarrinho.length > 0 &&
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
						<Button
							type='button'
							onClick={limparCarrinho}
						>
							<TextButton>Limpar carrinho</TextButton>
						</Button>
						<Button
							type='button'
							bgColor='green'
						>
							<TextButton>Finalizar pedido</TextButton>
						</Button>
					</div>
				}
			</div>
		</>
	)
}
