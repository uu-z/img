<template lang="pug">
  div(id="app")
    Menu(mode="horizontal" theme="light" active-name="1")
      MenuItem(name="1" to="/danboru") danboru
      MenuItem(name="2" to="/pixiv") pixiv
    router-view
</template>

<script>
export default {};
</script>

<style lang="stylus">
@import url('~iview/dist/styles/iview.css');
</style>
