
var localResources = {
    ar: {
        Details: "التفاصيل",
        Next: "التالي",
        Prev: "السابق",
        More: "اقرأ المزيد", 
		GridMore: "المزيد...",
        Yes: "نعم",
        No: "لا",
        Events: "الأحداث والفعاليات",      
		ShowAll:"استعراض الكل",
		l_arrow:"#",
		r_arrow:"#",
		Left_arrow:"#",
		Right_arrow:"#",
		ContactUs: "تواصل مع ...",
		SiteTitle:"المملكة العربية السعودية - البوابة الإلكترونية لوزارة الصحة",
		Success : "تمت العملية بنجاح",
		AlreadySubmitted:"الإختيار مرة واحدة فقط",
		Failed:"حدث خطأ",
		Thanks:"شكراً لك",
	CommentCount:"عدد التعليقات",
	ReadCount:"عدد القراءات"
    },
    en: {
        Details: "Details",
        Next: "Next",
        Prev: "Previous",
        More: "Read More",   
		GridMore: "more...",
        Yes: "Yes",
        No: "No",
        Events: "Events",        
		ShowAll:"Show All",
		l_arrow:"#",
		r_arrow:"#",
		Left_arrow:"#",
		Right_arrow:"#",
		ContactUs: "Contact With ...",
		SiteTitle:"المملكة العربية السعودية - البوابة الإلكترونية لوزارة الصحة",
		Success : "Operation completed successfully",
		AlreadySubmitted:"only once",
		Failed:"error Occurred",
		Thanks:"Thank you",
	CommentCount:"Comments Count",
	ReadCount:"Readings Count"
    }
};

var $util = function () { };

$util.currentLang = (document.location.href.toLowerCase().indexOf('/en/') > 0 || document.location.href.toLowerCase().indexOf('/depten/') > 0) ? 'en' : 'ar';

$util.LangUrl = document.location.href.toLowerCase().indexOf('/en/') > 0 ? '/en' : '';

$util.truncateString = function truncate(string, count) {
    if (string == undefined || string == null)
        return "";
    if (string.length > count)
        return string.substring(0, string.substring(0, count).lastIndexOf(" ")) + '...';
    else
        return string;
};

// get the url from URL Fields which their value format is [URL], [Description]
$util.getUrlFromSPUrlField = function (url) {
    url = (url) ? $.trim(url.split(',')[0]) : url;
    return url;
}

$util.getSPCurrentSiteUrl = function () {
    var href = document.location.href.toLocaleLowerCase();
    return href.substring(href.indexOf('/' + $util.currentLang), href.lastIndexOf('/')).replace('Pages', '').replace('pages', '');
}

$util.getLocalString = function (key) {
    return localResources[$util.currentLang][key];
};


$util.getParameterByName = function (name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

String.prototype.format = function (args) {
			var str = this;
			return str.replace(String.prototype.format.regex, function(item) {
				var intVal = parseInt(item.substring(1, item.length - 1));
				var replace;
				if (intVal >= 0) {
					replace = args[intVal];
				} else if (intVal === -1) {
					replace = "{";
				} else if (intVal === -2) {
					replace = "}";
				} else {
					replace = "";
				}
				return replace;
			});
		};
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");
