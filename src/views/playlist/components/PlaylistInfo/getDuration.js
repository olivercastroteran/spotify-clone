export const getDuration = (songs) => {
  let totalTime = 0;

  songs &&
    songs.forEach((song) => {
      totalTime += song.duration;
    });

  let minutes = Math.floor(totalTime / 60);
  let seconds = Math.floor(totalTime % 60);

  return `${minutes} minutes and ${seconds} seconds`;
};
