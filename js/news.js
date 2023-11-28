"use strict"
document.addEventListener("DOMContentLoaded", function () {
    document.body.style.opacity = "0";
    document.body.style.display = "none";
    window.onload = function () {
        document.body.style.opacity = "1";
        document.body.style.display = "block";
        let postCards = document.querySelectorAll(".postCard");
        postCardsPlacement(postCards);
        window.addEventListener("resize", function () {
            postCardsPlacement(postCards);
        })
    }
});
function postCardsPlacement(postCards) {
    if (window.innerWidth > 899) {
        let count2 = 0;
        let count3 = 0;
        let flag = false;
        for (let i = 1; i < postCards.length; i++) {
            if (!flag) {
                if (count3 === 0) {
                    postCards[i].style.gridColumn = "1 / 4";
                } else {
                    postCards[i].style.gridColumn = "4 / 7";
                }
                count3 = (count3 + 1) % 2;
                if (count3 === 0) {
                    flag = !flag;
                }
            } else {
                postCards[i].style.gridColumn = `${(count2 + 1) * 2 - 1} / ${(count2 + 1) * 2 + 1}`;
                postCards[i].classList.add("postCardHigher");
                count2 = (count2 + 1) % 3;
                if (count2 === 0) {
                    flag = !flag;
                }
            }
        }
    } else {
        for (let i = 0; i < postCards.length; i++) {
            postCards[i].style.gridColumn = "1 / 7";
        }
    }
}