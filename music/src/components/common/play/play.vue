<template>
    <div class="player" v-if="songList.length" :class="xianshi==true?'xianshi':'yinchang'">
        <!-- 大播放器 -->
        <div v-show="show">
            <div class="bg">
                <img :src="currentSong.imgUrl" alt="">
            </div>
            <div class="top">
                {{currentSong.songname}}
            </div>
            <p>{{currentSong.name}}</p>
            <!-- 滑动切换歌词 -->
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="cd-wrapper swiper-slide">
                        <div class="cd"><img :src="currentSong.imgUrl" ref="rotate"></div>
                    </div>
                    <div class="swiper-slide huageci">Slide 1</div>
                </div>

                <!-- 如果需要分页器 -->
                <div class="swiper-pagination"></div>
            </div>
            
            <p v-html='lyric[nowLine].txt' class="ci"></p>
            <!-- <p>歌词：{{nowLine}}</p> -->

            <!-- 播放器 -->
            <div class="control">
                <audio :src="currentSong.songUrl" autoplay ref="audio" @timeupdate="update"></audio>
                <!-- controls为音乐控制台 -->

                <div class="jindutiao">
                    <div class="jindutiao-nei">
                        <div class="diandian" ref="progressBar">
                            <span class="iconfont kongzhidian" :style="{'left':jindu+5}" ref="jdud"
                                @touchstart='progressTouchStart'
                                @touchmove='progressTouchMove'
                                @touchend='progressTouchEnd'
                            >&#xe609;</span>
                        </div>
                        <mt-progress :value="jindu" class="progress">
                            <div slot="start">{{nowdate}}&nbsp;</div>
                            <div slot="end">&nbsp;{{downtime}}</div>
                        </mt-progress>
                    </div>
                </div>
                
                <div class="kongzhi">
                    <ul>
                        <li @click="back" class="iconfont">&#xe66b;</li>
                        <li @click="changeIndex('prev')" class="iconfont">&#xe607;</li>
                        <li @click="playMusic()" class="iconfont bo" v-show="xian">&#xe600;</li>
                        <li @click="playMusic()" class="iconfont bo" v-show="!xian">&#xe651;</li>
                        <li @click="changeIndex('next')" class="iconfont">&#xe616;</li>
                        <li class="iconfont" v-show="shouchang" @click="shouChang">&#xe60c;</li>
                        <li class="iconfont sc" v-show="!shouchang" @click="shouChang">&#xe62b;</li>
                    </ul>
                </div>
            </div>

        </div>


        <div v-show="!show">
            小播放器
        </div>
    </div>
</template>

<script>
import {mapState,mapGetters,mapMutations} from 'vuex'
import { Base64 } from 'js-base64';
import Lyric from 'lyric-parser'
import Swiper from 'swiper';
import '@/../node_modules/swiper/dist/css/swiper.min.css';

