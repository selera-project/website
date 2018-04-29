function randn() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.abs(Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v ));
}

function ready(callback){
    // in case the document is already rendered
    if (document.readyState!='loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
}

ready(function(){
  logoElement = document.getElementById('animatedLogo');

  var draw = function() {
    var style = {
      width: logoElement.offsetWidth,
      height: logoElement.offsetHeight,
      circleRadius: logoElement.offsetHeight/2.2,
      smallCircleRadius: logoElement.offsetHeight/30,
      backgroundColor: '#53585F',
      lineColor: '#FFA644',
      lineWidth: logoElement.offsetHeight/25,
    }


    logoElement.innerHTML = '';
    var two = new Two({
      width: style.width,
      height: style.height
    }).appendTo(logoElement);

    var r = style.circleRadius;
    var bigCircle = two.makeCircle(0, 0, r);
    bigCircle.fill = style.backgroundColor;
    bigCircle.stroke = style.lineColor;
    bigCircle.linewidth = style.lineWidth;
    var circles = []
    var xs = []
    var ys = []
    var bigCircleGroup = two.makeGroup(bigCircle);
    for (var i = 0; i < 12; i++) {
      var x = (r-2) * Math.cos(2 * Math.PI * i / 12);
      var y = (r-2) * Math.sin(2 * Math.PI * i / 12);
      xs.push(x);
      ys.push(y);
    }
    bigCircleGroup.translation.set(two.width / 2, two.height / 2);

    var group = two.makeGroup();
    var lineGroup = two.makeGroup();
    var circleGroup = two.makeGroup();


    var counter = 0;

    line1 = two.makeLine(xs[3], ys[3], xs[9], ys[9]);
    line1.linewidth = style.lineWidth;
    line1.stroke = style.lineColor;
    lineGroup.add(line1);

    line2 = two.makeLine(xs[0], ys[0], xs[4], ys[4]);
    line2.linewidth = style.lineWidth;
    line2.stroke = style.lineColor;
    lineGroup.add(line2);

    line3 = two.makeLine(xs[10], ys[10], xs[6], ys[6]);
    line3.linewidth = style.lineWidth;
    line3.stroke = style.lineColor;
    lineGroup.add(line3);

    line4 = two.makeLine(xs[0], ys[0], xs[6], ys[6]);
    line4.linewidth = style.lineWidth;
    line4.stroke = style.lineColor;
    lineGroup.add(line4);
    lineGroup.translation.set(two.width / 2, two.height / 2);

    for (var _ = 0; _ < 10; _++) {
      var j = Math.random(12);
      var i = Math.random(12);
      while (Math.abs(i-j) < 2) {
        var j = Math.random(12);
        var i = Math.random(12);
      }
      line = two.makeLine(xs[i], ys[i], xs[j], ys[j]);
      line.linewidth = 1;
      line.opacity = Math.random()*Math.abs(i-j)*0.1;
      line.stroke = style.lineColor;
      group.add(line);
    }

    function f() {
      if (counter % 12 == 0) {
        var xs = []
        var ys = []
        var dict = {};
        for (var i = 0; i < 12; i++) {
          if (true) {
            var x = (r-2) * Math.cos(2 * Math.PI * (i) / 12);
            var y = (r-2) * Math.sin(2 * Math.PI * (i) / 12);
            xs.push(x);
            ys.push(y);
          }
        }
        circleGroup.remove(circleGroup.children);

        for (var child in group.children) {
          var p = Math.random();
          if (p < 0.01) {
            group.remove(group.children[child]);
          }
        }

        for (var i = 0; i < 12; i++) {
          for (var j = i; j < 12; j++) {
            var p = Math.random();
            if (p < 0.007 && Math.abs(i-j) > 2) {
              line = two.makeLine(xs[i], ys[i], xs[j], ys[j]);
              line.linewidth = 1;
              line.opacity = Math.random()*Math.abs(i-j)*0.1;
              line.stroke = style.lineColor;
              group.add(line);
              dict[(i,j)] = line
            }
          }
        }
        group.translation.set(two.width / 2, two.height / 2);
        for (var i = 0; i < 12; i++) {
          var circle = two.makeCircle(xs[i], ys[i], style.smallCircleRadius);
          circle.fill = '#FFFFFF';
          circle.stroke = style.lineColor;
          circle.linewidth = style.lineWidth/3;
          circleGroup.add(circle);
          circles.push(circle);
        }

        // And have translation, rotation, scale like all shapes.
        circleGroup.translation.set(two.width / 2, two.height / 2);
      }
      counter++;
    }
    two.bind('update', f).play();
  }

  draw();

  var width = logoElement.offsetWidth;
  window.addEventListener('resize', function() {
    if (logoElement.offsetWidth != width) {
      width = logoElement.offsetWidth;
      draw();
    }
  });
});
