<template>
    <div class="wrapper">
        <ol class="content">
            <li v-for="(group,groupindex) in topList"
                :key="groupindex"
                class="wai"
            >
                <img :src="group.picUrl" width="100" height="100">
                <ul>
                    <li v-for="(itme,index) in group.songList"
                        :key="index"
                    >
                        <span>{{index+1}}&nbsp;</span><span>{{itme.songname}}-{{itme.singername}}</span>
                    </li>
                </ul>
            </li>
        </ol>
    </div>
</template>

<script>
import Data from 'data/ranking.js'
import BScroll from 'better-scroll'

export default {
    data() {
        return {
            topList:[],
        }
    },
    computed: {
        
    },
    created() {
        console.log('初始化')
        // console.log(Data.data)
        setTimeout(()=>{
            this.topList = Data.data.topList;
            // console.log(this.topList);
            this.$nextTick(()=>{
                new BScroll('.wrapper')
            })
        },200)
    },
}
</script>
<style lang="less" scoped>
@import '~style/index.less';
li{
    list-style: none;
}
.wrapper{
    .top(88);
    .bottom(0);
    .w(375);
    overflow: hidden;
    position: fixed;
}
ol{
    .wai{
        display: flex;
        .padding(20,20,0,20);
    }
    img{
        // display: inline-block;
    }
}
ul{
    .w(235);
    .h(100);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
        .padding(0,20,0,20);

    li{
        // .w(195);
        .h(26);
        .l_h(26);
        display: inline-block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        display: flex;
        span{
            font-size: 12px;
            white-space: normal;
            color: @font-color-tab;
        }
    }
}
</style>
