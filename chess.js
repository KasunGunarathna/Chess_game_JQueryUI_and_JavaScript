// JavaScript Document
//variable for current movement
var currentMove = 'white';
//document ready
$(document).ready(function() {
    $('.space').mouseover(function() {
        $(this).css('background-color', 'green');
    });
    $('.space').mouseleave(function() {
        $(this).css('background-color', '');
        $('.space').droppable("enable");
    });
    $('.icon').mouseenter(function() {

        a = $(this).attr('class');
        // console.log(this);
        // pawnMove;
        var cname = $(this).attr('class').split(' ');
        var value = cname[1];
        var yx = $(this).parent().attr('id');
        $('.space').droppable("disable");
        switch (value) {
            case "wpawn":
                whitepawn(yx);
                break;
            case "bpawn":
                blackpawn(yx);
                break;
            default:
        }
        // $('.space').droppable("enable");
    });
    $('.icon').mouseleave(function() {
        $(".space").css('background-color', '');
        $('.space').droppable("enable");

    });
    //all icons came to previous position if cannot dropable
    $('.icon').draggable({
        revert: 'invalid',

    });
    //all black icons draggable disable
    $('.bl').draggable("disable");
    //dropable icons
    $('.space').droppable({
        hoverClass: 'icon-hover',
        drop: function(event, ui) {
            //variable for draggable icon 
            var dropped = ui.draggable;
            // variable for dropable place
            var droppedOn = $(this);

            //
            // $(droppedOn).droppable("disable");
            //icon previous position droppable enable
            $(dropped).parent().droppable("enable");

            $(dropped).draggable({ revert: true });
            if ($(droppedOn).is(":empty")) {
                $(droppedOn).children().detach();
                $(dropped).detach().css({ top: 0, left: 0, right: 0, bottom: 0 }).appendTo(droppedOn);
                // $(droppedOn).children().draggable("enable");
                switchTurn();

                // rotateAnimation("back", 5);
                // rotateAnimation("icon", 5);
            } else {
                var classesHold = $(droppedOn).children().attr('class').split(' ');
                var classesDrag = $(dropped).attr('class').split(' ');
                console.log(classesHold[2]);
                console.log(classesDrag[2]);
                if (classesHold[2] != classesDrag[2]) {
                    if (classesHold[2] == 'bl') {
                        $(droppedOn).children().detach().appendTo('.wspace');
                        $(dropped).detach().css({ top: 0, left: 0, right: 0, bottom: 0 }).appendTo(droppedOn);
                        switchTurn();
                        // document.getElementById("board").style.transform = "rotate(180deg)";
                    } else if (classesHold[2] == 'wt') {
                        $(droppedOn).children().detach().appendTo('.bspace');
                        $(dropped).detach().css({ top: 0, left: 0, right: 0, bottom: 0 }).appendTo(droppedOn);
                        switchTurn();
                    } else {
                        $(droppedOn).children().detach();
                        $(dropped).detach().css({ top: 0, left: 0, right: 0, bottom: 0 }).appendTo(droppedOn);
                        switchTurn();
                        // document.getElementById("board").style.transform = "rotate(180deg)";
                    }

                }
            }
        },
        accept: ".wt"
    });

});

function switchTurn() {
    var lastMove = currentMove;
    if (currentMove == "white") {
        currentMove = "black";
        $('.wt').draggable("disable");
        $('.bl').draggable("enable");
        $('.space').droppable({
            accept: '.bl'
        });

        // document.getElementsByClass("icon").style.transform = "rotate(180deg)";

    } else {
        currentMove = "white";
        $('.bl').draggable("disable");
        $('.wt').draggable("enable");
        $('.space').droppable({
            accept: '.wt'
        });
        // document.getElementById("board").style.transform = "rotate(180deg)";
        // document.getElementsByClass("icon").style.transform = "rotate(180deg)";

    }
}

var looper;
var degrees = 0;

function rotateAnimation(el, speed) {
    var elem = document.getElementsByClassName(el)[0];
    if (navigator.userAgent.match("Chrome")) {
        elem.style.WebkitTransform = "rotate(" + degrees + "deg)";
    } else if (navigator.userAgent.match("Firefox")) {
        elem.style.MozTransform = "rotate(" + degrees + "deg)";
    } else if (navigator.userAgent.match("MSIE")) {
        elem.style.msTransform = "rotate(" + degrees + "deg)";
    } else if (navigator.userAgent.match("Opera")) {
        elem.style.OTransform = "rotate(" + degrees + "deg)";
    } else {
        elem.style.transform = "rotate(" + degrees + "deg)";
    }
    looper = setTimeout('rotateAnimation(\'' + el + '\',' + speed + ')', speed);
    degrees++;
    // console.log(ang);
    if (degrees >= 181) {
        myStopFunction();
    }
    // document.getElementById("status").innerHTML = "rotate("+degrees+"deg)";
}

function myStopFunction() {
    clearTimeout(looper);
}

function whitepawn(iconId) {
    if (iconId.charAt(0) == 2) {
        var ed = iconId.charAt(0);
        var ed1 = parseInt(ed) + 1;
        var ed2 = ed1 + 1;
        var s1 = iconId.replace(ed, ed1);
        var s2 = iconId.replace(ed, ed2);
        // var left = parseInt(iconId.charAt(1)) - 1;
        // var right = parseInt(iconId.charAt(1)) + 1;
        $("#" + s1).css('background-color', 'green');
        $("#" + s1).droppable("enable");
        $("#" + s2).css('background-color', 'green');
        $("#" + s2).droppable("enable");
    } else {
        var ed = iconId.charAt(0);
        var ed1 = parseInt(ed) + 1;
        var s1 = iconId.replace(ed, ed1);
        $("#" + s1).css('background-color', 'green');
        $("#" + s1).droppable("enable");
    }
}

function blackpawn(iconId) {
    if (iconId.charAt(0) == 7) {
        var ed = iconId.charAt(0);
        var ed1 = parseInt(ed) - 1;
        var ed2 = ed1 - 1;
        var s1 = iconId.replace(ed, ed1);
        var s2 = iconId.replace(ed, ed2);
        $("#" + s1).css('background-color', 'green');
        $("#" + s1).droppable("enable");
        $("#" + s2).css('background-color', 'green');
        $("#" + s2).droppable("enable");
    } else {
        var ed = iconId.charAt(0);
        var ed1 = parseInt(ed) - 1;
        var s1 = iconId.replace(ed, ed1);
        $("#" + s1).css('background-color', 'green');
        $("#" + s1).droppable("enable");
    }
}