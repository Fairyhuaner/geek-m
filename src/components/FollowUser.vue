<template>
  <van-button
    v-if="value"
    :disabled="isAjax"
    :loading="isAjax"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onClick"
    >关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    round
    size="small"
    @click="onClick"
    :disabled="isAjax"
    :loading="isAjax"
    >已关注</van-button
  >
</template>

<script>
import { delFollowUser, addFollowUser } from '@/api/article'
export default {
  name: 'FollowUser',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    target: {
      type: [Number, String],
      required: true
    }
  },
  created () {

  },
  data () {
    return {
      isAjax: false
    }
  },
  methods: {
    async onClick () {
      this.isAjax = true
      if (this.value) {
        try {
          await delFollowUser(this.target)
          this.$emit('input', !this.value)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await addFollowUser(this.target)
          this.$emit('input', !this.value)
        } catch (err) {
          console.log(err)
        }
      }
      this.isAjax = false
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
