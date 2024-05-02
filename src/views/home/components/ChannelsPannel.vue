<template>
  <div class="channel-container">
    <van-cell title="我的频道" center :border=false>
      <template #default>
        <van-button class="edit-btn" type="warning" plain round size="small" @click="isEditFn">{{isEdit?'完成':'编辑'}}</van-button>
      </template>
    </van-cell>
    <van-grid :gutter="11" class="my-channel-grid">
      <van-grid-item v-for="(item,index) in myChannels" :class="{active:active===index}" :key="item.id" :text="item.name" @click="isSelectFn(item,index)">
        <template #icon >
          <van-icon name="close" v-show="isEdit&&(!whiteList.find(obj=>{return item.id===obj}))?true:false"></van-icon>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" center :border=false>
    </van-cell>
    <van-grid :gutter="11" direction="horizontal" class="recommend-channel-grid">
        <van-grid-item v-for="item in getRecommendChannels" icon="plus" :key="item.id" :text="item.name"
                       @click="addChannel(item)"/>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, updateChannels } from '@/api/channels'
import { mapState } from 'vuex'
import { setItems } from '@/utils/storage'

export default {
  name: 'ChannelsPannel',
  data () {
    return {
      isEdit: false,
      allChannels: [],
      whiteList: [7]
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getAllChannelsFn()
  },
  computed: {
    getRecommendChannels () {
      return this.allChannels.filter((item, index) => {
        return !this.myChannels.find(myChannel => {
          return myChannel.id === item.id
        })
      })
    },
    ...mapState(['user'])
  },
  methods: {
    async isEditFn () {
      if (this.isEdit) {
        if (this.user) {
          try {
            await updateChannels({ channels: this.myChannels })
          } catch (err) {
            this.$toast('更改用户频道列表失败')
            console.log(err)
          }
        } else {
          setItems('TOUTIAO_CHANNELS', this.myChannels)
        }
        this.$toast.success('更改频道列表成功')
      }
      this.isEdit = !this.isEdit
    },
    async getAllChannelsFn () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.channels
      } catch (err) {
        this.$toast('获取全部频道列表失败')
      }
    },
    addChannel (channel) {
      if (this.isEdit) {
        this.myChannels.push(channel)
        this.refreshOrder()
      }
    },
    isSelectFn (item, index) {
      if (this.isEdit) {
        // 如果为编辑状态且不在白名单内，从myChannels中删除
        if (!this.whiteList.find(obj => { return item.id === obj })) {
          this.myChannels.splice(index, 1)
          this.refreshOrder()
          if (index < this.active) {
            this.$emit('isSelect', this.active - 1, true)
          }
        }
      } else {
        // 如果为非编辑状态，选中此频道
        this.$emit('isSelect', index, false)
      }
    },
    // 每次修改myChannels之后，调用此函数对myChannels重新排序
    refreshOrder () {
      this.myChannels.forEach((item, index) => {
        item.seq = index
      })
    }
  }
}
</script>

<style scoped lang="less">
  .channel-container{
    padding-top: 82px;
    .my-channel-grid{
      /deep/.van-grid-item__icon-wrapper{
        position: unset;
      }
      .van-icon{
        position: absolute;
        top: -5px;
        right: -5px;
      }
      /deep/.active{
        .van-grid-item__text {
          color: red;
        }
      }
    }
    .van-cell__title{
      font-size: 29px;
    }
    .van-cell__value{
      display: flex;
      justify-content: right;
      align-items: center;
      .edit-btn{
        width: 105px;
        height: 43px;
        font-size: 28px;
      }
    }
    /deep/.van-grid-item__content{
      width: 157px;
      height: 85px;
      font-size: 27px;
      background-color: #f4f5f6;
    }
    /deep/.recommend-channel-grid{
      .van-icon{
        font-size: 25px;
      }
      .van-grid-item__text{
          margin-left: 7px;
      }
    }
  }

</style>
