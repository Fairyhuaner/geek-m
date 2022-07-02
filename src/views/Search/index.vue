<template>
  <div class="search-container">
    <!-- 搜索栏》事件监听 -->
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResult = false"
      />
    </form>
    <!-- /搜索栏 -->
    <!-- 搜索结果 -->
    <search-result v-if="isResult" :searchText="searchText"/>
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion :searchText="searchText" v-else-if="searchText" />
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history v-else @search="onSearch" />
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory'
import SearchSuggestion from './components/SearchSuggestion'
import SearchResult from './components/SearchResult'
export default {
  name: 'search-container',
  data () {
    return {
      searchText: '',
      isResultShow: false,
      isResult: false
    }
  },

  created () {

  },

  methods: {
    onSearch (str) {
      this.isResult = true
      this.searchText = str
      this.$store.commit('setSearchHistoryList', str)
    },
    onCancel () {
      this.$router.go(-1)
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  }
}
</script>

<style scoped lang='less'>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
