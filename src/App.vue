<template lang="pug">
  div(id="app")
    Topmenu
    router-view
</template>

<script>
export default {};
</script>

<style lang="stylus">
@import url('~iview/dist/styles/iview.css');

body {
  background: #151c2d;
}

#app {
  .vue-waterfall-easy-container {
    .vue-waterfall-easy {
      .img-inner-box {
        border-radius: 5px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        -webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

        img {
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
          opacity: 0.85;
        }

        img:hover {
          opacity: 0.9;
        }
      }

      .img-inner-box::after {
        content: '';
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
    background: #21243a;
    border-color: #21243a;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: center;
  }

  .ivu-input-group {
    .ivu-input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .ivu-input {
    background: #21243a;
    border: none;
    color: rgba(255, 255, 255, 0.8);
    border-radius: 50px;
    text-indent: 10px;
  }

  .ivu-tag {
    background: #21243a;
    border: none;
    border-radius: 25px;

    .ivu-tag-text {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .ivu-select-selection {
    background: #21243a;
    color: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 50px;
    text-indent: 10px;
  }

  .ivu-select-item {
    background: #21243a;
    color: rgba(255, 255, 255, 0.5);
  }

  .ivu-select-item-selected {
    color: #2d8cf0;
  }

  .ivu-select-dropdown {
    background: #21243a;
  }

  ::-webkit-scrollbar {
    background: rgba(255, 255, 255, 0.05);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 100px;
  }

  .ivu-date-picker-cells-cell-prev-month, .ivu-date-picker-cells-cell-next-month {
    em {
      color: rgba(255, 255, 255, 0.15);
    }
  }

  em {
    color: rgba(255, 255, 255, 0.5);
  }
}
</style>
