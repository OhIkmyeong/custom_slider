export class Timer{
    constructor(SLIDER){
        this.SLIDER = SLIDER;

        this.time = 2000;
        this.timer = undefined;
        this.$btn = undefined;
    }//constructor

    init(){
        this.add_timer();
    }//init

    /* 자동재생 버튼 달기 */
    add_timer(){
        const $wrap = this.SLIDER.$wrap;
        const $btn_timer = document.createElement('BUTTON');
        $btn_timer.classList.add('btn_timer');
        $btn_timer.textContent = '자동 재생 off';
        $btn_timer.dataset.auto = "on";
        $wrap.appendChild($btn_timer);

        this.$btn = $btn_timer;
    }//add_timer

    run_timer(){
        this.SLIDER.POS.curr++;
        this.SLIDER.POS.move_to();
        this.timer = setTimeout(()=>{this.run_timer();},this.time);
    }//run_timer

    clear_timer(){
        clearTimeout(this.timer);
        this.off_btn();
    }//clear_timer

    on_btn(){
        this.$btn.textContent = `자동 재생 off`;
        this.$btn.dataset.auto = "on";

        setTimeout(()=>{this.run_timer();},1000);
    }//on_btn

    off_btn(){
        this.$btn.textContent = `자동 재생 on`;
        this.$btn.dataset.auto = "off";
    }//off_btn
}//class-Timer