<template>
	<div class="admin">
		<header>
			<headers></headers>
		</header>
		<content></content>
		<footer>
			<footers></footers>
		    <bottom></bottom>
		</footer>

	</div>
</template>
<script>
import headers from './components/head/headers'
import footers from './components/foot/footers'
import bottom from './client/bottom'
	export default{
		name:'admin',
		components:{
			headers,
			footers,
			bottom
		}
	}
</script>
<style lang="scss" scoped="" type="text/css">
    .admin{
    	width: 100%;
    	height: 100%;
    }
</style>