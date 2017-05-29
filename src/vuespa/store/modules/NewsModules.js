/**
 * Created by LinChuQiang.
 */
import Vue from 'vue';
import * as type from '../mutationsTypes'

// 注意state没有s
const state={
  newsList: [],
  newsDetl: {}
}

// 可以认为是 store 的计算属性
// 数据过滤处理，保留isdeleted为false 的数据
// 注意：store子模块NewsModules.js内的getters初始化比子组件news.vue为news.newsList传入后台数据要早
// 所以：一开始初始化的state.newsList是空的,自然过滤不到
const getters={
  getNews(state, getters, rootState) {
    console.log('getters.state: ', state);
    console.log('getters.rootState: ', rootState);
    if (state.newsList) {
      return state.newsList.filter(news => {
        return !news.isdelected;
      });
    }
  }
}
const actions={
  // Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
  // 正因为context是对象，所以可以用对象的解构赋值
  // 函数内的 commit = context.commit
  agree({ state, commit, rootState }, newsid) {
    // 基于全局Vue对象使用http
    Vue.http.post('./php/agree.php', { newsid: newsid }, { emulateJSON: true }).then(function (res) {
      // 唤醒mutations中的setAgree方法，将从后台获取到的点赞数更新到Store.state
      commit(type.setAgree, res.body.agree);
    }, function (error) {
      console.log(error);
    });
  }
}

// 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
// 不能直接调用一个 mutation.handler()
// 只是事件注册
// 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方
const mutations={
  // agreeNum为mutation的载荷（Payload）
  // 在大多数情况下，载荷应该是一个对象
  [type.setAgree](state, agreeNum) {
    state.newsDetl.agree += agreeNum;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}