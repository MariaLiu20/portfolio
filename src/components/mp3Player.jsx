import { useEffect, useRef, useState } from "react";
import "./mp3Player.css";

const playlist = [
  {
    name: "Everywhere",
    artist: "Michelle Branch",
    path: "https://file.garden/afEyyUDycVrE3Bea/Michelle%20Branch%20-%20Everywhere.mp3",
  },
  {
    name: "Snow (Hey Oh)",
    artist: "Red Hot Chili Peppers",
    path: "https://file.garden/afEyyUDycVrE3Bea/Red%20Hot%20Chili%20Peppers%20-%20Snow%20(Hey%20Oh).mp3",
  },
  {
    name: "So Yesterday",
    artist: "Hilary Duff",
    path: "https://file.garden/afEyyUDycVrE3Bea/So%20Yesterday.mp3",
  },
  {
    name: "Complicated",
    artist: "Avril Lavigne",
    path: "https://file.garden/afEyyUDycVrE3Bea/Complicated%205.mp3",
  },
  {
    name: "Kiss Me",
    artist: "Sixpence None The Richer",
    path: "https://file.garden/afEyyUDycVrE3Bea/Sixpence%20None%20The%20Richer%20-%20Kiss%20me%20(1997).mp3",
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

  const seekTo = (e) => {
    const seekValue = e.target.value;
    if (currTrack.current) {
      const seekto = currTrack.current.duration * (seekValue / 100);
      currTrack.current.currentTime = seekto;
    }
    setSeekValue(seekValue);
  };

  const playPause = () => {
    if (currTrack.current && currTrack.current.paused) {
      currTrack.current.play();
    } else if (currTrack.current) {
      currTrack.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setTrackIndex((prev) => (prev < playlist.length - 1 ? prev + 1 : 0));
  };

  const prevTrack = () => {
    setTrackIndex((prev) => (prev > 0 ? prev - 1 : playlist.length - 1));
  };


  const handleTrackChange = (e) => {
    setTrackIndex(parseInt(e.target.value));
  };

  useEffect(() => {
    // 1. Reset values for the new track
    resetValues();

    if (currTrack.current) {
      // 2. Load the new source
      currTrack.current.src = playlist[trackIndex].path;
      currTrack.current.load();
      currTrack.current.volume = 0.4;

      // 3. If we were already playing, play the next one automatically
      if (isPlaying) {
        currTrack.current
          .play()
          .catch((e) => console.log("Playback interrupted"));
      }
    }

    // 4. Set up the progress timer
    if (updateTimer.current) clearInterval(updateTimer.current);
    updateTimer.current = setInterval(seekUpdate, 1000);

    // Cleanup: stop timer if component unmounts
    return () => clearInterval(updateTimer.current);
  }, [trackIndex]); // <--- This is the trigger

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
      <audio id="music" ref={currTrack} onEnded={nextTrack}></audio>
    </div>
  );
};
