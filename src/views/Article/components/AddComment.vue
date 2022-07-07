<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-field
      v-model.trim="message"
      rows="2"
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
      class="add-field"
      ref="field"
    >
      <template #extra>
        <van-button
          type="default"
          class="btn"
          :disabled="message.length === 0"
          @click="onClick"
          >发布</van-button
        >
      </template>
    </van-field>
    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <!-- /当前评论项 -->

    <van-cell title="所有回复" />

    <!-- 评论的回复列表 -->
    <!-- /评论的回复列表 -->

    <!-- 底部 -->
    <!-- /底部 -->
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentReply',
  props: {
    target: {
      type: [String, Number],
      required: true
    },
    art_id: {
      type: [String, Number]
    }
  },
  components: {},
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () {
    // 组件最终会变成dom结构，$el可以获取这个组件的根标签dom
    this.$refs.field.$el.querySelector('textarea').focus()
  },
  methods: {
    async onClick () {
      try {
        const res = await addComment({
          target: this.target,
          content: this.message,
          art_id: this.art_id
        })
        this.$emit('add-comment', res.data.data.new_obj)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.add-field {
  align-items: center;
  button {
    border: none;
  }
}
</style>
