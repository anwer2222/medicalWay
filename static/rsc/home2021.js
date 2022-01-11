$(function(){
	// get home Banner
	GetListItems($util.LangUrl + "/Lists/HomePageBanners", "Home", BindHomeBanner, "dd/MMM/yyyy","");
	//get Corona News
	GetListItems($util.LangUrl + "/Lists/CoronaUpdates", "Home", Bindcorona, "dd/MMM/yyyy","");
	// get home news
	GetListItems($util.LangUrl + "/Ministry/MediaCenter/News/Pages", "MediaCenterPages", BindNews, "dd/MMM/yyyy","");
	// get home announcements
	GetListItems($util.LangUrl + "/Ministry/MediaCenter/Ads/Pages", "MediaCenterPages", BindAnnouncements, "dd/MMM/yyyy","");
	// get home events
	GetListItems($util.LangUrl + "/Lists/HealthDays", "Home", Bindevents, "dd/MMM/yyyy","");
	// get home whats new
	GetListItems($util.LangUrl + "/Portal/WhatsNew/Lists/WhatsNew", "Home", BindWhatsNew, "dd/MMM/yyyy","");
	// get home whats new
	GetListItems($util.LangUrl + "/Lists/HomePageBanners", "TopSlider", BindTopSlider, "dd/MMM/yyyy","");
	// get home most popular servie
	GetListItems($util.LangUrl + "/Lists/eServicesCategories", "MostImportant", BindService, "dd/MMM/yyyy","#importantservices");
	// load banners before footer
	// New e-Service part1
	GetListItems($util.LangUrl + "/eServices/Lists/SubCategories", "Home", BindSubCategories, "dd/MMM/yyyy","#eservicesCat");
	//New Open Data Statics
	GetListItems("/Ministry/Statistics/Lists/OpenDataFromSQL", "Home", BindOpenDataStaticsAr, "dd/MMM/yyyy","#addOpenData");
	GetListItems("/en/Ministry/Statistics/Lists/OpenDataFromSQL", "Home", BindOpenDataStaticsEn, "dd/MMM/yyyy","#addOpenData");
	GetFooterTopBanners();
	//Let me help
	letMeHelp_MethodColl.loadCategory();

})
//Let us help you start here
var letMeHelp_MethodColl = {

    categoryColl: [],
    subCategoryColl: [],
    subCategoryDetailColl: [],

    loadCategory: function () {
        GetListItems($util.LangUrl + "/eServices/Lists/HomeHelpLinks_Category", "Home", letMeHelp_MethodColl.onSuccess_LoadCategory, "dd/MMM/yyyy", "");
    },

    loadSubCategory: function () {
        GetListItems($util.LangUrl + "/eServices/Lists/HomeHelpLinks_SubCategory", "Home", letMeHelp_MethodColl.onSuccess_LoadSubCategory, "dd/MMM/yyyy", "");
    },

    loadSubCategoryDetails: function () {
        GetListItems($util.LangUrl + "/eServices/Lists/HomeHelpLinks_SubCategoryDetails", "Home", letMeHelp_MethodColl.onSuccess_LoadSubCategoryDetails, "dd/MMM/yyyy", "");
    },


    onSuccess_LoadCategory: function (data, listName, containerId) {
        letMeHelp_MethodColl.categoryColl = data;
        letMeHelp_MethodColl.loadSubCategory();
    },

    onSuccess_LoadSubCategory: function (data, listName, containerId) {
        letMeHelp_MethodColl.subCategoryColl = data;
        letMeHelp_MethodColl.loadSubCategoryDetails();
    },

    onSuccess_LoadSubCategoryDetails: function (data, listName, containerId) {
        letMeHelp_MethodColl.subCategoryDetailColl = data;
        letMeHelp_MethodColl.init_Letmehelp();
    },



    init_Letmehelp: function () {
        $('#subMenuIcons').html('');
        var tempCompleteHtml = letMeHelp_MethodColl.getCategory_Item();
        $('#subMenuIcons').html(tempCompleteHtml);

		$(".sideMenuToggleWrapper").css("display", "block");
        
		$("#helpBtn").click(function () {
			if ($('.sideMenuToggleWrapper')[0].classList.contains('expanded')) {
				letMeHelp_MethodColl.removeExpansion();
			}
			else{
				$('.sideMenuToggleWrapper')[0].classList.add('expanded');
				$("ul.sideMenuPickList").slideToggle();
			}
        });
    },




    getCategory_Item: function () {
        var li_Coll = "";
        $(letMeHelp_MethodColl.categoryColl).each(function (index, element) {
            li_Coll += "<li id='category" + element.ID + "' class='dropdown-submenu'>"
                + "<a class='dropdown-item dropdown-toggle' href='javascript:void(0)'>"
                + element.PublishingRollupImage
                + "<span>" + element.Title + "</span>"
                + "</a>"
                + letMeHelp_MethodColl.getSubCategory_Items(element);
            +"</li>";
        });
        return li_Coll;
    },




    getSubCategory_Items: function (categoryItem) {
        var tempSubCategory = $.grep(letMeHelp_MethodColl.subCategoryColl, function (element, index) { 
			var tempCategory_LookupFieldName = 'CategoryId_x003a_ID';
			if(_spPageContextInfo.currentCultureName.toLowerCase() == 'ar-sa'){ tempCategory_LookupFieldName = 'CategoryId_x003a__x0627__x0644__'; }
			return element[tempCategory_LookupFieldName] == categoryItem.ID.toString(); 
		});

        var subCategoryHtml = "<ul class='dropdown-menu innerBtnsDropDown'>"
            + "<li class='sideMenuPanelToggle'>"
            + "<div class='panel-group' id='accordionMenu" + categoryItem.ID.toString() +"' role='tablist' aria-multiselectable='true'>";

        $(tempSubCategory).each(function (index, element) {

            subCategoryHtml += "<div class='panel panel-default'>"
                + "<div class='panel-heading' role='tab' id='headingOne" + element.ID.toString() +"'>"
                + "<h4 class='panel-title'>"
                + "<a role='button' data-toggle='collapse' data-parent='#accordionMenu" + categoryItem.ID.toString() +"' href='#collapse" + element.ID.toString() + "' aria-expanded='false' aria-controls='collapse" + element.ID.toString() +"'>"
                + "<span>" + element.Title + "</span>"
                + "</a>"
                + "</h4>"
                + "</div>"
                + letMeHelp_MethodColl.getSubCategory_Details(element)
				+ "</div>";
        });

        return subCategoryHtml += "</div></li></ul>";
    },



    getSubCategory_Details: function (subCategory) {

        var tempSubCategoryDetails = $.grep(letMeHelp_MethodColl.subCategoryDetailColl, function (dEle, index) { 
			var tempSubCategory_LookupFieldName = 'SubCategoryId_x003a_ID';
			if(_spPageContextInfo.currentCultureName.toLowerCase() == 'ar-sa'){ tempSubCategory_LookupFieldName = 'SubCategoryId_x003a__x0627__x064'; }
			return dEle[tempSubCategory_LookupFieldName] == subCategory.ID.toString(); 
		});

        var tempChildDetails = "<div id='collapse" + subCategory.ID.toString() + "' class='panel-collapse collapse in' role='tabpanel' aria-labelledby='headingOne" + subCategory.ID.toString() +"'>"
            + "<div class='panel-body'>"
            + "<ul class='nav subInnerMenuPanel'>";


        $(tempSubCategoryDetails).each(function (index, details) {
            tempChildDetails += "<li>"
                + "<a href='" + details.Moh_Url + "' target='" + details.LinkTarget + "'>"
                + "<span><i class='fa fa-arrow-circle-right' aria-hidden='true'></i></span>"
                + details.Title
                + "</a>"
                + "</li>"
        });

        return tempChildDetails += "</ul></div></div>";
    },
	removeExpansion:function(){
		$("ul.sideMenuPickList").slideToggle(0);
		$('.sideMenuToggleWrapper')[0].classList.remove('expanded');
		$('ul.sideMenuPickList li').removeClass('activedSubMenu');
		$('ul.sideMenuPickList li .innerBtnsDropDown.show').removeClass('show');
	}
};

