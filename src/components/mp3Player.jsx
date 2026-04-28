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

  const pauseTrack = () => {
    if (currTrack.current) {
      currTrack.current.pause();
      setIsPlaying(false);
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
    let newIndex = trackIndex < playlist.length - 1 ? trackIndex + 1 : 0;
    setTrackIndex(newIndex);
    loadTrack(newIndex);
    playTrack();
  };

  const prevTrack = () => {
    let newIndex = trackIndex > 0 ? trackIndex - 1 : playlist.length - 1;
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
    <div className="window" id="musicplayer">
      <div className="popup-header title-bar">
        <div className="title-bar-text">
          <img
            src="https://loveberry.nekoweb.org/assets/musicplayer/player-icon.png"
            alt=""
            height="14px"
            width="14px"
          />{" "}
          CD Player
        </div>
        <div className="title-bar-controls">
          <button className="window-button minimize" aria-label="Minimize" />
          <button className="window-button maximize" aria-label="Maximize" />
          <button className="window-button close" aria-label="Close" />
        </div>
      </div>
      <div className="window-body">
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
                <button
                  className="window-button prev-track"
                  onClick={prevTrack}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-skip-back-icon lucide-skip-back"
                  >
                    <path d="M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z" />
                    <path d="M3 20V4" />
                  </svg>
                </button>

                <button
                  className="window-button playpause-track"
                  onClick={playPause}
                >
                  {isPlaying ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-pause-icon"
                    >
                      <rect x="14" y="3" width="5" height="18" rx="1" />
                      <rect x="5" y="3" width="5" height="18" rx="1" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-play-icon"
                    >
                      <path
                        d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003
    3.458l-12 7A2 2 0 0 1 5 19z"
                      />
                    </svg>
                  )}
                </button>

                <button
                  className="window-button next-track"
                  onClick={nextTrack}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-skip-forward-icon lucide-skip-forward"
                  >
                    <path d="M21 4v16" />
                    <path d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <audio id="music" src="" ref={currTrack}></audio>
    </div>
  );
};
