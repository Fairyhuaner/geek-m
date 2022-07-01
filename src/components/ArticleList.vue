<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
      ref="pullRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        success-text="刷新成功"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in articleList"
          :key="index"
          :title="item.title"
          value="内容"
          label="描述信息"
        /> -->
        <ArticleItem
          v-for="(item, index) in articleList"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/home'
import ArticleItem from './ArticleItem'
// eslint-disable-next-line prefer-const
let ele = null // 全局
let scrollTop = 0
export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    // this.onLoad()
    this.getArticleList()
  },
  data () {
    return {
      timestamp: Date.now(),
      articleList: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  methods: {
    async getArticleList () {
      if (this.refreshing) {
        this.articleList = []
        this.refreshing = false
      }
      try {
        const res = await getArticleList({
          channel_id: this.id,
          timestamp: this.timestamp
        })
        // console.log('res', res)
        this.timestamp = res.data.data.pre_timestamp
        // 最后一条数据
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articleList.push(...res.data.data.results)
        // 数据更新完毕
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getArticleList()
    },
    onRefresh () {
      console.log('下拉刷新触发了')
      this.finished = false // 防止用户把加载更多搞结束了
      this.loading = true
      this.timestamp = Date.now()
      this.getArticleList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ArticleItem
  },
  mounted () {
    console.log(this.$refs.pullRefresh)
    this.$refs.pullRefresh.$el.addEventListener('scroll', function () {
      scrollTop = this.scrollTop
    })
  },
  activated () {
    ele.scrollTop = scrollTop
  }
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
}
</style>
