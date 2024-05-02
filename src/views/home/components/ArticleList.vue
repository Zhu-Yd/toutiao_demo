<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      :success-text="refreshText"
      success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem :article="item" v-for="item in list" :key="item.art_id"></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getAticles } from '@/api/article'
import ArticleItem from '@/components/ArticleItem'
export default {
  name: 'ArticleList',
  props: {
    channel: { type: Object, required: true }
  },
  components: { ArticleItem },
  data () {
    return {
      list: [],
      loading: false,
      isLoading: false,
      finished: false,
      error: false,
      totalCount: 0,
      refreshText: '',
      getArticleParams: {
        channel: this.channel.id,
        now_id: undefined
      }
    }
  },
  created () {
  },
  methods: {
    // 数据加载
    async onLoad () {
      // 异步更新数据
      try {
        const { data } = await getAticles(this.getArticleParams)
        // 取到下一次加载的锚点
        this.getArticleParams.now_id = data.now_id
        this.totalCount = data.total_count
        this.list.push(...data.results)
        // 模拟加载失败情况
        // if (Math.random() > 0.5) {
        // console.log(JSON.parse('abcdef'))
        // }
        this.loading = false
        if (data.results.length === 0) {
          this.finished = true
        }
        // console.log(data)
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    // 下拉刷新
    async onRefresh () {
      try {
        // 一次性获取所有数据
        const { data } = await getAticles({ channel: this.channel.id, per_page: this.totalCount })
        for (const item of data.results) {
          // 遍历结果集，如果文章id大于list中第一个元素id，说明文章较新，将该元素插入list头部，否则退出循环
          if (item.art_id > this.list[0].art_id) {
            this.list.unshift(item)
          } else {
            break
          }
        }
        // 模拟刷新失败情况
        // if (Math.random() > 0.5) {
        //   console.log(JSON.parse('abcdef'))
        // }
        this.refreshText = '刷新成功'
        this.isLoading = false
      } catch (err) {
        this.refreshText = '刷新失败'
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
  //设置屏幕滚动，使每个容器有自己的屏幕滚动
  .article-list{
    height: 80vh;
    overflow-y: auto;
  }
</style>
