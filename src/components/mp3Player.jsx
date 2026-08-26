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
  const [volume, setVolume] = useState(7);

  const currTrack = useRef(null);

  const track = playlist[trackIndex];

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const seekUpdate = () => {
    if (!currTrack.current) return;

    const audio = currTrack.current;

    if (!isNaN(audio.duration) && audio.duration > 0) {
      const position = (audio.currentTime / audio.duration) * 100;

      setSeekValue(position);
      setCurrentTime(formatTime(audio.currentTime));
      setDuration(formatTime(audio.duration));
    }
  };

  const playPause = async () => {
    if (!currTrack.current) return;

    if (currTrack.current.paused) {
      try {
        await currTrack.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Unable to play audio:", error);
      }
    } else {
      currTrack.current.pause();
      setIsPlaying(false);
    }
  };

  const nextTrack = () => {
    setTrackIndex((prev) =>
      prev < playlist.length - 1 ? prev + 1 : 0,
    );
  };

  const prevTrack = () => {
    setTrackIndex((prev) =>
      prev > 0 ? prev - 1 : playlist.length - 1,
    );
  };

  const seekTo = (e) => {
    const value = Number(e.target.value);

    if (currTrack.current && !isNaN(currTrack.current.duration)) {
      currTrack.current.currentTime =
        currTrack.current.duration * (value / 100);
    }

    setSeekValue(value);
  };

  const handleTrackChange = (e) => {
    setTrackIndex(Number(e.target.value));
  };

  const handleVolumeChange = (e) => {
    const value = Number(e.target.value);

    setVolume(value);

    if (currTrack.current) {
      currTrack.current.volume = value / 100;
    }
  };

  useEffect(() => {
    if (!currTrack.current) return;

    currTrack.current.src = track.path;
    currTrack.current.load();

    currTrack.current.volume = volume / 100;

    setCurrentTime("0:00");
    setDuration("0:00");
    setSeekValue(0);

    if (isPlaying) {
      currTrack.current
        .play()
        .catch((error) => {
          console.error("Playback failed:", error);
          setIsPlaying(false);
        });
    }
  }, [trackIndex]);

  useEffect(() => {
    const timer = setInterval(seekUpdate, 500);

    return () => clearInterval(timer);
  }, []);

  const handleEnded = () => {
    nextTrack();
  };

  return (
    <div className="wmp-player">

      {/* Menu */}
      <div className="wmp-menu">
        <span className="wmp-sound">
          Sound: <strong>ON</strong>
        </span>
      </div>

      {/* Main Player */}
      <div className="wmp-body">


        {/* Media display */}
        <div className="wmp-screen">
          <div className="wmp-screen-content">
            <div className="wmp-disc">
              ♪
            </div>

            <div className="wmp-track-display">
              <div className="wmp-track-name">
                {track.name}
              </div>

              <div className="wmp-track-artist">
                {track.artist}
              </div>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="wmp-status">

          <div className="wmp-status-icon">
           {isPlaying ? "⏸" : "▶"}
          </div>

          <div className="wmp-status-progress">
            <div
              className="wmp-status-progress-fill"
              style={{ width: `${seekValue}%` }}
            />
          </div>

        </div>

        {/* Progress / seek */}
        <div className="wmp-seek-row">

          <span className="wmp-time">
            {currentTime}
          </span>

          <input
            type="range"
            min="0"
            max="100"
            value={seekValue}
            onChange={seekTo}
            className="wmp-seek"
          />

          <span className="wmp-time">
            {duration}
          </span>

        </div>

        {/* Controls */}
        <div className="wmp-controls">

          <button
            className="wmp-control wmp-play"
            onClick={playPause}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button
            className="wmp-control wmp-stop"
            onClick={() => {
              currTrack.current?.pause();

              if (currTrack.current) {
                currTrack.current.currentTime = 0;
              }

              setIsPlaying(false);
              setSeekValue(0);
              setCurrentTime("0:00");
            }}
            title="Stop"
          >
            ■
          </button>

          <div className="wmp-separator" />

          <button
            className="wmp-small-control"
            onClick={prevTrack}
            title="Previous"
          >
            |◀
          </button>

          <button
            className="wmp-small-control"
            onClick={nextTrack}
            title="Next"
          >
            ▶|
          </button>

          <div className="wmp-volume">
            <span>🔊</span>

            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="wmp-volume-slider"
            />
          </div>

        </div>

        {/* Playlist */}
        <div className="wmp-playlist">

          <select
            value={trackIndex}
            onChange={handleTrackChange}
            className="wmp-track-select"
          >
            {playlist.map((item, index) => (
              <option key={index} value={index}>
                {item.name} — {item.artist}
              </option>
            ))}
          </select>

        </div>

      </div>

      <audio
        ref={currTrack}
        onEnded={handleEnded}
      />

    </div>
  );
};