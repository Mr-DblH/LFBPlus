// ==UserScript==
// @name           LFB+
// @namespace      LFB+
// @author         Harald Hentschel
// @twitterURL     https://www.twitter.com/mrdoubleh
// @description    Gets links ready for opening in new tab and sets title accordingly. It shows an icon according to meldeschluss-date, too. Adds a link to itself including the LFB-ID to take a better reference to it. Setting up favourites in bookmarks is now much easier because title of page is changed to current appointment and LFB-ID.
// @version        2.0
// @include        *lfbo.kultus-bw*
// @license        https://creativecommons.org/licenses/by-nc/4.0/
// ==/UserScript==


// ===== / start of script / =====
// get elements
var header_logo_left_ele = document.getElementsByClassName("logo col-1 col-md-2 text-left");
var header_logo_right_ele = document.getElementsByClassName("col-1 d-none d-md-block text-left");

header_logo_left_ele[0].style.visibility = "hidden";
header_logo_right_ele[0].style.visibility = "hidden";

var refreshInterval = setInterval(function() {
  var isDashboard = window.location.href.toString().toLowerCase().includes("dashboard");
  var isSearch = window.location.href.toString().toLowerCase().includes("suche");
  var isAktVeranst = false;
  try{
    isAktVeranst = document.querySelectorAll("h4")[0].textContent.toLowerCase().includes("aktuelle veranstaltungen (")
  } catch {
    // console.log("no isAktVeranst");
  }

  if (isDashboard || isSearch || isAktVeranst){
    if (isDashboard || isAktVeranst){
      document.title = "LFB | dashboard";
    } else {
      document.title = "LFB | Suche";
    }
    var class_id_ele = document.getElementsByClassName("id");

    for (var i=0; i<class_id_ele.length; i++){
      if (class_id_ele[i].textContent.trim().length != 5){
        var lfb_id = class_id_ele[i].textContent.substring(0, 6);
        var lfb_id_and_more = class_id_ele[i].textContent.split(" - ");
        class_id_ele[i].innerHTML ='<a href=https://lfbo.kultus-bw.de/lfb/termine/' + lfb_id + ' target="_blank" style="color:#b70017;">' + lfb_id + " - " + lfb_id_and_more[1] +'</a>';
      }
    }
  } else {
    var tage_noch;
    var title_el = document.getElementsByClassName("title title-break");
    var title_str = title_el[0].innerText.split("\n");
    var ldb_id = title_str[1].substring(0,6);
    var yellow_boxed_title_el = document.getElementsByClassName("d-none d-sm-block");

    if (!title_el[0].innerHTML.includes('●')){
      try{
        var indexMeldeschluss = 7;

        var paragraph_el = document.getElementsByClassName("col-12");
        var paragraphsOfContent_el = paragraph_el[0].childNodes;

        for (var i=0; i<paragraphsOfContent_el.length; i++){
          try{
            if (paragraphsOfContent_el[i].innerText.includes("Meldeschluss") ){
              indexMeldeschluss = i;
            }
          }
          catch {
            // console.log("meldeschluss not given for i=" + i);
          }
        }

        var meldeschluss_datum = paragraphsOfContent_el[indexMeldeschluss].innerText.split("\n\n")[1];
        var meldeschluss_in_teilen = meldeschluss_datum.split('.')
        var meldeschluss = new Date(meldeschluss_in_teilen[2], meldeschluss_in_teilen[1] - 1, meldeschluss_in_teilen[0]);
        var heute = new Date();
        heute = new Date(heute.getFullYear(), heute.getMonth(), heute.getDate());
        tage_noch = Math.floor((meldeschluss-heute)/(1000*60*60*24));

      } catch {
        tage_noch = 12000;
      }

      if(isNaN(tage_noch)){
        tage_noch = 12000;
      }

      if (tage_noch==12000){
        title_el[0].innerHTML = "<h3><span style='color:black;'>● </span>" + title_str[0] + "</h3><p>Meldeschluss nicht ermittelt</p>";
      } else if (tage_noch<0){
        title_el[0].innerHTML = "<h3><span style='color:red;'>● </span>" + title_str[0] + "</h3><p>Meldeschluss vorbei</p>";
      } else if (tage_noch<4){
        title_el[0].innerHTML = "<h3><span style='color:#ff8800;'>● </span>" + title_str[0] + "</h3><p>" + tage_noch + " Tage bis zum Meldeschluss</p>";
      }else {
        title_el[0].innerHTML = "<h3><span style='color:#00a00c;'>● </span>" + title_str[0] + "</h3><p>" + tage_noch + " Tage bis zum Meldeschluss</p>";
      }
      title_el[0].childNodes[1].style.marginBottom = "10px";

      // setup buttons to copy; setup element to be copied
      link_to_self_ele = document.createElement('div');
      link_to_self_ele.innerHTML = '<a href=' + window.location.href + ' target="_blank">LFB: ' + ldb_id + ": " + title_str[0] + '</a>'
      // buttons / buttongroup
      title_el[0].append(setButtonGroupURL());
      var horiLine = document.createElement('hr');
      horiLine.classList.add('d-block', 'd-xs-none');
      title_el[0].append(horiLine);

      // yellow top navi
      yellow_boxed_title_el[0].innerHTML ='<h2>' + ldb_id + '</h2>';
      yellow_boxed_title_el[0].style.margin = "auto";
      document.title = ldb_id + " | " + title_str[0];
      }
    }
  }
, 1000);





