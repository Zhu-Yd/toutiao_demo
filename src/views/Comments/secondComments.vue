<template>
  <div>
    <van-nav-bar class="page_nav_bar" fixed left-arrow @click-left="$router.back()">
      <template #right>
        <van-icon name="ellipsis"></van-icon>
      </template>
    </van-nav-bar>
    <div class="comments-container main-comment">
    <div class="comment">
      <div class="header">
        <div class="left">
          <van-image
            round
            width="36px"
            height="36px"
            cover
            :src="comment.aut_photo?comment.aut_photo:'https://img01.yzcdn.cn/vant/cat.jpeg'"></van-image>
          <span class="auth-name">{{ comment.aut_name }}</span>
        </div>
        <div class="right master">楼主</div>
      </div>
      <div class="content">
        <span>{{ comment.content }}</span>
      </div>
      <div class="footer">
        <span>{{ comment.pubdat |timeFormat }} ·</span>
        <van-button
          type="default"
          round
          plain
          size="small"
          @click="commentPannelFn(2,comment)"
        > {{ comment.reply_count}}回复</van-button>
      </div>
    </div>
  </div>
    <div class="hr"/>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItems v-for="item in list" :sonComment="true" :key="item.com_id" :comment="item" @replyPannel="commentPannelFn(3,$event)"></CommentItems>
    </van-list>
    <van-popup v-model="commentPannel" round position="bottom" :style="{ height: '30%' }">
          <CommentPannel v-if="commentPannel" :replyData="replyData" @isClose="commentPannel=false" @updateCount="onRefresh()"></CommentPannel>
    </van-popup>
  </div>
</template>

<script>
import CommentItems from '@/views/Comments/components/CommentItems'
import CommentPannel from '@/views/Articles/components/CommentPannel'
import { getComments, getComment } from '@/api/article'
export default {
  name: 'secondComments',
  components: { CommentItems, CommentPannel },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    },
    commentId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      commentParams: {
        source: this.commentId,
        type: 'c',
        offset: 0,
        limit: 2
      },
      commentPannel: false,
      comment: {},
      replyData: { art_id: this.articleId, target: null }
    }
  },
  created () {
    this.loadMainComment(this.commentId)
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        const { data } = await getComments(this.commentParams)
        if (data.totle_count !== 0) {
          this.list.push(...data.results)
          // console.log(data)
          // console.log(this.list)
          this.commentParams.offset = data.last_id
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (!data.results || data.results.length === 0) {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
      }
    },
    loadMainComment: async function (comId) {
      const { data } = await getComment({ target: comId })
      this.comment = data
    },
    commentPannelFn: function (type, comment) {
      this.commentPannel = true
      this.replyData.target = this.commentId
      if (type === 3) {
        this.replyData.content = comment.content
      }
    },
    onRefresh: function () {
      this.$router.go(0)
    }
  }
}
</script>

<style scoped lang="less">
.main-comment{
  padding:110px 33px 20px 26px !important;
}
.hr{
  height: 2px;
  width: 100vw;
}
/deep/.comments-container{
  &:first-child {
    padding: 50px 33px 20px 26px;
  }
  &:not(:first-child) {
    padding: 24px 33px 20px 26px;
  }
  //height: 100vh;
  background-color: #fff;
  .header{
    display: flex;
    justify-content: space-between;
    .left{
      display: flex;
      align-items: start;
      .auth-name{
        font-size: 26px;
        margin-left: 26px;
      }
    }
    .master{
      width: 60px;
      height: 30px;
      font-size: 26px;
      color: #fff;
      font-weight: 500;
      background-color: darkred;
      line-height: 30px;
      text-align: center;
      border-radius: 10px;
    }
    .right{
      display: flex;
      justify-content: center;
      align-items: start;
      span{
        font-size: 20px;
        margin-left: 8px;
      }
      .van-icon{
        font-size: 29px;
        color: orangered;
      }
    }
  }
  .content{
    width: 555px;
    margin-left: 98px;
    margin-top: -20px;
    font-size: 31px;
  }
  .footer{
    display: flex;
    align-items: center;
    margin-left: 98px;
    font-size: 20px;
    .van-button{
      width: 136px;
      height: 52px;
      background-color: #f4f5f6;
      border: unset;
      margin-left: 26px;
    }
  }
}
</style>
