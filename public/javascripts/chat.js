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
