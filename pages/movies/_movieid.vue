<template>
  <!-- Loading -->
  <Loading v-if="$fetchState.pending" />

  <!-- Movie Info -->
  <div v-else class="single-movie container">
    <NuxtLink class="button" :to="{ name: 'index' }">
      Revenir en arrière
    </NuxtLink>
    <div class="movie-info">
      <div class="movie-img">
        <img
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          alt=""
        >
      </div>
      <div class="movie-content">
        <h1>Titre : {{ movie.title }}</h1>
        <p class="movie-fact tagline">
          <span>Phrase d'accroche :</span> "{{ movie.tagline }}"
        </p>
        <p class="movie-fact">
          <span>Sorti le :</span>
          {{
            new Date(movie.release_date).toLocaleString('fr-fr', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          }}
        </p>
        <p class="movie-fact">
          <span>Durée :</span> {{ movie.runtime }} minutes
        </p>
        <p class="movie-fact">
          <span>Revenus générés :</span>
          {{
            movie.revenue.toLocaleString('fr-fr', {
              style: 'currency',
              currency: 'EUR',
            })
          }}
        </p>
        <p class="movie-fact">
          <span>Synopsis :</span> {{ movie.overview }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Loading from '../../components/Loading.vue';

export default {
  name: 'SingleMovie',
  components: { Loading },
  data() {
    return {
      movie: '',
    };
  },
  async fetch() {
    await this.getMovieInfos();
  },
  head() {
    return {
      title: `MovieApp - ${this.movie.title}`,
    };
  },
  methods: {
    async getMovieInfos() {
      const data = axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.movieid}?api_key=ad7399fec8dfdb5f2a5a29d4d3c11e0d&language=fr-FR`);
      const result = await data;
      this.movie = result.data;
    },
  },
};
</script>

<style lang="scss">
.single-movie {
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 16px;
  .button {
    align-self: flex-start;
    margin-bottom: 32px;
  }
  .movie-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    color: #fff;
    @media (min-width: 800px) {
      flex-direction: row;
      align-items: flex-start;
    }
    .movie-img {
      img {
        max-height: 500px;
        width: 100%;
        @media (min-width: 800px) {
          max-height: 700px;
          width: initial;
        }
      }
    }
    .movie-content {
      h1 {
        font-size: 56px;
        font-weight: 400;
      }
      .movie-fact {
        margin-top: 12px;
        font-size: 20px;
        line-height: 1.5;
        span {
          font-weight: 600;
          text-decoration: underline;
        }
      }
      .tagline {
        font-style: italic;
        span {
          font-style: normal;
        }
      }
    }
  }
}
</style>
