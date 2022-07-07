<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="title" left-arrow @click-left="$emit('close')" fixed>
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <CommentItem class="comment-item" :item="comment"></CommentItem>
    <!-- /当前评论项 -->

    <!-- 评论的回复列表 -->
    <van-cell title="全部回复"></van-cell>
    <CommentItem
      class="comment-item"
      v-for="item in list"
      :key="item.com_id"
      :item="item"
    ></CommentItem>
    <!-- /评论的回复列表 -->

    <!-- 底部 -->
    <div class="comment1"></div>
    <div class="bottom">
      <van-button
        type="primary"
        block
        round
        plain
        @click="isAddCommentShow = true"
        >评论</van-button
      >
    </div>
    <!-- /底部 -->
    <!-- 新添加评论 -->
    <van-popup position="bottom" v-model="isAddCommentShow">
      <AddComment
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        v-if="isAddCommentShow"
        @add-comment="
          list.unshift($event);
          isAddCommentShow = false;
          comment.reply_count++;
        "
      ></AddComment>
    </van-popup>
  </div>
</template>

<script>
import AddComment from './AddComment.vue'
import { getCommentList } from '@/api/comment'
import CommentItem from './CommentItem'
export default {
  name: 'CommentReply',
  components: { CommentItem, AddComment },
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      offset: null,
      limit: 10,
      list: [],
      isAddCommentShow: false
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (this.comment.reply_count === 0) {
        return '暂无回复'
      } else {
        return count + '条回复'
      }
    }
  },
  watch: {},
  created () {
    this.getCommentList()
  },
  mounted () { },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList({
          type: 'c',
          source: this.comment.com_id,
          offset: this.offset,
          limit: this.limit
        })
        console.log(res)
        this.list = res.data.data.results
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
.comment-item {
  margin-top: 92px;
}
.comment1 {
  margin-bottom: 110px;
}
.bottom {
  height: 110px;
  width: 750px;
  position: fixed;
  bottom: 0;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: tomato;
}
</style>
