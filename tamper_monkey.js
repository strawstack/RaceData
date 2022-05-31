// ==UserScript==
// @name         RaceData
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Download race data from sports stats
// @author       You
// @match        https://www.sportstats.ca/display-results.xhtml?raceid=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let count = 82;

    let action = () => {
        count -= 1;
        console.log("open details timeout...");

        setTimeout(() => {
            console.log("open details...");
            let detailTabs = document.querySelectorAll(".ui-row-toggler.ui-icon.ui-icon-circle-triangle-e");
            for (let tab of detailTabs) {
                tab.click();
            }
        }, 2000);

        setTimeout(() => {
            console.log("tableData...");
            let tableData = document.querySelector(".result-table-wrapper.box").innerHTML.toString();

            fetch('https://developing-familiar-brisket.glitch.me/', {
                method: "post",
                body: JSON.stringify({data: tableData}),
            }).then(response => {

                // Click btn after delay
                console.log("setTimeout next btn...");
                setTimeout(() => {
                    let btn = document.querySelector(".ui-commandlink.ui-widget.fa.fa-angle-right");
                    console.log("... done.");
                    btn.click();
                    if (count > 0) {
                        action();
                    }
                }, 500);
            });

        }, 20000);

    }

    action();

})();