//getting the required styles property from the root CSS
const rootStyles = window.getComputedStyle(document.documentElement)

//checking if main css is loaded
if(rootStyles.getPropertyValue('--book-cover-width-large') != null && rootStyles.getPropertyValue('--book-cover-width-large') !== ''){
    ready()
}else{
    document.getElementById('main-css')
    .addEventListener('load', ready)
}

function ready(){
    const coverWidth = parseFloat(rootStyles.getPropertyValue('--book-cover-width-large'))
    const coverAspectRatio = parseFloat(rootStyles.getPropertyValue('--book-cover-aspect-ratio'))
    const coverHeight = coverWidth / coverAspectRatio
    //registering the plugins
    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode
    )

    //changing the aspect ratio of the preview
    //resizig the image to be 150x100
    FilePond.setOptions({
        stylePanelAspectRatio: 1 / coverAspectRatio,
        imageResizeTargetWidth: coverWidth,
        imageResizeTargetHeight: coverHeight
    })

    //transforming the files into filepond objects
    FilePond.parse(document.body);
}

