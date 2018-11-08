<template lang="pug">
  div
    Input(v-model="options.params.tags" @on-enter="reload(options.params.tags)")
      Button(slot="append" icon="ios-search" @click="reload(options.params.tags)")
    div
      Tag(closable @click.native="reload(item)" :key="index" v-for="(item, index) in searchTags" @on-close="removeTags(index)") {{item}}
    div.waterfall-box
      vue-waterfall-easy(:maxCols="10" :imgsArr="imgsArr" @scrollReachBottom="loadImage" @click="clickFn")
    // infinite-loading(@infinite="loadImage")
</template>

<script>
import axios from 'axios';
import cheerio from 'cheerio';
import { event } from '../utils/Event';
global.axios = axios;

export default {
	data() {
		return {
			options: {
				method: 'GET',
				url: 'https://danbooru.donmai.us/posts',
				params: {
					ms: 1,
					page: 0,
					tags: 'rating:safe favcount:>100',
					utf8: '✓'
				}
			},
			imgsArr: [],
			searchTags: []
		};
	},
	watch: {
		searchTags(val) {
			localStorage.setItem('searchTags', JSON.stringify(val));
		}
	},
	async mounted() {
		this.searchTags = JSON.parse(localStorage.getItem('searchTags')) || [];
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
			this.$router.go({
				name: 'danboru',
				query: {
					hash: Math.random()
				}
			});
		},
		removeTags(index) {
			this.searchTags.splice(index, 1);
		}
	}
};
</script>

<style lang="stylus">
.waterfall-box {
  height: calc(100vh - 120px);
}
</style>
