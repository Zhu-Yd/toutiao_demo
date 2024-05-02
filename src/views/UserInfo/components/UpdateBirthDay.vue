<template>
  <div class="updateBirthDay-container">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="修改生日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
      @cancel="$emit('close')"
/>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { updateUserInfo } from '@/api/user'

export default {
  name: 'UpdateBirthDay',
  props: {
    birthDay: {
      type: [String, Date],
      required: true
    }
  },
  data () {
    return {
      // 将 UTC 时间转换为本地时间
      // const localDate = new Date(date.toLocaleString())
      currentDate: new Date(this.birthDay),
      minDate: new Date(1900, 1, 1),
      maxDate: new Date()
    }
  },
  methods: {
    onConfirm: async function (val) {
      const chooseBirthDay = dayjs(val).format('YYYY-MM-DD')
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateUserInfo({ birthday: chooseBirthDay })
        this.$emit('update:birthDay', val)
        this.$emit('close')
        this.$toast.success('修改生日成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('修改生日失败')
      }
    }
  }
}
</script>

<style scoped>

</style>
