//registering the plugins
FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode
)

//changing the aspect ratio of the preview
//resizig the image to be 150x100
FilePond.setOptions({
    stylePanelAspectRatio: 150 / 100,
    imageResizeTargetWidth: 100,
    imageResizeTargetHeight: 150
})

//transforming the files into filepond objects
FilePond.parse(document.body);