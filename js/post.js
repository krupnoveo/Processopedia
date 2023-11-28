"use strict"

document.addEventListener("DOMContentLoaded", function () {
    document.body.style.opacity = "0";
    window.onload = function () {
        document.body.style.opacity = "1";
        views();
        like();
        dislike();
        comments();
    }
});

function views() {
    let viewsCount = Number(sessionStorage.getItem('views'));
    viewsCount += 1;
    let views = document.querySelector("#viewsCount");
    sessionStorage.setItem('views', String(viewsCount));
    views.innerHTML = sessionStorage.getItem('views');
    if (viewsCount > 9) {
        sessionStorage.clear();
    }
}

function like() {
    let likeBtn = document.querySelector("#likeBtn");
    let dislikeBtn = document.querySelector("#dislikeBtn");

    let likePressed = sessionStorage.getItem('likePressed');
    likePressed = likePressed === "true";

    if (likePressed) {
        likeBtn.firstElementChild.setAttribute("src", "../images/like-filled.svg")
    } else {
        likeBtn.firstElementChild.setAttribute("src", "../images/like.svg");
    }
    if (sessionStorage.getItem('likes') === null) {
        likeBtn.nextElementSibling.innerHTML = "0";
    } else {
        likeBtn.nextElementSibling.innerHTML = sessionStorage.getItem('likes');
    }
    likeBtn.addEventListener("click", function () {
        let dislikePressed = sessionStorage.getItem('dislikePressed');
        dislikePressed = dislikePressed === "true";
        if (dislikePressed) {
            sessionStorage.setItem('dislikePressed', String(false));
            sessionStorage.setItem('dislikes', String(sessionStorage.getItem('dislikes') - 1));
            dislikeBtn.nextElementSibling.innerHTML = sessionStorage.getItem('dislikes');
            dislikeBtn.firstElementChild.setAttribute("src", "../images/dislike.svg");
        }
        let likesCount = Number(sessionStorage.getItem('likes'));
        let likePressed = sessionStorage.getItem('likePressed');
        likePressed = likePressed === "true";
        if (likePressed) {
            likesCount -= 1;
            likeBtn.firstElementChild.setAttribute("src", "../images/like.svg");
            sessionStorage.setItem('likePressed', String(false));
        } else {
            likeBtn.firstElementChild.setAttribute("src", "../images/like-filled.svg")
            sessionStorage.setItem('likePressed', String(true));
            likesCount += 1;
        }
        sessionStorage.setItem('likes', String(likesCount));
        likeBtn.nextElementSibling.innerHTML = sessionStorage.getItem('likes');
    });
}

function dislike() {
    let dislikeBtn = document.querySelector("#dislikeBtn");
    let likeBtn = document.querySelector("#likeBtn");

    let dislikePressed = sessionStorage.getItem('dislikePressed');
    dislikePressed = dislikePressed === "true";

    if (dislikePressed) {
        dislikeBtn.firstElementChild.setAttribute("src", "../images/dislike-filled.svg")
    } else {
        dislikeBtn.firstElementChild.setAttribute("src", "../images/dislike.svg");
    }
    if (sessionStorage.getItem('dislikes') === null) {
        dislikeBtn.nextElementSibling.innerHTML = "0";
    } else {
        dislikeBtn.nextElementSibling.innerHTML = sessionStorage.getItem('dislikes');
    }
    dislikeBtn.addEventListener("click", function () {
        let likePressed = sessionStorage.getItem('likePressed');
        likePressed = likePressed === "true";
        if (likePressed) {
            sessionStorage.setItem('likePressed', String(false));
            sessionStorage.setItem('likes', String(sessionStorage.getItem('likes') - 1));
            likeBtn.nextElementSibling.innerHTML = sessionStorage.getItem('likes');
            likeBtn.firstElementChild.setAttribute("src", "../images/like.svg");
        }
        let dislikesCount = Number(sessionStorage.getItem('dislikes'));
        let dislikePressed = sessionStorage.getItem('dislikePressed');
        dislikePressed = dislikePressed === "true";
        if (dislikePressed) {
            dislikesCount -= 1;
            dislikeBtn.firstElementChild.setAttribute("src", "../images/dislike.svg");
            sessionStorage.setItem('dislikePressed', String(false));
        } else {
            dislikeBtn.firstElementChild.setAttribute("src", "../images/dislike-filled.svg")
            sessionStorage.setItem('dislikePressed', String(true));
            dislikesCount += 1;
        }
        sessionStorage.setItem('dislikes', String(dislikesCount));
        dislikeBtn.nextElementSibling.innerHTML = sessionStorage.getItem('dislikes');
    });
}

