<template>
  <div id="app">
    <button @click="clickBtn">点击请求</button>
    <p>返回结果：</p>
    <div>
      <ul>
        <li v-for="(item, index) in resData" :key="index">
          <label>userId:&nbsp;{{ item.userId }} &nbsp;&nbsp;</label>
          <span>title:&nbsp;{{ item.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      resData: []
    };
  },
  methods: {
    clickBtn() {
      this.axios({url: '/test/posts', method: 'get', data: {userId: 5}})
        .then(res => {
          this.resData = res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
};
</script>
