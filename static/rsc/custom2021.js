var CookieColorKeyName ='MOhColorSelectedValue';
//get Corona News
	//GetListItems($util.LangUrl + "/Lists/CoronaUpdates", "Home", Bindcorona, "dd/MMM/yyyy","");
	
//bind Corona News
function Bindcorona(data, listName, containerId){
var html_content = '';
$.each(data,function(key,item){
		html_content +='<li><strong>'+ item.Title +'</strong>:     '+ item.CoronaNumber +'</li>';
	});
$(".textcorona").html(html_content);
};
$(window).scroll(function () {
    // go to top
    if ($(this).scrollTop() > 100) {
        $('.scrollup').fadeIn();
    } else {
        $('.scrollup').fadeOut();
    }
	
	// fixed menu
    if ($(this).scrollTop() > 112) {
        $('.top_menu').addClass('fixed');
    } else {
        $('.top_menu').removeClass('fixed');
    }
});
function ChangeStyle(item){
	$('link[id*="MohCustomStyle"]').attr("href", $(item).attr("data-rel"));
	setCookie(CookieColorKeyName, $(item).attr("data-rel"), { expires: 365, path: '/' });
	$(".activestyle").removeAttr("class");
	$(item).addClass("activestyle");
	
	return false;	
};

function GetReturnFalse(){
	return false;
}

function copyToClipboard() {
	var text= window.location.href;
	if (window.clipboardData && window.clipboardData.setData) {
					// IE specific code path to prevent textarea being shown while dialog is visible.
					return clipboardData.setData("Text", text);
	} else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
		var textarea = document.createElement("textarea");
		textarea.textContent = text;
		textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
		document.body.appendChild(textarea);
		textarea.select();
		try {
						return document.execCommand("copy");  // Security exception may be thrown by some browsers.
		} catch (ex) {
						console.warn("Copy to clipboard failed.", ex);
						return false;
		} finally {
						document.body.removeChild(textarea);
		}
	}
}

