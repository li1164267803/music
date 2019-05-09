<template>
<div>
    <div class="wrapper wrapper-t">
        <div class="content" @touchmove='touchdong'>
            <ul>
                <li v-for="(group,index) in list"
                    :key="index"
                    class="group"
                >
                    <p :ref="group.titls">{{group.titls}}</p>
                    <ol>
                        <li v-for="(itme,index) in group.itmes"
                            :key="index"
                            class="group-itme"
                            @click="singeDetail(itme)"
                        >
                            <img v-lazy="itme.avatic" width="50" height="50">
                            <span>{{itme.name}}</span>
                        </li>
                    </ol>
                </li>
            </ul>
        </div>
    </div>
    <!-- 侧边栏 -->
    <div class="slider" ref="divv">
        <ul @touchstart='touchBegin'
            @touchmove='touchMove'
            ref="ulul"
        >
            <li v-for="(itme,index) in sliderData"
                :key="index"
                :class="index==indexx?'huashang':''"
            >
                {{itme}}
            </li>
        </ul>
    </div>
    <!-- 歌手详情 -->
    <router-view></router-view>
</div>
    
</template>

<script>
import Data from 'data/singer.js';
import BScroll from 'better-scroll';

export default {
    data(){
        return{
            list:[],
            indexx:0,
            arr:[]
        }
    },
    computed:{//判断属性选择
        sliderData(){//可直接使用this.sliderData
            return this.list.map((itme)=>{
                if(itme.titls == '热门'){
                    return "热"
                }else{
                    return itme.titls
                }
            })
        },
        divoffsetTop(){
            return document.querySelector('.slider').offsetTop
        },
    },
    methods:{
        //跳转歌手详情
        singeDetail(itme){
            console.log(itme)
            this.$router.push({name:'singerdetail',params:itme});
        },
        //触屏点击
        touchBegin(e){
            this.touchStartY=e.touches[0].clientY;//获取点击的开始坐标
            this.touchindex=this.sliderData.indexOf(e.target.innerText);//获取点击的字母在数组里的下标
            this.indexx = this.touchindex;
            let targe = e.target.innerText == '热'?'热门':e.target.innerText;
            // console.log(targe);
            let element = this.$refs[targe][0];//获取单独的一个dom元素
            //滚动
            this.scroll.scrollToElement(element)
        },
        touchMove(e){//滑动事件
            // console.log('move');
            let moveY = e.touches[0].clientY-this.touchStartY;//当前滑动时的y值-点击时候的坐标
            let index = Math.round(moveY/20)+this.touchindex;//滑动的高度除元素的高度 + 点击时字母在数组里的一个下标
            // console.log(moveY);
            this.indexx = index;

            let lele = this.$refs;
            let targe = this.sliderData[index]=='热'?'热门':this.sliderData[index];//获取当前的值
            // console.log(targe);
            if(this.$refs[targe]){//判断是不是有这个属性
                let element = this.$refs[targe][0];
                this.scroll.scrollToElement(element);
            }

        },
        touchdong(){//中间滑动
            // this.arr = [];
            let ll = this.$refs;

            for (const key in this.$refs) {
                        // arr.push({
                        //     //把一个变量定义为一个key要加上中括号
                        //     [this.$refs[key][0].innerText]:this.$refs[key][0].offsetTop
                        // })
                        // this.arr.push(this.$refs[key][0].offsetTop)
                    }
            this.scroll.on('scroll',(x)=>{
                    let y = -parseInt(x.y)
                    let xindex = this.arr.indexOf(y)
                    if(xindex!=-1){
                        console.log(xindex,'哈哈哈哈哈哈哈哈哈')
                    }
                    
                })
        },
        normalData(data){
            // console.log(data);
            let lists={
                'hot':{
                    titls:'热门',
                    itmes:[]
                },
                'A':{
                    titls:'A',
                    itmes:[]
                }
            }
            for (let index = 0; index < data.length; index++) {
                let img = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${data[index].Fsinger_mid}.jpg?max_age=2592000`
                // 选择热门
                if(index<10){
                    lists.hot.itmes.push({
                        id:data[index].Fsinger_id,
                        name:data[index].Fsinger_name,
                        avatic:img,
                        mid:data[index].Fsinger_mid
                    })
                }else{
                    if(!lists[data[index].Findex]){
                        // 如果没有就创建一个
                        lists[data[index].Findex]={
                            titls:data[index].Findex,
                            itmes:[{
                                id:data[index].Fsinger_id,
                                name:data[index].Fsinger_name,
                                avatic:img,
                                mid:data[index].Fsinger_mid
                            }]
                        }
                    }else{
                        //key存在
                        lists[data[index].Findex].itmes.push({
                            id:data[index].Fsinger_id,
                            name:data[index].Fsinger_name,
                            avatic:img,
                            mid:data[index].Fsinger_mid
                        })
                    }
                }
            }
            let hot=[];
            let arr=[];
            for (const key in lists) {
                if(key==='hot'){
                    hot.push(lists[key]);
                }else{
                    if(key.match(/[a-zA-Z]/)){
                        arr.push(lists[key]);
                        
                    }
                }
            }
            //按照title进行排序
            arr.sort((a,b)=>{
                return a.titls.charCodeAt(0) - b.titls.charCodeAt(0)
            })
            lists = hot.concat(arr)
            this.list=lists
            console.log(lists);
            // console.log(this.list)
        }
    },
    created(){
        console.log('初始后');
        setTimeout(()=>{
        // let arr = [];
            this.normalData(Data.data.list);
            this.$nextTick(()=>{
                // let  elobj=this.$refs.wrapper
                // new BScroll(elobj) 
                // let ll = this.$refs;
                
                // console.log(ll)
                
                
                this.scroll=new BScroll('.wrapper',{probeType:3,click:true})
                

                // for (const key in this.$refs) {
                //         // arr.push({
                //         //     //把一个变量定义为一个key要加上中括号
                //         //     [this.$refs[key][0].innerText]:this.$refs[key][0].offsetTop
                //         // })
                //         arr.push(this.$refs[key][0].offsetTop)
                        
                //     }
                // console.log(arr)

                // this.scroll.on('scroll',(x)=>{
                //     let y = -Math.round(x.y)
                //     console.log(11111,y);
                //     let xindex = arr.indexOf(y)
                //     if(xindex!=-1){
                //         console.log(xindex,'哈哈哈哈哈哈哈哈哈')
                //     }
                    
                // })
                
                
            })
        },500)
    },

}
</script>

<style lang="less" scoped>
@import '~style/index.less';
li{
    list-style: none;
}
.xi{
    .h(30);
    .l_h(30);
    .w(375);
    .padding(0,0,0,20);
    background: #333;
    font-size: 14px;
    color: @font-color-tab;
    position: fixed;
    z-index: 50;
}
.wrapper-t{
    .w(375);
    overflow: hidden;
    position: fixed;
    .top(88);
    .bottom(0);
    p{
        .h(30);
        .l_h(30);
        .padding(0,0,0,20);
        background: #333;
        font-size: 14px;
        color: @font-color-tab;
    }
    .group-itme{
        font-size: 14px;
        .padding(20,0,0,20);
        display: flex;
        align-items: center;
        span{
            .padding(0,0,0,20);
            color: @font-color-tab;
        }
        img{
            border-radius: 50%;
        }
    }
    
}
//侧边栏
    .slider{
        .w(20);
        position: absolute;
        right: 5px;
        background: rgba(0,0,0,.3);
        font-size: 14px;
        top: 50%;
        transform: translateY(-40%);
        .padding(20,0,20,0);
        border-radius: 30px;
        text-align: center;
        li{
            text-align: center;
            color: @font-color-tab;
            .h(20);
        }
        .huashang{
            color: @font-color-header;
        }
    }
</style>

