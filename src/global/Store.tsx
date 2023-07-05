import { configureStore } from '@reduxjs/toolkit';
import TreeReducer from './TreeReducer';

export default configureStore({
    reducer: {
        treeObect: TreeReducer,
    },
});