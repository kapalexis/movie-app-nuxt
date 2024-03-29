<template>
  <div class="home">
    <!-- Hero -->
    <Hero />

    <!-- Search -->
    <div class="container search">
      <input v-model.lazy="searchInput" type="text" placeholder="Rechercher" @keyup.enter="$fetch">
      <button v-show="searchInput !== ''" class="button" @click="handleClearClick">
        Effacer la rechercher
      </button>
    </div>

    <!-- loading -->
    <Loading v-if="$fetchState.pending" />

    <!-- Movies -->
    <div v-else class="container movies">
      <!-- searched movies -->
      <div v-if="searchInput !== ''" id="movie-grid" class="movies-grid">
        <div v-for="(movie, index) in searchedMovies" :key="index" class="movie">
          <div class="movie-img">
            <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="">
            <p class="review">
              {{ movie.vote_average }}
            </p>
            <p class="overview">
              {{ movie.overview.slice(0,300) }}<span v-if="movie.overview.length > 300">...</span>
            </p>
          </div>
          <div class="info">
            <p class="title">
              {{ movie.title.slice(0, 25) }}<span v-if="movie.title.length > 25">...</span>
            </p>
            <p class="release">
              Sortie:
              {{
                new Date(movie.release_date).toLocaleString('fr-FR', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              }}
            </p>
            <NuxtLink
              class="button button-light"
              :to="{name: 'movies-movieid', params:{movieid : movie.id}}"
            >
              Plus d'informations
            </NuxtLink>
          </div>
        </div>
      </div>
      <!-- now streaming -->
      <div v-else id="movie-grid" class="movies-grid">
        <div v-for="(movie, index) in movies" :key="index" class="movie">
          <div class="movie-img">
            <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="">
            <p class="review">
              {{ movie.vote_average }}
            </p>
            <p class="overview">
              {{ movie.overview.slice(0,300) }}<span v-if="movie.overview.length > 300">...</span>
            </p>
          </div>
          <div class="info">
            <p class="title">
              {{ movie.title.slice(0, 25) }}<span v-if="movie.title.length > 25">...</span>
            </p>
            <p class="release">
              Sortie:
              {{
                new Date(movie.release_date).toLocaleString('fr-FR', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              }}
            </p>
            <NuxtLink
              class="button button-light"
              :to="{name: 'movies-movieid', params:{movieid : movie.id}}"
            >
              Plus d'informations
            </NuxtLink>
            <button ref="preview" class="button" @click="openModal(movie)">
              Trailer
            </button>
          </div>
        </div>
      </div>
    </div>
    <ModalPreview
      v-if="showModal"
      :movie="modalInfos"
      :video-id="videoId"
      @close-modal="showModal = false"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ModalPreview from '../components/ModalPreview.vue';

export default {
  components: { ModalPreview },
  data() {
    return {
      movies: [],
      searchInput: '',
      searchedMovies: [],
      showModal: false,
      modalInfos: [],
      videoId: '',
    };
  },
  async fetch() {
    if (this.searchInput === '') {
      await this.getMovies();
    } else {
      await this.searchMovies();
    }
  },
  head() {
    return {
      title: 'MovieApp - Dernières sorties cinéma',
    };
  },
  methods: {
    async getMovies() {
      const data = axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=ad7399fec8dfdb5f2a5a29d4d3c11e0d&language=fr-FR&page=1');
      const result = await data;
      result.data.results.forEach((movie) => {
        this.movies.push(movie);
      });
      // console.log(this.searchedMovies);
    },
    handleClearClick() {
      this.searchInput = '';
      this.searchedMovies = [];
    },
    async searchMovies() {
      this.searchedMovies = [];
      const data = axios.get(`https://api.themoviedb.org/3/search/movie?api_key=ad7399fec8dfdb5f2a5a29d4d3c11e0d&language=fr-FR&page=1&include_adult=false&query=${this.searchInput}`);
      const result = await data;
      result.data.results.forEach((movie) => {
        this.searchedMovies.push(movie);
      });
      console.log('ma recherche', this.searchedMovies);
    },
    async openModal(movie) {
      this.showModal = true;
      this.modalInfos = movie;
      const data = axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=ad7399fec8dfdb5f2a5a29d4d3c11e0d&language=fr-FR`);
      const result = await data;

      console.log('video id', result.data.results[0].key);
      this.videoId = result.data.results[0].key;
    },

  },
};
</script>

<style lang="scss">
.home {
  .loading {
    padding-top: 120px;
    align-items: flex-start;
  }
  .search {
    display: flex;
    padding: 32px 16px;
    input {
      max-width: 350px;
      width: 100%;
      padding: 12px 6px;
      font-size: 14px;
      border: none;
      &:focus {
        outline: none;
      }
    }
    .button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .movies {
    padding: 32px 16px;
    .movies-grid {
      display: grid;
      column-gap: 32px;
      row-gap: 64px;
      grid-template-columns: 1fr;
      @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 750px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 1100px) {
        grid-template-columns: repeat(4, 1fr);
      }
      .movie {
        position: relative;
        display: flex;
        flex-direction: column;
        .movie-img {
          position: relative;
          overflow: hidden;
          &:hover {
            .overview {
              transform: translateY(0);
            }
          }
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
          .review {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            background-color: #c92502;
            color: #fff;
            border-radius: 0 0 16px 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          .overview {
            line-height: 1.5;
            position: absolute;
            bottom: 0;
            background-color: rgba(201, 38, 2, 0.9);
            padding: 12px;
            color: #fff;
            transform: translateY(100%);
            transition: 0.3s ease-in-out all;
          }
        }
        .info {
          margin-top: auto;
          .title {
            margin-top: 8px;
            color: #fff;
            font-size: 20px;
          }
          .release {
            margin-top: 8px;
            color: #c9c9c9;
          }
          .button {
            margin-top: 8px;
          }
        }
      }
    }
  }
}
</style>
