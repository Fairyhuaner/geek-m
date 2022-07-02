<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(item, index) in suggestions"
      :key="index"
      @click="$emit('search', item)"
    >
      <template #title>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
let timer = null
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 监视的处理函数
      handler (val) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            const { data } = await getSearchSuggestion(val)
            this.suggestions = data.data.options
          } catch {
            this.$toast('获取失败')
          }
        }, 900)
      },
      // 首次监视触发
      immediate: true
    }
  },
  created () { },
  mounted () { },
  methods: {
    highlight (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  },
  beforeDestroy () {
    clearTimeout(timer)
  }
}
</script>

<style scoped lang="less"></style>
