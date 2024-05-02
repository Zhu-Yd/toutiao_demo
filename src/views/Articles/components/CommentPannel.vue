<template>
  <div class="comment-container">
    <van-field
      v-model.trim="message"
      rows="5"
      autosize
      label="留言"
      type="textarea"
      maxlength="150"
      placeholder="请输入..."
      show-word-limit
    />
    <van-button v-if="message" type="default"  size="large" class="comment-btn" @click="commitComment">发布</van-button>
  </div>
</template>

<script>
import { addComments } from '@/api/article'
export default {
  name: 'CommentPannel',
  props: {
    replyData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  created () {
    // console.log(this.replyData)
    if (this.replyData.content) {
      this.message = `@${this.replyData.content}//`
    }
  },
  methods: {
    commitComment: async function () {
      try {
        await addComments({ ...this.replyData, content: this.message })
        this.$toast.success('发布评论成功')
        this.message = ''
        this.$emit('updateCount')
        this.$emit('isClose')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="less">
  .comment-container{
    display: flex;
    padding: 30px 20px;
    align-items: center;
    /deep/.van-field{
      background-color: #f2f3f5;
      border-radius: 10px;
      .van-field__label{
        width: auto
      }
    }
    .comment-btn{
      height: 100px;
      width: 100px;
      font-size: 25px;
      border-radius: 10px;
      margin-left: 20px;
      border: 5px solid orange;
    }
  }

</style>
