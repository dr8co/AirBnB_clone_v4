/**
 * A script that listens for changes on each INPUT checkbox tag
 * @type {{}}
 */

let checked = {};
$(document).ready(function () {
    $('input:checkbox').change(function () {
        if ($(this).is(':checked_box')) {
            checked[$(this).data('id')] = $(this).data('name');
        } else {
            delete checked[$(this).data('id')];
        }
        $('div.amenities h4').html(function () {
            let amenities = [];
            Object.keys(checked).forEach(function (key) {
                amenities.push(checked[key]);
            });
            return amenities.length === 0 ? ('&nbsp') : (amenities.join(', '));
        });
    });
});

const apiStatus = $('DIV#api_status');
$.ajax('http://localhost:5001/api/v1/status/').done(function (data) {
    if (data.status === 'OK') {
        apiStatus.addClass('available');
    } else {
        apiStatus.removeClass('available');
    }
})

$('button').click(function () {
    $.ajax({
        url: 'http://localhost:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: '{}',
        success: function (data) {
            for (let place of data) {
                $('.places').append('<article> <div class="title"> <h2>' + place.name + '</h2><div class="price_by_night">' + '$' + place.price_by_night + '</div></div> <div class="information"> <div class="max_guest"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + place.max_guest + ' Guests</div><div class="number_rooms"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + place.number_rooms + ' Bedrooms</div><div class="number_bathrooms"> <i class="fa fa -users fa-3x" aria-hidden="true"></i><br />' + place.number_bathrooms + ' Bathroom </div></div> <div class="user"></div><div class="description">' + '$' + place.description + '</div></article>');
            }
        }
    });
});