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