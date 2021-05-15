// ==UserScript==
// @name           LFB+
// @namespace      LFB+
// @author         Harald Hentschel
// @description    Gets links ready for opening in new tab and sets title accordingly. It shows an icon according to meldeschluss-date, too. Adds a link to itself including the LFB-ID to take a better reference to it. Setting up favourites in bookmarks is now much easier because title of page is changed to current appointment and LFB-ID.
// @version        1.5
// @include        *lfbo.kultus-bw*


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
            console.log(paragraphsOfContent_el[i].innerText);
            if (paragraphsOfContent_el[i].innerText.includes("Meldeschluss") ){
              indexMeldeschluss = i;
            }
          }
          catch {
            // console.log("not given for i=" + i);
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

      var link_to_self = '<a href=' + window.location.href + ' target="_blank">' + ldb_id + ": " + title_str[0] + '</a>';
      if (tage_noch==12000){
        title_el[0].innerHTML = "<h3><span style='color:black;'>● </span>" + title_str[0] + "</h3><p>Meldeschluss nicht ermittelt<br><span style='font-size:small;'>" + link_to_self + "</span></p>";
      } else if (tage_noch<0){
        title_el[0].innerHTML = "<h3><span style='color:red;'>● </span>" + title_str[0] + "</h3><p>Meldeschluss vorbei<br><span style='font-size:small;'>" + link_to_self + "</span></p>";
      } else if (tage_noch<4){
        title_el[0].innerHTML = "<h3><span style='color:#ff8800;'>● </span>" + title_str[0] + "</h3><p>" + tage_noch + " Tage bis zum Meldeschluss<br><span style='font-size:small;'>" + link_to_self + "</span></p>";
      }else {
        title_el[0].innerHTML = "<h3><span style='color:#00a00c;'>● </span>" + title_str[0] + "</h3><p>" + tage_noch + " Tage bis zum Meldeschluss<br><span style='font-size:small;'>" + link_to_self + "</span></p>";
      }

      yellow_boxed_title_el[0].innerHTML ='<h2>' + ldb_id + '</h2>';
      yellow_boxed_title_el[0].style.margin = "auto";
      document.title = ldb_id + " | " + title_str[0];
      }
    }
  }
, 1000);








// ==UserScript==
// @name           LFB+
// @namespace      LFB+
// @author         Harald Hentschel
// @description    Gets links ready for opening in new tab and sets title accordingly. It shows an icon according to meldeschluss-date, too. Adds a link to itself including the LFB-ID to take a better reference to it. Setting up favourites in bookmarks is now much easier because title of page is changed to current appointment and LFB-ID.
// @version        1.3
// @include        *lfbo.kultus-bw*


// ==/UserScript==

// ===== / start of script / =====
document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    // get elements
    var header_logo_left_ele = document.getElementsByClassName("logo col-1 col-md-2 text-left");
    var header_logo_right_ele = document.getElementsByClassName("col-1 d-none d-md-block text-left");

    header_logo_left_ele[0].style.visibility = "hidden";
    header_logo_right_ele[0].style.visibility = "hidden";

    var refreshInterval = setInterval(function() {
      var isDashboard = window.location.href.toString().toLowerCase().includes("dashboard");
      var isSearch = window.location.href.toString().toLowerCase().includes("suche");
      var isAktVeranst = document.querySelectorAll("h4")[0].textContent.toLowerCase().includes("aktuelle veranstaltungen (")

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
                console.log(paragraphsOfContent_el[i].innerText);
                if (paragraphsOfContent_el[i].innerText.includes("Meldeschluss") ){
                  indexMeldeschluss = i;
                }
              }
              catch {
                // console.log("not given for i=" + i);
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

          var link_to_self = '<a href=' + window.location.href + ' target="_blank">' + ldb_id + ": " + title_str[0] + '</a>';
          if (tage_noch==12000){
            title_el[0].innerHTML = "<h3><span style='color:black;'>● </span>" + title_str[0] + "</h3><p>Meldeschluss nicht ermittelt<br><span style='font-size:small;'>" + link_to_self + "</span></p>";
          } else if (tage_noch<0){
            title_el[0].innerHTML = "<h3><span style='color:red;'>● </span>" + title_str[0] + "</h3><p>Meldeschluss vorbei<br><span style='font-size:small;'>" + link_to_self + "</span></p>";
          } else if (tage_noch<4){
            title_el[0].innerHTML = "<h3><span style='color:#ff8800;'>● </span>" + title_str[0] + "</h3><p>" + tage_noch + " Tage bis zum Meldeschluss<br><span style='font-size:small;'>" + link_to_self + "</span></p>";
          }else {
            title_el[0].innerHTML = "<h3><span style='color:#00a00c;'>● </span>" + title_str[0] + "</h3><p>" + tage_noch + " Tage bis zum Meldeschluss<br><span style='font-size:small;'>" + link_to_self + "</span></p>";
          }

          yellow_boxed_title_el[0].innerHTML ='<h2>' + ldb_id + '</h2>';
          yellow_boxed_title_el[0].style.margin = "auto";
          document.title = ldb_id + " | " + title_str[0];
          }
        }
    }, 1000);

  }
};