jQuery('body').on('click',function(e){
	if($('.sideMenuToggleWrapper')[0].classList.contains('expanded') && (e.pageY < 80 || e.pageY > 850 || e.pageX > 400 )){
		letMeHelp_MethodColl.removeExpansion();	
	}
});

jQuery(document).on('keyup', function (evt) {
    if (evt.keyCode == 27) {
		if ($('.sideMenuToggleWrapper')[0].classList.contains('expanded')) {
			letMeHelp_MethodColl.removeExpansion();
		}        
    }	
});

$('.dropdown-menu').on('mouseover', 'li.dropdown-submenu', function (e) {
	$('ul.sideMenuPickList li').removeClass('activedSubMenu');
	$('ul.sideMenuPickList li ul').removeClass('show');
	
	var $subMenu = $(this).find(".dropdown-menu");
	if(!$subMenu.hasClass('show')){
		$(this).addClass('activedSubMenu');
	}
	$subMenu.addClass('show');
    return false;
});

$('.dropdown-menu').on('click', '.dropdown-toggle', function (e) {
	if (!$(this).next().hasClass('show')) {
		$('ul.sideMenuPickList li').removeClass('activedSubMenu');    
        $(this).parents('li').addClass('activedSubMenu');
        $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    
		var $subMenu = $(this).next(".dropdown-menu");
		//$subMenu.toggleClass('show');
		$subMenu.addClass('show');
		$(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
			$('.dropdown-submenu .show').removeClass("show");
		});
		$($subMenu.children()).find('.panel-title a').attr("aria-expanded","false");
	} else {
        // $(this).parents('li').removeClass('activedSubMenu');
    }
    return false;
});

