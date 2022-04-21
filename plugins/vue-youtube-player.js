import VueYouTubeEmbed, { YouTubePlayer } from 'vue-youtube-embed';
import Vue from 'vue';

Vue.use(VueYouTubeEmbed, { global: true });

Vue.component('VueYoutubePlayer', YouTubePlayer);
