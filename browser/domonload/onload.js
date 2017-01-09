
function ready(completed) {
    // for ie8
    if ( document.readyState !== "loading" && !document.documentElement.doScroll  ) {
        // Handle it asynchronously to allow scripts the opportunity to delay ready
        window.setTimeout( ready );
    }else if(document.readyState === "complete"){
        completed();
    } else {
        // for webkit
        if (document.addEventListener) {
            document.addEventListener( "DOMContentLoaded", completed ,false);
        // for < ie8
        }else{
            window.addEvent('load',completed);
        }
    }
}

ready(function () {
    console.log('domready');
});
