// ==UserScript==
// @name           LFB+
// @namespace      LFB+
// @author         Harald Hentschel
// @twitterURL     https://www.twitter.com/mrdoubleh
// @description    Gets links ready for opening in new tab and sets title accordingly. It shows an icon according to meldeschluss-date, too. Adds a link to itself including the LFB-ID to take a better reference to it. Setting up favourites in bookmarks is now much easier because title of page is changed to current appointment and LFB-ID.
// @version        2.1
// @include        *lfbo.kultus-bw*
// @license        https://creativecommons.org/licenses/by-nc/4.0/
// ==/UserScript==


// ===== / start of script / =====
var title_str;
var lfb_id;
var lfb_id_copy;
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
        lfb_id = class_id_ele[i].textContent.substring(0, 6);
        var lfb_id_and_more = class_id_ele[i].textContent.split(" - ");
        class_id_ele[i].innerHTML ='<a href=https://lfbo.kultus-bw.de/lfb/termine/' + lfb_id + ' target="_blank" style="color:#b70017;">' + lfb_id + " - " + lfb_id_and_more[1] +'</a>';
      }
    }
  } else {
    var tage_noch;
    var title_el = document.getElementsByClassName("title title-break");
    title_str = title_el[0].innerText.split("\n");
    lfb_id = title_str[1].substring(0,6);
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

      lfb_id_copy = lfb_id;
      // buttons / buttongroup
      title_el[0].append(setButtonGroupURL());
      var horiLine = document.createElement('hr');
      horiLine.classList.add('d-block', 'd-xs-none');
      title_el[0].append(horiLine);

      // yellow top navi
      yellow_boxed_title_el[0].innerHTML ='<h2>' + lfb_id + '</h2>';
      yellow_boxed_title_el[0].style.margin = "auto";
      document.title = lfb_id + " | " + title_str[0];
      }
    }
}, 500);




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
  btnCopyTitleWithURL.textContent = "Kopieren mit Titel";
  btnCopyTitleWithURL.style.fontSize = "small";
  btnCopyTitleWithURL.onclick = function() {
    console.log(lfb_id);
    var stringToCopy = title_str[0].replace('●', '').trim() + " (" + lfb_id_copy.trim() + "): " + window.location.href;
    copyToClipboardPlain(stringToCopy, btnCopyTitleWithURL)
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