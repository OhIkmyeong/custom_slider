export class MakeSlider{
    constructor(SLIDER){
        this.SLIDER = SLIDER;
    }

    /* 총괄 */
    init(){
        this.put_in_to_wrap();
        this.add_li();
        this.make_btn();
    }//init

    /* wrap 만들어서 그 안으로 옮긴다 */
    put_in_to_wrap(){
        const $elem = this.SLIDER.$elem;
        const $parent = $elem.parentElement || document.body;
        const $wrap = document.createElement('DIV');
        $wrap.classList.add('swiper-wrap');
        $parent.insertBefore($wrap,$elem);
        
        $wrap.appendChild($elem);

        this.SLIDER.$wrap = $wrap;
    }//put_in_to_wrap

    /* 버튼 추가 */
    make_btn(){
        const $wrap = this.SLIDER.$wrap;
        const $prev = document.createElement('BUTTON');
        const $next = document.createElement('BUTTON');

        $prev.classList.add('swiper-btn');
        $next.classList.add('swiper-btn');

        $prev.dataset.btn = "prev";
        $next.dataset.btn = "next";

        $prev.textContent = '이전';
        $next.textContent = '다음';

        $wrap.appendChild($prev);
        $wrap.appendChild($next);
    }//make_btn

    /* 0,1과 n과 n-1을 앞 뒤로 추가해줘야함 */
    add_li(){
        const $elem = this.SLIDER.$elem;
        const $$li = $elem.children;
        const $first = $$li[0]; 

        const $0 = $first.cloneNode(true);
        const $1 = $$li[1].cloneNode(true);
        const $n_1 = $$li[$$li.length - 2].cloneNode(true);
        const $n = $$li[$$li.length - 1].cloneNode(true);

        const $frag_next = document.createDocumentFragment();
        $frag_next.appendChild($0);
        $frag_next.appendChild($1);

        const $frag_before = document.createDocumentFragment();
        $frag_before.appendChild($n_1);
        $frag_before.appendChild($n);

        $elem.insertBefore($frag_before, $elem.firstChild);
        $elem.appendChild($frag_next);
    }//add_li
    
}//class-MakeSlider