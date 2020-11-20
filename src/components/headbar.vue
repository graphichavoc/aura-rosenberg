<template>
  <div class="headbar" :class="{more: main.showMore}">
    <div class="asterisk" v-bind:class="isBlinking" @click="SHOW_MORE">
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 133.6 134.4" style="enable-background:new 0 0 133.6 134.4;width:14px;height:14px" xml:space="preserve">
        <polygon points="50.9,0 50,47.6 7.9,33.5 0,60.4 42.2,74.9 7.9,116.6 33.1,134.4 65.8,94.3 100.5,134.4 124.9,116.6 91.4,74.9
                  	133.6,61.6 124.9,33.5 83.1,47.6 83.1,0.8 " />
      </svg>
    </div>
    <div class="bar">
      <router-link to="/" id="aura" class='logo' :class='{hide: main.textbox}'><span @click='navClick'>Aura Rosenberg</span></router-link>
      <router-link v-if='(!main.textbox && $route.name !== "about") && $route.name !== "single"' to="about" class='small-menu'>about</router-link>
      <div v-if='main.textbox || ($route.name !== "works")' class='small-close'><span @click='closeClick'>close</span></div>
    </div>
  </div>
</template>

<script>

import {mapState, mapActions} from 'vuex'
export default {
  name: 'headbar',
  methods: {
    ...mapActions(['SHOW_MORE', 'TOGGLE_TEXTBOX']),
    navClick(e) {
      this.TOGGLE_TEXTBOX('')
    },
    closeClick(e) {
      if (this.$route.name === 'about' || this.$route.name === 'single') {
        window.history.back()
      } else {
        this.TOGGLE_TEXTBOX('')
      }
    }
  },
  computed: {
    isBlinking: function() {
      if (this.$route.name === 'about') {
        return ''
      } else {
        return 'blinking'
      }
    },
    ...mapState(['main'])
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
    top: 6px;
    left: 22px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      height: 11px;
      width: 11px;
      polygon {
        fill: $green;
        fill: black;
      }
    }
    @include screen-size('medium') {
      left: 15px;
      font-size: $logo-size-mob;
    }
    @include screen-size('small') {
      top: 4px;
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
  .bar {
    width: 100vw;
    padding-left: 45px;
    @include screen-size('medium') {
      padding-left: 42px;
    }
    clear: both;
    a, .small-close {
      display: none;
      position: relative;
      margin-top: 18px;
      margin-right: 20px;
      float: left;
      @include screen-size('medium') {
        margin-top: 9px;
        font-size: $font-size-mob;
        line-height: $line-height-mob;
      }
      @include screen-size('small') {
        margin-top: 15px;
        margin-right: 15px;
      }
      &#aura {
        float: left;
      }
    }
  }
  &.more {
    background: rgba(255, 255, 255, 0.86);
    .large-menu,
    .logo, .small-close,
    a {
      display: inline-block;
    }
    @include screen-size('medium') {
      .small-menu {
        display: block !important;
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
    display: block !important;
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

.blinking { 
  animation: blinkingText 2.2s infinite;
}

@keyframes blinkingText {  
  20% { fill: #000; } 
  100% { fill: transparent; } 
  100% { fill: transparent; }
  52% { fill: transparent; } 
  100% { fill: #000; }
}

.blinking svg polygon {
  animation: blinkingText 1.5s infinite;
}

.hideasterisk {
  opacity: 0;
  pointer-events: none;
}


</style>