$(document).ready(function () {	
// Rate Title

  $("#RateThis").on("mouseenter",function(event){ 
   var curLangugage = $util.currentLang 
    if(curLangugage == "en"){
 	$("#mydiv0").attr('title', 'Very bad');
	$("#mydiv1").attr('title', 'Bad');
	$("#mydiv2").attr('title', 'Average');
	$("#mydiv3").attr('title', 'Good');
	$("#mydiv4").attr('title', 'Very Good');
	}
	else{
		$("#mydiv0").attr('title', 'سيئ للغاية');
	    $("#mydiv1").attr('title', 'سيئ');
	    $("#mydiv2").attr('title', 'متوسط');
	    $("#mydiv3").attr('title', 'جيد');
	    $("#mydiv4").attr('title', 'جيد جدًا');
	}
	});
	
	// colors
    if (getCookie(CookieColorKeyName)) {
		//document.getElementsByTagName('head')[0].getElementById('MohCustomStyle').href= getCookie(CookieColorKeyName);
		
		var styleLink = getCookie(CookieColorKeyName);
        $('link[id*="MohCustomStyle"]').attr("href", styleLink);
		
		if(styleLink.toLowerCase().lastIndexOf("gray") > 0){
			$("#lnkgray").addClass("activestyle");
		}else{
			$("#lnkgreen").addClass("activestyle");
		}
    }else{
		$('link[id*="MohCustomStyle"]').attr("href", "/_layouts/15/MOH/Internet/New/css/styles_"+ $util.currentLang +".css");
		$("#lnkgreen").addClass("activestyle");
	}
	
    // go to top
    $('.scrollup').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

    //tooltip
    $(".tooltip span").click(function () {
        $(this).parent().toggleClass('sropen srclose');
    });
    $(document).mouseup(function (e) {
        var container = $(".settings");
        if (!container.is(e.target)
			&& container.has(e.target).length === 0
			&& !container.hasClass('srclose')) {
            container.addClass('srclose').removeClass('sropen');
        }
    });
    $(document).mouseup(function (e) {
        var container = $(".srch");
        if (!container.is(e.target)
			&& container.has(e.target).length === 0
			&& !container.hasClass('srclose')) {
            container.addClass('srclose').removeClass('sropen');
        }
    });
    $(document).mouseup(function (e) {
        var container = $(".happy");
        if (!container.is(e.target)
			&& container.has(e.target).length === 0
			&& !container.hasClass('srclose')) {
            container.addClass('srclose').removeClass('sropen');
        }
    });
    $(document).mouseup(function (e) {
        var container = $(".contactus");
        if (!container.is(e.target)
			&& container.has(e.target).length === 0
			&& !container.hasClass('srclose')) {
            container.addClass('srclose').removeClass('sropen');
        }
    });
	$(document).mouseup(function (e) {
        var container = $(".sharepage");
        if (!container.is(e.target)
			&& container.has(e.target).length === 0
			&& !container.hasClass('srclose')) {
            container.addClass('srclose').removeClass('sropen');
        }
    });

    $(document).mouseup(function (e) {
        var container = $(".logout");
        if (!container.is(e.target)
			&& container.has(e.target).length === 0
			&& !container.hasClass('srclose')) {
            container.addClass('srclose').removeClass('sropen');
        }
    });

    // top menu
    $('#menu').slicknav({
        label: '',
        duplicate: true
    });
	
	// get footer contact us data
	GetListItems($util.LangUrl + "/Lists/ContactUsData", "Home", BindContactUsData, "dd/MMM/yyyy","#contactUsddl");
	
	// get home important links
	GetListItems($util.LangUrl + "/Lists/ImportantLinks", "Home", BindImportantLinks, "dd/MMM/yyyy","");

	//GetLeftSlide();
	
	SocialShare();
	
	GetCuurentItemForMenu();
	
	//ReplacePagerImages();
	
	//2. Bind click event to close the message panel (Success, Alert, Error and Normal messages)
    $('.close').click(function () {
        $(this).parent().hide();
        return false;
    });
	
	
	ResponsiveTable();
	
	ChangeLang();
	
	$('.incFont').click(function() {
		if(steps == 0){
			$affectedElements = $("#PageContent div,#PageContent span,#PageContent label,#PageContent a,#PageContent ul,#PageContent table"); // Can be extended, ex. $("div, p, span.someClass")
			$affectedElements.each( function(){
				var $this = $(this);
				$this.attr('data-font-size', $this.css("font-size"));
			});
		}
        steps += 1;
        if (steps > 4) {
            steps = 4;
            return false;
        }
        initFontCur(steps);
		changeFontSize(1);	
        return false;
    });

	$('.decFont').click(function() {
        steps -= 1;

        if (steps < 0) {
            steps = 0;
            return false;
        }

        initFontCur(steps);	
		// for home page
		changeFontSize(-1);
        return false;
    });
	
	$('.resetFont').click(function() {
        steps = 0;

        initFontCur(steps);	
		// for home page
		changeFontSize(0);
        return false;
    });
	
	
	// accordion initializer

        if ($('.MiniHeaderTitle').length > 0) {
            //Set default open/close settings
            //$('.MiniHeaderTitle').hide(); //Hide/close all containers        

            //On Click
            $('.MiniHeaderTitle').click(function () {
                if ($(this).parent().next().is(':hidden')) { //If immediate next container is closed...                                
                    $(this).children('img.collabsable').attr('src', '#');
                    $(this).toggleClass('active').parent().next().slideDown(); //Add "active" state to clicked trigger and slide down the immediate next container
                }
                else {
                    $(this).children('img.collabsable').attr('src', '#');
                    $(this).toggleClass('active').parent().next().slideUp();
                }

                return false; //Prevent the browser jump to the link anchor
            });

        }
		
	
});

