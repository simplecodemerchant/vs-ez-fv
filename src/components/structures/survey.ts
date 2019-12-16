export default {
    run: (text: string) => {
        return `<survey name="Survey"
  alt=""
  autosave="0"
  extraVariables="source,list,url,record,userAgent,decLang"
  delphi="1"
  compat="143"
  builderCompatible="1"
  secure="0"
  setup="time,term,quota,decLang"
  ss:disableBackButton="1"
  mobile="compat"
  mobileDevices="smartphone,tablet,featurephone,desktop"
  state="testing">

  <samplesources default="0">
    <samplesource list="0" title="default">
      <exit cond="qualified"><b>Thanks again for completing the survey!<br/><br/>Your feedback and quick response to this survey are greatly appreciated.</b></exit>
      <exit cond="terminated"><b>Thank you for your input!</b></exit>
      <exit cond="overquota"><b>Thank you for your input!</b></exit>
    </samplesource>
  </samplesources>

${text}

</survey>`
    }
}