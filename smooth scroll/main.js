//Option 2- jQuery smooth scroll

$('.navbar a').on('click', function(e)){
    // console.log(this.hash);

    if(this.hash!==''){
        e.preventDefault();

        const hash = this.hash;

        $('html, body').animate({scrollTop: $(hash).offset().top}, 800);
    }
}

//Option 3 - SmoothScroll Script
const scroll = new SmoothScroll('.navbar a[href*="#',{
    speed:800
})