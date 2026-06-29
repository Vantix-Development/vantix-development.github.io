const githubDownload =
'https://github.com/Vantix-Development/VRRadio/releases/latest';

const radioWebsite =
'https://radio.vantixurbex.shop';

document
.getElementById('downloadBtn')
.addEventListener('click', () => {

    window.open(
        githubDownload,
        '_blank'
    );

});

document
.getElementById('radioBtn')
.addEventListener('click', () => {

    window.open(
        radioWebsite,
        '_blank'
    );

});
