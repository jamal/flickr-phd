var Flickr = {};

Flickr.consumer_key = '4d0a27ce756eccd5210b86dcbbe5f986';
Flickr.consumer_secret = '4f9c3df2d48ed88d';

Flickr.request = function(proxy, params, callback) {
    if (Flickr.consumer_key == null) {
        console.log('Consumer key is not set');
        return;
    }

    if (proxy) {
        var url = 'http://phd.jamalfanaian.com/index.php';
        var m = jQuery.get;
    } else {
        var url = 'http://api.flickr.com/services/rest/';
        var m = jQuery.getJSON;
    }

    url += '?format=json&nojsoncallback=1';
    url += '&oauth_consumer_key=' + Flickr.consumer_key;
    url += '&' + params;

    m(url, function(data) {
        callback(data);
    });
}

$(document).ready(function() {
    // Lazy
    $('#output').height($(document).height()-210);
    $('#prompt').width($('#output').width());

    $('#cmd').on('submit', function() {
        var cmd = $('#prompt').val();
        $('#prompt').val('');
        $('#output').append('<div class="prompt">' + cmd + '</div>');
        $('#output').append('<img src="loading.gif" class="loading" />');

        var top = $('#output').find('.prompt').last().offset().top - $('#output').offset().top + $('#output').scrollTop();
        $('#output').scrollTop(top + 50);

        Flickr.request(true, cmd, function(data) {
            $('#output').find('.loading').remove();
            $('#output').append('<div class="result">' + data + '</div>');
            $('#output').scrollTop(top);
        });

        Flickr.request(false, cmd, function(data) {
            if (typeof data.photos != 'undefined') {
                var c = 0;
                for (var i in data.photos.photo) {
                    var photo = data.photos.photo[i];

                    var img_url = 'http://farm' + photo['farm'] + '.staticflickr.com/' + photo['server'];
                    img_url += '/' + photo['id'] + '_' + photo['secret'] + '_s.jpg';

                    var photo_url = 'http://www.flickr.com/photos/' + photo['owner'] + '/' + photo['id'];

                    var html = '<a href="' + photo_url + '"><img src="' + img_url + '" /></a>';
                    $('#output-display').append(html);

                    if (++c >= 21) {
                        break;
                    }
                }
            }
        });

        return false;
    });
});

