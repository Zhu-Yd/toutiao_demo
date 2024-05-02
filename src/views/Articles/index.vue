<template>
  <div class="article-container">
    <van-nav-bar  class="page_nav_bar" fixed left-arrow @click-left="$router.back()">
      <template #right>
        <van-icon name="ellipsis"></van-icon>
      </template>
    </van-nav-bar>
    <div class="loading" v-if="loading">
      <van-loading size="24px" vertical>加载中...</van-loading>
    </div>
    <div v-show="article.art_id">
      <h1 class="title">{{article.title}}</h1>
      <div class="auth-info">
      <div class="left">
        <van-image
         class="avatar"
         round
         fit="cover"
         :src = "article.aut_photo?article.aut_photo:'https://img01.yzcdn.cn/vant/cat.jpeg'">
        </van-image>
        <div class="auth-info-right">
          <div class="name">{{ article.aut_name}}</div>
          <div class="time"> {{ article.pubdate|timeToNow}}</div>
        </div>
      </div>
      <div class="right">
        <!--判断article.is_followed是否为undefined，确保子组件正常接收参数-->
        <FollowedBtn v-if="article.is_followed !== undefined"
                     :isFollowed.sync="article.is_followed"
                     :autId="article.aut_id"
        ></FollowedBtn>
      </div>
    </div>
      <div class="content markdown-body" v-html="article.content" ref="article-content"></div>
      <div class="bottom" v-if="article.art_id">
        <van-button plain round type="default" class="comment-btn" @click="commentPannelFn('A')">写评论</van-button>
        <div class="command-wrap">
          <van-icon name="comment-o" :badge="comment_count" @click="$router.push(`/comments/${article.art_id}`)"></van-icon>
          <IsLikeBtn :attitude.sync="article.attitude" :target="article.art_id" :like_type="0"></IsLikeBtn>
          <CollectedBtn
            class="collect-btn"
            :collect.sync="article.is_collected"
            :art_id="article.art_id"
          ></CollectedBtn>
          <van-icon name="share-o"></van-icon>
        </div>
        <van-popup v-model="commentPannel" round position="bottom" :style="{ height: '30%' }">
          <CommentPannel :replyData="replyData" @isClose="commentPannel=false" @updateCount="comment_count++"></CommentPannel>
        </van-popup>
      </div>
    </div>
    <div class="error error-404" v-show="error_404">
      <van-icon name="failure"></van-icon>
      <div>找不到资源</div>
    </div>
    <div class="error error-others" v-show="error_others">
      <van-icon name="failure"></van-icon>
      <div>加载失败</div>
      <van-button type="default">点击重新加载</van-button>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import { getArticleDetail, getCommentsCount } from '@/api/article'
import FollowedBtn from '@/components/FollowedBtn'
import IsLikeBtn from '@/components/IsLikeBtn'
import CollectedBtn from '@/components/CollectedBtn'
import CommentPannel from '@/views/Articles/components/CommentPannel'
export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  components: { CollectedBtn, FollowedBtn, IsLikeBtn, CommentPannel },
  data () {
    return {
      loading: true,
      error_404: false,
      error_others: false,
      article: {},
      commentPannel: false,
      replyData: { art_id: null, target: null },
      comment_count: 0
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    loadArticle: async function () {
      this.loading = true
      this.error_404 = false
      this.error_others = false
      try {
        const { data } = await getArticleDetail(this.articleId)
        this.article = data.results[0]
        console.log(this.article)
        this.$nextTick(() => {
          // 在 DOM 更新之后执行
          this.previewImg()
          this.loadCommentCount()
        })
      } catch (err) {
        if (err.response.status === 404) {
          this.error_404 = true
        } else {
          this.error_others = true
        }
      }
      this.loading = false
    },
    previewImg: function () {
      const content = this.$refs['article-content']
      // console.log(content)
      const imgs = content.querySelectorAll('img')
      const imgsUrls = []
      imgs.forEach((img, index) => {
        imgsUrls.push(img.src)
        img.addEventListener('click', () => {
          ImagePreview({
            images: imgsUrls,
            startPosition: index
          })
        })
      })
    },
    commentPannelFn: function (type) {
      if (type === 'A') {
        console.log('回复文章')
        this.replyData.art_id = 0
        this.replyData.target = this.article.art_id
      }
      if (type === 'C') {
        console.log('回复评论')
      }
      this.commentPannel = true
    },
    loadCommentCount: async function () {
      const { data } = await getCommentsCount({ target: this.article.art_id })
      this.comment_count = data.count
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container{
  padding-top: 92px;
  background-color: #fff;
  .error{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: gray;
    .van-icon{
      font-size: 100px;
    }
    >div{
      margin: 10px auto;
      font-size: 40px;
    }
    .van-button{
      height: 40px;
    }
  }
  .loading{
    height: 90vh;
    .van-loading{
      height: 100%;
    }
    .van-loading--vertical{
      justify-content: center;
    }
  }
  .title{
    font-size: 39px;
    margin: 45px 30px;
  }
  .auth-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    margin: 0 30px;
    .left{
      display: flex;
      .avatar{
        height: 70px;
        width: 70px;
      }
      .auth-info-right{
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 20px;
        .name{
          font-size: 24px;
          margin-bottom: 8px;
        }
        .time{
          font-size: 22px;
        }
      }
    }
    /deep/.right{
      display: flex;
      align-items: center;
      .van-button.no{
        width: 168px;
        height: 60px;
        background-color: red;
      }
      .van-button.yes{
        width: 168px;
        height: 60px;
      }
    }

  }
  .content{
    margin: 50px 30px;
  }
  .bottom{
    display: flex;
    height: 86px;
    border-top:1px solid #d8d8d8 ;
    padding:0 30px;
    align-items: center;
    .comment-btn{
      width: 276px;
      height: 42px;
      text-align: left;
      .van-button__content{
        justify-content: left;
        color: #a7a7a7;
      }
    }
    /deep/.command-wrap{
      display: flex;
      justify-content: space-between;
      flex: 1;
      height: 48px;
      margin-left: 76px;
      align-items: center;
      .van-button{
        padding: 0;
        border: unset;
        height: 50px;
      }
      .van-icon{
        font-size: 50px;
      }
    }
  }
}
</style>
