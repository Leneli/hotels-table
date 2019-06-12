<template lang="pug">
  .filter
    div Цена от
    input(type="number", min="0", @input="handler", v-model="currency", placeholder="₽")
</template>

<script>
export default {
  data () {
    return {
      currency: null
    }
  },

  beforeDestroy () {
    /** filter clear */
    this.$store.dispatch('minPrice')
  },

  methods: {
    handler () {
      // TODO: валидация и сообщение об ошибке для пользователя
      if (isNaN(this.currency) || this.currency <= 0) {
        this.currency = null
      } else {
        this.$store.dispatch('minPrice', this.currency)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.filter {
  display: flex;
  align-items: center;
  margin: 30px 0;
  font-size: 14px;
  font-weight: bold;
}

input {
  margin-left: 15px;
  padding: 7px 15px;
  border: 1px solid #42b983;;
  box-shadow: none;
  outline: none;
  border-radius: 5px;
  font-size: 14px;
}
</style>
