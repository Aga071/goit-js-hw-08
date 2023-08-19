import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const LOCALSTORAGE_KEY = 'videoplayer-current-time';
updateOutput();

player.on(
  'timeupdate',
  throttle(function (data) {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data.seconds));
  }, 1000)
);

function updateOutput() {
  try {
    const parsedSettings = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    player.setCurrentTime(parsedSettings);
  } catch {}
}