//let us help you end here
//Bind Open Data Statics Start Here
function numberWithCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
function BindOpenDataStaticsEn(data, listName){
	var html_content = '';
	if (data != undefined && data.length > 0) {
		$.each(data, function (key, item) {
			var ValueNoFormat = item.Value.split(".")[0];
			var Value = numberWithCommas(ValueNoFormat);
			var hasChild1 = item.HasChild;
						if(hasChild1 == 0){
			html_content += '<div class="col-sm-12 col-lg-4 mb-4">\
			                     <div  class="elementskit-funfact-Green text-center">\
								  <div id="sectEn1" class="elementskit-funfact-inner">\
                                    <div class="funfact-icon"> <i></i></div>\
									 <div class="funfact-content">\
                                        <div>\
                                            <div  style="color:green;" class="counter red" data-count="99">'+ Value +'</div>\
                                        </div>\
                                        <h4 style="color:#9E925E;" class="funfact-title"> '+ item.Title +' </h4>\
										<hr style="visibility:hidden">\
										<h6  style="color:#5E6368;visibility:hidden" class="funfact-title"> No Data</h6>\
                                    </div></div></div></div>'
			}
			if(hasChild1 == 1){
				var ChValue1 = item.ChildValue.split(".")[0];
				var ChValue = numberWithCommas(ChValue1);
				html_content += '<div class="col-sm-12 col-lg-4 mb-4">\
			                     <div class="elementskit-funfact-Green text-center">\
								  <div class="elementskit-funfact-inner">\
                                    <div class="funfact-icon"> <i></i></div>\
									 <div class="funfact-content">\
                                        <div>\
                                            <div style="color:green;" class="counter red" data-count="99">'+ Value +'</div>\
                                        </div>\
                                        <h4 style="color:#9E925E" class="funfact-title"> '+ item.Title +' </h4>\
                                        <hr>\
                                        <h6 style="color:#5E6368" class="funfact-title"> '+ item.ChildText +' : '+ ChValue +'</h6>\
                                    </div></div></div></div>'
				
			}

		});
		
		$('#addOpenData').html(html_content);
    
	}

};

function BindOpenDataStaticsAr(data, listName){
	var html_content = '';
	if (data != undefined && data.length > 0) {
		$.each(data, function (key, item) {
			var ValueNoFormat = item.Value.split(".")[0];
			var Value = numberWithCommas(ValueNoFormat);
			var hasChild1 = item.HasChild;
			if(hasChild1 == 1){
				var ChValue1 = item.ChildValue.split(".")[0];
				var ChValue = numberWithCommas(ChValue1);
				html_content += '<div class="col-sm-12 col-lg-4 mb-4">\
			                     <div class="elementskit-funfact-Green text-center">\
								  <div class="elementskit-funfact-inner">\
                                    <div class="funfact-icon"> <i></i></div>\
									 <div class="funfact-content">\
                                        <div>\
                                            <div style="color:green;" class="counter red" data-count="99">'+ Value +'</div>\
                                        </div>\
                                        <h4 style="color:#9E925E" class="funfact-title"> '+ item.TextArabic +' </h4>\
                                        <hr>\
                                        <h6 style="color:#5E6368" class="funfact-title"> '+ item.ChildTextArabic +' : '+ ChValue +'</h6>\
                                    </div></div></div></div>'
				
			}
			if(hasChild1 == 0){
			html_content += '<div class="col-sm-12 col-lg-4 mb-4">\
			                     <div class="elementskit-funfact-Green text-center">\
								  <div id="sect1" class="elementskit-funfact-inner">\
                                    <div class="funfact-icon"> <i></i></div>\
									 <div class="funfact-content">\
                                        <div>\
                                            <div style="color:green;" class="counter red" data-count="99">'+ Value +'</div>\
                                        </div>\
                                        <h4 style="color:#9E925E;" class="funfact-title"> '+ item.TextArabic +' </h4>\
										<hr style="visibility:hidden">\
										<h6  style="color:#5E6368;visibility:hidden" class="funfact-title"> No Data</h6>\
                                    </div></div></div></div>'
			}

		});
		
		$('#addOpenData').html(html_content);

		 

	}
};
//Bind Open Data Statics End Here
//Bind Service Categories


