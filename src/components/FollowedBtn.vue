<template>
    <van-button type="default" plain round size="small"  class="yes" v-if="isFollowed" @click="followFn" :loading="loading">取消关注</van-button>
    <van-button type="warning" round size="small" icon="plus" class="no" v-else @click="followFn" :loading="loading">关注</van-button>
</template>

<script>
import { followUser, unFollowUser } from '@/api/user'

export default {
  name: 'FollowedBtn',
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    autId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    followFn: async function () {
      // console.log('followBtn')
      this.loading = true
      if (this.isFollowed) {
        try {
          await unFollowUser(this.autId)
          this.$emit('update:isFollowed', !this.isFollowed)
        } catch (e) {
          console.log(e)
          this.$toast.fail('取消关注失败')
        }
      } else {
        try {
          await followUser({ to_user_id: this.autId })
          this.$emit('update:isFollowed', !this.isFollowed)
        } catch (err) {
          console.log(err)
          this.$toast.fail('关注用户失败')
        }
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
