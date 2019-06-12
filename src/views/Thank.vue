<template lang="pug">
  .about
    h1 Спасибо за использование нашего сервиса!
    h2(v-if="hotel") Ваше бронирование в {{ hotel }} подтверждено
    p
      router-link.link(to="/") вернуться на главную
</template>


<script>
export default {
  data () {
    return {
      hotel: null
    }
  },

  mounted () {
    var id = this.$route.params.id

    this.hotel = this.$store.getters.getHotelName(id)
    console.log(this.$route)
  }
}
</script>

<style lang="scss" scoped>
.about {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