var objectArray = [];
function BindSubCategories(data, listName){
	var html_content = '';
	
	if (data != undefined && data.length > 0) {

		$.each(data, function (key, item) {
			
			objectArray.push({Title:item.Title, Parent:item.Parent, Category:item.ID});
			
			
		});
		
		GetListItems($util.LangUrl + "/eServices/Lists/Services Types", "Home", BindServiceCategories, "dd/MMM/yyyy","#eservicesCat");
	}
	
};
function BindServiceCategories(data, listName){
	var html_content = '';
	var childArray = [];
	if (data != undefined && data.length > 0) {
		$.each(data, function (key, item) {
		
			var url = item.PageURL != null ? item.PageURL.split(',')[1] : "javascript:void(0);"
			var img = item.PublishingRollupImage != null ?$(item.PublishingRollupImage).attr('src'): "#";
			
			html_content += '<div class="col-sm-12 col-lg-4">\
			                     <div class="dropupMoh">\
									<div class="img-container-inline"><img src="'+ img +'" alt="'+ item.Title +'" title="'+ item.Title +'" ></div>';
			html_content += "<div class='child'>";	
            html_content += "<div class='dropup-contentMoh'>";			
		    for (var i=0;i<objectArray.length;i++)
			{		
				
				if (objectArray[i].Parent == item.Title)
				{					
					html_content += "<a href=" + url + "?subcat=" + objectArray[i].Category + "  title=" + objectArray[i].Title + ">" + objectArray[i].Title + "</a>";
				}
			}       
			        html_content += '</div>';	
					html_content += '</div>';						
											
			html_content += '</div></div></div>';
			
			
			
			
			childArray = [];

			
		});
		
		$('#eservicesCat').html(html_content);

		 

	}
};
//bind service category end here.

// bind home Banner html
function BindHomeBanner(data, listName, containerId){
	var html_content = '';
	$.each(data,function(key,item){
		var img = item.PublishingRollupImage != null ?$(item.PublishingRollupImage).attr('src'): "#";
		var target = item.LinkTarget == "_blank" ? "_blank" : "";
		var title2 = item.TitlePart2 == null ? "":item.TitlePart2;
		var url = item.moh_Url == null ? "#":item.moh_Url;
		html_content +='<div>\<a style="width:100%" href="'+ url +'"> <img alt="'+ item.Title +'" src="'+ img +'" /></a><div>\<strong style="visibility: hidden">'+ item.Title +'</strong>\</div>\</div>'
	});
	
	$(".m_slider").html(html_content);
	
	// home banner slider
    $('.m_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 0,
        vertical: true,
        mobileFirst: true,
        nextArrow: '<img data-role="none" class="slick-prev" aria-label="previous" title="'+ $util.getLocalString("Next") +'" alt="'+ $util.getLocalString("Next") +'" src="'+ $util.getLocalString("l_arrow") +'" />',
        prevArrow: '<img data-role="none" class="slick-next" aria-label="next" title="'+ $util.getLocalString("Prev") +'" alt="'+ $util.getLocalString("Prev") +'" src="'+ $util.getLocalString("r_arrow") +'" />',
    });
};
//bind Corona News

// function Bindcorona(data, listName, containerId){
// var html_content = '';
// $.each(data,function(key,item){
		// html_content +='<li><strong>'+ item.Title +'</strong>:     '+ item.CoronaNumber +'</li>';
	// });
