<template>
  <van-loading v-if="loading" size=".53333rem" />
  <van-icon
    v-else
    :color="is_collected ? 'red' : '#777'"
    :name="is_collected ? 'star' : 'star-o'"
    @click="onClick"
  />
</template>

<script>
import { addCollect, delCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    is_collected: {
      type: Boolean,
      required: true
    }
  },
  created () { },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onClick () {
      this.loading = true
      const target = this.$route.params.article_id
      try {
        if (this.is_collected) {
          await delCollect(target)
        } else {
          await addCollect(target)
        }
        this.$emit('update:is_collected', !this.is_collected)
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
