<template>
  <div class="updateNickName-container">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="commit"
    />
    <div class="field-wrap">
      <van-field
      v-model.trim="message"
      rows="1"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
    </div>
  </div>
</template>

<script>
import { updateUserInfo } from '@/api/user'
export default {
  name: 'UpdateNickName',
  props: {
    nickName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: this.nickName
    }
  },
  methods: {
    commit: async function () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateUserInfo({ name: this.message })
        this.$emit('update:nickName', this.message)
        this.$emit('close')
        this.$toast.success('修改昵称成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('修改昵称失败')
      }
    }
  }
}
</script>

<style scoped>

</style>