// $(".textcorona").html(html_content);
// };
// bind news html
function BindNews(data, listName, containerId){
	var html_content = '';
	var dateArr = [];
	var Lastdate = '';
	var langurl=window.location.pathname.toLowerCase();
	$.each(data,function(key,item){
		var url = listName + "/" + item.FileLeafRef;
		langurl=window.location.pathname.toLowerCase();
		if(langurl.indexOf("en") > 0)		
		{ 
			var img = item.PublishingRollupImage != null ?$(item.PublishingRollupImage).attr('src'): "#";
		}
		else{
		var img = item.PublishingRollupImage != null ?$(item.PublishingRollupImage).attr('src'): "#";
		}
		var itemdate ="";
		if(item.ArticleStartDate !=null){
			var date = item.ArticleStartDate.split('/');
			dateArr.push(date);
			itemdate = date[0].concat(" ",date[1], " ", date[2], $util.currentLang == "ar" ? " هـ" : "");
		}		
		html_content +='<a href="'+ url +'" title="'+ item.Title +'">\
                        <img alt="'+ item.Title +'" src="'+ img +'" />\
                        <span class="date">'+ itemdate +'</span>\
                        <span class="ntitle">'+ item.Title +' ...</span>\
                        <div class="nfbar"><i class="fa fa-comment-o" title="'+ $util.getLocalString("CommentCount") +'" aria-hidden="true"></i> <span id="comment'+ key +'"></span> | <i class="fa fa-eye" title="'+ $util.getLocalString("ReadCount") +'" aria-hidden="true"></i> <span id="read'+ key +'"></span></div>\
                    </a>'
					
		GetPageReadCountByUrl(window.location.origin + url, "read"+ key);
		GetPageCommentsCountByUrl(window.location.origin + url, "comment"+ key);
	});
	$(".home_news_slider").html(html_content);
	var lastUpd = dateArr[0];
	var spantext  = langurl.indexOf("en") > 0 ?$("#lastModifiedText").text('Last Update : '): $("#lastModifiedText").text('أخر تحديث : ');
	$("#lastModified").text(lastUpd[0] + ' / ' + lastUpd[1] + ' / ' + lastUpd[2]);
	
	// news slider
    $('.home_news_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        arrows: false,
        mobileFirst: true,
        customPaging: function (slider, i) { return '<span data-role="none" title="' + (i + 1) + '"> </span>'; },
        rtl: ($util.currentLang == 'ar') ? true : false
    });
};

// bind news html
function BindAnnouncements(data, listName, containerId){
	var html_content = '';
	$.each(data,function(key,item){
		var url = listName + "/" + item.FileLeafRef;
		var img = item.PublishingRollupImage != null ?$(item.PublishingRollupImage).attr('src'): "#";
		var itemdate = "";
		if(item.ArticleStartDate !=null){
			var date = item.ArticleStartDate.split('/');
			itemdate = date[0].concat(" ",date[1]," ", date[2], $util.currentLang == "ar" ? " هـ" : "");
		}	
		
		html_content +='<li><a href="'+ url +'" title="'+ item.Title +'"><strong>'+ itemdate +'</strong>'+ item.Title +'</a></li>';
	});
	
	$("#announcemnets").html(html_content);
};

// bind events html
function Bindevents(data, listName, containerId){
	var html_content = '';
	$.each(data,function(key,item){
		var url = $util.LangUrl +"/HealthAwareness/HealthOccasions/Pages/default.aspx?EventID=" + item.ID;
		var img = item.PublishingRollupImage != null ?$(item.PublishingRollupImage).attr('src'): "#";
		var itemdate = item.EventDate.split('/');
							
		html_content +='<a href="'+ url +'" title="'+ item.Title +'">\
							<img alt="'+ item.Title +'" src="'+ img +'" />\
							<span class="date">'+ itemdate[0].concat(" ",itemdate[1]," ", itemdate[2], $util.currentLang == "ar" ? " هـ" : "") +'</span>\
							<span class="ntitle">'+ item.Title +'</span>\
						</a>'
	});
	
	$(".calendar_slider").html(html_content);
	
	// calendar slider
    $('.calendar_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 5000,
        mobileFirst: true,
		nextArrow: '<img data-role="none" class="slick-prev" aria-label="previous" title="'+ $util.getLocalString("Next") +'" alt="'+ $util.getLocalString("Next") +'" src="'+ $util.getLocalString("Right_arrow") +'" />',
        prevArrow: '<img data-role="none" class="slick-next" aria-label="next" title="'+ $util.getLocalString("Prev") +'" alt="'+ $util.getLocalString("Prev") +'" src="'+ $util.getLocalString("Left_arrow") +'" />',
        rtl: ($util.currentLang == 'ar') ? true : false
    });
};

