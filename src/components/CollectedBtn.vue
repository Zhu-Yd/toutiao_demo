<template>
  <van-button :icon="collect?'star':'star-o'" :class="{yes:collect}" @click="collectedFn"></van-button>
</template>

<script>
import { collectedArticle } from '@/api/article'

export default {
  name: 'CollectedBtn',
  props: {
    collect: {
      type: Boolean,
      required: true
    },
    art_id: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      flag: true // 加锁
    }
  },
  methods: {
    collectedFn: async function () {
      if (this.flag) {
        this.flag = false
        if (this.collect) {
          try {
            await collectedArticle({ type: '0', target: this.art_id })
            this.$emit('update:collect', !this.collect)
          } catch (e) {
            console.log(e)
            this.$toast.fail('取消收藏失败')
          }
        } else {
          try {
            await collectedArticle({ type: '1', target: this.art_id })
            this.$emit('update:collect', !this.collect)
          } catch (e) {
            console.log(e)
            this.$toast.fail('收藏失败')
          }
        }
        this.flag = true
      }
    }
  }
}
</script>

<style scoped lang="less">
  .yes{
    color: orange;
  }

</style>
