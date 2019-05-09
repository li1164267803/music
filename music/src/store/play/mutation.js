import state from './state';

export default {
    addSonglist(state,parms){
        state.songList = parms
    },
    changeIndex(state,parms){
        //边界判断
        if(parms == 'next'){
            state.nowIndex++
        }else if(parms == 'prev'){
            state.nowIndex--
        }else{
            state.nowIndex=parms
        }
    },
    changexianshi(state,parms){
        state.xianshi=parms;
    }
}