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
        this.toggle_btn();
    }//clear_timer

    toggle_btn(){
        const auto = this.$btn.dataset.auto;
        this.$btn.textContent = `자동 재생 ${auto}`;
        const change = auto == "on" ? "off" : "on";
        this.$btn.dataset.auto = change;

        if(change == "on"){this.run_timer();}
    }//toggle_btn
}//class-Timer