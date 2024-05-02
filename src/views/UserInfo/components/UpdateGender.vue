<template>
<div class="updateGender-container">
  <van-picker
    title="修改性别"
    show-toolbar
    :columns="columns"
    :default-index="gender"
    @confirm="onConfirm"
    @cancel="$emit('close')"
    @change="onChange"
  />
</div>
</template>

<script>
import { updateUserInfo } from '@/api/user'

export default {
  name: 'UpdateGender',
  props: {
    gender: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      chooseGender: this.gender
    }
  },
  methods: {
    onConfirm: async function () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateUserInfo({ gender: this.chooseGender + '' })
        this.$emit('update:gender', this.chooseGender + '')
        this.$emit('close')
        this.$toast.success('修改性别成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('修改性别失败')
      }
    },
    onChange: function (picker, value, index) {
      this.chooseGender = index
    }
  }
}
</script>

<style scoped lang="less">
.updateGender-container{
  /deep/.van-picker-column__wrapper{
  }
}

</style>