// bind whats new html
function BindWhatsNew(data, listName, containerId){
	var html_content = '';
	$.each(data,function(key,item){
		//var url = listName + "/" + item.FileLeafRef;
		var img = item.PublishingRollupImage != null ?$(item.PublishingRollupImage).attr('src'): "#";
		var itemdate = "";
		
		if(item.ArticleStartDate !=null){
			var date = item.ArticleStartDate.split('/');
			itemdate = date[0].concat(" ",date[1]," ", date[2], $util.currentLang == "ar" ? " هـ" : "");
		}
		
		html_content +='<a href="'+ item.moh_Url +'" title="'+ item.Title +'">\
							<img alt="'+ item.Title +'" src="'+ img +'" />\
							<span class="date">'+ itemdate +'</span>\
							<span class="ntitle">'+ item.Title +'</span>\
						</a>'
	});
	
	$(".new_slider").html(html_content);
	
	// new slider
    $('.new_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 5000,
        mobileFirst: true,
        nextArrow: '<img data-role="none" class="slick-prev" aria-label="previous" title="'+ $util.getLocalString("Next") +'" alt="'+ $util.getLocalString("Next") +'" src="'+ $util.getLocalString("Right_arrow") +'" />',
        prevArrow: '<img data-role="none" class="slick-next" aria-label="next" title="'+ $util.getLocalString("Prev") +'" alt="'+ $util.getLocalString("Prev") +'" src="'+ $util.getLocalString("Left_arrow") +'" />',
        rtl: ($util.currentLang == 'ar') ? true : false
    });
};

// bind Top Slider html
function BindTopSlider(data, listName, containerId){
	var html_content = '';
	$.each(data,function(key,item){
		var img = item.PublishingRollupImage != null ?$(item.PublishingRollupImage).attr('src'): "#";
		var target = item.LinkTarget == "_blank" ? "_blank" : "";
		html_content +='<a href="'+ item.moh_Url +'" title="'+ item.Title +'" target="'+ target +'" style="background-image:url('+ img +')"><img alt="'+ item.Title +'" src="'+ img +'" /></a>';
	});
	
	$(".br_slider").html(html_content);
	
	// banners slider
    $('.br_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: true,
        arrows: false,
        mobileFirst: true,
        customPaging: function (slider, i) { return '<span data-role="none" title="' + (i + 1) + '"> </span>'; },
        rtl: ($util.currentLang == 'ar') ? true : false
    });
};

function GetFooterTopBanners(){
	// get home calls banner
	GetListItems($util.LangUrl + "/Lists/HomePageBanners", "Calls", BindCalls, "dd/MMM/yyyy","");
	// get home control banner
	GetListItems($util.LangUrl + "/Lists/HomePageBanners", "Control", BindControl, "dd/MMM/yyyy","");	
}

// bind calls html
function BindCalls(data, listName, containerId){
	var html_content = '';
	$.each(data,function(key,item){
		var img = item.PublishingRollupImage != null ?$(item.PublishingRollupImage).attr('src'): "#";
		var target = item.LinkTarget == "_blank" ? "_blank" : "";
		html_content +='<a href="'+ item.moh_Url +'" title="'+ item.Title +'" target="'+ target +'" style="background-image:url('+ img +')"><img alt="'+ item.Title +'" src="'+ img +'" /></a>'
	});
	
	$(".b_left").html(html_content);
};

