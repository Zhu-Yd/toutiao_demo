<template>
  <div class="searchContentContainer">
    <van-cell-group class="recommend" v-show="contentType===1">
      <van-cell title="搜索历史">
        <template #default>
          <div @click="confirmDeleteHistory">全部删除</div>
        </template>
      </van-cell>
      <van-cell :title="item"  icon="search" v-for="(item,index) in historyList" :key="index" @click="clickFn(item)">
        <template #right-icon>
          <van-icon name="delete" class="delete" @click.stop="deleteHistoryList(item)"/>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="recommend" v-show="contentType===2">
      <van-cell  icon="search" v-for="(item,index) in recommend" :key="index" @click="clickFn(item)" >
        <template #title>
          <span v-html="highlight(item)"></span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="recommend" v-show="contentType===3">
      <div v-if="searchResult.length===0">
        <van-image class="no-content-image"
                     fit="cover"
                     :src="require('../../../assets/no-content.png')"
        />      </div>
      <van-cell v-else :title="item.title" icon="newspaper-o" v-for="(item,index) in searchResult" :key="index" @click="clickResFn(item)" />
    </van-cell-group>
  </div>
</template>

<script>
import { getUserHistory, deleteUserHistory } from '@/api/search'

export default {
  name: 'SearchContent',
  props: {
    contentType: {
      type: Number,
      required: true
    },
    recommend: {
      type: Array,
      required: true
    },
    searchValue: {
      type: String,
      required: true
    },
    searchResult: {
      type: [],
      required: true
    }
  },
  data () {
    return {
      historyList: []
    }
  },
  created () {
    this.loadContent()
  },
  watch: {
    // 侦听searchValue的值，如果为空，则调用获取搜索历史函数重新获取用户搜索历史列表
    searchValue: function (val) {
      if (val.length === 0) {
        console.log('侦听到搜索属性为空')
        this.getHistoryList()
      }
    }
  },
  methods: {
    loadContent: async function () {
      if (this.contentType === 1) {
        this.getHistoryList()
      }
    },
    getHistoryList: async function () {
      const { data } = await getUserHistory()
      this.historyList = data.slice(0, 5)
    },
    deleteHistoryList: async function (keys) {
      await deleteUserHistory({ keys: keys })
      this.getHistoryList()
    },
    confirmDeleteHistory: async function () {
      this.$dialog.confirm({
        title: '是否清空搜索历史记录'
      })
        .then(() => {
          // on confirm
          this.deleteHistoryList('')
        })
        .catch(() => {
          // on cancel
          console.log('取消清空操作')
        })
    },
    clickFn: function (keys) {
      this.$emit('clickHistoryItem', keys)
    },
    highlight: function (value) {
      return value.replace(this.searchValue, `<span style="color: red;">${this.searchValue}</span>`)
    },
    clickResFn: function (item) {
      console.log(item)
      this.$router.push({ name: 'article_desc', params: { articleId: item.id } })
    }
  }
}
</script>

<style scoped lang="less">
  .searchContentContainer{
    .no-content-image{
      width: 100vw;
      height: 100vh;
    }
  }

</style>
