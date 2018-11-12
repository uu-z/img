<template lang="pug">
  .danboru
    .toolbox( v-if="$refs.waterfall"  :style="{ maxWidth: waterfallWidth + 'px'}")
      Input(v-model="options.params.tags" search enter-button @on-search="reload(options.params.tags)" @on-enter="reload(options.params.tags)" )
      .tags
        Tag(closable @click.native="reload(item)" :key="index" v-for="(item, index) in searchTags" @on-close="removeTags(index)") {{item}}
    .waterfall-box
      vue-waterfall-easy(ref="waterfall" :maxCols="5" :imgWidth="240"  :imgsArr="imgsArr" @scrollReachBottom="loadImage" @click="clickFn")
        .img-info(slot-scope="props")
          a(:href="'https://danbooru.donmai.us/posts/' + props.value.id").title {{props.value.content}}
</template>

<script>
import axios from "axios";
import cheerio from "cheerio";
import store2 from "store2";
import PQueue from "p-queue";

export default {
  data() {
    return {
      queue: new PQueue({ concurrency: 10 }),
      options: {
        method: "GET",
        url: "https://danbooru.donmai.us/posts",
        params: {
          page: 0,
          tags: "rating:safe favcount:>100",
          utf8: "✓"
        }
      },
      imgsArr: [],
      searchTags: []
    };
  },
  computed: {
    waterfallWidth() {
      const { colWidth, cols } = this.$refs.waterfall;
      return colWidth * cols;
    }
  },
  watch: {
    searchTags(val) {
      store2.set("danboru-searchTags", val);
    }
  },
  async mounted() {
    this.searchTags = store2.get("danboru-searchTags") || [];
    this.options.params.tags = this.searchTags[0] || this.options.params.tags;
    this.loadImage();
  },
  methods: {
    async clickFn(event, { index, value }) {
      if (value.isHD) return;
      this.queue.add(
        () => {
          this.lodahHD({ img: value });
        },
        {
          priority: 1
        }
      );
    },
    async lodahHD({ img }) {
      const { id, isHD } = img;
      let detail = await axios.get(`https://danbooru.donmai.us/posts/${id}`);
      let html = cheerio.load(detail.data);
      if (!html) return;
      let src = html("#image").prop("src");
      let content = html("#original-artist-commentary > div > p").text();
      if (src !== undefined) {
        Object.assign(img, {
          src,
          content: content ? content.substring(0, 30) : content,
          isHD: true
        });
      }
    },
    async loadImage(state) {
      this.options.params.page++;
      let data = (await axios(this.options)).data;
      const $ = cheerio.load(data);
      let imageUrls = $("article")
        .map((i, el) => {
          let id = $(el).prop("data-id");
          let src = $(el)
            .find("img[class=has-cropped-true]")
            .prop("src");
          return {
            id,
            src
          };
        })
        .get();
      this.imgsArr = this.imgsArr.concat(imageUrls);
      imageUrls.forEach(img => {
        this.queue.add(async () => {
          await this.lodahHD({ img });
        });
      });
    }
  },
  reload(tags) {
    this.searchTags = [...new Set([tags, ...this.searchTags])];
    this.imgsArr = [];
    this.options.params = Object.assign(this.options.params, {
      tags,
      page: 0
    });
    this.loadImage();
  },
  removeTags(index) {
    this.searchTags.splice(index, 1);
  }
};
</script>

<style lang="stylus">
.danboru {
  .waterfall-box {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: -1;

    .vue-waterfall-easy-scroll {
      padding-top: 120px;
    }
  }

  .img-info {
    padding: 10px;
    background: #21243a;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;

    a {
      color: rgba(255, 255, 255, 0.5);
    }

    .title {
      min-height: 40px;
      display: block;
      color: #6e8d92;
      font-size: 14px;
      margin: 6px 0;
      overflow-wrap: break-word;
    }
  }

  .toolbox {
    margin: 0 auto;
    padding: 4px 10vw;
  }

  .tags {
    display: flex;
    justify-content: center;
    margin-top: 2px;
  }

  .ivu-input-group-append {
    border-radius: 50px;
  }
}
</style>
