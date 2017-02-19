// JavaScript Document
//variable for current movement
var currentMove = 'white';
//document ready
$(document).ready(function() {



    $('.space').mouseover(function() {
        $(this).css('background-color', 'blue');
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
        $(this).css('z-index', '1');

        var value = cname[1];
        var yx = $(this).parent().attr('id');
        console.log(value);
        $('.space').droppable("disable");
        switch (value) {
            case "wpawn":
                whitepawn(yx);
                break;
            case "bpawn":
                blackpawn(yx);
                break;
            case "king":
                king(yx);
                break;
            case "rook":
                rook(yx);
                break;
            case "bishop":
                bishop(yx);
                break;
            case "knight":
                knight(yx);
                break;
            case "queen":
                queen(yx);
                break;
            default:
        }
        // $('.space').droppable("enable");
    });
    $('.icon').mouseleave(function() {
        $(".space").css('background-color', '');
        $(".colnum, .rownum").css('background-color', '');
        $('.space').droppable("enable");
        $(this).css('z-index', '0');
        $(this).css('position', 'relative');

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
    var limit = 0;
    if ($("#" + iconId).parent().index() == "7") {
        limit = 3;
    } else {
        limit = 2;
    }

    var row_index = $("#" + iconId).parent().index();
    var col_index = $("#" + iconId).index();

    for (var i = 1; i < limit; i++) {
        $('#board tr:eq(' + (row_index - i) + ') td:eq(' + (col_index) + ')').css('background-color', 'green');
        $('#board tr:eq(' + (row_index - i) + ') td:eq(' + (col_index) + ')').droppable("enable");
    }
    //kill
    var x = 1;
    var leftkill = $('#board tr:eq(' + (row_index - x) + ') td:eq(' + (col_index - x) + ')');
    var rightkill = $('#board tr:eq(' + (row_index - x) + ') td:eq(' + (col_index + x) + ')');

    if ($(leftkill).children().hasClass('bl') == true) {
        $(leftkill).css('background-color', 'red');
        $(leftkill).droppable("enable");
    } else {
        $(leftkill).css('background-color', '');
    }
    if ($(rightkill).children().hasClass('bl') == true) {
        $(rightkill).css('background-color', 'red');
        $(rightkill).droppable("enable");
    } else {
        $(rightkill).css('background-color', '');
    }

}

function blackpawn(iconId) {
    var limit = 0;
    if ($("#" + iconId).parent().index() == "2") {
        limit = 3;
    } else {
        limit = 2;
    }

    var row_index = $("#" + iconId).parent().index();
    var col_index = $("#" + iconId).index();

    for (var i = 1; i < limit; i++) {
        $('#board tr:eq(' + (row_index + i) + ') td:eq(' + (col_index) + ')').css('background-color', 'green');
        $('#board tr:eq(' + (row_index + i) + ') td:eq(' + (col_index) + ')').droppable("enable");
    }
    //kill
    var x = 1;
    var leftkill = $('#board tr:eq(' + (row_index + x) + ') td:eq(' + (col_index - x) + ')');
    var rightkill = $('#board tr:eq(' + (row_index + x) + ') td:eq(' + (col_index + x) + ')');

    if ($(leftkill).children().hasClass('wt') == true) {
        $(leftkill).css('background-color', 'red');
        $(leftkill).droppable("enable");
    } else {
        $(leftkill).css('background-color', '');
    }
    if ($(rightkill).children().hasClass('wt') == true) {
        $(rightkill).css('background-color', 'red');
        $(rightkill).droppable("enable");
    } else {
        $(rightkill).css('background-color', '');
    }
}

function king(iconId) {

    var row_index = $("#" + iconId).parent().index();
    var col_index = $("#" + iconId).index();
    console.log(row_index);
    console.log(col_index);

    for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
            if ((row_index + i) < 1 | (col_index + j) < 1 | (row_index + i) >= 9) {
                continue;
            }
            $('#board tr:eq(' + (row_index + i) + ') td:eq(' + (col_index + j) + ')').css('background-color', 'green');
            $('#board tr:eq(' + (row_index + i) + ') td:eq(' + (col_index + j) + ')').droppable("enable");
        }
    }
    $(".colnum, .rownum").css('background-color', '');
    $(".colnum, .rownum").droppable("disable");
}

function rook(iconId) {

    var row_index = $("#" + iconId).parent().index();
    var col_index = $("#" + iconId).index();
    console.log(row_index);
    console.log(col_index);
    rookMove(row_index, col_index);

}

function rookMove(row_index, col_index) {
    for (var i = 1 - col_index; i <= (8 - col_index); i++) {
        $('#board tr:eq(' + (row_index) + ') td:eq(' + (col_index + i) + ')').css('background-color', 'green');
        $('#board tr:eq(' + (row_index) + ') td:eq(' + (col_index + i) + ')').droppable("enable");
    }
    for (var i = 1 - row_index; i <= (8 - row_index); i++) {
        $('#board tr:eq(' + (row_index + i) + ') td:eq(' + (col_index) + ')').css('background-color', 'green');
        $('#board tr:eq(' + (row_index + i) + ') td:eq(' + (col_index) + ')').droppable("enable");
    }
    $(".colnum, .rownum").css('background-color', '');
    $(".colnum, .rownum").droppable("disable");

}


function bishop(iconId) {

    var row_index = $("#" + iconId).parent().index();
    var col_index = $("#" + iconId).index();
    console.log(row_index);
    console.log(col_index);
    bishopMove(row_index, col_index);

}

function bishopMove(row_index, col_index) {
    for (var i = (1);; i++) {
        if ((row_index + i) < 1 | (col_index + i) < 1 | (row_index + i) >= 9 | (col_index + i) >= 9) {
            break;
        }
        $('#board tr:eq(' + (row_index + i) + ') td:eq(' + (col_index + i) + ')').css('background-color', 'green');
        $('#board tr:eq(' + (row_index + i) + ') td:eq(' + (col_index + i) + ')').droppable("enable");
    }
    for (var i = (1);; i++) {
        if ((row_index - i) < 1 | (col_index + i) < 1 | (row_index - i) >= 9 | (col_index + i) >= 9) {
            break;
        }
        $('#board tr:eq(' + (row_index - i) + ') td:eq(' + (col_index + i) + ')').css('background-color', 'green');
        $('#board tr:eq(' + (row_index - i) + ') td:eq(' + (col_index + i) + ')').droppable("enable");
    }
    for (var i = (1);; i++) {
        if ((row_index - i) < 1 | (col_index - i) < 1 | (row_index - i) >= 9 | (col_index - i) >= 9) {
            break;
        }
        $('#board tr:eq(' + (row_index - i) + ') td:eq(' + (col_index - i) + ')').css('background-color', 'green');
        $('#board tr:eq(' + (row_index - i) + ') td:eq(' + (col_index - i) + ')').droppable("enable");
    }
    for (var i = (1);; i++) {
        if ((row_index + i) < 1 | (col_index - i) < 1 | (row_index + i) >= 9 | (col_index - i) >= 9) {
            break;
        }
        $('#board tr:eq(' + (row_index + i) + ') td:eq(' + (col_index - i) + ')').css('background-color', 'green');
        $('#board tr:eq(' + (row_index + i) + ') td:eq(' + (col_index - i) + ')').droppable("enable");
    }
}

function knight(iconId) {
    var row_index = $("#" + iconId).parent().index();
    var col_index = $("#" + iconId).index();
    console.log(row_index);
    console.log(col_index);
    knightMove(row_index, col_index);
}

function knightMove(row_index, col_index) {
    for (var i = -2; i < 3; i += 4) {
        for (var j = -1; j < 2; j += 2) {
            if ((row_index + i) < 1 | (row_index + i) > 8 | (col_index + j) < 1 | (col_index + j) > 8) {
                console.log(i + " " + j);
                continue;
            } else {
                $('#board tr:eq(' + (row_index + i) + ') td:eq(' + (col_index + j) + ')').css('background-color', 'green');
                $('#board tr:eq(' + (row_index + i) + ') td:eq(' + (col_index + j) + ')').droppable("enable");
            }
        }
    }
    for (var i = -2; i < 3; i += 4) {
        for (var j = -1; j < 2; j += 2) {
            if ((row_index + j) < 1 | (row_index + j) > 8 | (col_index + i) < 1 | (col_index + i) > 8) {
                console.log(i + " " + j);
                continue;
            } else {
                $('#board tr:eq(' + (row_index + j) + ') td:eq(' + (col_index + i) + ')').css('background-color', 'green');
                $('#board tr:eq(' + (row_index + j) + ') td:eq(' + (col_index + i) + ')').droppable("enable");
            }
        }
    }
}

function queen(iconId) {
    var row_index = $("#" + iconId).parent().index();
    var col_index = $("#" + iconId).index();
    console.log(row_index);
    console.log(col_index);
    bishopMove(row_index, col_index);
    rookMove(row_index, col_index);
}