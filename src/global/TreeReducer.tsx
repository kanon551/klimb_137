import { createSlice } from '@reduxjs/toolkit';
import { GotDataObject } from '../components/ImageMasonry';

const initialTree: GotDataObject[] = [];

const TreeSlice = createSlice({
  name: "Tree Object",
  initialState: initialTree,
  reducers: {
    addTree: (state, action) => {
        const { characters, favorite, charactername, id } = action.payload;
        const existingObject = state.find((obj) => obj.id === id);
            if(existingObject === undefined){
                state.push({
                    characters: action.payload.characters,
                    favorite: action.payload.favorite,
                    charactername: action.payload.charactername,
                    id: action.payload.id,
                  });
            }
            else if(existingObject){
                existingObject.characters = characters;
                existingObject.favorite = favorite;
                existingObject.charactername = charactername;
            }
      },
  },
});

export const { addTree } = TreeSlice.actions;
export default TreeSlice.reducer;