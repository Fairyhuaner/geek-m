<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell title="我的频道" :border="false">
      <van-button
        size="mini"
        round
        type="danger"
        plain
        @click="isCloseShow = !isCloseShow"
        >{{ isCloseShow ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="grid-item"
        v-for="(item, index) in channels"
        :key="item.id"
      >
        <!-- 编辑按钮显示隐藏 -->
        <van-icon slot="icon" name="clear" v-show="isCloseShow"></van-icon>
        <span
          slot="text"
          :style="{ color: active === index ? 'red' : '' }"
          class="text"
          @click="onclick(index)"
          >{{ item.name }}</span
        >
      </van-grid-item>
    </van-grid>
    <!-- 我的频道 -->
    <!-- 频道推荐 -->
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="grid-item"
        v-for="(recommend, index) in recommendArticleList"
        :key="index"
        :text="recommend.name"
        @click="add(item.id)"
        van-ellipsis
      />
    </van-grid>
    <!-- 频道推荐 -->
  </div>
</template>

<script>
import { getAllArticleList, saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'ChannelPanel',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getAllArticleList()
  },
  data () {
    return {
      recommendArticleList: [],
      isCloseShow: false
    }
  },
  methods: {
    async getAllArticleList () {
      try {
        const { data } = await getAllArticleList()
        this.recommendArticleList = data.data.channels.filter(allChannels => this.channels.every(item => item.id !== allChannels.id))
      } catch (err) {
        console.log(err)
      }
    },
    onclick (index) {
      if (this.isCloseShow) {
        if (index === 0) return
        // 删除
        const obj = this.channels[index]
        this.channels.splice(index, 1)
        this.recommendArticleList.push(obj)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        // 切换高亮active
        this.$emit('change-event', index)
      }
    }
  },
  computed: {
  },
  watch: {
    channels: {
      async handel (newVal) {
        if (this.$store.state.user && this.store.state.user.token) {
          // 登录
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          // 没有登录
          setItem(CHANNELS, newVal)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        color: #222;
        font-size: 28px;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
        }
      }
    }
  }
  .van-button--plain.van-button--danger {
    width: 90px;
  }
}
</style>
