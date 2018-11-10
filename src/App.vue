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
#app {
  .vue-waterfall-easy-container {
    .vue-waterfall-easy {
      .img-inner-box{
        border-radius: 5px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15); 
        -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        img {
          border-top-right-radius 5px
          border-top-left-radius 5px
        }
      }
      .img-inner-box::after {
        content: "";
        border-radius: 5px;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        opacity: 0;
        -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
      }
      .img-inner-box:hover {
        -webkit-transform: scale(1.025, 1.025);
        transform: scale(1.025, 1.025);
      }

      .img-inner-box:hover::after {
          opacity: 1;
      }
    }
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
}

</style>
