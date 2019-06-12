<template lang="pug">
  #app
    router-view
</template>


<style lang="scss">
#app {
  display: block;
  width: 96%;
  margin: 60px auto;
  font-size: 16px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.link {
  color: #42b983;
  text-decoration: none;
  transition: color .3s ease;
  will-change: color;
  cursor: pointer;

  &:hover {
    color: #2f5c48;
  }
}
</style>
