import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../apis/last-fm';
import { Artist, ArtistSearchResults } from '../actions';
import './SearchBar.scss';

interface SearchBarProps {
  onArtistSelect: Function;
}

const SearchBar = ({ onArtistSelect }: SearchBarProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<Artist[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const search = async () => {
      const url = `${BASE_URL}?method=artist.search&artist=${term}&limit=10&api_key=${API_KEY}&format=json`;
      const response = await axios.get<ArtistSearchResults>(url);

      setResults(response.data.results.artistmatches.artist);
    };

    if (term && !results.length) {
      search();
    } else {
      const timeoutId = setTimeout(() => {
        if (term) {
          search();
        }
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [term]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onBodyClick = (event: any) => {
      const node = ref.current;
      if (node && node.contains(event.target)) {
        return;
      }
      setShowDropdown(false);
    };

    document.body.addEventListener('click', onBodyClick);

    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    setShowDropdown(true);
  };

  const onSelect = (artist: Artist) => {
    onArtistSelect(artist);
    setTerm(artist.name);
    setShowDropdown(false);
  };

  const renderedResults = results.map((result, index) => {
    return (
      <li
        className="result-item"
        key={result.name}
        onClick={() => onSelect(result)}
      >
        {result.name}
      </li>
    );
  });

  return (
    <div
      ref={ref}
      className={`search-container ${showDropdown ? 'results-border' : ''}`}
    >
      <div>
        <label className="sr-only">Music Search</label>
        <input
          className={`search-input ${showDropdown ? 'no-border' : ''}`}
          value={term}
          placeholder="Music Search"
          onChange={(e) => onSearch(e)}
        ></input>
        <button onClick={() => setTerm('')} className="close-btn"></button>
        {showDropdown ? <hr /> : null}
      </div>
      {showDropdown ? (
        <ul className="results-list">{renderedResults}</ul>
      ) : null}
    </div>
  );
};

export { SearchBar };
