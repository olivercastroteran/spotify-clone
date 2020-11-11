import { useState } from 'react';
import './Playlists.scss';
import PlaylistItem from './Playlist/Playlist';

const playlistsData = [
  {
    id: 'abc123',
    title: 'Nostalgia',
    songs: ['Bienvenido', 'El dorado', 'En marcha estoy', 'No me preocupo'],
  },
  {
    id: 'def132',
    title: 'Old Days',
    songs: ['Bienvenido', 'El dorado', 'En marcha estoy'],
  },
  {
    id: 'ghi123',
    title: 'Classic Music',
    songs: ['Bienvenido', 'El dorado', 'En marcha estoy', 'No me preocupo'],
  },
  {
    id: 'jkl123',
    title: 'Tragos',
    songs: ['Bienvenido', 'El dorado', 'No me preocupo'],
  },
  {
    id: 'mno123',
    title: 'Death Metal',
    songs: [
      'Bienvenido',
      'El dorado',
      'En marcha estoy',
      'No me preocupo',
      'Ramstein',
    ],
  },
];

const Playlists = () => {
  const [playlists] = useState(playlistsData);

  return (
    <div className="playlists">
      <div className="playlists__container">
        {playlists.map((playlist) => {
          return <PlaylistItem key={playlist.id} {...playlist} />;
        })}
      </div>
    </div>
  );
};

export default Playlists;
