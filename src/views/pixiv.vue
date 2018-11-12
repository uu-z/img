<template lang="pug">
  .pixiv
    .toolbox(v-if="$refs.waterfall" :style="{ maxWidth: waterfallWidth + 'px'}")
      Select(v-model="options.params.mode" @on-change="reload" :style="{flex: 1}")
        Option(v-for="item in modes" :value="item.mode" :key="item.mode") {{item.label}}
      DatePicker(:style="{marginLeft: 4+'px'}" v-model="date" @on-change="reload")
    .waterfall-box
      vue-waterfall-easy(ref="waterfall" :maxCols="5" :imgWidth="240" srcKey="url" :imgsArr="imgsArr" @scrollReachBottom="loadImage" @click="clickFn")
        .img-info(slot-scope="props")
          a(:href="'https://www.pixiv.net/member_illust.php?mode=medium&illust_id=' + props.value.illust_id").title {{props.value.title}}
          .user-info
            Avatar(:src="props.value.profile_img")
            a(:href="'https://www.pixiv.net/member.php?id=' + props.value.user_id ").user-name {{props.value.user_name}}

</template>

<script>
import axios from "axios";
import { getImgTypeFromUrl, axiosProxy } from "../utils/";
import store2 from "store2";
import get from "lodash/get";
import dayjs from "dayjs";

export default {
  data() {
    return {
      options: {
        url: "https://www.pixiv.net/ranking.php",
        params: {
          mode: "daily",
          p: 0,
          format: "json"
        }
      },
      date: new Date(),
      modes: {
        daily: {
          mode: "daily",
          label: "日排行"
        },
        weekly: {
          mode: "weekly",
          label: "周排行"
        },
        monthly: {
          mode: "monthly",
          label: "月排行"
        },
        rookie: {
          mode: "rookie",
          label: "新人排行"
        },
        original: {
          mode: "original",
          label: "原创排行"
        },
        male: {
          mode: "male",
          label: "男性欢迎排行"
        },
        female: {
          mode: "female",
          label: "女性欢迎排行"
        }
      },
      type: "正常",
      imgsArr: []
    };
  },
  computed: {
    waterfallWidth() {
      const { colWidth, cols } = this.$refs.waterfall;
      return colWidth * cols;
    },
    paramDate() {
      return dayjs(this.date)
        .subtract(1, "day")
        .format("YYYYMMDD");
    }
  },
  watch: {},
  async mounted() {
    this.loadImage();
  },
  methods: {
    async clickFn(event, { index, value }) {},
    async loadImage(state) {
      this.options.params.p++;
      let options = this.options;
      if (this.type == "R18") {
        options.params.mode += "_r18";
      }

      const { mode } = this.options.params;
      const { paramDate: date } = this;

      let result = await axiosProxy({
        url: this.options.url,
        params: {
          ...this.options.params,
          mode,
          date
        }
      });

      let contents = get(result, "data.contents", []);
      contents = contents.map(i => {
        i.profile_img = i.profile_img.replace("i.pximg.net", "i.pixiv.cat");
        i.url = i.url.replace("i.pximg.net", "i.pixiv.cat");
        return i;
      });

      this.imgsArr = this.imgsArr.concat(contents);
    },
    reload() {
      this.imgsArr = [];
      this.options.params = Object.assign(this.options.params, {
        p: 0
      });
      this.loadImage();
    }
  }
};
</script>

<style lang="stylus">
.pixiv {
  .waterfall-box {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: -1;

    .vue-waterfall-easy-scroll {
      padding-top: 90px;
    }
  }

  .toolbox {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 6px 10vw;
  }

  .img-info {
    padding: 8px;
    background: #21243a;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;

    .user-info {
      display: flex;
      align-items: center;

      .user-name {
        margin-left: 4px;
      }
    }

    .title {
      display: block;
      color: #6e8d92;
      font-size: 14px;
      margin: 6px 0;
      overflow-wrap: break-word;
    }
  }
}
</style>
