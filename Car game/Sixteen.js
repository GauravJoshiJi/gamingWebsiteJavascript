$(document).ready(function () {
  var car = $(".car");
  var ecar = $(".ecar");
  var car1 = $("#car1");
  var car2 = $("#car2");
  var car3 = $("#car3");
  var road = $(".road");
  var line = $(".line");
  var line1 = $("#line1");
  var line2 = $("#line2");
  var line3 = $("#line3");
  var tree = $(".tree");
  var tree1 = $("#tree1");
  var tree2 = $("#tree2");
  var tree3 = $("#tree3");
  var tree4 = $("#tree4");
  var tree5 = $("#tree5");
  var treee = $(".treee");
  var treee1 = $("#treee1");
  var treee2 = $("#treee2");
  var treee3 = $("#treee3");
  var restart_div = $(".restart_div");

  var score = $("#score");
  var score1 = $("#score1");
  var score_count = 1;
  var road_width = parseInt(road.width());
  var road_height = parseInt(road.height());
  var car_height = parseInt(car.height());
  var car_width = parseInt(car.width());
  var background1 = $(".background1");
  var background1_widht = parseInt(background1.width());
  var tree_width = parseInt(tree.width());
  var background2 = $(".background2");
  var background2_width = parseInt(background2.width());
  var treee_width = parseInt(treee.width());

  var road_height = parseInt(road.height());
  var road_width = parseInt(road.width());
  var ecar_width = parseInt(ecar.width());

  var anim_id;
  var valocity = $("valocity");
  var speed = 5;
  var speed_count = 5;

  var speed1 = 5;

  move_left = false;
  move_right = false;
  move_up = false;
  move_down = false;
  speed_up = false;

  $(document).on("keydown", function (e) {
    var key = e.keyCode;
    if (key === 37 && move_left === false) {
      move_left = requestAnimationFrame(left);
    } else if (key === 39 && move_right === false) {
      move_right = requestAnimationFrame(right);
    } else if (key === 38 && move_up === false) {
      move_up = requestAnimationFrame(up);
    } else if (key === 40 && move_down === false) {
      move_down = requestAnimationFrame(down);
    } else if (key === 32) {
      speed_up = requestAnimationFrame(speed_me);
    }
  });
  $(document).on("keyup", function (e) {
    var key = e.keyCode;
    if (key === 37) {
      cancelAnimationFrame(move_left);
      move_left = false;
    } else if (key === 39) {
      cancelAnimationFrame(move_right);
      move_right = false;
    } else if (key === 38) {
      cancelAnimationFrame(move_up);
      move_up = false;
    } else if (key === 40) {
      cancelAnimationFrame(move_down);
      move_down = false;
    }
  });

  function left() {
    if (parseInt(car.css("left")) > 35) {
      car.css("left", parseInt(car.css("left")) - 6);
      move_left = requestAnimationFrame(left);
    }
  }

  function right() {
    if (parseInt(car.css("left")) < road_width - car_width + 25) {
      car.css("left", parseInt(car.css("left")) + 6);
      move_right = requestAnimationFrame(right);
    }
  }
  function up() {
    if (parseInt(car.css("top")) > 55) {
      car.css("top", parseInt(car.css("top")) - 6);
      move_up = requestAnimationFrame(up);
    }
  }
  function down() {
    if (parseInt(car.css("top")) < road_height - car_height + 55) {
      car.css("top", parseInt(car.css("top")) + 6);
      move_down = requestAnimationFrame(down);
    }
  }

  function speed_me() {
    speed++;
  }

  ////REQUEST ANMATION FRAME////
  var anim_id = requestAnimationFrame(repeate);

  function repeate() {
    score_count++;
    if (score_count % 20 == 0) {
      score.text(parseInt(score.text()) + 1);
    }

    speed_count++;
    if (speed_count % 200 == 0) {
      speed++;
      speed1++;
      console.log(speed);

      score1.text(parseInt(score1.text()) + 10);
    }

    if (collision(car, car1) || collision(car, car2) || collision(car, car3)) {
      stop_the_game();
    }

    cars_down(car1);
    cars_down(car2);
    cars_down(car3);
    lines_down(line1);
    lines_down(line2);
    lines_down(line3);
    trees_down(tree1);
    trees_down(tree2);
    trees_down(tree3);
    trees_down(tree4);
    trees_down(tree5);
    treees_down(treee1);
    treees_down(treee2);
    treees_down(treee3);

    anim_id = requestAnimationFrame(repeate);
  }

  function cars_down(ecar) {
    var current_top = parseInt(ecar.css("top"));

    //        speed_count++;
    //        if(speed_count % 1500 == 0)
    //            {
    //                speed++;
    //                console.log(speed);
    //                 speed.text(parseInt(speed.text()) +1);
    //
    //
    //            }

    if (current_top > road_height + 100) {
      current_top = -250;

      var cars_left = Math.random() * (road_width - ecar_width);

      ecar.css("left", cars_left);
    }
    ecar.css("top", current_top + speed - 1);
  }

  function lines_down(line) {
    var current_top = parseInt(line.css("top"));

    if (current_top > road_height + 100) {
      current_top = -200;
    }
    line.css("top", current_top + speed);
  }

  function trees_down(tree) {
    var current_top = parseInt(tree.css("top"));

    if (current_top > road_height) {
      current_top = -350;

      var tree_left = parseInt(
        Math.random() * (background1_widht - tree_width + 180)
      );

      tree.css("left", tree_left);
    }

    tree.css("top", current_top + speed);
  }

  function treees_down(treee) {
    var current_top = parseInt(treee.css("top"));

    if (current_top > road_height) {
      current_top = -400;
      var treee_left = parseInt(Math.random() * (background2_width - 500));

      treee.css("left", treee_left);
    }

    treee.css("top", current_top + speed);
  }

  function stop_the_game() {
    cancelAnimationFrame(anim_id);
    cancelAnimationFrame(move_right);
    cancelAnimationFrame(move_left);
    cancelAnimationFrame(move_up);
    cancelAnimationFrame(move_down);
    restart_div.slideDown();
    restart_btn.focus();
    //alert("Game over");
  }

  function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
  }

  var x = (function () {
    alert("This Game is design and developed by Gaurav Joshi");
    alert(
      "you have five-controls, arrow keys for controlling the car and space-bar for speeding up "
    );
  })();
});
