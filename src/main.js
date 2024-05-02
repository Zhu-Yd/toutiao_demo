import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import '@/utils/flexible'
import '@/utils/dayjs'
import '@/mock'
import {
  Toast,
  Button,
  NavBar,
  Form,
  Field,
  Uploader,
  CountDown,
  Tabbar,
  TabbarItem,
  Image as VanImage,
  Col,
  Row,
  Grid,
  GridItem,
  Cell,
  CellGroup,
  Dialog,
  Tab,
  Tabs,
  List,
  PullRefresh,
  Popup,
  Icon,
  Search,
  ImagePreview,
  Loading,
  Picker,
  DatetimePicker
} from 'vant'

Vue.config.productionTip = false
Vue.use(Toast).use(Button).use(NavBar).use(Form).use(Field).use(Uploader).use(CountDown).use(Tabbar).use(TabbarItem)
  .use(VanImage).use(Col).use(Row).use(Grid).use(GridItem).use(Cell).use(CellGroup).use(Dialog).use(Tab).use(Tabs)
  .use(List).use(PullRefresh).use(Popup).use(Icon).use(Search).use(ImagePreview).use(Loading).use(Picker).use(DatetimePicker)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
