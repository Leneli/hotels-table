<template lang="pug">
  .home
    hotels-filter
    hotels-table
</template>


<script>
// @ is an alias to /src
import HotelsTable from '@/components/table.vue'
import HotelsFilter from '@/components/filter.vue'

export default {
  name: 'home',
  components: {
    HotelsTable,
    HotelsFilter
  }
}
</script>