// get cookies
function getCookie(name) {
    var result = null;
    if (document.cookie && $.trim(document.cookie) != '') {
        var cookies = document.cookie.split(';');
        var cookiesLen = cookies.length;
        if (cookiesLen > 0) {
            for (var i = 0; i < cookiesLen; i++) {
                var cookie = $.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    result = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
			//$('head').append('<meta http-equiv="X-UA-Compatible" content="IE=9" />');
        }
    }
    return result;
}

// sets a cookie by providing a key and value
function setCookie(name, value) {
    $.cookie(name, value, { expires: 365, path: '/' });
}

// change language
function ChangeLang (){
	// check the english link for the same URL if exists
	 var langurl = window.location.pathname.replace('/en/', '/');	    
	if($util.currentLang == 'ar')
	  langurl = '/en' + window.location.pathname; 
  
	// test if the url is exsist before change language
    $.ajax({
        url: langurl,
        asyn: true,
        cache: false,
        success: function (data, textStatus, jqXHR) {				
			if(data && data.indexOf('4041.jpg') < 0)					
				$('#langlink').attr('href', langurl);
			else{
				var newURL = '/en'; //langurl.toLowerCase().split('/pages/')[0];				
				$('#langlink').attr('href', newURL);				
			}			
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
			var newURL = langurl.toLowerCase().split('/pages/')[0];				
			$('#langlink').attr('href', newURL);
        }
	});		
};

// start font increase / decrease code
var steps = 0;
initFontCur(steps);

function incFont(elem, step) {

    $('#PageContent div,#PageContent span,#PageContent label,#PageContent a,#PageContent ul,#PageContent table', elem).each(function () { incFont($(this), step); });
    var currentFontSize = elem.css('font-size');
    var currentFontSizeNum = parseFloat(currentFontSize, 10);
	
	if(currentFontSizeNum != 0)
	{
		// save the default size as attribute
		if (elem.attr('df') == undefined) {
			elem.attr('df', currentFontSizeNum);
		}

		if (currentFontSizeNum < (26 + step)) {
			var newFontSize = currentFontSizeNum + 1;
			elem.css('font-size', newFontSize.toString() + 'px');
		}
	}
}

function decFont(elem, step) {
	if(currentFontSizeNum != 0)
	{
		var currentFontSize = elem.css('font-size');
		var currentFontSizeNum = parseFloat(currentFontSize, 10);

		if (step == 0)
			elem.css('font-size', elem.attr('df') + 'px');
		else
			if (currentFontSizeNum > (18 + step)) {
				var newFontSize = currentFontSizeNum - 1;

				if (newFontSize >= elem.attr('df'))
					elem.css('font-size', newFontSize.toString() + 'px');
			}
	}
    $('div,span,label,a,li,td,th', elem).each(function () { decFont($(this), step); });
}

function initFontCur(step) {
    var inc = $('img#incFont');
    var dec = $('img#decFont');

    if (step >= 4) {
        inc.css('cursor', 'default');
        dec.css('cursor', 'pointer');
    }
    else if (step <= 0) {
        inc.css('cursor', 'pointer');
        dec.css('cursor', 'default');
    }
    else {
        inc.css('cursor', 'pointer');
        dec.css('cursor', 'pointer');
    }
}

var $affectedElements ; // Can be extended, ex. $("div, p, span.someClass")
function changeFontSize(direction){
    $affectedElements.each( function(){
        var $this = $(this);
		if(steps == 0){
			$this.css( "font-size", parseInt($this.attr("data-font-size")) );
		}else{
			$this.css( "font-size", parseInt($this.css("font-size"))+direction );
		}
    });
}

// responsive table
function ResponsiveTable(){
	var headertext = [],
	headers = document.querySelectorAll(".int_grid th"),
	tablerows = document.querySelectorAll(".int_grid th"),
	tablebody = document.querySelector(".int_grid tbody");
	
	for(var i = 0; i < headers.length; i++) {
		var current = headers[i];
		headertext.push(current.textContent.replace(/\r?\n|\r/,""));
	} 
	if(tablebody !=null){
		for (var i = 0, row; row = tablebody.rows[i]; i++) {
			 for (var j = 0, col; col = row.cells[j]; j++) {
				col.setAttribute("data-th", headertext[j]);
			} 
		}
	}
	
};

// social Share
function SocialShare(){
	var currentUrl = document.location.href
      //send to friend
	var initialsubj =  document.title; //$util.getLocalString('SiteTitle') + ' - ' +;
    var initialmsg = document.title + '  ' + currentUrl;
    $('.sendToFriend').attr('href', "mailto:" + "?subject=" + initialsubj + "&body=" + initialmsg);
	
	$("#suggest").attr('href', "mailto:portal-support@moh.gov.sa");
	$("#notuseful").attr('href', "mailto:portal-support@moh.gov.sa");
	
	//share current page on social networks 
	 $('#facebook_share').attr('href','#' + currentUrl);
	 $('#twitter_share').attr('href','#'+currentUrl +'&amp;text=' + document.title);
	 $('#linkedin_share').attr('href', '#' + currentUrl);
	 $('#whatsapp_share').attr('href', 'whatsapp://send?text=' + currentUrl);
};

// Add to favoriates
function AddToFavorites() {
    var url = window.document.URL;
    var title = $util.getLocalString('SiteTitle') + ' - ' + window.document.title;

    if (window.sidebar) {
        $('a#BookmarkMe').attr('href',url);
		$('a#BookmarkMe').attr('title',title);
		$('a#BookmarkMe').attr('rel','sidebar');
    }
    else if (window.opera && window.print) {// Opera 
        alert('لاضافة الصفحة إلى المفضلة (Ctrl +D) اضغط على');
    }
    else if (window.external) { // IE Favorite
        if (window.ActiveXObject) {
            //ie
            window.external.AddFavorite(url, title);
        } else {            	
            alert('لاضافة الصفحة إلى المفضلة (Ctrl +D) اضغط على');
        }
    }
    else { //safri
        alert('لاضافة الصفحة إلى المفضلة (Ctrl +D) اضغط على');
    }

    return false;
};

function GetCuurentItemForMenu(){
	$('#menu li a').each(function(){
		var url=window.location.pathname.toLowerCase();
		//var hrefattr=($(this).attr('href').toLowerCase());
		
		if(url.indexOf("ministry") > 0)		
		{
			if(url.indexOf("mediacenter") > 0)
			{
				$(".media a:nth-child(1)").addClass('current');
			}
			else if(url.indexOf("opendata") > 0)
			{
				 $(".opendata a:nth-child(1)").addClass('current');
			}
			else
			{
				$(".ministry a:nth-child(1)").addClass('current');
			}
		}
			
		else if(url.indexOf("sectors") > 0)
			$(".sectors a:nth-child(1)").addClass('current');
		else if(url.indexOf("healthawareness") > 0)
			$(".awareness a:nth-child(1)").addClass('current');
		else if(url.indexOf("eservices") > 0)
		{
			if(url.indexOf("interactive-maps") > 0){
				$(".sectors a:nth-child(1)").addClass('current');
			}
			else{
            $(".services a:nth-child(1)").addClass('current');
			}
		}
        else
		{
			$(".home a:nth-child(1)").addClass('current');
		}
				
	});
};
// bind whats new html
function BindImportantLinks(data, listName, containerId){
	var html_content = '';
	$.each(data,function(key,item){
		var img = item.PublishingRollupImage != null ?$(item.PublishingRollupImage).attr('src'): "#";
						
		html_content +='<div><a href="'+ item.moh_Url +'" target="_blank" title="'+ item.Title +'"><img alt="'+ item.Title +'" src="'+ img +'" /><span>'+ item.Title +'</span></a></div>';
	});
	
	$(".implinks_slider").html(html_content);
	
	 // important links
    $('.implinks_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        mobileFirst: true,
        nextArrow: '<img data-role="none" class="slick-prev" aria-label="previous" title="'+ $util.getLocalString("Next") +'" alt="'+ $util.getLocalString("Next") +'" src="#" />',
        prevArrow: '<img data-role="none" class="slick-next" aria-label="next" title="'+ $util.getLocalString("Prev") +'" alt="'+ $util.getLocalString("Prev") +'" src="#" />',
        rtl: ($util.currentLang == 'ar') ? true : false
    });
};

