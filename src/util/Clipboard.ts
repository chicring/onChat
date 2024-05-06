import useClipboard from 'vue-clipboard3'

const { toClipboard } = useClipboard()


function copyText(text: string) {
    return toClipboard(text)
}



export default copyText;