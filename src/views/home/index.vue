<template>
  <div class="container">
    <van-nav-bar class='page_nav_bar' fixed>
      <template #title>
        <van-button size="small" round type="default" class="search_btn" icon="search" @click="$router.push('/search')">搜索</van-button>
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated swipeable>
      <van-tab v-for="item in channels " :title="item.name" :key="item.id"><ArticleList :channel="item"></ArticleList></van-tab>
      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburger-btn" @click="showMoreChanels">
          <i class="iconfont toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <!--更多频道的面板-->
    <van-popup
      v-model="showMore"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left">
      <ChannelsPannel :myChannels="channels" :active="active" @isSelect="selectFn"></ChannelsPannel>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from '@/views/home/components/ArticleList'
import ChannelsPannel from '@/views/home/components/ChannelsPannel'
import { mapState } from 'vuex'
import { getItems } from '@/utils/storage'

export default {
  name: 'homeIndex',
  data () {
    return {
      active: 0,
      showMore: false,
      channels: []
    }
  },
  components: { ArticleList, ChannelsPannel },
  created () {
    this.loadChannels()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.channels
      } catch (e) {
        console.log(e)
        // this.$toast('获取频道列表失败')
      }
      // 如果未登录但本地存储有值，则用本地存储的频道列表
      if (!this.user) {
        const channels = getItems('TOUTIAO_CHANNELS')
        if (channels) {
          this.channels = channels
        }
      }
    },
    showMoreChanels () {
      this.showMore = true
    },
    selectFn (item, isShow) {
      this.active = item
      this.showMore = isShow
    }
  }
}
</script>

<style scoped lang="less">
.container{
  padding-top: 180px ;
  padding-bottom: 100px;
  /deep/.page_nav_bar{
    .van-nav-bar__title{
      max-width: unset;
      .van-icon{
        color: #0C0C0C;
        font-size: 32px;
      }
    }
    .search_btn{
      width: 555px;
      height: 64px;
      border: none;
      font-size: 27px;
    }
  }
  /deep/.van-tabs__wrap{
    position: fixed;
    top:92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 83px;
    .van-tab{
      width: 192px;
      border-right: 1px solid orange;
      font-size: 27px;
      color: #777777;
    }
    .van-tab--active{
      color: #0C0C0C;
    }
    .van-tabs__nav{
      padding-bottom: 0;
    }
    .van-tabs__line{
      background-color: purple;
      width: 31px;
      height: 6px;
      bottom:9px;
      z-index: unset;
    }
  }
  .placeholder{
    width: 66px;
    flex-shrink: 0;
  }
  .hamburger-btn{
    display: flex;
    position: fixed;
    right: 0;
    justify-content: center;
    align-items: center;
    height: 82px;
    width: 66px;
    flex-shrink: 0;
    background-color: #fff;
    opacity: 0.9;
    i.iconfont{
      font-size: 33px;
    }
    &:before{
      content: '';
      position: absolute;
      left: 0;
      background-image: url("~@/assets/gradient-gray-line.png");
      background-size: contain;
      width: 1px;
      height: 100%;
    }
  }
}

</style>
