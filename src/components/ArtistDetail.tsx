import React from 'react';
import { Artist } from '../actions';
import './ArtistDetail.scss';

interface ArtistDetailProps {
  artist: Artist;
}

const ArtistDetail = ({ artist }: ArtistDetailProps): JSX.Element => {
  return (
    <div className="albums-container">
      {artist && artist.topalbums ? (
        <ul className="album-list">
          {artist.topalbums.album.map((album) =>
            album.image[2]['#text'] ? (
              <li key={album.name} className="album">
                <div>
                  <img
                    className="album-img"
                    src={album.image[2]['#text']}
                    alt="album"
                  ></img>
                  <div className="favorite-btn-container">
                    <div className="album-name">{album.name}</div>
                    <button
                      onClick={() =>
                        console.log('TODO - Add to Favorites List in Store!!')
                      }
                      className="favorite-btn"
                    ></button>
                  </div>
                </div>
              </li>
            ) : null
          )}
        </ul>
      ) : null}
    </div>
  );
};

export { ArtistDetail };
