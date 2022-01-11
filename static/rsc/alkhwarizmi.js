let body;
(function (window) {

    var pluginURL = "#";
    var uiURL = "/alkhwarizmi/";
    // declare
    var khawarizmiSDK = {};
    khawarizmiSDK.title = "";
    khawarizmiSDK.botId = -1;
    khawarizmiSDK.mainContainer = null;
    khawarizmiSDK.animatedIcon = false;

    khawarizmiSDK.init = function () {

        let globalObject = window[window['alkawarizmi']];
        let queue = globalObject.q;

        if (queue) {
            for (var i = 0; i < queue.length; i++) {
                if (queue[i][0].toLowerCase() == 'init') {
                    khawarizmiSDK.title = queue[i][1].title;
                    khawarizmiSDK.botId = queue[i][1].id;
                    khawarizmiSDK.draggable = queue[i][1].draggable;
                    khawarizmiSDK.animatedIcon = queue[i][1].animatedIcon;
                }
            }
        }

        createWidgetHTML();


        if (queue) {
            for (var i = 0; i < queue.length; i++) {
                if (queue[i][0].toLowerCase() == 'init') {
                    let botFrame = document.getElementById("botFrameId");
                    botFrame.src = pluginURL + "widget/index/" + khawarizmiSDK.botId;
                    document.getElementById("ownerLogoId").src = uiURL + "plugins/images/" + khawarizmiSDK.botId + ".png"

                    botFrame.addEventListener("load", trackParentURL);
                }
                else
                    apiHandler(queue[i][0], queue[i][1]);
            }

            var CSSlink = document.createElement("link");
            CSSlink.href = uiURL + "plugins/Content/lib_" + khawarizmiSDK.botId + ".css";
            CSSlink.type = "text/css";
            CSSlink.rel = "stylesheet";
            document.getElementsByTagName("head")[0].appendChild(CSSlink);

            if (khawarizmiSDK.animatedIcon == 1 && khawarizmiSDK.title.length > 0)
                document.getElementById("botNameId").innerText = khawarizmiSDK.title;
            
            CSSlink.onerror = function () {
                //alert("Error loading " + this.href); // Error loading #
                var baseCSSlink = document.createElement("link");
                baseCSSlink.href = pluginURL + "plugins/Content/lib_base.css";
                baseCSSlink.type = "text/css";
                baseCSSlink.rel = "stylesheet";
                document.getElementsByTagName("head")[0].appendChild(baseCSSlink);

            };
        }

        if (khawarizmiSDK.draggable)
            dragElement(document.getElementById("alkahwarizmi-chat-container"));

               
        //g_UrlTimerTrigger = setTimeout(function () { sendMessage("tamer"); }, 10000);
        
    };
    khawarizmiSDK.show = function () {
        openConversation();
    }
    khawarizmiSDK.trackURL = function (webUrl) {
        sendMessage("trackURL#$#" + webUrl);
    }

    //_____________________Out of Scope Functions_________________________________//
    function createWidgetHTML() {
        var imageName = "kha.gif";
        if (!khawarizmiSDK.animatedIcon)
            imageName = "bot_"+khawarizmiSDK.botId+".svg";

        var html = "<div id='showChatbotId' class='khaIcon' style='display:none'><img src='" + uiURL + "plugins/images/" + imageName + "'>";
        if (khawarizmiSDK.animatedIcon)
            html +="<div id='botNameId'>\u0627\u0644\u062E\u0648\u0627\u0631\u0632\u0645\u064A<\/div>";
        html += "</div><div id=\"alkahwarizmi-chat-container\" style=\"display:none\"> <div id=\"alkahwarizmi-chat-container-header\" class=\"kha-heading\"><div class=\"alkhawarizmi-logo\">\r\n  <img src=" + uiURL + "logo.png  \/>\r\n            <button type=\"\" class=\"btn btn-success disabled\" id=\"incompleted\" style=\"display:none;width:110px; float: left;background-color: #147b0e; color: #0c5008;\">\r\n                <span style=\"color:#fff;\">\u0627\u0644\u0625\u0634\u0639\u0627\u0631\u0627\u062A<\/span>\r\n                <div id=\"bellId\" src=" + uiURL + "\plugins/images\/bel.png\" style=\"position: relative;left: -10px;\" \/>\r\n                <span class=\"badge\" id=\"nofProcessId\" style=\"display:none;background:#c00;position: relative;left: 18px;top: -1px;\">1<\/span>\r\n            <\/button>\r\n        <\/div>\r\n        <div class=\"minmize-icon\">\r\n            <a href=\"javascript:void(0)\" id=\"minmizeId\"><div id=\"bellId\"></div><\/a>\r\n        <\/div>\r\n        <div class=\"org-logo\">\r\n            <img id=\"ownerLogoId\" alt=\"\" \/>\r\n        <\/div>\r\n    <\/div>\r\n    <iframe id=\"botFrameId\" frameborder=\"0\" class=\"botframe\" allow=\"geolocation\" src=\"about:blank\" name=\"bc-window\" allowtransparency=\"true\" allowfullscreen=\"\" mozallowfullscreen=\"\" webkitallowfullscreen=\"\" allow=\"microphone; camera; autoplay\"><\/iframe>\r\n<\/div>";
        let temporary = document.createElement('div');
        temporary.innerHTML = html;
        body = document.getElementsByTagName('body')[0];
        while (temporary.children.length > 0) {
            body.appendChild(temporary.children[0]);
        }
        document.getElementById("showChatbotId").addEventListener("click", toggleConversation);
        document.getElementById("minmizeId").addEventListener("click", toggleConversation);
    };
    function apiHandler(api, params) {
        if (!api) throw Error('API method required');
        api = api.toLowerCase();

        if (supportedAPI.indexOf(api) === -1) throw Error("Method"+ api+" is not supported");

        console.log("Handling API call "+api, params);

        switch (api) {
            // TODO: add API implementation
            case 'message':
                show(params);
                break;
            default:
                console.warn("No handler defined for "+api);
        }
    }
    function trackParentURL() {
        var botIcon = document.getElementById("showChatbotId");
        botIcon.style.display = "block";
        sendMessage("trackParentURL");
    };

    function openConversation() {
        var botContainer = document.getElementById("alkahwarizmi-chat-container");
        var botIcon = document.getElementById("showChatbotId");

        if (botContainer.style.display === "none") {
            //botContainer.style.display = "block";
            fadeIn(botContainer);
            botIcon.style.display = "none";
            var videoElement = document.getElementById("showChatbotId");
            showChatbotId.requestFullscreen();

        } 
    }
    function toggleConversation() {

        var botContainer = document.getElementById("alkahwarizmi-chat-container");
        var botIcon = document.getElementById("showChatbotId");

        if (botContainer.style.display === "none") {
            //botContainer.style.display = "block";
            fadeIn(botContainer);
            //document.body.requestFullscreen();
            botIcon.style.display = "none";
            sendMessage("open-widget");
        } else {
            botIcon.style.display = "block";
            //botContainer.style.display = "none";
            fadeOut(botContainer);
        }
    }
    //____________________________Start Parent Message System_____________________//
    // addEventListener support for IE8
    function bindEvent(element, eventName, eventHandler) {
        if (element.addEventListener) {
            element.addEventListener(eventName, eventHandler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + eventName, eventHandler);
        }
    }

    var sendMessage = function (msg) {
        // Make sure you are sending a string, and to stringify JSON
        var iframeEl = document.getElementById('botFrameId');
        iframeEl.contentWindow.postMessage(msg, '*');
    };

    bindEvent(window, 'message', function (e) {
        if (e.data == "openConversation") {
            openConversation();
            //alert("Message: " + e.data + ", Orgin: " + e.origin);
        }
    });
    //____________________________Start Interface Functions_____________________//
    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "-header")) {
            /* if present, the header is where you move the DIV from:*/
            document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.getElementById("botFrameId").style.pointerEvents = "none";
            //document.onmouseup = closeDragElement;
            window.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            //document.onmousemove = elementDrag;
            window.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            if (e.buttons != 1 || e.which != 1) {
                closeDragElement()
                return;
            }

            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            var h = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
            // set the element's new position:
            var top = (elmnt.offsetTop - pos2);
            if (top < 0)
                top = 0
            else if (top > (h - 500))
                top = h - 500;

            elmnt.style.top = top + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            window.onmouseup = null;
            window.onmousemove = null;
            document.getElementById("botFrameId").style.pointerEvents = "auto";
        }
    }
    function fadeOut(element) {
        var op = 1;  // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.1) {
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 15);
    }
    function fadeIn(element) {
        var op = 0.1;  // initial opacity
        element.style.display = 'block';
        var timer = setInterval(function () {
            if (op >= 1) {
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 8);
    }

    // define your namespace khawarizmiSDK
    window.khawarizmiSDK = khawarizmiSDK;
    window.khawarizmiSDK.init();

})(window);