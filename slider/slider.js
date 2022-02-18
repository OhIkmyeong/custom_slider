import { MakeSlider } from "./makeSlider.js";
import { PosSlider } from "./positionSlider.js";
import { Timer } from "./timeSlider.js";

export class Swiper{
    constructor($elem){
        this.MAKE = new MakeSlider(this);
        this.POS = new PosSlider(this);
        this.TIMER = new Timer(this);

        this.$wrap = undefined;
        this.$elem = $elem;

        this.flag = true;

        this.init();
    }//constructor

    init(){
        this.MAKE.init();
        this.POS.init();
        this.add_event();
        this.TIMER.init();
    }//init

    add_event(){
        this.$wrap.addEventListener('click',this.on_btn);
        this.$wrap.addEventListener('mousedown',this.POS.mousePos_start);
        this.$wrap.addEventListener('mouseup',this.POS.mousePos_end);
    }//add_event

    on_btn = (e) => {
        if(!this.flag){return;}
        const direction = e.target.dataset.btn; 
        if(!direction){return;}

        this.flag = false;
        this.TIMER.clear_timer();

        switch(direction){
            case "prev" :
                this.POS.curr--;
                break;

            case "next" : 
                this.POS.curr++;
                break;
        }//switch

        this.POS.move_to();
    }//on_btn;

}//class-Swiper