export default {
    data() {
        return {
            show:true,
            xian:true,//播放按钮
            shouchang:true,//收藏按钮
            nowdate:'',//进度条开始时间
            downtime:0,//进度条结束时间
            jindu:0,//进度条
            lyric:[{txt:'...'}],
            nowLine:0,//歌词行数
            touchInfo: { //当前要移动的元素
                initiated: false 
            },
        }
    },
    computed: {
        ...mapGetters(['currentSong']),
        ...mapState({
            songList:state=>state.play.songList,
            nowIndex:state=>state.play.nowIndex,
            xianshi:state=>state.play.xianshi,
        }),
    },
    methods: {
        ...mapMutations(['changeIndex']),
        ...mapMutations(['changexianshi']),

        progressTouchStart(e){
            // 记录touch事件已经初始化 
            this.touchInfo.initiated = true 
        },
        progressTouchMove(e){
            if (!this.touchInfo.initiated) { 
                return 
            } 
            // 设置偏移值 
            let progressBar = this.$refs.progressBar.clientWidth//外层小点的div

            this.dianju = Math.round(e.touches[0].pageX-(e.touches[0].target.clientWidth*2))
            //边界处理
            this.bianjiezhi = ((Math.min((Math.max(0,this.dianju)+6),progressBar))/progressBar)*100-9
            this.rrr.jdud.style.left = this.bianjiezhi + '%'//设置小点的left的百分比
            this.jindu =this.bianjiezhi+9//设置进度条的长度
         
        },
        progressTouchEnd(e){
            //快进后的时间
            this.timer =  Math.round(this.jindu/100*this.currentSong.interval)
            this.$refs.audio.currentTime=this.timer
            this.touchInfo.initiated = false;
            if(this.lyricobj){//歌词同步
                this.lyricobj.seek(this.timer*1000)
                console.log(this.timer*1000)
            }
        },
        back(){
            this.$router.back();
            this.changexianshi('false')
        },
        zongchang(duration){
            let fen = parseInt(duration/60)
            let miao = duration%60;
            this.downtime = 0;
            if(miao < 10){
                this.downtime = `0${fen}:0${miao}`
            }else{
                this.downtime = `${fen}:${miao}`
            }
        },
        shijian(time){
            let fen = parseInt(time/60)
            let miao = parseInt(time%60);
            if(miao < 10){
                this.nowdate = fen+':0'+miao
            }else{
                this.nowdate = `${fen}:${miao}`
            }
        },
        shouChang(){
            this.shouchang=!this.shouchang
        },
        update(e){
            this.nowdate=e.srcElement.currentTime;
            //设置进度条
            this.jindu=(this.nowdate/this.currentSong.interval)*100;
            this.zongchang(this.currentSong.interval)
            this.shijian(this.nowdate);
            if(this.jindu >=100){
                //播放完成进去下一首
                this.changeIndex('next');
                this.$nextTick(()=>{
                    this.rrr.jdud.style.left =0+'%';
                    this.nowLine = 0;
                    this.lyric+=[{txt:'...'}]
                })
            }

            //控制进度条点的一个位置 百分比
            this.rrr = this.$refs;
            this.rrr.jdud.style.left=this.jindu-6 +'%'
        },
        playMusic(){
            let audio = this.$refs.audio
            if(audio.paused){
                audio.play();
		        this.$refs.rotate.style.animationPlayState = 'running';//图片旋转
            }else{
                audio.pause();
                this.$refs.rotate.style.animationPlayState = 'paused';//图片暂停
            }
            this.xian = !this.xian;
            this.lyricobj.togglePlay()//歌词暂停与开始切换
        }
    },
    watch: {
        currentSong(newSong,oldSong){
            //newSong之后 oldSong之前
            console.log('watch');
            console.log(newSong)
            let url=`/geci/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=${newSong.songmid}&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1552266108016`
            this.$axios.get(url)
            .then((data)=>{
                console.log('then')
                this.lyric=[{txt:'...'}];
                this.nowLine=0;
                let text = Base64.decode(data.lyric);
                console.log(text)
                if(this.lyricobj){//播放歌曲变化时，清空this.lyricobj对象
                     this.lyricobj.stop();
                }
                //通过lyric-parser 插件解析歌词
                this.lyricobj = new Lyric(text,(data)=>{
                    this.nowLine = data.lineNum//显示的是第几行歌词
                })
                this.lyric = this.lyricobj.lines;

                this.$nextTick(()=>{//异步处理 等待上面代码执行完毕
                    this.xian = false;
                    this.lyricobj.togglePlay()//歌词暂停与开始切换
                    this.$refs.rotate.style.animationPlayState = 'running';//图片旋转
                })

                //创建banner实例
                this.$nextTick(()=>{
                    var mySwiper = new Swiper ('.swiper-container', {
                        loop: false, // 循环模式选项
                        //如果需要分页器
                        pagination: {
                            el: '.swiper-pagination',
                        },
                    })
                })

            })
            
        }
    },
    created() {

    },mounted() {
        console.log('挂载');

        
    },
    updated(){
        // console.log('修改数据',this.jindu);
        // this.$refs.audio.play()
    },

}

