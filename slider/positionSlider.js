export class PosSlider{
    constructor(SLIDER){
        this.SLIDER = SLIDER;

        this.WID = {
            win : window.innerWidth,
            li : undefined};
        this.GAP = undefined;
        this.limit = {first : undefined, last:undefined};
        
        this.mousePos = {start:undefined, end:undefined};

        this.curr = 2;
        this.transition = `transform .5s`;

        this.time = 2000;
        this.timer = undefined;
    }//constructor

    init(){
        this.add_resize_event();
        this.set_size();
        this.set_limit();

        this.move_to(this.curr);

        this.SLIDER.TIMER.run_timer();
    }//init

    add_resize_event(){
        window.addEventListener('resize',()=>{
            this.set_size();
            this.set_limit();
            this.move_to(this.curr);
        });
    }//add_resize_event

    set_size(){
        this.WID.win = parseInt(window.innerWidth);
        this.WID.li = this.WID.win - 400;
        this.GAP = (this.WID.win - this.WID.li) / 2;
    }//set_size

    set_limit(){
        const len = this.SLIDER.$elem.children.length - 2;
        this.limit.first = (this.WID.li * -1) + this.GAP;
        this.limit.last = (this.WID.li * -1 * len) + this.GAP;
    }//set_limit

    async move_to(){
        const $elem = this.SLIDER.$elem;
        const movement = (this.WID.li * -1 * this.curr) + this.GAP;
        await this.move(movement);

        if(this.curr < 2){
            console.log('끝으로 변경해야돼');
            this.curr = $elem.children.length - 3;
            $elem.children[this.curr].classList.add('on');
            await this.remove_transition_and_move();
        }else if(this.curr >= $elem.children.length - 2){
            console.log('시작으로 변경해야돼');
            this.curr = 2;
            $elem.children[this.curr].classList.add('on');
            await this.remove_transition_and_move();
        }else{
            this.add_on();
        }//if

        this.SLIDER.flag = true;
    }//move_to

    move(movement){
        const $elem = this.SLIDER.$elem;
        $elem.style.transform = `translateX(${movement}px)`;

        return new Promise((res)=>{
            setTimeout(()=>{
                res('');
            },500);
        });
    }//move

    add_on(){
        const $$li = this.SLIDER.$elem.children;
        const curr = $$li[this.curr];
        curr.classList.add('on');

        for(let $li of $$li){
            if($li == curr){continue;}
            $li.classList.remove('on');
        }
        
    }//add_on

    async remove_transition_and_move(){
        await this.remove_transition();
        this.restore_transition();
    }//remove_transition_and_move

    

    remove_transition(){
        this.SLIDER.$elem.style.transition = 'none';
        this.move_to(this.curr);

        return new Promise((res)=>{
            setTimeout(()=>{
                res();
            },100);
        });
    }//remove_transition

    restore_transition(){
        this.SLIDER.$elem.style.transition = this.transition;
    }//restore_transition


    mousePos_start = (e)=>{
        this.mousePos.start = e.clientX;
        this.SLIDER.$elem.style.cursor = 'grabbing';
    }//mousePos_start

    mousePos_end = (e)=>{
        this.flag = false;
        
        this.SLIDER.$elem.style.cursor = 'grab';
        this.SLIDER.TIMER.clear_timer();
        
        if(e.target.dataset.auto == "off"){
            this.SLIDER.TIMER.on_btn();
        }

        this.mousePos.end = e.clientX;
        const {start, end} = this.mousePos;
        const gap = end - start;
        if(gap > 0){
            this.curr--;
        }else if(gap < 0){
            this.curr++;
        }
        this.move_to();
    }//mousePos_end
}//class-PosSlider