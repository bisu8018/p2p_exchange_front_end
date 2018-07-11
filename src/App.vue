<template>
  <div id="app">
      <home></home>
  </div>
</template>


<script>
    import Vue from "vue";
    import {setEventBus, setRouter} from "./common/common";    
    import Home from './views/home/Home.vue'

    export default Vue.extend({
        name: "app",
        components: {
           'home' : Home,
        },
        created() {            
            setEventBus(this.$eventBus);
            setRouter(this.$router);
        }
    });
</script>
<style>
@font-face {
    font-family: 'Noto Sans SC';
    font-style: normal;
    font-weight: 100;
    src: url(assets/font/NotoSansSC-Thin.woff2) format('woff2'), url(assets/font/NotoSansSC-Thin.woff) format('woff'), url(assets/font/NotoSansSC-Thin.otf) format('opentype');
}

@font-face {
    font-family: 'Noto Sans SC';
    font-style: normal;
    font-weight: 300;
    src: url(assets/font/NotoSansSC-Light.woff2) format('woff2'), url(assets/font/NotoSansSC-Light.woff) format('woff'), url(assets/font/NotoSansSC-Light.otf) format('opentype');
}

@font-face {
    font-family: 'Noto Sans SC';
    font-style: normal;
    font-weight: 400;
    src: url(assets/font/NotoSansSC-Regular.woff2) format('woff2'), url(assets/font/NotoSansSC-Regular.woff) format('woff'), url(assets/font/NotoSansSC-Regular.otf) format('opentype');
}

@font-face {
    font-family: 'Noto Sans SC';
    font-style: normal;
    font-weight: 500;
    src: url(assets/font/NotoSansSC-Medium.woff2) format('woff2'), url(assets/font/NotoSansSC-Medium.woff) format('woff'), url(assets/font/NotoSansSC-Medium.otf) format('opentype');
}

@font-face {
    font-family: 'Noto Sans SC';
    font-style: normal;
    font-weight: 700;
    src: url(assets/font/NotoSansSC-Bold.woff2) format('woff2'), url(assets/font/NotoSansSC-Bold.woff) format('woff'), url(assets/font/NotoSansSC-Bold.otf) format('opentype');
}

@font-face {
    font-family: 'Noto Sans SC';
    font-style: normal;
    font-weight: 900;
    src: url(assets/font/NotoSansSC-Black.woff2) format('woff2'), url(assets/font/NotoSansSC-Black.woff) format('woff'), url(assets/font/NotoSansSC-Black.otf) format('opentype');
}

#app {
  font-family: Noto Sans SC, Helvetica, Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
