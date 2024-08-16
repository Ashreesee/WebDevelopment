// src/components/mediaPlayer/MediaPlayer.js
import React from 'react';
import { useParams } from 'react-router-dom';

const MediaPlayer = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Media Player</h1>
      <p>Playing media with ID: {id}</p>
      {/* Add media player logic here */}
    </div>
  );
};

export default MediaPlayer;
