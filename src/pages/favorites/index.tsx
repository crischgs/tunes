import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';
import MusicCard from '../../components/MusicCard';
import Loading from '../../components/Loading';

export default function Favorites() {
  const [favoriteTracks, setFavoriteTracks] = useState<SongType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFavorites = async () => {
      const favorites = await getFavoriteSongs();
      setFavoriteTracks(favorites);
      setLoading(false);
    };
    getFavorites();
  }, []);

  if (loading) { return <Loading />; }

  return (
    <main>
      {favoriteTracks.map((track) => (
        <MusicCard
          track={ track }
          likedTracks={ favoriteTracks }
          key={ track.trackId }
          setLikedSongs={ setFavoriteTracks }
        />
      ))}
    </main>
  );
}
