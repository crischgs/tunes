import { Link } from 'react-router-dom';
import { AlbumType } from '../types';

export default function Albums(props: AlbumType) {
  const { artworkUrl100, collectionName, artistName, collectionId } = props;
  return (
    <div className="albumCard">
      <img src={ artworkUrl100 } alt="Album Cover" />
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <p>{collectionName}</p>
      </Link>
      <p>{artistName}</p>
    </div>
  );
}
