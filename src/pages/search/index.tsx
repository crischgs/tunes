import { useState } from 'react';
import { AlbumType } from '../../types';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../../components/Loading';
import Albums from '../../components/Albums';
import './search.css';

export default function Search() {
  const [artist, setArtist] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchMessage, setSearchMessage] = useState('');
  const [search, setSearch] = useState<AlbumType[]>([]);

  function hdlChange(e: React.ChangeEvent<HTMLInputElement>) {
    setArtist(e.target.value);
  }

  async function hdlSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const result = await searchAlbumsAPI(artist);
    if (result) {
      setSearchMessage(`showing albums of ${artist}`);
      setSearch(result);
    }
    setArtist('');
    setLoading(false);
    return result;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      <section>
        <form onSubmit={ hdlSubmit } className="searchForm">
          <input
            type="text"
            value={ artist }
            onChange={ hdlChange }
            placeholder="search for an artist or band"
            data-testid="search-artist-input"
          />
          <button
            disabled={ artist.length < 2 }
            data-testid="search-artist-button"
          >
            search
          </button>
        </form>
      </section>
      <section className="search">
        {search.length === 0
          ? (
            <p>no album was found</p>
          )
          : (
            <div>
              { searchMessage }
              <div className="searchCards">
                {search.map((album) => (
                  <Albums
                    key={ album.collectionId }
                    artistId={ album.artistId }
                    artistName={ album.artistName }
                    collectionId={ album.collectionId }
                    collectionName={ album.collectionName }
                    collectionPrice={ album.collectionPrice }
                    artworkUrl100={ album.artworkUrl100 }
                    releaseDate={ album.releaseDate }
                    trackCount={ album.trackCount }
                  />
                ))}
              </div>
            </div>
          )}
      </section>
    </main>
  );
}
