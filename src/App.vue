<template lang="pug">
  div(id="app")
    Menu(mode="horizontal" theme="light" )
      MenuItem(name="1" to="/danboru") danboru
      MenuItem(name="2" to="/pixiv") pixiv
    router-view
</template>

<script>
export default {};
</script>

<style lang="stylus">
@import url('~iview/dist/styles/iview.css');

body {
  background: #f5f5f5;
}

.ivu-menu-horizontal {
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: center;
}
</style>
