import { useEffect, useState } from 'react';
import { LikedTracks } from '../types';
import checkedHeart from '../images/checked_heart.png';
import emptyHeart from '../images/empty_heart.png';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

export default function MusicCard(
  { track, likedTracks, setLikedSongs = undefined }: LikedTracks,
) {
  const { trackId, previewUrl, trackName } = track;
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    function checkLiked() {
      const liked = likedTracks.some((likedTrack) => (
        likedTrack.trackId === trackId
      ));
      setFavorite(liked);
    }
    checkLiked();
  }, [likedTracks, trackId]);

  function hdlCheck() {
    setFavorite(!favorite);
    if (!favorite) {
      addSong(track);
    } else {
      removeSong(track);
    }
    setLikedSongs?.(likedTracks.filter((likedTrack) => (likedTrack.trackId !== trackId)));
  }

  return (
    <div className="track">
      {trackName}
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        your browser don`t support this element`
        {' '}
        <code>audio</code>
        .
      </audio>
      <label
        htmlFor={ String(trackId) }
        data-testid={ `checkbox-music-${trackId}` }
      >
        <input
          type="checkbox"
          id={ String(trackId) }
          checked={ favorite }
          onChange={ hdlCheck }
        />
        <img src={ favorite ? checkedHeart : emptyHeart } alt="favorite" />
      </label>
    </div>
  );
}
