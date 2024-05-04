import useClipboard from 'vue-clipboard3'

const { toClipboard } = useClipboard()
async function copyText(text: string) {
    await toClipboard(text)
}