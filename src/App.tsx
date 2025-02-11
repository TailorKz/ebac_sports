import { useEffect, useState } from 'react'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from './store/store'
import { adicionarAoCarrinho } from './store/carrinhoSlice'
import { adicionarFavorito, removerFavorito } from './store/favoritosSlice'
import { GlobalStyle } from './styles'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const itensNoCarrinho = useSelector(
    (state: RootState) => state.carrinho.itens
  )
  const favoritos = useSelector((state: RootState) => state.favoritos.itens)
  const [produtos, setProdutos] = useState<Produto[]>([])

  useEffect(() => {
    fetch('https://fake-api-tau.vercel.app/api/ebac_sports')
      .then((res) => res.json())
      .then((res) => setProdutos(res))
  }, [])

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={itensNoCarrinho} />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          adicionarAoCarrinho={(produto: Produto) =>
            dispatch(adicionarAoCarrinho(produto))
          }
          favoritar={(produto: Produto) => {
            if (favoritos.some((f: Produto) => f.id === produto.id)) {
              dispatch(removerFavorito(produto.id))
            } else {
              dispatch(adicionarFavorito(produto))
            }
          }}
        />
      </div>
    </>
  )
}

export default App
