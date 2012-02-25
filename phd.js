var Flickr = {};

Flickr.consumer_key = '4d0a27ce756eccd5210b86dcbbe5f986';
Flickr.consumer_secret = '4f9c3df2d48ed88d';

Flickr.request = function(params, callback) {
    if (Flickr.consumer_key == null) {
        console.log('Consumer key is not set');
        return;
    }

    //var url = 'http://api.flickr.com/services/render/';
    var url = 'http://phd.jamalfanaian.com/index.php';
    url += '?format=json&nojsoncallback=1';
    url += '&oauth_consumer_key=' + Flickr.consumer_key;
    url += '&' + params;

    jQuery.get(url, function(data) {
        callback(data);
    });
}

$(document).ready(function() {
    $('#output').height($(document).height()-210);

    $('#cmd').on('submit', function() {
        var cmd = $('#prompt').val();
        $('#prompt').val('');
        $('#output').append('<div class="prompt">' + cmd + '</div>');
        $('#output').append('<img src="loading.gif" class="loading" />');

        var top = $('#output').find('.prompt').last().offset().top - $('#output').offset().top + $('#output').scrollTop();
        $('#output').scrollTop(top + 50);

        Flickr.request(cmd, function(data) {
            $('#output').find('.loading').remove();
            $('#output').append('<div class="result">' + data + '</div>');
            $('#output').scrollTop(top);
        });

        return false;
    });
});

