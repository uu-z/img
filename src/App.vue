<template lang="pug">
  div(id="app")
    Menu(mode="horizontal" theme="light" )
      MenuItem(name="1" to="/danboru") Danboru
      MenuItem(name="2" to="/pixiv") Pixiv
      .ButtonGroup
        Button(shape="circle" type="text" icon="logo-github" @click="goGithub")
        //- Button(shape="circle" type="text" icon="logo-twitter")

    router-view
</template>

<script>
export default {
	methods: {
		goGithub() {
			window.location.href = 'https://github.com/uu-z/img';
		}
	}
};
</script>

<style lang="stylus">
@import url('~iview/dist/styles/iview.css');

body {
  background: #f5f5f5;
}

.ButtonGroup {
  align-self: center;
  right: 2vw;
  position: absolute;
  display: flex;
}

.ivu-menu-horizontal {
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: center;
}
</style>
