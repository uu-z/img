<template lang="pug">
  .danboru
    .toolbox(v-if="$refs.waterfall" :style="{color: 'red', maxWidth: waterfallWidth + 'px'}")
      Input(v-model="options.params.tags" @on-enter="reload(options.params.tags)" )
        Button(slot="append" icon="ios-search" @click="reload(options.params.tags)")
      .tags
        Tag(closable @click.native="reload(item)" :key="index" v-for="(item, index) in searchTags" @on-close="removeTags(index)") {{item}}
    .waterfall-box
      vue-waterfall-easy(ref="waterfall" :maxCols="5" :imgWidth="240"  :imgsArr="imgsArr" @scrollReachBottom="loadImage" @click="clickFn")
        .img-info(slot-scope="props")
</template>

<script>
import axios from 'axios';
import cheerio from 'cheerio';
import store2 from 'store2';

export default {
	data() {
		return {
			options: {
				method: 'GET',
				url: 'https://danbooru.donmai.us/posts',
				params: {
					page: 0,
					tags: 'rating:safe favcount:>100',
					utf8: '✓'
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
			store2.set('danboru-searchTags', val);
		}
	},
	async mounted() {
		this.searchTags = store2.get('danboru-searchTags') || [];
		this.options.params.tags = this.searchTags[0] || this.options.params.tags;
		this.loadImage();
	},
	methods: {
		async clickFn(event, { index, value }) {
      const { id, isHD } = value;
      if(isHD) {
        window.location.href = `https://danbooru.donmai.us/posts/` + id
      }
			let detail = await axios.get(`https://danbooru.donmai.us/posts/${id}`);
			let html = cheerio.load(detail.data);
			if (!html) return;
			let src = html('#image').prop('src');
			if (src !== undefined) {
         Object.assign(value, {
          src,
          isHD: true
        })
			}
		},
		async loadImage(state) {
			this.options.params.page++;
			let data = (await axios(this.options)).data;
			const $ = cheerio.load(data);
			let imageUrls = $('article')
				.map((i, el) => {
					let id = $(el).prop('data-id');
					let src = $(el)
						.find('img[class=has-cropped-true]')
						.prop('src');
					return {
						id,
						src
					};
				})
				.get();
			this.imgsArr = this.imgsArr.concat(imageUrls);
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
			padding-top: 60px;
		}
	}

	.toolbox {
		margin: 0 auto;
		padding 5px 0
		padding-right: 1vw;
		background: #f5f5f5;
	}
}
</style>
