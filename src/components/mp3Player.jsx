import { useEffect, useRef, useState } from "react";
import "./mp3Player.css";

// Playlist
const playlist = [
  {
    name: "One Shot One Kill",
    artist: "The Cat's Whiskers",
    path: "https://files.catbox.moe/fegzmf.mp3",
  },
  {
    name: "Shooting Arrows",
    artist: "The Cat's Whiskers",
    path: "https://files.catbox.moe/zj81lr.mp3",
  },
  {
    name: "4 REAL",
    artist: "The Cat's Whiskers",
    path: "https://files.catbox.moe/fxd8fo.mp3",
  },
  {
    name: "My Sweetest Love",
    artist: "The Cat's Whiskers ft. Kazuma Mitchell",
    path: "https://files.catbox.moe/qe4he5.mp3",
  },
  {
    name: "Mercy On Me",
    artist: "The Cat's Whiskers",
    path: "https://files.catbox.moe/w7nnf9.mp3",
  },
];

export const Mp3Player = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [seekValue, setSeekValue] = useState(0);

  const currTrack = useRef(null);
  const updateTimer = useRef(null);

  const resetValues = () => {
    setCurrentTime("0:00");
    setDuration("0:00");
    setSeekValue(0);
  };

  const seekUpdate = () => {
    if (!currTrack.current) return;

    let seekPosition = 0;
    if (!isNaN(currTrack.current.duration)) {
      seekPosition =
        currTrack.current.currentTime * (100 / currTrack.current.duration);
      setSeekValue(seekPosition);

      let currentMinutes = Math.floor(currTrack.current.currentTime / 60);
      let currentSeconds = Math.floor(
        currTrack.current.currentTime - currentMinutes * 60,
      );
      let durationMinutes = Math.floor(currTrack.current.duration / 60);
      let durationSeconds = Math.floor(
        currTrack.current.duration - durationMinutes * 60,
      );

      if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
      if (durationSeconds < 10) durationSeconds = "0" + durationSeconds;

      setCurrentTime(currentMinutes + ":" + currentSeconds);
      setDuration(durationMinutes + ":" + durationSeconds);
    }
  };

  const loadTrack = (trackIdx) => {
    if (updateTimer.current) clearInterval(updateTimer.current);
    resetValues();

    if (currTrack.current) {
      currTrack.current.src = playlist[trackIdx].path;
      currTrack.current.load();
    }

    updateTimer.current = setInterval(seekUpdate, 1000);
  };

  const playTrack = () => {
    if (currTrack.current) {
      currTrack.current.play();
      setIsPlaying(true);
    }
  };

  const playPause = () => {
     if (currTrack.current && currTrack.current.paused) {
      currTrack.current.play();
      setIsPlaying(true);
    } else if (currTrack.current) {
      currTrack.current.pause();
      setIsPlaying(false);
    }
  };

  const nextTrack = () => {
    const newIndex = trackIndex < playlist.length - 1 ? trackIndex + 1 : 0;
    setTrackIndex(newIndex);
    loadTrack(newIndex);
    playTrack();
  };

  const prevTrack = () => {
    const newIndex = trackIndex > 0 ? trackIndex - 1 : playlist.length - 1;
    setTrackIndex(newIndex);
    loadTrack(newIndex);
    playTrack();
  };

  const seekTo = (e) => {
    const seekValue = e.target.value;
    if (currTrack.current) {
      const seekto = currTrack.current.duration * (seekValue / 100);
      currTrack.current.currentTime = seekto;
    }
    setSeekValue(seekValue);
  };

  const handleTrackChange = (e) => {
    const newIndex = parseInt(e.target.value);
    setTrackIndex(newIndex);
    loadTrack(newIndex);
    playTrack();
  };

  useEffect(() => {
    loadTrack(trackIndex);
  }, []);

  return (
    <div className="player-flex">
      <div className="player-icon-holder">
        <div className="player-icon"></div>
      </div>
      <div className="player-main">
        <select
          className="track-select"
          onChange={handleTrackChange}
          value={trackIndex}
        >
          {playlist.map((track, index) => (
            <option key={index} value={index}>
              {track.name} — {track.artist}
            </option>
          ))}
        </select>
        <div className="controls">
          <div className="seeking">
            <div className="current-time">{currentTime}</div>
            <input
              type="range"
              min="1"
              max="100"
              value={seekValue}
              className="seek_slider"
              onChange={seekTo}
            />
            <div className="total-duration">{duration}</div>
          </div>

          <div className="player-buttons">
            <button className="window-button prev-track" onClick={prevTrack}>
              ⏮
            </button>
            <button
              className="window-button playpause-track"
              onClick={playPause}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button className="window-button next-track" onClick={nextTrack}>
              ⏭
            </button>
          </div>
        </div>
      </div>
      <audio id="music" ref={currTrack}></audio>
    </div>
  );
};
