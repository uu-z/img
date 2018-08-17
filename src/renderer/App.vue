<template lang="pug">
  div(id="app")
    Menu(mode="horizontal" theme="dark" active-name="1")
      MenuItem(name="1")
        router-link(to="/danboru") danboru
      MenuItem(name="2")
        router-link(to="/pixiv") pixiv
    router-view
</template>

<script>
export default {
  name: "crawl"
};
</script>

<style lang="stylus">
@import url('~iview/dist/styles/iview.css')
@import url('~viewerjs/dist/viewer.css')
</style>
