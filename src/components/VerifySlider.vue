<template>
<div class="drag_verify" 
    :style="dragVerifyStyle" 
    @mousemove="dragMoving" 
    @mouseup="dragFinish" 
    @touchmove="dragMoving" 
    @touchend="dragFinish">
    <div class="dv_progress_bar" ref="progressBar" :style="progressBarStyle"></div>
    <div class="dv_text" :style="textStyle" ref="message">{{message}}</div>
    <div class="dv_handler dv_handler_bg" @mousedown="dragStart"  
        ref="handler" :style="handlerStyle" @touchstart="dragStart">
        <i class="handlerIcon">></i>
    </div>
</div>
</template>

<script>
export default {
	name:'dragVerify',
	data : {

	},
    props:{
		width:{
			type:Number,
			default: 250
		},
		height:{
			type:Number,
			default:40
		},
		text:{
			type:String,
			default:'Please slide to verify'
		},
		successText:{
			type:String,
			default:'Verified'
		},
		background:{
			type:String,
			default:'white'
		},
		progressBarBg:{
			type:String,
			default:'white'
		},
		completedBg:{
			type:String,
			default:'#white'
		},
		circle:{
			type:Boolean,
			default: false
		},
		handlerIcon:{
			type:String
		},
		successIcon:{
			type:String
		},
		handlerBg:{
			type:String,
			default:'#f8f8fa'
		},
		handlerCompletedBg:{
			type:String,
			default:'#deecff'
		},
		handlerBorder: {
			
		},
		textSize:{
			type:String,
			default:'15px'
		}
	},
	computed:{
		handlerStyle:function(){
			return {
				left: '0px',
				width : this.height-2+'px',
				height : this.height-2+'px',
				borderRadius: this.circle?'50%':0,
				background: this.handlerBg,
				border: this.handlerBorder
			}
		},
		message : function(){
			return this.isPassing?this.successText:this.text
		},
		//드래그 전체 창 css
		dragVerifyStyle:function(){
			return {
                width: this.width + 'px',
				height : this.height+'px',
				lineHeight: this.height+'px',
				background:this.background,
				borderRadius: this.circle?this.height/2+'px':0
			}
		},
		progressBarStyle: function(){
			return {
				background: this.progressBarBg,
				height : this.height-2+'px',
				borderRadius: this.circle?this.height/2+'px 0 0 ' + this.height/2+'px':0
			}
		},
		textStyle: function(){
			return {
				height : this.height+'px',
				width : this.width + 'px',
				fontSize:this.textSize
			}
		},
		handlerIconClass: function(){
			return this.isPassing?this.handlerIcon:this.successIcon
		}
	},
	data(){
		return{
			isMoving : false,
			x:0,
			isPassing : false
		}
	},
	mounted:function(){
		this.init()
	},
	methods:{
		init: function(){
			
		},
		dragStart: function(e){
			if(!this.isPassing) {
				this.isMoving = true;
				var handler = this.$refs.handler;
				this.x = (e.pageX||e.touches[0].pageX) - parseInt(handler.style.left.replace('px',''), 10);
			}
			
		},
		dragMoving: function(e){
            if(this.isMoving && !this.isPassing){
            	var _x = (e.pageX||e.touches[0].pageX) - this.x;
            	var handler = this.$refs.handler;
                if(_x > 0 && _x <= (this.width-this.height)){
                    handler.style.left = _x + 'px';
                    this.$refs.progressBar.style.width = (_x+this.height/2)+'px';
                }else if(_x > (this.width-this.height)){  
                	handler.style.left = (this.width - this.height)+ 'px';
                    this.$refs.progressBar.style.width = (this.width-this.height/2)+'px';
                     this.passVerify();
                }
            }
		},
		dragFinish: function(e){
			if(this.isMoving && !this.isPassing){
				var _x = (e.pageX || e.changedTouches[0].pageX)- this.x;
				if(_x <(this.width - this.height)){
					this.$refs.handler.style.left = '0';
					this.$refs.progressBar.style.width = '0';
				}
				this.isMoving = false;
			}			
		},
		//Verify Completed Bar
		passVerify: function(){
           	this.isPassing = true;
           	this.isMoving = false;
           	var handler = this.$refs.handler;
           	handler.className += ' dv_handler_ok_bg';
           	handler.children[0].className = this.successIcon;
			this.$refs.progressBar.style.background = 'this.completedBg';
           	this.$refs.message.style.color = '#3a75c2';
			this.$emit('passcallback');
			document.getElementsByClassName("drag_verify")[0].style.border = '1px solid #5e91d2';
			document.getElementsByTagName("i")[1].style.background = '#5e91d2';
			// = '#5e91d2';
		}
	}
}
</script>

<style scopped>
.drag_verify{ 	
    position: relative;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
	border: 1px solid #b2b2b2;
	color : #9294a6;
	font-size: 12px;
	letter-spacing: 0;
}
.drag_verify .dv_handler{
	-ms-user-select: none; 
   -moz-user-select: -moz-none;
   -khtml-user-select: none;
   -webkit-user-select: none;
   user-select: none;
	cursor: pointer;
    position: absolute;
    top: 0px;
    left: 0px;
}
 .drag_verify .dv_handler_bg{
     /* background-image: url("../assets/right.png") no-repeat center; */
}
.drag_verify .dv_handler_ok_bg{
    background: #e4ecff !important;
} 
.drag_verify .dv_handler i{
    background: #b2b2b2;
    padding: 1px 5px 1px 6px;
    border-radius: 47px;
    color: white;
    font-weight: bold;
    font-size: 1.5em;
}
.drag_verify .dv_progress_bar{    
    position: absolute;
    height: 34px;
    width: 0px;    
}
.drag_verify .dv_text{    
    position: absolute;
    top: 0px;    
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -o-user-select:none;
    -ms-user-select:none;
}
</style>
