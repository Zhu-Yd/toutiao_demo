<template>
  <div class="container">
    <router-view/>
    <van-tabbar class="layout-tabbar" active-color="#ff0000" route>
      <van-tabbar-item to="/layout/"><span>首页</span><template #icon><i class="iconfont toutiao-shouye"></i></template></van-tabbar-item>
      <van-tabbar-item to="/layout/video"><span>视频</span><template #icon><i class="iconfont toutiao-shipin"></i></template></van-tabbar-item>
      <van-tabbar-item to="/layout/qa"><span>问答</span><template #icon><i class="iconfont toutiao-wenda"></i></template></van-tabbar-item>
      <van-tabbar-item to="/layout/my"><span>{{$store.state.user?'我的':'未登录'}}</span><template #icon><i class="iconfont toutiao-wode"></i></template></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layoutIndex'
}
</script>

<style scoped lang="less">
.container{
  .layout-tabbar{
    .iconfont{
      font-size: 40px;
    }
    span{
      font-size: 20px;
    }
  }
}
</style>
