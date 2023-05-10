import throttle from 'lodash.throttle';
import Vimeo from '@vimeo/player';

const iframeRef = document.querySelector('iframe');
const iframeVimeoPlayer = new Vimeo(iframeRef);

iframeVimeoPlayer.on(
  'timeupdate',
  throttle(() => {
    iframeVimeoPlayer
      .getCurrentTime()
      .then(seconds => {
        localStorage.setItem('videoplayer-current-time', seconds);
      })
      .catch(function (error) {
        console.error('Error! Didn`t get current time', error);
      });
  }, 1000)
);

const playbackPosition = localStorage.getItem('videoplayer-current-time');

iframeVimeoPlayer
  .setCurrentTime(playbackPosition)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.error(
          'the time was less than 0 or greater than the video’s duration'
        );
        break;

      default:
        console.error('some other error occurred');
        break;
    }
  });
