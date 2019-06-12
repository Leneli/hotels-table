<template lang="pug">
  .h-table-wrap
    table.table
      thead
        tr
          th.num #
          th Название отеля
          th Цена за сутки, руб.
          th
      
      tbody(v-if="list")
        tr(
          v-for="(hotel, index) in list"
          v-show="!$store.getters.minPrice || hotel.price <= $store.getters.minPrice"
          :key="hotel.id"
        )
          td.text_center {{ index + 1 }}
          td {{ hotel.name }}
          td.text_center {{ priceFormat(hotel.price) }}
          td
            .your-select(v-if="$store.getters.isHotelSelected(hotel.id)") текущий выбор
            button(v-else, @click="select(hotel.id)") выбрать
            

    .link.refresh(@click="refresh") обновить данные
</template>

<script>
import { read, save, clear } from '@/vendor/storage/index.js'
import { HOTELS_STORAGE } from '@/vendor/storage/types.js'
import { Promise } from 'q'

export default {
  data () {
    return {
      list: null
    }
  },

  methods: {
    getData () {
      var saved

      try {
        saved = JSON.parse(read(HOTELS_STORAGE))
      } catch (error) {
        console.warn('Ошибка при чтении данных из localStorage, hotels table ', error)
        saved = null
      }

      return Promise.resolve()
        .then(() => {
          if (saved) return saved
          else return fetch('hotels.json')
            .then(response => {
              return response.json()
            })
        })
        .then(data => {
          save(HOTELS_STORAGE, data)
          this.$store.dispatch('setHotels', data)
          this.list = data
        })
        .catch(err => console.error('Ошибка при запросе данных с сервера, hotels table ', err))
    },

    refresh () {
      return Promise.resolve()
        .then(() => clear(HOTELS_STORAGE))
        .then(() => this.getData())
    },

    priceFormat (price) {
      if (!isNaN(price)) {
        return price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' })
      } else {
        return "-"
      }
    },

    select (id) {
      return new Promise((resolve, reject) => {
        if (id) resolve()
        else reject('Не указан ID отеля')
      })
        .then(() => this.$store.dispatch('select', id))
        .then(() => this.$router.push({ name: 'thank', params: { id }}))
        .catch(err => console.error('Ошибка при выборе отеля ', err))
    }
  },

  mounted () {
    console.log('mounted')
    this.getData()
  },
}
</script>


<style lang="scss" scoped>
.h-table-wrap {
  display: block;
  width: 100%;
  margin: 60px 0;
  overflow-x: auto;
}

.table {
  width: 100%;
  margin-bottom: 30px;
  border-collapse: collapse;
  font-size: 14px;
  line-height: 1.5;

  td, th {
    padding: 15px 10px;
    border: 1px solid #42b983;
  }

  th {
    background-color: #42b983;
    color: #fff;
  }
}

button {
  padding: 7px 15px;
  border: none;
  box-shadow: none;
  outline: none;
  border-radius: 5px;
  font-size: 14px;
  background-color: #42b983;
  color: #fff;
  transition: background-color .3s ease;
  will-change: background-color;
  cursor: pointer;

  &:hover {
    background-color: #2f5c48;
  }
}

.your-select {
  display: inline-block;
  padding: 5px 15px;
  border: 1px solid;
  border-style: dotted;
  border-radius: 5px;
  font-size: 14px;
  color: #42b983;
}

.num {
  width: 50px
}

.text_center {
  text-align: center;
}

.refresh {
  display: inline-block;
  padding: 15px 0;
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
  text-decoration: underline;
  text-decoration-style: dotted;
  white-space: nowrap;
}
</style>