// == METHODS ==
// copy buttons setzen
function setButtonGroupURL(){
  var btnGroupURL = document.createElement('div');
  btnGroupURL.classList.add('btn-group');
  btnGroupURL.setAttribute("role", "group");

  var btnCopyURL = document.createElement('button');
  btnCopyURL.classList.add('btn', 'btn-dark');
  btnCopyURL.type = "button";
  btnCopyURL.textContent = "Kopieren der URL";
  btnCopyURL.style.fontSize = "small";
  btnCopyURL.style.marginRight = "10px";
  btnCopyURL.onclick = function() {
    copyToClipboardPlain(window.location.href, btnCopyURL);
  }

  var btnCopyTitleWithURL = document.createElement('button');
  btnCopyTitleWithURL.classList.add('btn', 'btn-dark');
  btnCopyTitleWithURL.type = "button";
  btnCopyTitleWithURL.textContent = "Kopieren mit Details";
  btnCopyTitleWithURL.style.fontSize = "small";
  btnCopyTitleWithURL.onclick = function() {
    copyToClipboardWithStyle(link_to_self_ele, btnCopyTitleWithURL);
  }

  btnGroupURL.append(btnCopyURL);
  btnGroupURL.append(btnCopyTitleWithURL);
  return btnGroupURL;
}

// copy to clipboard
// source: https://stackoverflow.com/questions/50795042/create-a-copy-button-without-an-input-text-box/50795833
function copyToClipboardPlain(stringToBeCopied, btnElement){
  var tempInput = document.createElement("input");
  tempInput.value = stringToBeCopied;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  btnElement.classList.remove('btn-dark');
  btnElement.classList.add('btn-primary');
  setTimeout(function(){
    btnElement.classList.add('btn-dark')
    btnElement.classList.remove('btn-primary');
  }, 300);
}

// copy to clipboard with specific styles
// source: https://stackoverflow.com/questions/55440037/copy-rich-text-to-clipboard-with-styles-from-css-classes/55440331
function copyToClipboardWithStyle(copyElement, btnElement) {
  // array off all block level elements
  var block_level_elements = ['P','H1', 'H2', 'H3', 'H4', 'H5', 'H6','OL', 'UL','DIV','FORM','HR','TABLE'];

  //create new Element so we can change elments like we need
  var newelment = document.createElement("div");

  //copy target Element to the new Element
  newelment.innerHTML = copyElement.innerHTML;

  //hide new Element to body
  newelment.style.opacity  = 0;
  // add new Element to body
  document.body.appendChild(newelment);

  //get all element childs
  var descendents = newelment.getElementsByTagName('*');

  //loop in childs
  for (var i = 0; i < descendents.length; ++i) {
    //get defult Style
      var style = window.getComputedStyle(descendents[i]);
      var dis = style.getPropertyValue('display');
      //get defult tag name
      var tagname = descendents[i].tagName;

    //---------------------------
    //this part is little tricky
    //---------------------------
    //true : Element is a block level elements and css display is inline
      if(dis.includes("inline") && block_level_elements.includes(tagname)){
        //get all Element style include default style
      var defultcss = document.defaultView.getComputedStyle(descendents[i], "").cssText;
      //change Element tag from block level elements to inline level elements (span)
      descendents[i].outerHTML = descendents[i].outerHTML.replace(new RegExp(tagname, "ig"),"span");      //todo: need to change RegExp to tag name only not inner text
      //add all Element style include default style to new tag
      descendents[i].style.cssText = defultcss;
    }
  }
  //-----------------copy new Element--------------
  var range, selection;

  if (document.body.createTextRange)
    {
    range = document.body.createTextRange();
    range.moveToElementText(newelment);
    range.select();
  } else if (window.getSelection)
    {
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(newelment);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  document.execCommand('copy');
  window.getSelection().removeAllRanges();

  // remove new Element from document
  document.body.removeChild(newelment);

  btnElement.classList.remove('btn-dark');
  btnElement.classList.add('btn-primary');
  setTimeout(function(){
      btnElement.classList.add('btn-dark')
      btnElement.classList.remove('btn-primary');
    }, 300);
}
