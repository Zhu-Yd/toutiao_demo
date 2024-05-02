<template>
  <div class="updatePhoto-container">
    <img
      :src="img"
      ref="img"
    />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="done" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserInfo } from '@/api/user'

export default {
  name: 'UpdatePhoto',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 模式
      dragMode: 'move', // 拖动模式
      aspectRatio: 1, // 裁剪框比例
      autoCropArea: 1, // 裁剪框自适应大小
      cropBoxMovable: false, // 裁剪框是否可拖动
      cropBoxResizable: false, // 裁剪框是否可缩放
      background: false
    })
  },
  methods: {
    onConfirm: function () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        // console.log(blob)
        const formData = new FormData()
        formData.append('photo', blob)
        try {
          await updateUserInfo(formData)
          this.$emit('close')
          this.$toast.success({ message: '修改头像成功', onClose: this.$emit('refresh') })
          // console.log(res)
        } catch (err) {
          console.log(err)
          this.$toast.success('修改头像失败')
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .updatePhoto-container{
    background-color: black;
    height: 100%;
    img{
      max-width: 100%;
      display: block;
    }
    .toolbar{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      .cancel,.done{
        width: 90px;
        height: 90px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        color: white;
      }
    }
  }

</style>
