<template>
    <div class="wrapper" ref="wrapper">
        <ul class="content">
            
                <Banner></Banner>
            <h3>热门歌单推荐</h3>
            <li v-for="(itme,index) in list"
                :key="index"
            >
                <div class="icon">
                    <img width="60" height="60" v-lazy="itme.imgurl" alt="">
                </div>
                <div>
                    <p class="name">{{itme.creator.name}}</p>
                    <p class="diss">{{itme.dissname}}</p>
                </div>
            </li>
            
        </ul>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import Banner from 'components/Banner';

export default {
    components:{Banner},
    data(){
        return{
            list:[]
        }
    },
    created(){
        let url = '/hehe/music/api/getDiscList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.5065621503557205'
        this.$axios.get(url)
        .then((res)=>{
            // console.log(res);
            this.list = res.data.list;
            // console.log(this.list)
        })
    },
    mounted(){
        // let wrapper = document.querySelector('.wrapper');
        // new BScroll(wrapper)

        //vue 中会吧标记了ref的dom对象丢到 this.$refs中
        // console.log(this.$refs.wrapper)
        let elobj = this.$refs.wrapper
        new BScroll(elobj)
        
    },
    activated(){
        console.log('缓存开始')
    },
    deactivated(){
        console.log("缓存结束")
    },
    destroyed(){
        console.log('销毁了')
    }

}
</script>

<style lang="less" scoped>
@import '~style/index.less';

.wrapper{
    overflow: hidden;
    position: fixed;
    .top(85);
    .bottom(0);
    .right(0);
    .left(0);
    .icon{
        .padding(20,20,20,20);
    }
    .content{
        h3{
            font-size: 14px;
            color: @font-color-header;
            text-align: center;
            .padding(20,0,20,0);
            font-weight: 200;
        }
        li{
            display: flex;
            font-size: 14px;
        }
        .name{
            .padding(26,0,10,0);
            color: #fff;
        }
        .diss{
            font-size: 12px;
            color: @font-color-tab;
        }
    }
}

</style>

