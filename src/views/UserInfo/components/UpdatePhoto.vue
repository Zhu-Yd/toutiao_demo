<template>
  <div class="updatePhoto-container">
<!--    <div class="photo">-->
      <img
      :src="img"
      ref="img"
      crossorigin="anonymous"
    />
<!--    </div>-->
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="done" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.min.css'
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
    image.onload = () => {
      // this.initCropper(image)
    }
    if (image.complete) { // 图片已加载完成
      this.initCropper(image)
    }
  },
  methods: {
    initCropper: function (image) {
      this.$nextTick(() => {
        setTimeout(() => {
          this.cropper = new Cropper(image, {
          // aspectRatio: 16 / 9
            viewMode: 1, // 模式
            dragMode: 'move', // 拖动模式
            aspectRatio: 1, // 裁剪框比例
            autoCropArea: 1, // 裁剪框自适应大小
            cropBoxMovable: false, // 裁剪框是否可拖动
            cropBoxResizable: false, // 裁剪框是否可缩放
            background: false
          })
        }, 2000)
      })
    },
    onConfirm: async function () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      const canvas = this.cropper.getCroppedCanvas()
      const base64Image = canvas.toDataURL()
      const blob = base64toBlob(base64Image)
      const formData = new FormData()
      formData.append('photo', blob)
      try {
        await updateUserInfo(formData)
        this.$emit('close')
        this.$toast.success({ message: '修改头像成功', onClose: this.$emit('refresh') })
      } catch (err) {
        console.log(err)
        this.$toast.success('修改头像失败')
      }
      function base64toBlob (base64Data) {
        const byteString = atob(base64Data.split(',')[1])
        const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0]
        const ab = new ArrayBuffer(byteString.length)
        const ia = new Uint8Array(ab)
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
        }
        return new Blob([ia], { type: mimeString })
      }
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
      object-fit: contain;
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
    .cropper-crop-box{
      z-index: 2005;
    }
  }

</style>
