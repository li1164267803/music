<template>
    <div class="swiper-container banner">
        <div class="swiper-wrapper">
            <div class="swiper-slide"
                v-for="(itme,index) in bannerList"
                :key="index"
            >
                <img :src="itme.picUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
    </div>
</template>

<script>
import Swiper from 'swiper';
import '../../node_modules/swiper/dist/css/swiper.min.css';

export default {
    data(){
        return{
            bannerList:''
        }
    },
    created(){
        let url = '/bnn/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=1553178610298&g_tk=1686226552&uin=1164267803&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1'
        this.$axios.get(url)
        .then((res)=>{
            // console.log(res.data);
            this.bannerList=res.data.slider;

            //创建banner实例
            this.$nextTick(()=>{
                var mySwiper = new Swiper ('.swiper-container', {
                    autoplay:true,
                    loop: true, // 循环模式选项
                    //如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                    },
                })
            })
        })

        
    },
}
</script>

<style lang="less" scoped>
@import '~style/index.less';
.banner{
        .h(150);
        img{
            width: 100%
        }
    }
</style>

