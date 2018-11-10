<template lang="pug">
   Menu(mode="horizontal" theme="dark" )
      MenuItem(name="1" to="/danboru") Danboru
      MenuItem(name="2" to="/pixiv") Pixiv
      .ButtonGroup
        Button(shape="circle" type="text" icon="logo-github" @click="goGithub")
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
