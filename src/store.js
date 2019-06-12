import Vue from 'vue'
import Vuex from 'vuex'

import { save } from '@/vendor/storage/index.js'
import { HOTELS_STORAGE } from '@/vendor/storage/types.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hotels: null,
    minPrice: null
  },

  getters: {
    isHotelSelected: state => id => {
      let hotel = findHotel(state.hotels, id)

      return hotel ? (hotel.selected || false) : false
    },

    getHotelName: state => id => {
      let hotel = findHotel(state.hotels, id)

      return hotel ? hotel.name : null
    },

    minPrice: state => state.minPrice
  },

  mutations: {
    setHotels (state, arr) {
      if (Array.isArray(arr)) state.hotels = arr
    },

    selectHotel (state, id) {
      let hotel = findHotel(state.hotels, id)

      if (hotel) {
        hotel.selected = true
        save(HOTELS_STORAGE, state.hotels)
      }
    },

    setMinPrice (state, price) {
      if (!isNaN(price) && price > 0) state.minPrice = price
      else state.minPrice = null
    }
  },

  actions: {
    setHotels (context, arr) {
      context.commit('setHotels', arr)
    },

    select (context, id) {
      context.commit('selectHotel', id)
    },

    minPrice (context, price) {
      context.commit('setMinPrice', price)
    }
  }
})


function findHotel (hotels, id) {
  var hotel

  if (Array.isArray(hotels)) {
    hotel = hotels.find(item => item.id === id)
  }

  return hotel
}