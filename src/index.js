import $ from 'jquery';
import './style.scss';

let num = 0;

const updateMain = () => {
  $('#main').html(`You've been on this page for ${num} seconds.`);
  num += 1;
};

setInterval(updateMain, 1000);
