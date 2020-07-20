import { Artist, Action, ActionTypes } from '../actions';

export const selectArtistReducer = (
  state: Artist | any = null, // TODO - Fix typing **any**
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.fetchSelectedArtist:
      return { ...state, ...action.payload };
    case ActionTypes.fetchSelectedArtistAlbums:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
