var Countdown = {
  $el: $(".countdown"),
  countdown_interval: null,
  total_seconds: 0,
  init: function() {
    this.$ = {
      hours: this.$el.find(".bloc-time.hours .figure"),
      minutes: this.$el.find(".bloc-time.min .figure"),
      seconds: this.$el.find(".bloc-time.sec .figure")
    };
    this.values = {
      hours: this.$.hours.parent().attr("data-init-value"),
      minutes: this.$.minutes.parent().attr("data-init-value"),
      seconds: this.$.seconds.parent().attr("data-init-value")
    };
    this.total_seconds = this.values.hours * 60 * 60 + this.values.minutes * 60 + this.values.seconds;
    this.count();
  },
  count: function() {
    var that = this, $hour_1 = this.$.hours.eq(0), $hour_2 = this.$.hours.eq(1), $min_1 = this.$.minutes.eq(0), $min_2 = this.$.minutes.eq(1), $sec_1 = this.$.seconds.eq(0), $sec_2 = this.$.seconds.eq(1);
    this.countdown_interval = setInterval(function() {
      if (that.total_seconds > 0) {
        --that.values.seconds;
        if (that.values.minutes >= 0 && that.values.seconds < 0) {
          that.values.seconds = 59;
          --that.values.minutes;
        }
        if (that.values.hours >= 0 && that.values.minutes < 0) {
          that.values.minutes = 59;
          --that.values.hours;
        }
        that.checkHour(that.values.hours, $hour_1, $hour_2);
        that.checkHour(that.values.minutes, $min_1, $min_2);
        that.checkHour(that.values.seconds, $sec_1, $sec_2);
        --that.total_seconds;
      } else {
        clearInterval(that.countdown_interval);
      }
    }, 1e3);
  },
  animateFigure: function($el, value) {
    var that = this, $top = $el.find(".top"), $bottom = $el.find(".bottom"), $back_top = $el.find(".top-back"), $back_bottom = $el.find(".bottom-back");
    $back_top.find("span").html(value);
    $back_bottom.find("span").html(value);
    TweenMax.to($top, .8, {
      rotationX: "-180deg",
      transformPerspective: 300,
      ease: Quart.easeOut,
      onComplete: function() {
        $top.html(value);
        $bottom.html(value);
        TweenMax.set($top, {
          rotationX: 0
        });
      }
    });
    TweenMax.to($back_top, .8, {
      rotationX: 0,
      transformPerspective: 300,
      ease: Quart.easeOut,
      clearProps: "all"
    });
  },
  checkHour: function(value, $el_1, $el_2) {
    var val_1 = value.toString().charAt(0), val_2 = value.toString().charAt(1), fig_1_value = $el_1.find(".top").html(), fig_2_value = $el_2.find(".top").html();
    if (value >= 10) {
      if (fig_1_value !== val_1) this.animateFigure($el_1, val_1);
      if (fig_2_value !== val_2) this.animateFigure($el_2, val_2);
    } else {
      if (fig_1_value !== "0") this.animateFigure($el_1, 0);
      if (fig_2_value !== val_1) this.animateFigure($el_2, val_1);
    }
  }
};

Countdown.init();

(function($) {
  $.fn.timerCountdown = function(options) {
    var theList = this;
    var settings = $.extend({
      timerEnd: "February 26, 2018, 12:38:00 UTC",
      complete: null,
      format: "on"
    }, options);
    return this.each(function() {
      var time = settings.timerEnd;
      var calcNewTimer = setInterval(function() {
        dateFuture = new Date(time);
        dateNow = new Date();
        seconds = Math.floor((dateFuture - dateNow) / 1e3);
        if (seconds <= 0) {
          disablePage();
        }
        minutes = Math.floor(seconds / 60);
        hours = Math.floor(minutes / 60);
        days = Math.floor(hours / 24);
        hours = hours - days * 24;
        minutes = minutes - days * 24 * 60 - hours * 60;
        seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
        if (settings.format == "on") {
          days = String(days).length >= 2 ? days : "0" + days;
          hours = String(hours).length >= 2 ? hours : "0" + hours;
          minutes = String(minutes).length >= 2 ? minutes : "0" + minutes;
          seconds = String(seconds).length >= 2 ? seconds : "0" + seconds;
        }
        if (days == 1) {
          dayTitle = "Day";
        } else {
          dayTitle = "Days";
        }
        if (hours == 1) {
          hourTitle = "Hour";
        } else {
          hourTitle = "Hours";
        }
        if (minutes == 1) {
          minuteTitle = "Minute";
        } else {
          minuteTitle = "Minutes";
        }
        if (seconds == 1) {
          secondTitle = "Second";
        } else {
          secondTitle = "Seconds";
        }
        theList.html('<li><span class="days">' + days + '</span><p class="days-title">' + dayTitle + "</p></li>" + '<li><span class="hours">' + hours + '</span><p class="hours-title">' + hourTitle + "</p></li>" + '<li><span class="minutes">' + minutes + '</span><p class="minutes-title">' + minuteTitle + "</p></li>" + '<li><span class="seconds">' + seconds + '</span><p class="seconds-title">' + secondTitle + "</p></li>");
      }, 1e3);
      function disablePage() {
        if ($.isFunction(settings.complete)) {
          settings.complete.call(this);
        }
        theList.remove();
        clearInterval(calcNewTimer);
      }
    });
  };
})(jQuery);

setInterval(function() {
  secondPlay();
}, 1e3);

setInterval(function() {
  minutePlay();
}, 1e4);

function secondPlay() {
  $("body").removeClass("play");
  var aa = $("ul.secondPlay li.active");
  if (aa.html() == undefined) {
    aa = $("ul.secondPlay li").eq(0);
    aa.addClass("before").removeClass("active").next("li").addClass("active").closest("body").addClass("play");
  } else if (aa.is(":last-child")) {
    $("ul.secondPlay li").removeClass("before");
    aa.addClass("before").removeClass("active");
    aa = $("ul.secondPlay li").eq(0);
    aa.addClass("active").closest("body").addClass("play");
  } else {
    $("ul.secondPlay li").removeClass("before");
    aa.addClass("before").removeClass("active").next("li").addClass("active").closest("body").addClass("play");
  }
}

function minutePlay() {
  $("body").removeClass("play");
  var aa = $("ul.minutePlay li.active");
  if (aa.html() == undefined) {
    aa = $("ul.minutePlay li").eq(0);
    aa.addClass("before").removeClass("active").next("li").addClass("active").closest("body").addClass("play");
  } else if (aa.is(":last-child")) {
    $("ul.minutePlay li").removeClass("before");
    aa.addClass("before").removeClass("active");
    aa = $("ul.minutePlay li").eq(0);
    aa.addClass("active").closest("body").addClass("play");
  } else {
    $("ul.minutePlay li").removeClass("before");
    aa.addClass("before").removeClass("active").next("li").addClass("active").closest("body").addClass("play");
  }
}