function comments() {
    let inputName = document.querySelector("#inputName");
    let inputText = document.querySelector("#inputText");
    let alertForName = document.querySelector("#alertForName");
    let alertForText = document.querySelector("#alertForText");
    let sendBtn = document.querySelector("#send");
    let commentsList = document.querySelector("#commentsList");
    let commentsCounter = document.querySelector("#commentsCounterVisualizer");
    let commentsCounterStamp = document.querySelector("#commentsCounterStamp");
    let commentsCounterWord = document.querySelector("#commentsCounterWordEnding");
    sendBtn.addEventListener("click", function () {
        if (inputName.value === "") {
            inputName.style.border = "solid 1px red";
            alertForName.style.opacity = "1";
        } else {
            inputName.style.border = "none";
            alertForName.style.opacity = "0";
        }
        if (inputText.value === "") {
            inputText.style.border = "solid 1px red";
            alertForText.style.opacity = "1";
        } else {
            inputText.style.border = "none";
            alertForText.style.opacity = "0";
        }
        if (inputName.value !== "" && inputText.value !== "") {
            let name = inputName.value;
            let text = inputText.value;
            let comment = `
            <li class="comment">
              <div>
                <p class="commentName">${name}</p>
                <p class="commentText">${text}</p>
              </div>
              <button class="deleteCommentBtn">
                <img src="../images/trashcan.svg">
              </button>
            </li>
            `;
            commentsList.innerHTML += comment;
            commentsCounter.innerHTML = String(Number(commentsCounter.innerHTML) + 1);
            commentsCounterStamp.innerHTML = String(Number(commentsCounterStamp.innerHTML) + 1);
            let temp = Number(commentsCounter.innerHTML);
            if (temp % 10 === 0 || (temp >= 5 && temp < 20) || (temp > 20 && temp % 10 > 4)) {
                commentsCounterWord.innerHTML = "ев";
            }
            if (temp % 10 === 1 && (temp < 10 || temp > 20)) {
                commentsCounterWord.innerHTML = "й";
            }
            if ((temp % 10 >= 2 && temp % 10 <= 4) && (temp < 10 || temp > 20)) {
                commentsCounterWord.innerHTML = "я";
            }
            let deleteCommentBtns = commentsList.querySelectorAll(".deleteCommentBtn");
            for (let i = 0; i < deleteCommentBtns.length; i++) {
                deleteCommentBtns[i].addEventListener("click", function () {
                    deleteCommentBtns[i].parentElement.remove();
                    commentsCounter.innerHTML = String(Number(commentsCounter.innerHTML) - 1);
                    commentsCounterStamp.innerHTML = String(Number(commentsCounterStamp.innerHTML) - 1);
                    temp = Number(commentsCounter.innerHTML);
                    if (temp % 10 === 0 || (temp >= 5 && temp < 20) || (temp > 20 && temp % 10 > 4)) {
                        commentsCounterWord.innerHTML = "ев";
                    }
                    if (temp % 10 === 1 && (temp < 10 || temp > 20)) {
                        commentsCounterWord.innerHTML = "й";
                    }
                    if ((temp % 10 >= 2 && temp % 10 <= 4) && (temp < 10 || temp > 20)) {
                        commentsCounterWord.innerHTML = "я";
                    }
                })
            }
            inputName.value = "";
            inputText.value = "";
        }
    })
    inputName.addEventListener("input", function () {
        if (inputName.value === "") {
            inputName.style.border = "solid 1px red";
            alertForName.style.opacity = "1";
        } else {
            inputName.style.border = "none";
            alertForName.style.opacity = "0";
        }
    })
    inputText.addEventListener("input", function () {
        if (inputText.value === "") {
            inputText.style.border = "solid 1px red";
            alertForText.style.opacity = "1";
        } else {
            inputText.style.border = "none";
            alertForText.style.opacity = "0";
        }
    })
}