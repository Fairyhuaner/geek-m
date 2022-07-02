<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isDelete">
        <span @click="$store.commit('delAllHistories')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDelete = false">完成</span>
      </template>
      <van-icon name="delete" v-else @click="isDelete = true" />
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistoryList"
      :key="index"
      :title="item"
      @click="$emit('search', item)"
    >
      <van-icon
        name="close"
        @click.stop="$store.commit('delHistories', index)"
        v-show="isDelete"
      />
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SearchHistory',
  components: {},
  props: {},
  data () {
    return {
      isDelete: false
    }
  },
  computed: {
    ...mapState(['searchHistoryList'])
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {}
}
</script>

<style scoped lang="less"></style>
