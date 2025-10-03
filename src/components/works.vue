<template>
  <div id='main' class="main" v-on:scroll.passive="handleScroll" ref="mainDiv">
    <!-- No content in outer -->
    <div class="works">
      <template v-for="item in main.posts">
        <div v-for="image in item.acf.images.filter((e) => e.show_on_frontpage)" class="work">
          <!-- Content -->
          <video v-if='image.video.url' @click='toggleVideo' :src='image.video.url' preload="auto" muted loop playsinline ref="videos"></video>
          <img v-else-if='image.image.sizes' :src='image.image.sizes["pwr-large"]' :width='image.image.sizes["pwr-large-width"]' :height='image.image.sizes["pwr-large-height"]'>
          <!-- Caption -->
          <div class="text" v-if="main.showMore">
            <span v-if='image.caption.length > 1' v-html="image.caption" class="bg-link"></span>
            <!-- Show "more images" link if the post has multiple images -->
            <span v-if='item.acf.images.length > 1'>
              <span class="bg-link">(<router-link :to='item.slug'>more</router-link>)</span>
            </span>
            <!-- Show "text" link if the post has a text field & a download link -->
            <span v-if='image.text && image.download'>
              <span class="bg-link">(<span @click='TOGGLE_TEXTBOX({content: image.text, download: image.download.url})' class='pseudo-link'>text</span>)</span>
            </span>
            <!-- Show "text" link if the post has a text field BUT NO download link -->
            <span v-else-if='image.text'>
              <span class="bg-link">(<span @click='TOGGLE_TEXTBOX({content: image.text, download: ""})' class='pseudo-link'>text</span>)</span>
            </span>
          </div>
        </div>
      </template>
      <!-- Textbox -->
      <txt v-if='main.textbox'></txt>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import txt from './txt'

window.workScrollX = 0

export default {
  name: 'works',
  components: {
    txt
  },
  methods: {
    ...mapActions(['TOGGLE_TEXTBOX']),
    toggleVideo(e) {
      if (e.srcElement.paused) {
        e.srcElement.play()
      } else {
        e.srcElement.pause()
      }
    },
    handleScroll(e) {
      window.workScrollX = e.target.scrollLeft

      this.$refs.videos.forEach(v => {
        const { x, width } = v.getBoundingClientRect()

        if (x - window.innerWidth <= 0 && x + width >= 0) {
          if (v.paused) {
            v.play()
          }
        } else {
          v.pause()
        }
      })
    },
  },
  mounted: function() {
    this.$refs['mainDiv'].scrollLeft = window.workScrollX
  },
  computed: {
    ...mapState(['main'])
  }
}
</script>

<style>

.work a, .work .pseudo-link {
  padding: 22px 0;
}

</style>
