// See https://github.com/KillerCodeMonkey/ng-quill for config options

export const ngQuillConfigConstant = {
    modules: {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['clean'],
            ['link']
        ]
    },
    theme: 'snow',
    placeholder: '',
    readOnly: false,
    bounds: document.body
}

export const ngQuillConfig = [
    'ngQuillConfigProvider',
    'NG_QUILL_CONFIG',
    (ngQuillConfigProvider, NG_QUILL_CONFIG) => ngQuillConfigProvider.set(NG_QUILL_CONFIG)
];