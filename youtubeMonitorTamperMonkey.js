// ==UserScript==
// @name         Youtube monitor
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/watch*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

x = [];
//here you put your access token, that you got
token = '9GwZ8u4jctPdlOfjnqmsk8KlC25Vrh';
//web-address of analyzer
serverAddress='https://tranquil-tundra-67102.herokuapp.com/api/';

function sendSomeUrl(){
    console.log('Trying to send something');
 window.jQuery.ajax({
            type:'POST',
            url:serverAddress,
            data: {
                title: title,
                url: url,
                channel: channel,
                api_key: token,
            },
             success:function (e) {

             }
         });    
}
//check for new updates every second
window.setInterval(function(){
    url = window.location.href;
    title = window.jQuery("#eow-title").text().trim();
    channel = document.evaluate("//div[@class='yt-user-info']/a", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.innerHTML;

    var last = x[x.length-1];
    if (url!=last && url.search('watch')>0){
       x.push(url);
       sendSomeUrl(url);
    }
}, 1000);