// bind control html
function BindControl(data, listName, containerId){
	var html_content = '';
	$.each(data,function(key,item){
		var img = item.PublishingRollupImage != null ?$(item.PublishingRollupImage).attr('src'): "#";
		var target = item.LinkTarget == "_blank" ? "_blank" : "";
		html_content +='<a href="'+ item.moh_Url +'" title="'+ item.Title +'" target="'+ target +'" style="background-image:url('+ img +')"><img alt="'+ item.Title +'" src="'+ img +'" /></a>'
	});
	
	$(".b_mid").html(html_content);
	
	// get home payment banner
	GetListItems($util.LangUrl + "/Lists/HomePageBanners", "Payment", BindPayment, "dd/MMM/yyyy","");
};
// bind Payment html
function BindPayment(data, listName, containerId){
	var html_content = '';
	$.each(data,function(key,item){
		var img = item.PublishingRollupImage != null ?$(item.PublishingRollupImage).attr('src'): "#";
		var target = item.LinkTarget == "_blank" ? "_blank" : "";
		html_content +='<a href="'+ item.moh_Url +'" title="'+ item.Title +'" target="'+ target +'" style="background-image:url('+ img +')"><img alt="'+ item.Title +'" src="'+ img +'" /></a>'
	});
	
	$(".b_mid").append(html_content);
	// get home business banner
	GetListItems($util.LangUrl + "/Lists/HomePageBanners", "Business", BindBusiness, "dd/MMM/yyyy","");
};
// bind Business html
function BindBusiness(data, listName, containerId){
	var html_content = '';
	$.each(data,function(key,item){
		var img = item.PublishingRollupImage != null ?$(item.PublishingRollupImage).attr('src'): "#";						
		var target = item.LinkTarget == "_blank" ? "_blank" : "";
		html_content +='<a href="'+ item.moh_Url +'" title="'+ item.Title +'" target="'+ target +'" style="background-image:url('+ img +')"><img alt="'+ item.Title +'" src="'+ img +'" /></a>'
	});
	
	html_content += '<span class="clr"></span>'
	
	$(".b_mid").append(html_content);
};

// bind service html
function BindService(data, listName, containerId){
	// var allslides = ['importantservices','awareness','tools','mostused','personal','companies'];
	// $.each(allslides,function(key,item){
		// $("#"+item).html('');
	// });
	if($(containerId).html().trim() == '<li class="loader"><div></div></li>'){
		var html_content = '';
		$.each(data,function(key,item){
			var img = item.PublishingRollupImage != null ?$(item.PublishingRollupImage).attr('src'): "#";						
			var target = item.LinkTarget == "_blank" ? "_blank" : "";
			var url =  item.moh_Url !=null ? item.moh_Url : item.URL;

			html_content +='<li><a href="'+ url +'" title="'+ item.Title +'"><strong><img alt="'+ item.Title +'" src="'+ img +'" /></strong><br /><span>'+ item.Title +'</span></a></li>';
		});
		
		$(containerId).html(html_content);
		
		 // banners slider
		$(containerId).slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000,
			mobileFirst: true,
			nextArrow: '<img data-role="none" class="slick-prev" aria-label="previous" title="'+ $util.getLocalString("Next") +'" alt="'+ $util.getLocalString("Next") +'" src="'+ $util.getLocalString("Right_arrow") +'" />',
			prevArrow: '<img data-role="none" class="slick-next" aria-label="next" title="'+ $util.getLocalString("Prev") +'" alt="'+ $util.getLocalString("Prev") +'" src="'+ $util.getLocalString("Left_arrow") +'" />',
			rtl: ($util.currentLang == 'ar') ? true : false
		});
	}
};

// search Directorates
function SearchDirectorates(){
	var directorate = $("#txtDirectorate").val();
	var url = "/Sectors/Directorates/Pages/default.aspx";
	if(directorate != ""){
		url = url + "?Name=" + directorate;
	}
	window.location.href = url;
}

// search Urban Medical
function SearchUrbanMedical(){
	var urbanMedical = $("#txtUrbanMedical").val();
	var url = "/Sectors/UrbanMedical/Pages/default.aspx";
	if(urbanMedical != ""){
		url = url + "?Name=" + urbanMedical;
	}
	
	window.location.href = url;
}

// search Health centers
function SearchHealthcenters(){
	var healthcenters = $("#txtHealthcenters").val();
	//var region = $("#ddlHealthcentersregion").val();
	var url = "/Sectors/Health_centers/Pages/default.aspx";
	if(healthcenters != ""){
		url = url + "?Name=" + healthcenters;
	}
	// if(region != ""){
		// url = url + "&region=" + region;
	// }
	
	window.location.href = url;
}

// search Hospitals
function SearchHospitals(){
	var hospital = $("#txtHospital").val();
	//var region = $("#ddlHealthcentersregion").val();
	var url = "/Sectors/Hospitals/Pages/default.aspx";
	if(hospital != ""){
		url = url + "?Name=" + hospital;
	}
	//if(region != ""){
	//	url = url + "&region=" + region;
	//}
	
	window.location.href = url;
}
function numberWithCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}
