import Vue from 'vue'
import VueResource from 'vue-resource'

/* upgrading to v3 does not work, slug is lost */
// const API_ROOT = 'http://cms.aurarosenberg.com/wp-json/acf/v3/'
// const API_ROOT = 'https://cms.aurarosenberg.com/wp-json/wp/v2/'
const API_ROOT = 'http://localhost/wp-json/wp/v2/'
const INFO_PAGE_ID = 6

Vue.use(VueResource)

Vue.http.options.crossOrigin = true

export default {
  getPosts() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 'posts/?per_page=100').then(
        (response) => {
          resolve(response.body)
        },
        (response) => {
          reject()
        }
      )
    })
  },
  getInfo() {
    return new Promise((resolve, reject) => {
      Vue.http.get(API_ROOT + 'pages/?' + INFO_PAGE_ID).then(
        (response) => {
          resolve(response.body)
        },
        (response) => {
          reject()
        }
      )
    })
  },
}
