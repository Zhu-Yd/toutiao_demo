<template>
  <div>
    <van-nav-bar class="page_nav_bar" fixed left-arrow @click-left="$router.back()">
      <template #right>
        <van-icon name="ellipsis"></van-icon>
      </template>
    </van-nav-bar>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="placeholder"></div>
      <CommentItems v-for="item in list" :key="item.com_id" :comment="item" :art_id="articleId"></CommentItems>
    </van-list>
  </div>
</template>

<script>
import CommentItems from '@/views/Comments/components/CommentItems'
import { getComments } from '@/api/article'
export default {
  name: 'CommentsIndex',
  components: { CommentItems },
  props: {
    articleId: {
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
        source: this.articleId,
        type: 'a',
        offset: 0,
        limit: 2
      }
    }
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
    }
  }
}
</script>

<style scoped lang="less">
.placeholder{
  height: 86px;
}
/deep/.comments-container{
  //&:first-child {
  //  padding: 110px 33px 20px 26px;
  //}
  //&:not(:first-child) {
  //  padding: 24px 33px 20px 26px;
  //}
  padding: 24px 33px 20px 26px;
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
    .right{
      display: flex;
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
