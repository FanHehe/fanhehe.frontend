<template >
	<div class = "main-wrap" :class = "device_type">
		<canvas id = "background" ref = "background"></canvas>
		<div class = "main-header">
			<nav>
				<a href = "https://github.com/fanhehe" target = "_black">Github</a>
				<a class = "dropdown-btn">
					...
					<div class = "dropdown">
						<router-link :to = "'blog'">博客</router-link>
						<router-link :to = "'about'">关于</router-link>
					</div>
				</a>
			</nav>
		</div>
		<div class = "main-content">
			<input
			type = "text"
			maxlength = "20"
			placeholder = "痕迹"
			tabindex = "2" 
			@keydown.13 = "search" 
			autofocus />
			<h1>Fan hehe</h1>
		</div>
		<div class = "main-footer">
			
		</div>
	</div>
</template>

<script >
	import { mapActions, mapGetters } from 'vuex';
	import { deviceDetect } from '../../utils/';

	export default {
		data: () => {
			return { msg: 'hehe' };
		},
		methods: {
			...mapActions([
				'getSearchHistory',
				'setSearchHistory',
				]),
			search (event) {
				const value = event.target.value.trim();
				const { dispatch } = this.$store;
				if (value.length > 0) {
					const href = 'https://www.baidu.com/s?wd=';
				// href = 'https://www.google.co.jp/#q=';
				dispatch('setSearchHistory', { value });
				location.href = `${href}${value}`;
			} else {
				return false;
			}
		},
	},
	computed: {
		...mapGetters(['isMobile', 'isClient']),
		device_type () {
			const deviceType = deviceDetect() || 'client';
			return `full-screen-${deviceType}`;
		}
	},
	mounted () {
		const canvas = this.$refs['background'];
		const ctx = canvas.getContext('2d');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		const w = canvas.width;
		const h = canvas.height;
		ctx.strokeStyle = 'rgba(174,194,224,0.5)';

		var init = [];
		var maxParts = 1000;
		for (let a = 0; a < maxParts; a++) {
			init.push({
				x: Math.random() * w,
				y: Math.random() * h,
				l: Math.random() * 1,
				xs: -4 + Math.random() * 4 + 2,
				ys: Math.random() * 10 + 10
			});
		}
		var particles = [];
		for (var b = 0; b < maxParts; b++) {
			particles[b] = init[b];
		}

		function draw () {
			ctx.clearRect(0, 0, w, h);
			for (var c = 0; c < particles.length; c++) {
				var p = particles[c];
				ctx.beginPath();
				ctx.moveTo(p.x, p.y);
				ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
				ctx.stroke();
			}
			move();
		}

		function move () {
			for (var b = 0; b < particles.length; b++) {
				var p = particles[b];
				p.x += p.xs;
				p.y += p.ys;
				if (p.x > w || p.y > h) {
					p.x = Math.random() * w;
					p.y = -20;
				}
			}
		}
		setInterval(draw, 30);
	}
};
</script>

<style lang = "sass" scoped>
	$leftSpace : 100px;

	::selection {
		background: transparent;
	};
	.main-wrap {
		background: #212737 repeat;
		position: relative;
		
		#background {
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		}

		.main-header {
			display: block;
			position: relative;
			z-index: 1;
			margin: 30px 0;

			nav {
				position:relative;
				text-align: right;
				white-space: nowrap;
				& > a {
					font-size: 1.6rem;
					position: relative;
					display: inline-block;
					padding: 8px 16px;
					border: 1px solid #fff;
					text-decoration: none;
					color: #fff;
					cursor: pointer;
					transition: border-color .5s ease-in-out;
					margin-right: 1rem;
					&:hover, &:focus {
						border-color: red;
						outline: none;
					}
				}
			}
			.dropdown-btn:hover .dropdown{
				opacity: 1;
				display: block;
			}
			.dropdown {
				display: none;
				
				left: 0;
				opacity: 0;
				width: 100%;
				padding: 10px 0;
				position: absolute;
				text-align:center;
				transition: opacity 1s ease-in-out;
				

				& > a {
					font-size: 12px;
					display: flex;
					box-sizing: border-box;
					max-width: 100%;
					justify-content: center;
					color: #fff;
					cursor: pointer;
					padding: 2.5px 0;
					
					&:hover {
						color: red;
						border: 2px solid #fff;
						border-width: 0 2px;
					}
				} 
			}
		}

		.main-content {    
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			position: absolute;
			margin: auto;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			z-index: 0;

			color: #fff;

			h1, p {
				white-space: nowrap;
				padding: .5rem 0;
			}
			h1 {
				font-size: 3rem;
				min-height: 3rem;
				line-height: 3rem;
				padding: .5rem 0;
				background-size: contain;
				/*text-shadow: 1px 1px 1px #ffffff, 2px 2px 2px #ffffff, 3px 3px 3px #ffffff, 5px 5px 4px #000000;*/
				/*&:hover { color: #271043; }*/
			}
			
			input {
				background: transparent;
				padding: 10 10px;
				border: 1px solid rgba(255, 255, 255, .5);
				color: rgba(255, 255, 255, .5);
				width: 80%;
				max-width: 40rem;
				outline: 0;

				&::selection {
					background: green;
				}

				&:hover, &:focus {
					display: block;

				}
			}
		}

		.main-footer {

		}
	}
	.full-screen-mobile {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 0;
	}
	.full-screen-client {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 0;
	}
</style>
