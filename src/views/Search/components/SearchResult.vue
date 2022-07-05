<template>
  <div class="search-result">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {
    ArticleItem
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false, // 上拉刷新
      finished: false,
      isLoading: false // 下拉刷新
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getSearchResult()
  },
  mounted () { },
  methods: {
    async getSearchResult () {
      try {
        const res = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        // console.log(res)
        // 数据加赞完了
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        this.list.push(...res.data.data.results)
        // 下拉刷新
        this.loading = false
        // 上拉刷新
        this.isLoading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.page++
      this.getSearchResult()
      // this.loading = false
    },
    onRefresh () {
      this.list = []
      this.page = 1
      this.getSearchResult()
    }
  }
}
</script>

<style scoped lang="less">
.search-result {
  overflow: auto;
  height: calc(100vh - 108px);
}
</style>
