import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AlbumType, SongType } from '../../types';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import getMusics from '../../services/musicsAPI';
import Loading from '../../components/Loading';
import MusicCard from '../../components/MusicCard';
import './album.css';

export default function Album() {
  const { id } = useParams();
  const [load, setLoad] = useState(false);
  const [collection, setCollection] = useState<AlbumType>();
  const [tracks, setTracks] = useState<SongType[]>([]);
  const [likedTracks, setLikedTracks] = useState<SongType[]>([]);

  useEffect(() => {
    async function fetchMusics() {
      const musics = await getMusics(String(id));
      const [collections, ...songs] = musics;
      setCollection(collections);
      setTracks(songs);
      setLoad(false);
    }
    fetchMusics();

    async function fetchLikedTracks() {
      const pullLikedSongs = await getFavoriteSongs();
      setLikedTracks(pullLikedSongs);
    }
    fetchLikedTracks();
  }, [id]);

  if (load) {
    return <Loading />;
  }

  return (
    <main>
      <div className="cover">
        <img
          src={ collection?.artworkUrl100 }
          alt={ collection?.collectionName }
        />
        <div>
          <h1 data-testid="album-name">
            {collection?.collectionName}
          </h1>
          <h2 data-testid="artist-name">
            {collection?.artistName}
          </h2>
        </div>
      </div>
      <div className="tracks">
        {tracks.map((music) => (
          <MusicCard
            key={ music.trackId }
            track={ music }
            likedTracks={ likedTracks }
          />
        ))}
      </div>
    </main>
  );
}
