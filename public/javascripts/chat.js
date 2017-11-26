$(document).ready(()=>{


  $(".button-emoji").click(()=>{

    if($("#image-box").css("display")=== "none"){
      $("#image-box").show();
    } else {
      $("#image-box").hide();
    }


  });

  $(".button-plus").click(() => {

    if ($("#btn-plus").css("display")=== "none") {
      $("#btn-plus").show();
    } else {
      $("#btn-plus").hide();
    }
  });


});

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

$(".list-contacts").click(() => {
  if ($(".panel-body").css("display")==="none") {
    $(".panel-body").show();
  } else {
    $(".panel-body").hide();
  }
});

$(".button-plus").click(() => {

  if ($("#btn-plus").css("display")=== "none" ||
  $("#btn-plus").show()

) {
    $(".panel-body").hide();
  } else {
    $("#btn-plus").hide();
  }
});

$(".list-contacts").click(() => {

  if ($(".panel-body").css("display")=== "none" ||
  $("panel-body").show()

) {
    $("#btn-plus").hide();
  } else {
    $("panel-body").hide();
  }
});
