(function () {
    var qrcode_download_btns = document.querySelectorAll('.easy-qrcode-btn-download');
    var qrcode_download_btns_length = qrcode_download_btns.length;
    for (var i = 0; i < qrcode_download_btns_length; i++) {
        qrcode_download_btns[i].addEventListener('click', function (e) {
            e.preventDefault();
            var img_id = this.getAttribute('data-target');
            var img_el = document.getElementById(img_id);
            if (img_el && img_el.src) {
                var link = document.createElement('a');
                link.href = img_el.src;
                link.download = 'easy-qrcode-download-' + Date.now() + '.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                console.log('Error with download btn');
            }
        });
    }
})();

function print_easy_qrcode(divId) {
    printDivCSS = new String();
    window.frames['easy-qrcode-print-frame'].document.body.innerHTML = document.getElementById(divId).innerHTML;
    window.frames['easy-qrcode-print-frame'].window.focus();
    window.frames['easy-qrcode-print-frame'].window.print();
}
