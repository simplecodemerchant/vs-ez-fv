export default {
    run: (text: string) => {
        return `<html
  label=""
  where="survey">
${text}
</html>`
    },
    type: 'html'
}