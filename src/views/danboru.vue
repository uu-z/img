<template lang="pug">
  div
    .toolbox(v-if="$refs.waterfall" :style="{color: 'red', maxWidth: waterfallWidth + 'px'}")
      Input(v-model="options.params.tags" @on-enter="reload(options.params.tags)" )
        Button(slot="append" icon="ios-search" @click="reload(options.params.tags)")
      div.tags
        Tag(closable @click.native="reload(item)" :key="index" v-for="(item, index) in searchTags" @on-close="removeTags(index)") {{item}}
    div.waterfall-box
      vue-waterfall-easy(ref="waterfall" :maxCols="5" :imgWidth="240"  :imgsArr="imgsArr" @scrollReachBottom="loadImage" @click="clickFn")
    // infinite-loading(@infinite="loadImage")
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
			const { id } = value;
			let detail = await axios.get(`https://danbooru.donmai.us/posts/${id}`);
			let html = cheerio.load(detail.data);
			if (!html) return;
			let img = html('#image').prop('src');
			if (img !== undefined) {
				this.imgsArr[index].src = img;
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

<style lang="stylus" scoped>
.waterfall-box {
	height: 100vh;
}

.toolbox {
	margin: 10px auto;
	padding-right: 1vw;
}
</style>
