<template>
  <div class="comments-container">
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
        <div class="right">
          <IsLikeBtn :attitude.sync="comment.is_liking" :target="comment.com_id" :like_type="1" @likingCount="$event?comment.like_count++:comment.like_count--"></IsLikeBtn>
          <span v-show="comment.like_count">{{comment.like_count}}</span>
        </div>
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
          @click="art_id?$router.push(`/secondComments/${art_id}/${comment.com_id}`):$emit('replyPannel',comment)"
        > {{sonComment?'':comment.reply_count}}回复</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import IsLikeBtn from '@/components/IsLikeBtn'
export default {
  name: 'CommentItems',
  components: { IsLikeBtn },
  props: {
    comment: {
      type: Object,
      required: true
    },
    art_id: {
      type: [String, Number],
      default: 0
    },
    sonComment: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