// Submit Satisfaction
function SubmitSatisfaction(key){
	$.ajax({
		type:"GET",
		contentType:"application/json",
		url: "/_LAYOUTS/15/MOH/MOHInternetHandler.ashx?op=submitSatisfaction&listUrl=/Lists/VisitorsSatisfaction&key="+ key +"&itemId=1",
		dataType:"json",
		async:true,
		cache:false,
		success:function(data){
			if(data == 1){
				alert($util.getLocalString("AlreadySubmitted"));
			}else if(data == 2){
				alert($util.getLocalString("Success"));
			}else{
				alert($util.getLocalString("Failed"));
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {}
	})	
}

// Get List Item
function GetListItems(listName, viewName, successMethod, dateFormat,containerId){
	var lang = $util.currentLang;
	$.ajax({
		type:"GET",
		contentType:"application/json",
		url: $util.LangUrl+ "/_LAYOUTS/15/MOH/MOHInternetHandler.ashx?op=LoadItems&listUrl=" + listName + "&viewName=" + viewName + "&lang="+ lang + "&df="+ dateFormat,
		dataType:"json",
		async:true,
		cache:false,
		success:function(data){successMethod(data, listName, containerId)},
		error: function (XMLHttpRequest, textStatus, errorThrown) {}
	})
};
function GetListItemsExt(listName, viewName, successMethod, dateFormat,containerId,webUrl){
	var lang = $util.currentLang;
	$.ajax({
		type:"GET",
		contentType:"application/json",
		url: $util.LangUrl+ "/_LAYOUTS/15/MOH/MOHInternetHandler.ashx?op=LoadItems&listUrl=" + listName + "&viewName=" + viewName + "&lang="+ lang + "&df="+ dateFormat+"&webUrl="+webUrl,
		dataType:"json",
		async:true,
		cache:false,
		success:function(data){successMethod(data, listName, containerId)},
		error: function (XMLHttpRequest, textStatus, errorThrown) {}
	})
};
// function GetLeftSlide(){
	// var pagesListUrl = window.location.pathname.substring(0,window.location.pathname.lastIndexOf("/"))
	
	// GetListItems($util.LangUrl + pagesListUrl, "Related", BindLeftBlockSlider, "dd/MMM/yyyy","");
// }

// Bind Left Block Slider html
function BindLeftBlockSlider(data, listName, containerId){
	if (data != undefined && data.length > 0){
		var html_content = '';
		$.each(data,function(key,item){
			var url = listName + "/" + item.FileLeafRef;
			var img = item.PublishingRollupImage != null ?$(item.PublishingRollupImage).attr('src'): "#";
			
			if(url.toLowerCase() != window.location.pathname.toLowerCase()){
				html_content +='<a href="'+ url +'">\
									<img alt="'+ item.Title +'" src="'+ img +'" />\
									<span>'+ item.Title +'</span>\
								</a>';
			}
		});
		
		$(".left_slider").html(html_content);
		
		// left side slider
		$('.left_slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000,
			mobileFirst: true,
			nextArrow: '<img data-role="none" class="slick-prev" aria-label="previous" title="'+ $util.getLocalString("Next") +'" alt="'+ $util.getLocalString("Next") +'" src="#" />',
			prevArrow: '<img data-role="none" class="slick-next" aria-label="next" title="'+ $util.getLocalString("Prev") +'" alt="'+ $util.getLocalString("Prev") +'" src="#" />',
			rtl: ($util.currentLang == 'ar') ? true : false
		});
		
		$(".ls_slider").removeAttr("style");
	}
};

// bind contact us data
function BindContactUsData(data, listName, containerId){
	var html_content = '<option value="">'+$util.getLocalString("ContactUs")+'</option>';
	$.each(data,function(key,item){
		html_content +='<option value="'+ item.moh_Url +'">'+ item.Title +'</option>'
	});
	
	$(containerId).html(html_content);
}

// go to contact us page
function GoToContactUsPage(){
	if($("#contactUsddl").val() != ""){
		window.location.pathname = $("#contactUsddl").val();
	}
}

// Update youtube link to be embed
function ChangeYoutubeLink(youtubeLink){
	var url =youtubeLink.lastIndexOf("/embed/") != -1 ? youtubeLink : youtubeLink.replace("/watch?v=","/embed/");
	return url;	
	
};

function SubmitContentUseful(isUseful){
	alert($util.getLocalString("Thanks"));
};

// Directorate Get Path 
function GetPath(pageURL)	{
	var currentPath=document.location.href;
	var currentPathSplitted=currentPath.split("/");
	var newPath = currentPathSplitted[0] + '/' + currentPathSplitted[1] + '/' +  currentPathSplitted[2] + '/' +  currentPathSplitted[3] + '/' +  currentPathSplitted[4] + pageURL;
	document.location = newPath;		
}

function ReplacePagerImages(){
	$.each($("img[src*='#']"),function(key,item){
		item.src.replace('#','#');
	})
}

// ****** start page reads count ****** //
function mss2010PageReadCount(elemId) {
    $.ajax({
		type: "GET",
		url: '/_layouts/15/moh/internet/MSS2010ModulesPage.aspx?op=gcurl&pu=' + window.location.href,
		asyn: true,
		cache: false,
		dataType: 'json',
		success: function (data) {
			if (data != null) {
				$("#" + elemId).text(data)
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			
		}
	});
}

mss2010PageReadCount("readsCount");

function GetPageReadCountByUrl(pageUrl,elemId) {
    $.ajax({
		type: "GET",
		url: '/_layouts/15/moh/internet/MSS2010ModulesPage.aspx?op=gcurlfH&pu=' + pageUrl,
		asyn: true,
		cache: false,
		dataType: 'json',
		success: function (data) {
			if (data != null) {
				$("#" + elemId).text(data)
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			
		}
	});
}
// ****** end page reads count ****** //

// ****** start comments modules ****** //
function PostComment(alertSuccessMessageText, alertRequiredMessageText) {
    // fire page validation
    var validated = Page_ClientValidate('MSS2010Comments_Add');
    if (!validated)
        return false;

    if ($('input[id$=txtCommentTitle]').val() != '' && $('textarea[id$=txtCommentText]').val() != '') {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/_layouts/15/MOH/Internet/Comments.aspx/AddComment",
            data: '{"commentTitle": "' + $('input[id$=txtCommentTitle]').val().toString() + '", "commentText": "' + $('textarea[id$=txtCommentText]').val().toString() + '", "writerName": "' + $('input[id$=txtCommentWriterName]').val().toString() + '", "email": "' + $('input[id$=txtCommentEmail]').val().toString() + '", "webID": "' + $('input[id$=WebIDHiddenField]').val().toString() + '", "itemID": "' + $('input[id$=ItemIDHiddenField]').val().toString() + '", "listID": "' + $('input[id$=ListIDHiddenField]').val().toString() + '", "itemURL": "' + $('input[id$=ItemURLHiddenField]').val().toString() + '"}',
            dataType: "json",
            success: function(msg) {
                if (msg.d == 1) {
                    // slide comment panel up                               
                    $('#trCommmnetBody').slideUp(function() {
                        $('img.CommentCollabsable').attr('src', '#');
                        $('#result').html(ShowMessage(alertSuccessMessageText));
                    });
                }
                else {
                    // slide comment panel up                               
                    $('#trCommmnetBody').slideUp(function() {
                        $('img.CommentCollabsable').attr('src', '#');
                        $('#result').html(ShowMessage(alertSuccessMessageText));
                    });
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                // slide comment panel up                               
                $('#trCommmnetBody').slideUp(function() {
                    $('img.CommentCollabsable').attr('src', '#');
                    $('#result').html(ShowMessage(alertSuccessMessageText));
                });
            }
        });

        // clear textboxes
        ClearCommentFields();

        return false;
    }
    else {
        alert(alertRequiredMessageText);
        return false;
    }
}

function ClearCommentFields() {
    $('input[id$=txtCommentTitle]').val('');
    $('textarea[id$=txtCommentText]').val('');
    $('input[id$=txtCommentWriterName]').val('');
    $('input[id$=txtCommentEmail]').val('');
}

function ShowMessage(alertText) {
	//<a class="close" href="javascript:void(0)">
               // <img class="imgCloseMessage" id="imgCloseClearMessage" src="#"></a>
    var txt ='<div class="msg">\
            <div class="clear_message">\
                <img src="#">'+alertText+'\
            </div>\
    </div>';

    return txt;
}

function GetPageCommentsCountByUrl(pageUrl,elemId) {
    $.ajax({
		type: "GET",
		url: '/_layouts/15/moh/internet/Comments.aspx?op=gccount&pu=' + pageUrl,
		asyn: true,
		cache: false,
		dataType: 'json',
		success: function (data) {
			if (data != null) {
				$("#" + elemId).text(data)
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			
		}
	});
}
// ****** end comments modules ****** //

// ****** start page rate ****** //

function mss2010ReadPageRate(starNumber) {
	$("#resultspan").empty();
   $.ajax({
        url: '/_layouts/15/moh/internet/MSS2010ModulesPage.aspx?op=gprurl&pu=' + document.location,
        asyn: true,
        cache: false,
        dataType: 'text',
         success: function(rate) {
			 thisrate = rate; 
			 
            if (rate == '0') {
                 // ################ Main Plugin function Call
                 $('#RateThis').SimpleRating({
                    StarNumber: starNumber,
                    CurrentRate: 0,
                    Onclick: 'RateThisClick',
                    normalClass: 'MyNormal',
                    hoverClass: 'MyHover',
                    selectClass: 'Myselect',
                    DivTitle: ($util.currentLang == 'ar' ? 'قيم المحتوى' : 'Rate Content'),
                    Enable: true
                });
            }
            else {
                 // ################ Main Plugin function Call                
                $('#RateThis').SimpleRating({
                    StarNumber: starNumber,
                    CurrentRate: rate,
                    Onclick: 'RateThisClick',
                    normalClass: 'MyNormal',
                    hoverClass: 'MyHover',
                    selectClass: 'Myselect',
                    DivTitle: ($util.currentLang == 'ar' ? 'قيم المحتوى' : 'Rate Content'),
                    Enable: true
                });
            }
			mss2010ReadTotalPageRate(5,thisrate);
			//$(".eva").append("<span class="nuberofrate" id='resultspan'>Result: From "+ rate +" Ratings </span>");
        },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
            // ################ Main Plugin function Call
            $('#RateThis').SimpleRating({
                StarNumber: starNumber,
                CurrentRate: 0,
                Onclick: 'RateThisClick',
                normalClass: 'MyNormal',
                hoverClass: 'MyHover',
                selectClass: 'Myselect',
                DivTitle: ($util.currentLang == 'ar' ? 'قيم المحتوى' : 'Rate Content'),
                Enable: true
            });
        }
    });
}
 mss2010ReadPageRate(5);
function mss2010ReadTotalPageRate(starNumber,thisrate) {
	$("#resultspan").empty();
	var cUrl = document.location.pathname;
	if (cUrl.indexOf('default.aspx') > 0)
		cUrl = cUrl.substring(0, cUrl.indexOf('default.aspx'));
   $.ajax({
        url: '/_layouts/15/moh/internet/MSS2010ModulesPage.aspx?op=gprurl&tpu=' + cUrl,
        asyn: true,
        cache: false,
        dataType: 'text',
         success: function(rate) {
			 if (rate > 0){
              var curlang = $util.currentLang;
			  if(curlang == "en"){
				  $(".eva").append("<span id='resultspan'>"+ thisrate +" out of 5 , Number of votes: "+ rate +" </span>");
			  }
			  else {
				  $(".eva").append("<span id='resultspan'>"+ thisrate +" من 5 , عدد الأصوات: "+ rate +"</span>");
			  }
			 }
			 else{
				 var curlang = $util.currentLang;
			  if(curlang == "en"){
				  $(".eva").append("<span id='resultspan'>"+ thisrate +" </span>");
			  }
			  else {
				  $(".eva").append("<span id='resultspan'>"+ thisrate +" </span>"); 
			  }
				 
			 }
            
        },
         error: function(XMLHttpRequest, textStatus, errorThrown) {
            // ################ Main Plugin function Call
            $('#RateThis').SimpleRating({
                StarNumber: starNumber,
                CurrentRate: 0,
                Onclick: 'RateThisClick',
                normalClass: 'MyNormal',
                hoverClass: 'MyHover',
                selectClass: 'Myselect',
                DivTitle: ($util.currentLang == 'ar' ? 'قيم المحتوى' : 'Rate Content'),
                Enable: true
            });
        }
    });
}


 // ############### Implement Functions For RateThis Click ###################
function RateThisClick(rate) { // *
    var rateCookie;
    rateCookie = $.cookie('PageRating');
   var newurl = document.location.href;
    if (newurl.indexOf('#')>0)
    {
	    var getnewurl = newurl.split('#');

		    if (rateCookie == document.location) {
        alert(($util.currentLang == 'ar' ? '.تم التقييم مسبقا' : 'Already Rated.'));
        //mss2010ReadPageRate(5);
        return false;
    }
    else {
         $.ajax({
             url: '/_layouts/15/moh/internet/MSS2010ModulesPage.aspx?op=rpurl&pu=' + getnewurl[0] + '&ratecount=' + rate.toString(),
            asyn: true,
            cache: false,
            dataType: 'text',
            success: function() {
                 // add cookie for this rating session            
                $.cookie('PageRating', document.location, { expires: 0 });

                alert(($util.currentLang == 'ar' ? '.شكراً لك' : 'Thank You.'));

                mss2010ReadPageRate(5);
            }
        });
    }
    }
	else {
    if (rateCookie == document.location) {
        alert(($util.currentLang == 'ar' ? '.تم التقييم مسبقا' : 'Already Rated.'));
        //mss2010ReadPageRate(5);
        return false;
    }
    else {
         $.ajax({
             url: '/_layouts/15/moh/internet/MSS2010ModulesPage.aspx?op=rpurl&pu=' + document.location + '&ratecount=' + rate.toString(),
            asyn: true,
            cache: false,
            dataType: 'text',
            success: function() {
                 // add cookie for this rating session            
                $.cookie('PageRating', document.location, { expires: 0 });

                alert(($util.currentLang == 'ar' ? '.شكراً لك' : 'Thank You.'));

                mss2010ReadPageRate(5);
            }
        });
    }
	}
}
$("span:contains('Required Field')").css("color", "red");
$("span:contains('Field Required')").css("color", "red");
$("span:contains('حقل مطلوب')").css("color", "red");
$("span:contains('*')").css("color", "red");
// ****** end page rate ****** //
