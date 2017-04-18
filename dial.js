//initalize fullpage

$(document).ready(function() {
	$('#fullpage').fullpage();
});




function log(msg) {
    var div = document.getElementById("log");
    var p = document.createElement('p');
    p.textContent = msg;
    div.appendChild(p);
    console.log(msg);
}
var mode = 'system';
function modeSwitch(ev) {
    log("invoked " + ev.target.displayText);
    mode = ev.target.displayText;
}
if (typeof Windows != 'undefined') {
    log("initializing dial");
    // Modify System Defaults to Only Show Volume and Next/Prev Track as per guidance.
    // https://docs.microsoft.com/en-us/windows/uwp/input-and-devices/windows-wheel-interactions


    //initilize dial
    var config = Windows.UI.Input.RadialControllerConfiguration.getForCurrentView();
    config.setDefaultMenuItems([Windows.UI.Input.RadialControllerSystemMenuItemKind.volume,
        Windows.UI.Input.RadialControllerSystemMenuItemKind.scroll]);
    var controller = Windows.UI.Input.RadialController.createForCurrentView();


    
    // Add our own item to respond to
    // var mi = Windows.UI.Input.RadialControllerMenuItem.createFromKnownIcon("Undo/Redo", Windows.UI.Input.RadialControllerMenuKnownIcon.undoRedo);
    // mi.addEventListener("invoked", modeSwitch);

    // Add two custom sections for the dial interface
    var mi2 = Windows.UI.Input.RadialControllerMenuItem.createFromIcon("Page Turns", Windows.Storage.Streams.RandomAccessStreamReference.createFromUri(new Windows.Foundation.Uri("ms-appx:///icon.png")));
    var mi3 = Windows.UI.Input.RadialControllerMenuItem.createFromIcon("Prep Build", Windows.Storage.Streams.RandomAccessStreamReference.createFromUri(new Windows.Foundation.Uri("ms-appx:///kevin.png")));
  //push to controler
    controller.menu.items.push(mi2);
    controller.menu.items.push(mi3);

    mi2.addEventListener("invoked", modeSwitch);
    mi3.addEventListener('invoked', modeSwitch);
  //  controller.menu.items.push(mi);


    controller.addEventListener("buttonclicked", function (e) {
     if(mode !== 'Prep Build') return
     document.body.classList.toggle('build')
    });

    controller.addEventListener("rotationchanged", function (e) {
        if(mode !== 'Page Turns') return
        var changeDirection = e.detail[0].rotationDeltaInDegrees;
      if(changeDirection < 0){
        $.fn.fullpage.moveSectionUp();
      }else{
        $.fn.fullpage.moveSectionDown();

      }
      
      //  log("rotation changed: " + e.detail[0].rotationDeltaInDegrees + " in " + mode);
    });
 
 
 
 
 
    // To remove system defaults and just have your own...
    ////config.setDefaultMenuItems(<any>[]);
    log("win/dial initialized");
}
