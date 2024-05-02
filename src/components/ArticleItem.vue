<template>
  <div>
    <van-cell class="cell-item" :to="`/article/${article.art_id}`">
      <template #title>
        <span class="van-multi-ellipsis--l2">{{article.title}}</span>
      </template>
      <template #label>
        <div  class="label-images" v-if="article.cover.type===3">
          <van-image
            v-for="(image,index) in article.cover.images"
            :key="index"
            :src="image"
            fit="cover"
          />
        </div>
        <span>{{article.aut_name}}</span><span>{{article.comm_count}}评论</span><span>{{article.pubdate|timeToNow}}</span>
      </template>
      <template #default v-if="article.cover.type===1">
        <van-image
          fit="cover"
          :src="article.cover.images[0]"
          />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
  .cell-item{
    justify-content: space-between;
    .van-cell__title{
      font-size: 32px;
    }
    .van-cell__label{
      font-size: 22px;
      color:#b4b4b4;
      & span:not(:last-child){
           margin-right:25px ;
      }
    }
    .van-cell__value{
      flex: unset;
      height: 146px;
      width: 232px;
      margin-left: 25px;
      .van-image__img{
        height: 146px;
        width: 232px;
      }
    }
    .label-images{
      display: flex;
      padding: 30px 0;
      .van-image{
        flex: 1;
        height: 146px;
        &:not(:first-child){
        margin-left: 4px;
      }
      }
    }
  }
</style>
