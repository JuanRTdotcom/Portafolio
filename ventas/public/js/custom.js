$('#calendar').datepicker({
		});

!function ($) {
    $(document).on("click","ul.nav li.parent > a ", function(){          
        $(this).find('em').toggleClass("fa-minus");      
    }); 
    $(".sidebar span.icon").find('em:first').addClass("fa-plus");
}

(window.jQuery);
	$(window).on('resize', function () {
  if ($(window).width() > 768) $('#sidebar-collapse').collapse('show')
})
$(window).on('resize', function () {
  if ($(window).width() <= 767) $('#sidebar-collapse').collapse('hide')
})

$(document).on('click', '.panel-heading span.clickable', function(e){
    var $this = $(this);
	if(!$this.hasClass('panel-collapsed')) {
		$this.parents('.panel').find('.panel-body').slideUp();
		$this.addClass('panel-collapsed');
		$this.find('em').removeClass('fa-toggle-up').addClass('fa-toggle-down');
	} else {
		$this.parents('.panel').find('.panel-body').slideDown();
		$this.removeClass('panel-collapsed');
		$this.find('em').removeClass('fa-toggle-down').addClass('fa-toggle-up');
	}
})

document.getElementById('reduceB').addEventListener('click',()=>{
	
	var tamaño=$(window).width() 
	if(tamaño>768){
		$('#sidebar-collapse').toggleClass('esconderteH')
	
	var t=$('#sidebar-collapse').css("left")
	if(t=='0px'){
		document.getElementById('cambiante').setAttribute('class',' col-sm-offset-3 col-lg-12 col-lg-offset-2 main')
		$('#cambiante').toggleClass('esconderteHO')
	}else{
		document.getElementById('cambiante').setAttribute('class',' col-sm-offset-3 col-lg-10 col-lg-offset-2 main')
		
	}
	}
	
	
	
})
	
