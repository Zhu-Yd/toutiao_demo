<template>
  <div class="userInfo-container">
    <van-nav-bar class="page_nav_bar"  title="个人信息" left-arrow @click-left="$router.back()">
      <template #right>
        <van-icon name="ellipsis"></van-icon>
      </template>
    </van-nav-bar>
    <input type="file" hidden ref="file" @change="onFileChange">
    <div class="user-info">
      <van-cell title="头像" value="内容" is-link @click="$refs.file.click()">
        <van-image
          class="avatar"
          round
          cover
          :src="userInfo.photo?userInfo.photo:'https://img01.yzcdn.cn/vant/cat.jpeg'"
        />
      </van-cell>
      <van-cell title="昵称" :value="userInfo.name" is-link @click="isUpdateNameShow=true"/>
      <van-cell title="性别" :value="userInfo.gender==0?'男':'女'" is-link @click="isUpdateGenderShow=true"/>
      <van-cell title="生日" :value="userInfo.birthday|dayFormat" is-link @click="isUpdateBirthDayShow=true"/>
    </div>
    <van-popup
      v-model="isUpdateNameShow"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <UpdateNickName v-if="isUpdateNameShow" @close="isUpdateNameShow=false" :nickName.sync="userInfo.name"></UpdateNickName>
    </van-popup>
    <van-popup
      v-model="isUpdateGenderShow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <UpdateGender v-if="isUpdateGenderShow" @close="isUpdateGenderShow=false" :gender.sync="userInfo.gender"></UpdateGender>
    </van-popup>
    <van-popup
      v-model="isUpdateBirthDayShow"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <UpdateBirthDay v-if="isUpdateBirthDayShow" @close="isUpdateBirthDayShow=false" :birthDay.sync="userInfo.birthday"></UpdateBirthDay>
    </van-popup>
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdatePhoto :img="img" @close="isUpdatePhotoShow= false" @refresh="$router.go(0)" v-if="isUpdatePhotoShow"></UpdatePhoto>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import UpdateNickName from '@/views/UserInfo/components/UpdateNickName'
import UpdateGender from '@/views/UserInfo/components/UpdateGender'
import UpdateBirthDay from '@/views/UserInfo/components/UpdateBirthDay'
import UpdatePhoto from '@/views/UserInfo/components/UpdatePhoto'
export default {
  name: 'UserInfoIndex',
  components: { UpdatePhoto, UpdateGender, UpdateNickName, UpdateBirthDay },
  data () {
    return {
      userInfo: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthDayShow: false,
      isUpdatePhotoShow: false,
      img: null
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo: async function () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
    onFileChange: function () {
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      // 使用完毕清空file的值
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.userInfo-container{
  .user-info{
    .avatar{
      width: 60px;
      height: 60px;
    }
  }
}

</style>
