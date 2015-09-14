//= require jquery
//= require turbolinks
//= require scrollReveal.js/dist/scrollReveal.min.js
//= require bootstrap/dist/js/bootstrap.js
//= require moment
//= require_tree .

$(document).ready(function() {

  // indicate active section in navbar
  $(window).scroll(function () {
        var y = $(this).scrollTop();

        $('nav li a').each(function (event) {
            if (y >= $($(this).attr('href')).offset().top - 100) {
                $('nav li a').not(this).removeClass('active');
                $(this).addClass('active');
            }
        });
    });

  var timelineDates = [
    {
      time: "September 3, 2015",
      name:  "Applications Open"
    },
    {
      time: "October 6, 2015",
      name:  "Applications Close"
    },
    {
      time: "October 8, 2015",
      name:  "Decisions Released"
    },
    {
      time: "October 23, 2015",
      name:  "UGA Hacks Begins"
    }
  ].map(function (timeline) {
    return {
      time: moment(timeline.time),
      name: timeline.name
    };
  });

  var now = moment();

  var timelineItems = $(".col-md-3.timeline-item");

  var index = 0;
  timelineDates.forEach(function (deadline) {
    var element = timelineItems[index];
    var content = "";
    var deadlinePassed = !deadline.time.isAfter(now)
    if (deadlinePassed) {
      content = "✓<br><br>" + deadline.time.format("MMMM Do") + "<br>" + deadline.name;
    } else {
      content = "…<br><br>" + deadline.time.format("MMMM Do") + "<br>" + deadline.name;
    }

    element.querySelector("p").innerHTML = content;
    index++;
  })

  function initTimelineAnimation (index) {
    var deadline = timelineDates[index]
    var element = timelineItems[index];
    var content = "";
    var deadlinePassed = !deadline.time.isAfter(now)
    if (deadlinePassed) {
      $(timelineItems[index]).find(".progress-fill").addClass("active")
    }
    index++;

    if (index >= timelineDates.length) {
      return;
    };

    setTimeout(function(){
      initTimelineAnimation(index);
    }, 1000);
  }

  // animates elements to scroll into view when viewport shifts
  var config = {
    complete: function( el ) {
      if (el.id == "about-info") {
        initTimelineAnimation(0)
      };
    }
  }
  window.sr = new scrollReveal(config);

  // smoothly scroll when clicking on anchor links
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 100
          }, 1500);
          return false;
        }
      }
    });
  });

  // redirects to typeform directly if on mobile
  window.isMobile = /iphone|ipod|ipad|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(navigator.userAgent.toLowerCase());
  if (window.isMobile) {
    $(".spotlight a").attr("href", "https://jaicob.typeform.com/to/rXE0ra");
    $("a[href='#register']").attr("href", "https://jaicob.typeform.com/to/rXE0ra");
    $("#register-fade").hide()
    $("#register").hide()
    $(".jumbotron h2").text ("University of Georgia");

    $("#mlh-trust-badge").css("display", "none");
  };

});