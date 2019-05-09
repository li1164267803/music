<template>
    <div class="singer-detail">
        <div>
            <div class="header" :style="{background:'url(' +params.avatic + ') no-repeat 0 0 ','background-size': '100%'}">
                <span @click="back">《 </span>
                <span class="biao">{{params.name}}</span>
            </div>
            <div class="beftter"></div>
            <div class="img">
                <img :src="params.avatic" alt="">
            </div>
        </div>
        <div class="songlist wrapper">
            <ul class="content">
                <li v-for="(item,index) in songs"
                    :key="index"
                    @click="playMusic(index)"
                >
                    <p>{{item.songname}}</p>
                    <p class="zuozye">{{params.name}}·{{item.albumname}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {getSingers} from '@/api/recommend.js';
import BScroll from 'better-scroll'
import {mapMutations} from 'vuex'

export default {
    data() {
        return {
            songs:[],
        }
    },
    computed: {
        params(){
            return this.$route.params;
        }
    },
    methods: {
        playMusic(index){
            this.$store.commit('addSonglist',this.songs)
            this.$store.commit('changeIndex',index);
            this.$store.commit('changexianshi',true);
            console.log('点击了')
        },
        back(){
            this.$router.back();
        },
        normalSongList(list){
            let arr = [];
            list.forEach(element => {
                arr.push({
                    albumname:element.musicData.albumname,
                    name:element.musicData.singer[0].name,
                    songname:element.musicData.songname,
                    mid:element.musicData.singer[0].mid,
                    songmid:element.musicData.songmid,
                    albid:element.musicData.albummid,
                    interval:element.musicData.interval,
                })
            });
            console.log(arr)
            this.songs=arr;
        }
    },
    created() {
        console.log('初始化')
        getSingers(this.$route.params.mid)
        .then((data)=>{
            console.log('then');
            console.log(data)
            if(!this.$route.params.name){
                return this.$router.replace('/singer')//重新定向新的路由地址
            }
            this.normalSongList(data.data.list)
        })
        
    },
    mounted() {
         new BScroll('.songlist',{click:true})
    },
}
</script>

<style lang="less" scoped>
@import '~style/index.less';

li{
    list-style: none;
}
.singer-detail{
    background: #222;
    position: fixed;
    z-index: 500;
    top: 0;
    bottom: 0;
    .w(375);
    // .beftter{
    //     background:rgba(7,17,27,.4);
    //     width: 100%;
    //     .h(300);
    //     position: absolute;
    //     z-index: 10;
    // }
    .header{
        .w(375);
        .h(40);
        color: #fff;
        font-size: 14px;
        .l_h(40);
        text-align: center;
        position: absolute;
        z-index: 520;
            // background-color: rgba(7, 17, 27, 0.4)
        .biao{
            .w(300);
            .h(40);
            display: inline-block;
        }
    }
    .img{
        .h(263);
        overflow: hidden;
        img{
            .w(375);
        }
    }
    .songlist{
        font-size: 14px;
        position: fixed;
        .top(250);
        .w(375);
        .bottom(0);
        z-index: 300;
        background: #222;
        display: flex;
        flex-direction: column;
        align-items: center;
        li{
            color: #fff;
            .w(375);
            .padding(0,30,0,30);
            .h(64);
            display: flex;
            flex-direction: column;
            justify-content: center;
            .zuozye{
                color:hsla(0,0%,100%,.3);
                font-size: 12px;
            }
        }
        .content{
            background: #222;
        }
    }
}

</style>
