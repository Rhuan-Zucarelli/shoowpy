import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import { Home } from './pages/Home'
import { Produto } from './pages/Produto'
import { Carrinho } from './pages/Carrinho'
import { FilterType, ListagemProduto } from './pages/ListagemProduto'

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={<Home />}
                />
                <Route
                    path='/produto/:id'
                    element={<Produto />}
                />
                <Route
                    path='/carrinho'
                    element={<Carrinho />}
                />
                 <Route
                    path='/telefonia'
                    element={<ListagemProduto type={FilterType.TELEFONIA} />}
                />
                <Route
                    path='/eletrodomestico'
                    element={<ListagemProduto type={FilterType.ELETRODOMESTICO} />}
                />
            </Routes>
        </BrowserRouter>
    )
}
