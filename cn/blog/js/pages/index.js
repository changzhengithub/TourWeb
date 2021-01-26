
var Blog = {
  data: function() {
    return {
      blogList: [],
      blogTag: null
    }
  },
  created: function() {
    var _this = this;
    _this.getBannerData();
  },
  methods: {
    getBannerData: function () {
      var _this = this;
      $.getJSON("/cn/src/json/blog.json", function (result) {
        _this.blogList = result.blogList;
      })
    },
    gotoListPage: function(item) {
      var _this = this;
      var page = ''
      switch (item.tag) {
        case 1:
          page = 'tipDetail'
          break;
        case 2:
          page = 'learnDetail'
          break;
      }
      router.push({ name: page, params: {id: item.id}})
    },
    gotoTabPage: function(tag) {
      var _this = this;
      var page = ''
      switch (tag) {
        case 1:
          page = 'tips'
          break;
        case 2:
          page = 'learning-center'
          break;
      }
      router.push({ name: page})
    }
  },
  template: `<div class="blog">
      <div class="blog-tag">
        <div class="tag-item" @click="gotoTabPage(1)"><span>Tips</span> </div>
        <div class="tag-item" @click="gotoTabPage(2)"><span>Learn Center</span> </div>
      </div>
      <div class="blog-list">
        <div class="list-item" v-for="(item, index) in blogList" :key="'key'+index">
          <div class="item-img" @click="gotoListPage(item)">
            <img :src="item.imgUrl" alt="">
          </div>
          <p class='item-time'>{{item.time}}</p>
          <div class="item-title" @click="gotoListPage(item)">
            <p>{{item.title}}</p>
          </div>
        </div>
      </div>
    </div>
    `
}

var Tips = {
  data: function() {
    return {
      blogList: []
    }
  },
  created: function() {
    var _this = this;
    // console.log(_this.$route.params.tag)
    _this.getBannerData();
  },
  methods: {
    getBannerData: function () {
      var _this = this;
      $.getJSON("src/json/blog.json", function (result) {
        for (var i = 0; i < result.blogList.length; i++) {
          if (result.blogList[i].tag == 1) {
            _this.blogList.push(result.blogList[i])
          }
        }
      })
    },
    gotoListPage: function(item) {
      var _this = this;
      var page = ''
      switch (item.tag) {
        case 1:
          page = 'tipDetail'
          break;
        case 2:
          page = 'learnDetail'
          break;
      }
      router.push({ name: page, params: {id: item.id}})
    }
  },
  template: `<div class="blog">
      <div class="blog-list">
        <div class="list-item" v-for="(item, index) in blogList" :key="'key'+index">
          <div class="item-img" @click="gotoListPage(item)">
            <img :src="item.imgUrl" alt="">
          </div>
          <p class='item-time'>{{item.time}}</p>
          <div class="item-title" @click="gotoListPage(item)">
            <p>{{item.title}}</p>
          </div>
        </div>
      </div>
    </div>
    `
}
var LearningCenter = {
  data: function() {
    return {
      blogList: []
    }
  },
  created: function() {
    var _this = this;
    _this.getBannerData();
    
  },
  methods: {
    getBannerData: function () {
      var _this = this;
      $.getJSON("/cn/src/json/blog.json", function (result) {
        for (var i = 0; i < result.blogList.length; i++) {
          if (result.blogList[i].tag == 2) {
            _this.blogList.push(result.blogList[i])
          }
        }
      })
    },
    gotoListPage: function(item) {
      var _this = this;
      var page = ''
      switch (item.tag) {
        case 1:
          page = 'tipDetail'
          break;
        case 2:
          page = 'learnDetail'
          break;
      }
      router.push({ name: page, params: {id: item.id}})
    }
  },
  template: `<div class="blog">
      <div class="blog-list">
        <div class="list-item" v-for="(item, index) in blogList" :key="'key'+index">
          <div class="item-img" @click="gotoListPage(item)">
            <img :src="item.imgUrl" alt="">
          </div>
          <p class='item-time'>{{item.time}}</p>
          <div class="item-title" @click="gotoListPage(item)">
            <p>{{item.title}}</p>
          </div>
        </div>
      </div>
    </div>
    `
}

var BlogDetail = {
  props: ['id'],
  data: function() {
    return {
      detailData: {}
    }
  },
  created: function() {
    var _this = this;
    // console.log(_this.id)
    _this.getData();
  },
  methods: {
    getData: function () {
      var _this = this;
      $.getJSON("/cn/src/json/blog.json", function (result) {
        var blogList = result.blogList;
        for (var i = 0; i < blogList.length; i++) {
          if (blogList[i].id == _this.id) _this.detailData = blogList[i]
        }
      })
    }
  },
  template: `
    <div class="blog-detail">
      <p class='detail-title'>{{detailData.title}}</p>
      <p class='detail-time'>{{detailData.time}}</p>
      <p class='detail-description'>{{detailData.summarize}}</p>
      <div class='detail-banner'>
        <img :src='detailData.imgDetailUrl' alt='news'>
      </div>
    </div>
  `
}

var routes = [
  { path: '/', name: 'home', component: Blog },
  { path: '/tips', name: 'tips', component: Tips},
  { path: '/learning-center', name: 'learning-center', component: LearningCenter},
  { path: '/tips/:id', name: 'tipDetail', component: BlogDetail, props: true},
  { path: '/learning-center/:id', name: 'learnDetail', component: BlogDetail, props: true},
]

var router = new VueRouter({
  mode: 'history',
  base: '/cn/blog/',
  routes: routes
})

var vm = new Vue({
  el: '#app',
  router,
  data: {
    msg: 'Hello Vue'
  }
})