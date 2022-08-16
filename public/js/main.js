// Download QR Code
jQuery(window).on('load', function () {
    jQuery('.ht_qr_code').each(function () {
        jQuery(this).find('canvas').hide();
    });
});

jQuery(document).ready(function ($) {
    'use strict';

    $('body').on('click', '.qrcode-download', function (e) {
        function dataURItoBlob(dataURI) {
            for (var byteString = atob(dataURI.split(',')[1]), mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0], ab = new ArrayBuffer(byteString.length), ia = new Uint8Array(ab), i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
            var blob;
            return new Blob([ab], {
                type: mimeString
            })
        }
        var dataTarget = $(this).data('target'),
            dataUri = $(dataTarget).children('img').last().attr('src');
        if (navigator.msSaveBlob) {
            var blob = dataURItoBlob(dataUri);
            return navigator.msSaveBlob(blob, dataUri + "-qrcode.png")
        } else {
            $(this).attr('href', dataUri), $(this).attr('download', 'QR_Code.png');
        }
    });
});

// Print QR Code
printDivCSS = new String();
function printDiv(divId) {
    window.frames['qrcode_print_frame'].document.body.innerHTML = printDivCSS + document.getElementById(divId).innerHTML;
    window.frames['qrcode_print_frame'].window.focus();
    window.frames['qrcode_print_frame'].window.print();
}