//http://dl.stream.qqmusic.qq.com/C4000039MnYb0qxYhV.m4a?guid=8856449179&vkey=100F22221445BBC524346C5B5D407747504CF0CA67A591DA4961A27F8770FADE903CAA32EE7F73AD9DE678B558FD6D47AF8A8140DBD7042C&uin=0&fromtag=38
//http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400000GDzSZ0yAEB9.m4a?guid=7515220800&vkey=D484CCF97EF2D8BA726A25FE33B662DBA4348176D483BD4CEEE1F1B5C376A76214AC7021CDE6D79F15508609E54AEEFE0B42E6184E4F248F&uin=0&fromtag=38
//http://dl.stream.qqmusic.qq.com/C400000Qepff3UyUWO.m4a?guid=7515220800&vkey=D484CCF97EF2D8BA726A25FE33B662DBA4348176D483BD4CEEE1F1B5C376A76214AC7021CDE6D79F15508609E54AEEFE0B42E6184E4F248F&uin=0&fromtag=38
</script>

<style lang="less" scoped>
@import '~style/index.less';

li{
    list-style: none;
}
@-webkit-keyframes rotationimg{
    from{
        -webkit-transform: rotate(0deg);
    }
    to{
        -webkit-transform: rotate(360deg);
    }
}
.swiper-container {
    .w(375);
    .bug(red);
    // height: 300px;
}
.huageci{
    position: fixed;
    .h(800);
    .w(375);
    .left(375);
    background: red;
    z-index: 1000;
}
.yinchang{
    display: none;
}
.xianshi{
    display: block
}
.ci{
    font-size: 14px;
}
.player{
    .w(375);
    position: fixed;
    background: #fff;
    top: 0;
    bottom: 0;
    text-align: center;
    font-size: 14px;
    z-index: 600;
    .bg{
        position: absolute;
        .w(375);
        top:0;
        bottom: 0;
        // z-index: 3;
        img{
            width: 100%;
            height: 100%;
            opacity: .6;
            filter: blur(20px);//高斯模糊
        }
    }
    .top{
        .w(375);
        .h(40);
        .l_h(40);
    }
    p{
        .h(20);
        .l_h(20);
        font-size: 12px;
    }
    .cd-wrapper{
        .w(375);
        .h(375);
        display: flex;
        justify-content: center;
        align-items: center;
        .cd{
            width: 75%;
            height: 75%;
            border-radius: 50%;
            border: 10px solid rgba(0,0,0,.2);
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                transform:rotate(360deg);
                animation: rotationimg 20s linear infinite;
            }
        }
    }
    .control{
        position: absolute;
        bottom: 50px;
        .w(375);
        .jindutiao{
            .h(50);
            .l_h(50);
            .padding(0,10,0,10);
            display: flex;
            justify-content: center;
            align-items: center;
            // .bug(black);
            .progress{
                .w(300);
                .h(30);
            }
            .jindutiao-nei{
                position: relative;
                // .bug(red);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .diandian{
                    // .bug(yellow);
                    .w(236);
                    position: relative;
                }
                .kongzhidian{
                    color: #ffcd32;
                    position: absolute;
                    font-size: 36px;
                    z-index: 50;
                    top: -9px;
                    left: -6%;
                    // .bug(red);
                }
            }
            
        }
        .kongzhi{
            .w(375);
            ul{
                display: flex;
                // .h(40);
                justify-content: space-around;
                align-items: center;
                li{
                    font-size: 28px;
                    color:#ffcd32;
                    .sc{
                        font-size: 30px;
                        background: red;
                    }
                }
                .bo{
                    font-size: 44px;
                }
            }
        }
    }
}

</style>

