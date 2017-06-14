var urlpre = "https://crossorigin.me/http://api.shanbay.com/bdc/search/?word=";

var isAjax = false;

$('#submit').on('click', function() {

    // 显示loading
    $.mobile.loading('show');

    // 清空缓存 
    $('#wordOutput').html('');
    $('#wordSent').html('');

    $("#playUS").css("display", "none");
    $("#playUK").css("display", "none");

    // 获取中英文释义
    $.get(urlpre + $('#wordInput').val(), function(data) {
        if (data.status_code === 1) {
            $('#wordOutput').html('<h1>查无此词~</h1>');
            $('#wordSent').html('');
            $("#playUS").css("display", "none");
            $("#playUK").css("display", "none");

            $.mobile.loading('hide');

        } else {
            var str = "<li>&nbsp</li>" +
                "<li><h3>释义</h3>" + data.data.cn_definition.defn + "</li>" +
                "<li>&nbsp</li>";
            // 释义
            $('#wordOutput').html(str);
            // 音标
            $('#pronUK').html('英：[' + data.data.pronunciations.uk + ']');
            $('#pronUS').html('美：[' + data.data.pronunciations.us + ']');

            $("#playUS").css("display", "inline-block");
            $("#playUK").css("display", "inline-block");

            // 例句
            getSent(data.data.id);
            // 音频资源设置
            $('#wordAudioUS').attr("src", data.data.us_audio);
            $('#wordAudioUK').attr("src", data.data.uk_audio);

            // 显示loading
            $.mobile.loading('hide');
        }
    });
});

$("#wordInput").keydown(function(event) {
    if (event.keyCode == 13) {

        // 显示loading
        $.mobile.loading('show');

        // 清空缓存 
        $('#wordOutput').html('');
        $('#wordSent').html('');

        $("#playUS").css("display", "none");
        $("#playUK").css("display", "none");

        // 获取中英文释义
        $.get(urlpre + $('#wordInput').val(), function(data) {
            if (data.status_code === 1) {
                $('#wordOutput').html('<h1>查无此词~</h1>');
                $('#wordSent').html('');
                $("#playUS").css("display", "none");
                $("#playUK").css("display", "none");
                $.mobile.loading('hide');

            } else {
                var str = "<li>&nbsp</li>" +
                    "<li><h3>释义</h3>" + data.data.cn_definition.defn + "</li>" +
                    "<li>&nbsp</li>";
                // 释义
                $('#wordOutput').html(str);
                // 音标
                $('#pronUK').html('英：[' + data.data.pronunciations.uk + ']');
                $('#pronUS').html('美：[' + data.data.pronunciations.us + ']');

                $("#playUS").css("display", "inline-block");
                $("#playUK").css("display", "inline-block");

                // 例句
                getSent(data.data.id);
                // 音频资源设置
                $('#wordAudioUS').attr("src", data.data.us_audio);
                $('#wordAudioUK').attr("src", data.data.uk_audio);

                // 显示loading
                $.mobile.loading('hide');
            }
        });
    }
});

function getSent(id) {

    var urlpre2 = "https://crossorigin.me/http://api.shanbay.com/bdc/example/?vocabulary_id=";
    // 获取例句 
    $.ajax({
        type: "get",
        url: urlpre2 + id + "&type=sys",
        datatype: "json",
        async: false, //注意！！这个为必要的参数，不然这个会在上面的Ajax请求后才执行
        success: function(data1) {
            if (data1.data.length == 0) {
                $('#wordSent').html('<h3>暂无例句</h3>');
            } else {
                var str2 = "<li><h3>例句1:</h3>" + data1.data[0].first + data1.data[0].mid + data1.data[0].last + "</li>" + "<li>" + data1.data[0].translation + "</li>" +
                    "<li><h3>例句2:</h3>" + data1.data[1].first + data1.data[1].mid + data1.data[1].last + "</li>" + "<li>" + data1.data[1].translation + "</li>" +
                    "<li><h3>例句3:</h3>" + data1.data[2].first + data1.data[2].mid + data1.data[2].last + "</li>" + "<li>" + data1.data[2].translation + "</li>";
                $('#wordSent').html(str2);
            }
        }
    });
}


// 播放音频
$('#playUK').on('click', function() {
    document.getElementById('wordAudioUK').play();
});
$('#playUS').on('click', function() {
    document.getElementById('wordAudioUS').play();
});
