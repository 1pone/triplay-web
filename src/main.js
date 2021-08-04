import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'amfe-flexible'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  Button,
  NavBar,
  Cell,
  CellGroup,
  Calendar,
  Col,
  Row,
  Form,
  Field,
  CountDown,
  Divider,
  Tag,
  Toast,
  Tabbar,
  TabbarItem,
  Image as VanImage,
  Grid,
  GridItem,
  Dialog,
  Popup,
  Picker,
  DatetimePicker,
  Tab,
  Tabs,
  Icon,
  PullRefresh,
  Progress,
  List,
  Search,
  Stepper,
  Step,
  Steps,
} from 'vant'

const plugins = [
  Button,
  NavBar,
  Cell,
  CellGroup,
  Calendar,
  Col,
  Row,
  Divider,
  Form,
  Field,
  CountDown,
  Tag,
  Toast,
  Tabbar,
  TabbarItem,
  VanImage,
  Grid,
  GridItem,
  Dialog,
  Popup,
  Picker,
  DatetimePicker,
  Tab,
  Tabs,
  Icon,
  PullRefresh,
  Progress,
  List,
  Search,
  Stepper,
  Step,
  Steps,
]
import '@/assets/icons/iconfont.css'
import '@/assets/css/global.less'
import axios from 'axios'
plugins.forEach(plugin => {
  Vue.use(plugin)
})

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

// 开启跨域允许cookie
axios.defaults.withCredentials = true;


Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
Vue.filter('datetime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})

Vue.config.productionTip = false
Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')