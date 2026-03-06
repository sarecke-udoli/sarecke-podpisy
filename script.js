const fields = {
fullName: document.getElementById("fullName"),
position: document.getElementById("position"),
email: document.getElementById("email"),
phone: document.getElementById("phone")
};

const preview = document.getElementById("signaturePreview");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");

const defaults = {
fullName: "Jan Novák",
position: "Člen spolku",
email: "jan.novak@email.cz",
phone: "+420 123 456 789"
};

const ORG = {
name: "Spolek Šárecké údolí",
address: "V Šáreckém údolí 76/32, Dejvice, 160 00 Praha",
website: "www.sarecke-udoli.cz",
ico: "IČO: 22886052",
logo: "https://www.sarecke-udoli.cz/wp-content/uploads/2021/02/cropped-cropped-cropped-sarecke-udoli_logo-1.png-1.png",
facebook: "https://facebook.com/sareckeudoli",
instagram: "https://instagram.com/sareckeudoli"
};

function getValue(key){
return fields[key].value.trim() || defaults[key];
}

function generateSignatureHtml(){

const fullName = getValue("fullName");
const position = getValue("position");
const email = getValue("email");
const phone = getValue("phone");

return `

<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial; color:#1f2937; width:520px;">

<tr>
<td colspan="5" style="padding-bottom:4px;">
<span style="font-size:22px; font-weight:bold;">${fullName}</span>
</td>
</tr>

<tr>
<td colspan="5" style="color:#475569; padding-bottom:14px;">
<span style="font-size:14px;">${position}</span>
</td>
</tr>

<tr>

<td width="100" style="width:110px; vertical-align:top;">
<a href="https://${ORG.website}" style="text-decoration:none;">
<img src="${ORG.logo}" width="100" style="width:100px; display:block; border:0;" alt="Spolek Šárecké údolí">
</a>
</td>

<td width="6" style="width:6px; font-size:0; line-height:0;">&nbsp;</td>

<td width="2" style="width:2px; background:#e2e8f0; font-size:0; line-height:0;">&nbsp;</td>

<td width="10" style="width:10px; font-size:0; line-height:0;">&nbsp;</td>

<td style="vertical-align:top;">

<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
<tr>
<td height="18" style="height:18px; line-height:18px; font-size:0;">&nbsp;</td>
</tr>
</table>

<div style="font-size:14px; line-height:1.8;">
<strong>E-mail:</strong>
<a href="mailto:${email}" style="text-decoration:none;">
<span style="color:#A2C46A;">${email}</span>
</a>
</div>

<div style="font-size:14px; line-height:1.8;">
<strong>Telefon:</strong>
<a href="tel:${phone}" style="color:#A2C46A; text-decoration:none;">
${phone}
</a>
</div>

<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
  <tr>
    <td height="18" style="height:18px; line-height:18px; font-size:0;">&nbsp;</td>
  </tr>
</table>

<table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
  <tr>
    <td valign="middle">
      <a href="${ORG.facebook}" style="text-decoration:none;">
        <img src="https://www.sarecke-udoli.cz/wp-content/uploads/2026/03/output-onlinepngtools-1.png"
        width="24"
        style="width:24px; display:block; border:0;"
        alt="Facebook">
      </a>
    </td>

    <td width="8" style="width:8px; font-size:0; line-height:0;">&nbsp;</td>

    <td valign="middle">
      <a href="${ORG.instagram}" style="text-decoration:none;">
        <img src="https://www.sarecke-udoli.cz/wp-content/uploads/2026/03/output-onlinepngtools.png"
        width="24"
        style="width:24px; display:block; border:0;"
        alt="Instagram">
      </a>
    </td>
  </tr>
</table>

</td>

</tr>

<tr>
<td colspan="5" style="padding-top:14px; font-size:13px; line-height:1.6;">

<div style="font-weight:bold;">${ORG.name}</div>

<div>
<a href="https://${ORG.website}" style="color:#A2C46A; text-decoration:none;">
${ORG.website}
</a>
</div>

<div>${ORG.address}</div>

<div>${ORG.ico}</div>

</td>
</tr>

</table>

`;
}

function renderPreview(){
preview.innerHTML = generateSignatureHtml();
}

Object.values(fields).forEach(input=>{
input.addEventListener("input", renderPreview);
});

copyBtn.addEventListener("click", async ()=>{

const html = generateSignatureHtml();

const blob = new Blob([html], {type:"text/html"});
const data = [new ClipboardItem({"text/html":blob})];

await navigator.clipboard.write(data);

alert("Podpis zkopírován");

});

downloadBtn.addEventListener("click", ()=>{

const html = generateSignatureHtml();

const blob = new Blob([html], {type:"text/html"});
const url = URL.createObjectURL(blob);

const a = document.createElement("a");
a.href = url;
a.download = "podpis.html";
a.click();

});

renderPreview();