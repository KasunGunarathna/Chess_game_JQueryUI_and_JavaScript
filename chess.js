// JavaScript Document
var currentMove = 'white';
$(document).ready(function() {

    $('.icon').draggable({
        revert: 'invalid',

    });
    $('.bl').draggable("disable");

    $('.space').droppable({
        hoverClass: 'icon-hover',
        drop: function(event, ui) {

            var dropped = ui.draggable;
            var droppedOn = $(this);


            // $(droppedOn).droppable("disable");

            // $(dropped).parent().droppable("enable");

            $(dropped).draggable({ revert: true });
            if ($(droppedOn).is(":empty")) {
                $(droppedOn).children().detach();
                $(dropped).detach().css({ top: 0, left: 0, right: 0, bottom: 0 }).appendTo(droppedOn);
                switchTurn();

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
                    } else if (classesHold[2] == 'wt') {
                        $(droppedOn).children().detach().appendTo('.bspace');
                        $(dropped).detach().css({ top: 0, left: 0, right: 0, bottom: 0 }).appendTo(droppedOn);
                        switchTurn();
                    } else {
                        $(droppedOn).children().detach();
                        $(dropped).detach().css({ top: 0, left: 0, right: 0, bottom: 0 }).appendTo(droppedOn);
                        switchTurn();
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
        var c = document.getElementById("chesscanvas");
        var ctx = c.getContext("2d");
        ctx.rotate(Math.PI);

    } else {
        currentMove = "white";
        $('.bl').draggable("disable");
        $('.wt').draggable("enable");
        $('.space').droppable({
            accept: '.wt'
        });
        var c = document.getElementById("chesscanvas");
        var ctx = c.getContext("2d");
        ctx.rotate(Math.PI);
    }
}