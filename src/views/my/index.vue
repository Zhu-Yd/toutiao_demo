<template>
  <div class="container">
    <div class="my-header unlogin" v-if="!user">
      <div class="unlogin-btn" @click="$router.push('/login')">
        <van-image class="avatar"
                     round
                     fit="cover"
                     :src="require('../../assets/mobile.png')"
        />
        <span class="text">登录/注册</span>
      </div>
    </div>
    <div class="my-header loggin" v-else>
      <div class="user-info">
        <div class="left">
          <van-image class="avatar"
                     round
                     fit="cover"
                     :src="userInfo.photo?userInfo.photo:'https://img01.yzcdn.cn/vant/cat.jpeg'"
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button type="default" round plain size="mini" to="/userInfo">编辑资料</van-button>
        </div>
      </div>
      <div class="user-detail">
        <van-row type="flex" justify="space-around">
          <van-col span="6">
            <div class="items"><span>{{userInfo.art_count}}</span><span>头条</span></div>
          </van-col>
          <van-col span="6">
            <div class="items"><span>{{userInfo.fans_count}}</span><span>关注</span></div>
          </van-col>
          <van-col span="6">
            <div class="items"><span>{{userInfo.follow_count}}</span><span>粉丝</span></div>
          </van-col>
          <van-col span="6">
            <div class="items"><span>{{userInfo.like_count}}</span><span>获赞</span></div>
          </van-col>

        </van-row>
      </div>
    </div>
    <div class="my-body">
      <div class="options">
        <van-grid :column-num="2" clickable>
          <van-grid-item text="收藏" to="/">
            <template #icon>
              <i class="iconfont toutiao-shoucang"></i>
            </template>
          </van-grid-item>
          <van-grid-item text="历史" to="/">
            <template #icon>
              <i class="iconfont toutiao-lishi"></i>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="lists">
        <!--        <van-cell-group>-->
        <van-cell title="消息通知" is-link to="/"/>
        <van-cell title="小智同学" is-link to="/"/>
        <van-cell title="退出登录" class="logout" v-if="user" @click="logout" clickable></van-cell>
        <!--        </van-cell-group>-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo, getTargetUserInfo } from '@/api/user'
export default {
  name: 'myIndex',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      this.getUser()
    }
  },
  methods: {
    logout () {
      this.$dialog.confirm({
        title: '是否确认退出'
      }).then(() => {
        // on confirm
        console.log('确认退出')
        this.$store.commit('setUser', null)
      }).catch(() => {
        // on cancel
        console.log('取消')
      })
    },
    async getUser () {
      try {
        const { data } = await getUserInfo()
        const userinfo = await getTargetUserInfo(data.id)
        this.userInfo = userinfo.data
      } catch (err) {
        this.$toast.fail({
          message: '信息过期 请重新登录',
          duration: 3000
        })
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.container {
  .my-header {
    height: 400px;
    background: url("~@/assets/banner.png");
    background-size: cover;
    color: #fff;
     &.unlogin{
       display: flex;
       justify-content: center;
       align-items: center;
       .unlogin-btn{
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         .avatar{
           height: 128px;
           width: 128px;
         }
         .text{
           margin-top: 10px;
           font-size: 32px;
         }
       }
    }
    .user-info {
      height: 231px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 116px 32px 55px;

      .left {
        display: flex;
        align-items: center;

        .avatar {
          width: 132px;
          height: 132px;
          border: 2px solid #fff;
          margin-right: 14px;
        }

        span {
          font-size: 29px;
        }
      }

      .right {
        font-size: 20px;
      }

    }

    .user-detail {
      height: 129px;

      .items {
        display: flex;
        flex-direction: column;
        height: 66px;
        margin-top: 32px;
        align-items: center;
        justify-content: center;

        span {
          &:nth-child(1) {
            font-size: 26px;
          }

          &:nth-child(2) {
            font-size: 22px;
          }
        }
      }
    }
  }

  .my-body {
    /deep/ .options {
      i {
        font-size: 45px;
        color: red;
      }

      .van-grid-item__text {
        font-size: 27px;
      }
    }

    .lists {
      margin-top: 10px;

      .logout {
        margin-top: 9px;
        text-align: center;
      }

    }
  }
}
</style>
