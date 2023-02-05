jQuery(".wp-block-image").each(function() {

    var imageurl = jQuery(this).find("img").attr("src");
    var download_html =`<div class="download-link">
                            <a href="javascript:void(0);" id="download_nopurchased" class="click_download icon-download" data-href="${imageurl}"  download="${imageurl}" data-url="${imageurl}"><i class="fas fa-arrow-alt-circle-down"></i> Download Now </a>
                        </div>`;
    jQuery(this).append(download_html);
});


jQuery(".click_download").click(function() {
    var file = jQuery(this).data("url");
    var file_name = getFileName(file);
    forceDownload(file,file_name);
});

function getFileName(str) {
    return str.substring(str.lastIndexOf('/') + 1)
}
function forceDownload(url, fileName){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function(){
        var urlCreator = window.URL || window.webkitURL;
        var imageUrl = urlCreator.createObjectURL(this.response);
        var tag = document.createElement('a');
        tag.href = imageUrl;
        tag.download = fileName;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
    }
    xhr.send();
}
