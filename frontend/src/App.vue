<template>
  <div id="app">
    <transition name="el-fade-in-linear">
      <router-view/>
    </transition>
    <div v-if="this.$route.name === 'login' || this.$route.name === 'register'" class="footer">
        <v-card-text class="textlight">
            2019 — <strong>Malariaction Team</strong>
        </v-card-text>
    </div>
  </div>
</template>

<style lang="scss">

#app {
  font-family: 'SF Display', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: #27ae60;
}

.phoneUI {
    width: 100%;
    max-width: 720px;
    margin: auto;
}

@font-face {
  font-family: "SF Display";
  font-weight: 900;
  src: url("./assets/fonts/SF-UI-Display-Black.otf");
}

/** Bold */
@font-face {
  font-family: "SF Display";
  font-weight: 700;
  src: url("./assets/fonts/SF-UI-Display-Bold.otf");
}

/** Heavy */
@font-face {
  font-family: "SF Display";
  font-weight: 800;
  src: url("./assets/fonts/SF-UI-Display-Heavy.otf");
}

/** Light */
@font-face {
  font-family: "SF Display";
  font-weight: 200;
  src: url("./assets/fonts/SF-UI-Display-Light.otf");
}

/** Medium */
@font-face {
  font-family: "SF Display";
  font-weight: 500;
  src: url("./assets/fonts/SF-UI-Display-Medium.otf");
}

/** Regular */
@font-face {
  font-family: "SF Display";
  font-weight: 400;
  src: url("./assets/fonts/SF-UI-Display-Regular.otf");
}

/** Semibold */
@font-face {
  font-family: "SF Display";
  font-weight: 600;
  src: url("./assets/fonts/SF-UI-Display-Semibold.otf");
}

/** Thin */
@font-face {
  font-family: "SF Display";
  font-weight: 300;
  src: url("./assets/fonts/SF-UI-Display-Thin.otf");
}

/** Ultralight */
@font-face {
  font-family: "SF Display";
  font-weight: 100;
  src: url("./assets/fonts/SF-UI-Display-Ultralight.otf");
}

</style>
