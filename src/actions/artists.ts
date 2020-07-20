import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { API_KEY, BASE_URL } from '../apis/last-fm';

export interface Artist {
  name: string;
  mbid: string;
  bio: { summary: string };
  topalbums: { album: Album[] };
}

export interface ArtistDetailsSearchResults {
  artist: {
    name: string;
    mbid: string;
    bio: { summary: string };
    topalbums: { album: Album[] };
  };
}

export interface ArtistSearchResults {
  results: {
    artistmatches: {
      artist: Artist[];
    };
  };
}

export interface ArtistAlbums {
  topalbums: {
    album: Album[];
  };
}

export interface Album {
  name: string;
  image: any[];
}

export interface SelectArtistAction {
  type: ActionTypes.selectArtist;
  payload: Artist;
}

export interface FetchSelectedArtistAction {
  type: ActionTypes.fetchSelectedArtist;
  payload: Artist;
}

export interface FetchSelectedArtistAlbumsAction {
  type: ActionTypes.fetchSelectedArtistAlbums;
  payload: ArtistAlbums;
}

export const fetchSelectedArtist = (name: string) => {
  return async (dispatch: Dispatch) => {
    const url = `${BASE_URL}?method=artist.getinfo&artist=${name}&api_key=${API_KEY}&format=json`;
    const response = await axios.get<ArtistDetailsSearchResults>(url);

    dispatch<FetchSelectedArtistAction>({
      type: ActionTypes.fetchSelectedArtist,
      payload: response.data.artist,
    });
  };
};

export const fetchSelectedArtistAlbums = (name: string) => {
  return async (dispatch: Dispatch) => {
    const url = `${BASE_URL}?method=artist.gettopalbums&artist=${name}&api_key=${API_KEY}&format=json`;
    const response = await axios.get<ArtistAlbums>(url);

    dispatch<FetchSelectedArtistAlbumsAction>({
      type: ActionTypes.fetchSelectedArtistAlbums,
      payload: response.data,
    });
  };
};
