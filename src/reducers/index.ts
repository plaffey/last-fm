import { combineReducers } from 'redux';
import { selectArtistReducer } from './artists';
import { Artist } from '../actions';

export interface StoreState {
  selectedArtist: Artist;
}

export const reducers = combineReducers<StoreState>({
  selectedArtist: selectArtistReducer,
});
