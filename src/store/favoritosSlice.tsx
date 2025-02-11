import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../App'

interface FavoritosState {
  itens: Produto[]
}

const initialState: FavoritosState = {
  itens: []
}
const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    adicionarFavorito: (state, action: PayloadAction<Produto>) => {
      const produtoExiste = state.itens.some((p) => p.id === action.payload.id)
      if (!produtoExiste) {
        state.itens.push(action.payload)
      }
    },
    removerFavorito: (state, action: PayloadAction<number>) => {
      state.itens = state.itens.filter((p) => p.id !== action.payload)
    }
  }
})

export const { adicionarFavorito, removerFavorito } = favoritosSlice.actions
export default favoritosSlice.reducer
