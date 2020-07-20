import React from 'react';
import { connect } from 'react-redux';
import { SearchBar } from './SearchBar';
import { Header } from './Header';
import { ArtistDetail } from './ArtistDetail';
import {
  Artist,
  fetchSelectedArtist,
  fetchSelectedArtistAlbums,
} from '../actions';
import { StoreState } from '../reducers';
import './App.scss';
import '../styles/main.scss';

interface AppProps {
  selectedArtist: Artist;
  fetchSelectedArtist: Function;
  fetchSelectedArtistAlbums: Function;
}

interface AppState {
  loading: boolean;
}

class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = { loading: false };
  }

  componentDidUpdate(prevProps: AppProps): void {
    if (!prevProps.selectedArtist && this.props.selectedArtist) {
      this.setState({ loading: false });
    }
  }

  onArtistSelect = (artist: Artist) => {
    this.props.fetchSelectedArtist(artist.name);
    this.props.fetchSelectedArtistAlbums(artist.name);
    this.setState({ loading: true });
  };

  render() {
    return (
      <div className="container">
        <Header />
        <main id="main" className="main">
          <SearchBar onArtistSelect={this.onArtistSelect} />
          {this.state.loading ? 'LOADING' : null}
          <ArtistDetail artist={this.props.selectedArtist} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({
  selectedArtist,
}: StoreState): { selectedArtist: Artist } => {
  return { selectedArtist };
};

export const App = connect(mapStateToProps, {
  fetchSelectedArtist,
  fetchSelectedArtistAlbums,
})(_App);
