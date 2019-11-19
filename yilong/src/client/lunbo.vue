<template>
	<div id="lunbo">
            <div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide">
            <img src="../static/images149370993339413.jpg" alt=""/>
        </div>
        <div class="swiper-slide">
            <img src="../static/images149371001863360.jpg" alt="" />
        </div>
        <div class="swiper-slide">
            <img src="../static/images149371011284238.jpg" alt="" />
        </div>
        <div class="swiper-slide">
            <img src="../static/images151625751172720.jpg" alt="" />
        </div>
        <div class="swiper-slide">
              <img src="../static/images151667462384407.jpg" alt="" />
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>   
  </div>
    </div>
</template>

<script>
	export default{
		name:'lunbo',
        mounted(){
            var mySwiper = new Swiper('.swiper-container', {
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                direction: 'horizontal',
                loop: true,
                 effect : 'fade',


                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                // 如果需要前进后退按钮
                // navigation: {
                //     nextEl: '.swiper-button-next',
                //     prevEl: '.swiper-button-prev',
                // },

            })
        }
	}

</script>

<style lang="scss" scoped="" type="text/css">
	#lunbo{
    width: 100%;
        height: 380px;
        .swiper-container{
            width:100%;
            height:380px;
            img{
        width: 100%;
        height: 380px;
        }
		}
	}
</style>