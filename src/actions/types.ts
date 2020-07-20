import {
  SelectArtistAction,
  FetchSelectedArtistAction,
  FetchSelectedArtistAlbumsAction,
} from './artists';

export enum ActionTypes {
  selectArtist,
  fetchSelectedArtist,
  fetchSelectedArtistAlbums,
}

export type Action =
  | SelectArtistAction
  | FetchSelectedArtistAction
  | FetchSelectedArtistAlbumsAction;
