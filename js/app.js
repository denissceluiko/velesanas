$(document).ready(function() {
    var partyList = $("#party-list");

    $("#party-count").change(function(e) {
        var newCount = $(this).val();
        var oldCount = $(this).attr('data-count');

        if (newCount > oldCount) {
            addParties(newCount - oldCount);
        } else {
            removeParties(oldCount - newCount);
        }

        $(this).attr("data-count", $(this).val()).val();
    });

    $("#count-distribution").click(function() {
        displaySeats(countDistribution());
    });

    function countDistribution() {
        var distribution = [];

        var partyCount = $("#party-count").val();

        for (var i=1; i<=partyCount; i++) {
            var candidates = $("#party-" + i + "-candidates").val();
            var votes = $("#party-" + i + "-votes").val();

            var n = 1;
            for (j=0; j<candidates; j++) {
                var position = {
                    'no': i,
                    'div': votes / n
                };

                distribution.push(position);
                n += 2;
            }
        }

        return distribution.sort(function(a, b) {
            return -(a.div - b.div);
        })
    }

    function displaySeats(distribution)
    {
        $("#distribution-table tbody").empty();
        for (i in distribution) {
            $("#distribution-table tbody")
                .append($("<tr>")
                    .append($("<td>").text(parseInt(i)+1))
                    .append($("<td>").text(distribution[i].no + '. saraksts'))
                    .append($("<td>").text(distribution[i].div))
                )
        }
    }

    function addParties(amount) {
        var count = $("#party-count").val();
        var serialNo = count - amount + 1;

        for (var i=serialNo; i <= count; i++) {
            partyList
                .append($("<div>").addClass('col-4')
                    .append($("<div>").addClass("card").attr("id", "party-"+i)
                        .append($("<div>").addClass("card-header").text(i + ". saraksts"))
                        .append($("<div>").addClass("card-body")
                            .append($("<div>").addClass("form-group row")
                                .append($("<label>").addClass("col-9").attr({'for': 'party-' + i + '-candidates'}).text('Kandidātu skaits'))
                                .append($("<input>").attr({'type': 'number', 'id': 'party-' + i + '-candidates'}).addClass("form-control col-3"))
                            )
                            .append($("<div>").addClass("form-group row")
                                .append($("<label>").addClass("col-9").attr({'for': 'party-' + i + '-votes'}).text('Balsis par sarakstu'))
                                .append($("<input>").attr({'type': 'number', 'id': 'party-' + i + '-votes'}).addClass("form-control col-3"))
                            )
                        )
                    )
                )
        }
    }

    function removeParties(amount) {
        var count = $("#party-count").val();

        for (var i=0; i<amount; i++) {
            partyList.children().last().remove();
        }
    }

});


