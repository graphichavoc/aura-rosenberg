<template>
  <div class="headbar" :class="{more: main.showMore, about: this.$route.name === 'about'}">
    <div class="asterisk" v-bind:class="isBlinking" @click="asteriskClick">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 133.6 134.4" style="enable-background:new 0 0 133.6 134.4;" xml:space="preserve">
        <polygon points="50.9,0 50,47.6 7.9,33.5 0,60.4 42.2,74.9 7.9,116.6 33.1,134.4 65.8,94.3 100.5,134.4 124.9,116.6 91.4,74.9
                  	133.6,61.6 124.9,33.5 83.1,47.6 83.1,0.8 " />
      </svg>
    </div>
    <div class="bar">
      <span class="center">
        <router-link to="/" id="aura" class='logo' :class='{hide: main.textbox}'><span class='click-area' @click='navClick'>Aura Rosenberg</span></router-link>
      </span>
      <router-link :key="isMobile" v-if='($route.name == "works" && !isMobile) || ($route.name == "works" && !main.textbox && isMobile)' to="about" class='small-menu'>about</router-link>
      <div v-if='(isMobile && main.textbox) || ($route.name !== "works")' class='small-close' @click='closeClick'><span>close</span></div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

var sizeQuery = window.matchMedia('(max-width: 640px)')

export default {
  name: 'headbar',
  created() {
    sizeQuery.addListener(this.updateMobileCheck)
  },
  destroyed() {
    sizeQuery.removeListener(this.updateMobileCheck)
  },
  methods: {
    ...mapActions(['SHOW_MORE', 'TOGGLE_TEXTBOX']),
    asteriskClick(e) {
      if (this.$route.name === 'about') {
        e.preventDefault()
      } else {
        this.SHOW_MORE('')
      }
    },
    navClick(e) {
      var main = document.getElementById('main')
      if (main) {
        document.getElementById('main').scrollLeft = 0
      }
      if (main && main.classList.contains('textbox')) {
        this.TOGGLE_TEXTBOX('')
      }
      this.SHOW_MORE('')
      if (this.main.textbox) {
        this.TOGGLE_TEXTBOX('')
      }
      window.workScrollX = 0
    },
    closeClick(e) {
      if (this.$route.name === 'about' || this.$route.name === 'single') {
        window.history.back()
        if (this.main.textbox) {
          this.TOGGLE_TEXTBOX('')
        }
      } else {
        this.TOGGLE_TEXTBOX('')
      }
    },
    updateMobileCheck() {
      this.isMobile = sizeQuery.matches
    }
  },
  computed: {
    isBlinking: function() {
      if (this.$route.name === 'about') {
        return ''
      } else if (this.main.textbox && this.isMobile) {
        return ''
      } else {
        return 'blinking'
      }
    },
    ...mapState(['main'])
  },
  data() {
    return {
      isMobile: sizeQuery.matches
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.headbar {
  font-weight: 500;
  z-index: 9;
  position: fixed;
  height: 41px;
  width: 100vw;
  background: transparent;
  user-select: none;
  .asterisk {
    position: absolute;
    font-size: $logo-size;
    font-family: $sans-serif-stack;
    line-height: 18px;
    top: 5px;
    left: 0px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 22px;
    cursor: pointer;
    svg {
      height: 15px;
      width: 15px;
      polygon {
        fill: $green;
      }
    }
    @include screen-size('medium') {
      left: -3px;
      font-size: $logo-size-mob;
      svg {
          height: 11px;
          width: 11px;
        }
      }
    @include screen-size('small') {
      top: 3px;
      left: -7px;
      font-size: $logo-size-mob;
      svg {
        height: 11px;
        width: 11px;
      }
    }
    &:hover {
      svg {
        polygon {
          fill: $black;
        }
      }
      cursor: pointer;
    }
    @include screen-size('small') {
      &:hover {
        svg {
          polygon {
            fill: $green;
          }
        }
      }
      &:active {
        svg {
          polygon {
            fill: $black;
          }
        }
      }
    }
  }
  .asterisk:hover svg {
    polygon {
      fill: $black;
    }
  }
  .bar {
    width: 100vw;
    clear: both;
    a, .small-close {
      display: none;
      position: relative;
      margin-top: -4px;
      margin-right: -2px;
      padding: 22px;
      float: left;
      @include screen-size('medium') {
        margin-top: -4px;
        font-size: $font-size-mob;
        line-height: $line-height-mob;
      }
      @include screen-size('small') {
        margin-top: -7px;
      }
      &#aura {
        float: left;
      }
    }
    .small-close, .small-menu {
      margin-right: -2px;
      @include screen-size('small') {
        margin-right: -7px;
      }
    }
  }
  &.more {
    background: rgba(255, 255, 255, 0);
    .large-menu,
    .logo, .small-close,
    a {
      cursor: pointer;
      display: inline-block;
    }
    @include screen-size('medium') {
      .small-menu {
        /* display: block !important; */
      }
    }
  }
  a,
  p {
    width: auto;
    color: $green;
    text-decoration: none;
    &:active {
      color: $green;
    }
    &:visited {
      color: $green;
    }
  }
  a:hover {
    color: $black;
  }
}

.is-mobile.has-textbox .headbar.more .asterisk
.is-mobile.has-textbox .headbar.more .logo {
  display: none;
}

.large-menu {
  display: block;
  @include screen-size('medium') {
    display: none !important;
  }
}

.small-menu {
  position: absolute !important;
  right: 0 !important;
  top: 0 !important;
  display: block;
  /* display: none;
  @include screen-size('medium') {
    display: block;
  }
  */
}

.small-close {
  position: absolute !important;
  right: 0;
  top: 0 !important;
  /* right: 10px !important;
  top: 11px; */
  color: $green;

  /* font-size: $font-size-mob-s;
  line-height: $line-height-mob-s; */

  &:hover {
    color: $black;
  }
  cursor: pointer;


  @include screen-size('medium') {
    /* display: block !important; */
  }

  @include screen-size('small') {
    // font-size: 16px;
    // line-height: 16px;

    font-size: 17px;
    line-height: 20px;
  }
}

.logo {
  @include screen-size('small') {
    &.hide {
      display: none !important;
    }
  }
}

/* asterisk update 11/6/20 */


@keyframes blinkingText {
  20% { fill: $green; }
  100% { fill: transparent; }
  100% { fill: transparent; }
  52% { fill: transparent; }
  100% { fill: $green; }
}

.blinking svg polygon {
  animation: blinkingText 1.5s infinite;
}

.blinking:hover svg polygon {
  animation: none !important;
}

.hideasterisk {
  opacity: 0;
  pointer-events: none;
}

.about .asterisk {
  pointer-events: none;
}

.center {
  display: inline-block;
  width: 100%;
  text-align: center;
}

.headbar .bar a#aura {
  float: none;
}

@media only screen and (max-width: 640px) {
  .has-textbox .headbar.more {
    background: rgba(255, 255, 255, 0.9);
  }
}

.click-area {
  padding: 22px;
}


</style>
