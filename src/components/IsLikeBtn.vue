<template>
    <van-icon :name="attitude?'good-job':'good-job-o'" :class="[attitude?'yes':'no']"  @click="likingFn"></van-icon>

</template>

<script>
import { likingArticle } from '@/api/article'

export default {
  name: 'IsLikeBtn',
  props: {
    attitude: {
      type: Boolean,
      required: true
    },
    target: {
      type: [Number, String],
      required: true
    },
    like_type: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      flag: true // 加锁
    }
  },
  methods: {
    likingFn: async function () {
      if (this.flag) {
        this.flag = false
        if (this.attitude) {
          try {
            await likingArticle({ type: '0', like_type: this.like_type, target: this.target })
            this.$emit('update:attitude', !this.attitude)
            this.$emit('likingCount', false)
          } catch (e) {
            console.log(e)
            this.$toast.fail('取消点赞失败')
          }
        } else {
          try {
            await likingArticle({ type: '1', like_type: this.like_type, target: this.target })
            this.$emit('update:attitude', !this.attitude)
            this.$emit('likingCount', true)
          } catch (e) {
            console.log(e)
            this.$toast.fail('点赞失败')
          }
        }
        this.flag = true
      }
    }
  }
}
</script>

<style scoped>
.yes{
  color: red;
}
</style>
