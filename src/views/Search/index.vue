<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
        background="red"
        @search="onSearch"
        @cancel="onCancel"
        @input="onInput"
        @focus="isShow=true"
      />
    </form>
    <SearchContent
      v-show="isShow"
      :searchValue="searchValue"
      :contentType="contentType"
      :recommend="recommendList"
      :searchResult="searchResult"
      @clickHistoryItem="clickHistoryItem">
    </SearchContent>
  </div>
</template>

<script>
import SearchContent from '@/views/Search/components/SearchContent'
import { getRecommendSearch, searchArticles, addUserHistory } from '@/api/search'
import _ from 'lodash'
export default {
  name: 'searchIndex',
  data () {
    return {
      searchValue: '',
      contentType: 1,
      recommendList: [],
      searchResult: [],
      isShow: false
    }
  },
  components: { SearchContent },
  methods: {
    onSearch: async function (value) {
      // this.$toast('搜索')
      this.contentType = 3
      const { data } = await searchArticles({ keys: value })
      this.searchResult = data.result
      await addUserHistory({ keys: value })
    },
    onCancel: function () {
      // this.$toast('取消')
      this.$router.back()
    },
    clickHistoryItem: function (keys) {
      this.searchValue = keys
    },
    onInput: _.debounce(async function (value) {
      if (this.searchValue.trim()) {
        this.contentType = 2
      } else {
        this.contentType = 1
      }
      this.recommendList = await getRecommendSearch({ keys: value })
      // console.log(this.recommendList)
    }, 500)
  }
}
</script>

<style scoped lang="less">
  .search-container{
    .van-search__action{
      color: white;
    }
  }
</style>
