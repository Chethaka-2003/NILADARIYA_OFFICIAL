import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, SafeAreaView, Switch, Button } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  // Form state
  const [formData, setFormData] = useState({
    applicantName: "",
    applicantAddress: "",
    kandianorNormal: "",
    male: "",
    female: "",
    copies: "1",
    registar: "",
    registarplace: "",
    registrarDivision: "",
    place: "",
    registrationNo: "",
    clergyname: "", 
    clergyplace: "",
    marriagedistrict: "",
    exactdate: "",   
    searchFrom: "",
    searchFrom: "",
    searchTo: "",
    feeType: "120",
    applicationDate: "",
    applicationDate: "",
    signature: ""
  });

  // Update form data
  const updateFormData = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  // Calculate fee
  const calculateFee = () => {
    const fee = parseInt(formData.feeType) * parseInt(formData.copies || 1);
    return 'Rs. ${fee}/-';
  };

  // Generate HTML with form data
  const generateHtml = () => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application for Birth Certificate and/or Search of Registers</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { display: flex; align-items: center; margin-bottom: 20px; }
        .logo { width: 80px; height: 80px; background-color: #f0f0f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 20px; }
        .title { flex: 1; text-align: center; }
        .form-instruction { font-style: italic; margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        th, td { border: 1px solid #333; padding: 8px; vertical-align: top; }
        .office-use { float: right; border: 1px solid #333; padding: 10px; width: 200px; text-align: center; margin-left: 10px; }
        .multilingual { font-size: 0.8em; color: #666; }
        .fees { font-size: 0.9em; }
        input[type="text"], input[type="date"], input[type="number"], select { width: 95%; padding: 8px; margin: 5px 0; border: 1px solid #ddd; border-radius: 4px; }
        .input-field { min-height: 40px; }
        .date-input { display: flex; justify-content: space-between; gap: 10px; margin-top: 10px; }
        .submit-btn { background-color: #4CAF50; color: white; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; margin-top: 20px; }
        .submit-btn:hover { background-color: #45a049; }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="logo">
          <img src="/api/placeholder/80/80" alt="Government Emblem" />
        </div>
        <div class="title">
          <h3>විවා හ (සා මා න්‍ය හෝ   උඩරට)  සහතිකයක් ගැ නීමේ සහ නො හො ත් ලේකම් පො ත්  සො යා බැ ලීමේ ඉල්ලුම් පත්‍රය. </h3>
          <p class="multilingual">பிறப்பு சான்றிதழுக்கும் அல்லது பதிவேடுகளைத் தேடுவதற்குமான விண்ணப்பம்</p>
          <p class="multilingual">APPLICATION FOR CERTIFICATE OF MARRIAGE (GENERAL OR KANADYAN) AND/ OR SEARCH FOR REGISTERS</p>
        </div>
        <div class="title">
          <h3>විවා හ (සා මා න්‍ය හෝ   උඩරට)  සහතිකයක් ගැ නීමේ සහ නො හො ත් ලේකම් පො ත්  සො යා බැ ලීමේ ඉල්ලුම් පත්‍රය. </h3>
          <p class="multilingual">பிறப்பு சான்றிதழுக்கும் அல்லது பதிவேடுகளைத் தேடுவதற்குமான விண்ணப்பம்</p>
          <p class="multilingual">APPLICATION FOR CERTIFICATE OF MARRIAGE (GENERAL OR KANADYAN) AND/ OR SEARCH FOR REGISTERS</p>
        </div>
        <div class="office-use">
          <p>කාර්යාලයේ ප්‍රයෝජනය සඳහා පමණි</p>
          <p class="multilingual">அலுவலக உபயோகத்திற்கு மட்டும்</p>
          <p class="multilingual">FOR OFFICE USE ONLY</p>
          <hr>
          <p>ඉල්ලුම් පත්‍ර අංකය හා   දිනය</p>
          <p>Application No. and Date</p>
          <p>................................</p>
        </div>
      </div>
      <div class="form-instruction">
        <p>(විවා හය සිදුවූ ප්‍රා දේශීය ලේකම් කො ට්ඨා සයේ දිස්ත්‍රික් රො ජිස්ට්‍රා ර් වෙත යැ විය යුතුයි) </p>
        <p class="multilingual">பிறப்பு நிகழ்ந்த இடத்தில் உள்ள பிரதேச செயலகத்தின் மாவட்டப் பதிவாளரின் அலுவலகத்திற்கு அனுப்ப வேண்டும்.</p>
        <p class="multilingual">(To be sent to the office of the District Registrar of the divisional secretary's division in which the marriage took place)</p>
      </div>
      <form id="marriagecertificateForm">
        <table>
          <tr>
            <td width="40%">
              1. <p class="multilingual">ඉල්ලුම්කරුගේ නම සහ ලිපිනය</p>
              <p class="multilingual">விண்ணப்பதாரரின் பெயரும் முகவரியும்</p>
              <p class="multilingual">Name of Applicant and Address</p>
            </td>
            <td colspan="2" class="input-field">
              <input type="text" value="${formData.applicantName}" disabled>
              <textarea disabled>${formData.applicantAddress}</textarea>
            </td>
          </tr>
          <tr>
            <td>
              2. <p class="multilingual">2.	ඉල්ලුම් පාත්‍රය සා මා න්‍ය විවා හයක් නැ තහො ත් උඩරට විවා හයක් ගැ න ද යන වග</p>  
              <p class="multilingual">யாருடைய பிறப்புக்கான விண்ணப்பம் செய்யப்படுகிறது அவரது பெயர்</p>
              <p class="multilingual">Whether the application refers to a general or Kandyan marriage</p>
              <input type="text" id="fullName" name="fullName" value="${formData.kandianorNormal}" disabled>
            </td>
            <td>
              <p class="multilingual">පුරුෂ පක්ෂයේ සම්පුර්ණ නම</p>
              <p class="multilingual">பால்</p>
              <p class="multilingual">Full name of male party</p>
              <select id="sex" name="sex" disabled>
                <option value="${formData.sex}">${formData.male}</option>
              </select>
            </td>
            <td>
              <p class="multilingual">ස්ත්‍රී පක්ෂයේ සම්පුර්ණ  නම</p>
              <p class="multilingual">பால்</p>
              <p class="multilingual">Full name  of female party</p>
              <select id="sex" name="sex" disabled>
                <option value="${formData.sex}">${formData.female}</option>
              </select>
            </td>
            <td>
              <p class="multilingual">අවශ්‍ය පිටපත් ගණන</p>
              <p class="multilingual">தேவைப்படும் பிரதிகளின் எண்ணிக்கை</p>
              <p class="multilingual">No. of Copies required</p>
              <input type="number" id="copies" name="copies" value="${formData.copies}" disabled>
            </td>
            <td colspan="2"></td>
          </tr>
          <td>
              <p class="multilingual">විවා හය සිදු කරන ලද්දේ රෙජිස්ට්‍රා ර් කෙනෙකු විසින් නම්</p>
              <p class="multilingual">தேவைப்படும் பிரதிகளின் எண்ணிக்கை</p>
              <p class="multilingual">Is marriage was solemnized by a registrar</p>
              <input type="number" id="copies" name="copies" value="${formData.copies}" disabled>
            </td>
            <td colspan="2"></td>
          <tr>
            <td>
              3. <p class="multilingual">ඔහුගේ නම </p>
              <p class="multilingual">பிறந்த திகதி</p>
              <p class="multilingual">His name</p>
              <input type="text" id="birthDate" name="birthDate" value="${formData.registar}" disabled>
            </td>
            <td colspan="2">
              <p class="multilingual">ඔහුගේ ප්‍රදා න කා ර්යා ලය පිහිටි ස්ථා නය</p>
              <p class="multilingual">பிறந்த இடம் (வைத்தியசாலை, வீட்டு இலக்கம், தெரு, நகர், கிராமம் அல்லது தோட்டப்பெயர்)</p>
              <p class="multilingual">Situstion of his principal office</p>
              <textarea id="birthPlace" name="birthPlace" disabled>${formData.registarplace}</textarea>
            </td>
          </tr>
          <td colspan="2">
              <p class="multilingual">ලියපන්දින්චි කිරීමේ කො ට්ටා ශය </p>
              <p class="multilingual">பிறந்த இடம் (வைத்தியசாலை, வீட்டு இலக்கம், தெரு, நகர், கிராமம் அல்லது தோட்டப்பெயர்)</p>
              <p class="multilingual">Registration division</p>
              <textarea id="birthPlace" name="birthPlace" disabled>${formData.registrarDivision}</textarea>
            </td>
            <td colspan="2">
              <p class="multilingual">විවා හය සිදු කරන ලද ස්ථා නය</p>
              <p class="multilingual">பிறந்த இடம் (வைத்தியசாலை, வீட்டு இலக்கம், தெரு, நகர், கிராமம் அல்லது தோட்டப்பெயர்)</p>
              <p class="multilingual">Place where solemnized</p>
              <textarea id="birthPlace" name="birthPlace" disabled>${formData.place}</textarea>
            </td>
          <tr>
            <td>
              7. <p class="multilingual">දේවගැති කෙනෙකු විසින් විවා හය සිදුකරන ලද්දේ නම් දේවස්ථා නයේ නම සහ පිහිටි ස්ථා නය</p>
              <p class="multilingual">பதிவாளர் பிரிவு</p>
              <p class="multilingual">If marriage was solemnized by a clergyman name and situation of church</p>
              <input type="text" value="${formData.clergyname}" disabled>
              <textarea disabled>${formData.clergyplace}</textarea>
            </td>
            <td colspan="2">
              <p class="multilingual">විවා හය සිදු කරන ලද ස්ථා නය පිහිටි අදා යම් දිස්ත්‍රික්කය</p>
              <p class="multilingual">இறைவரி மாவட்டம்/p>
              <p class="multilingual">District in which marriage was solemnized</p>
              <input type="text" id="revenueDistrict" name="revenueDistrict" value="${formData.marriagedistrict}" disabled>
            </td>
          </tr>
          <tr>
            <td>
              5. <p class="multilingual">. විවා හය වූ දිනය (නියම දිනය දන්නේ නම්)</p>
              <p class="multilingual">பதிவு இலக்கமும் திகதியும் (தெரிந்திருப்பின்)</p> 
              <p class="multilingual">Date of marriage( if exact date is known)</p>
              <div style="display: flex; gap: 10px;">
                <input type="text" id="registrationDate" name="registrationDate" value="${formData.exactdate}" disabled style="width: 45%;">
              </div>
            </td>
            <td colspan="2">
              <p class="multilingual">විවා හය වු දිනය නො දන්නේ නම් ලේඛන සෙවිය යුතු කා ලසීමා ව (සො යා බැ ලීමේ උපරිම කා ලසීමා ව වර්ෂ දෙකකට සීමා වෙයි) , </p>
              <p class="multilingual">தேடல் தேவைப்படும் காலம் ஏதேனும் (அதிகபட்ச தேடல் காலம் 2 வருடங்களுக்கு மட்டup்படுத்தப்பட்டுள்ளது.)</p>
              <p class="multilingual">If exact date of marriage is not known period of search desired (the maximum period of search is limited to two years)</p>
              <div style="display: flex; gap: 10px;"> 
                <div style="width: 45%;">
                  <label for="searchFrom">From:</label>
                  <input type="text" id="searchFrom" name="searchFrom" value="${formData.searchFrom}" disabled>
                </div>
                <div style="width: 45%;">
                  <label for="searchTo">To:</label>
                  <input type="text" id="searchTo" name="searchTo" value="${formData.searchTo}" disabled>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              8. <p class="multilingual">ගා􁂪􀿝ව වශෙය􁀒 ෙගවා 􀿛ෙබන 􁁫දල</p> 
              <p class="multilingual">கட்டணங்களுக்காக கொடுப்பனவாக செலுத்தப்பட்ட பணத்தொகை</p>
              <p class="multilingual">Amount of money paid for charges</p>
              <input type="text" id="amountPaid" name="amountPaid" value="${calculateFee()}" disabled>
            </td>  
            <td>
              <p class="multilingual">ලියාපදිංචි කිරීමේ දිනය හෝ අංකය දී ඇති විට ගාස්තුව එක පිටපතකට රු. 120/-</p>
              <p class="multilingual">பதிவு திகதி அல்லது பதிவுப் பதிவின் இல. தரப்பட்டிருந்தால் ஒரு பிரதிக்கான கட்டணம் ரூபா 120/-</p>
              <p class="multilingual">Where the date of registration or the No. of the entry is given the fee for one copy of the certificate is Rs. 120/-<</p>
              <div>
                <input type="radio" id="fee120" name="feeType" value="120" ${formData.feeType === "120" ? "checked" : ""} disabled>
                <label for="fee120">Rs. 120/- per copy</label>
              </div>
            </td>
            <td>
              <p class="multilingual">􁂉යාප􀿺ං􀽩 කළ 􀿺නය ෙහ􀼞 අංකය 􀿻 නැ􀿛􁂐ට 􀿝􁀒 මසකට ෙනාවැ􀾷 කාලයක ෙ􁂈ඛන ෙස􁂑ම􀼦 අවශ􀼢 වන අව􁂪ථාවක එක 􁁄ටපතකට 􁂆 . 250/-</p>
              <p class="multilingual">பதிவுத் திகதி அல்லது பதிவின் இல. தரப்படாமல் 2 வருடங்களை விஞ்சாத காலப்பகுதிக்குரிய பதிவேடுகளைத் தேடவேண்டியிருந்தால் ஒரு பிரதிக்கான கட்டணம் ரூபா 250/-</p>
              <p class="multilingual">Where the date of registra􀆟on or the No. of the entry is not given and a search of registers not exceeding two years is involved fee for one copy of the cer􀆟ficate is Rs. 250/-</p>
              <div>
                <input type="radio" id="fee250" name="feeType" value="250" ${formData.feeType === "250" ? "checked" : ""} disabled>
                <label for="fee250">Rs. 250/- per copy</label>
              </div>
            </td>
          </tr>
        </table>
        
      </form>
      <div style="margin-top: 80px; font-size: 0.7em; color: #666; text-align: center;">
        <p>H.04/2024 - 500,000 (2022/01) © කොළඹ රජයේ මුද්‍රණ දෙපාර්තමේන්තුව</p>
      </div>
      <div style="max-width: 800px; margin: 0 auto; "> 
          <div style ="padding: 10px; border-bottom: 1px solid #ccc;font-size: 0.8em;">
           <p>*ෙමම ඉ􁂈􁂋􁁨ප􀿠ෙය􁂴 සඳහ􁀒 ෙ􁂈ඛනය ෙස􁂑මට ෙර􀽻􁂪􀾪ා􁂁 ජනරා􁂈 සහ එමෙදපා􁂁තෙ􁁨􁀒􀿝ෙ􁂏 ෙ􁂪වෙය􁂴 􁀓􁁾􀼦ත 􁀓ලධා􁂄􁀒ට ෙම􁁼􁀒 අවසරය සහ බලය ෙද􁁩. තවද එෙ􁂪 ෙ􁂈ඛන ෙස􁂑ෙ􁁨􀿻 ෙහ􀼞 මා ෙවත ෙතාර􀿝􁂆 සැප􁁽ෙ􁁨􀿻 ෙහ􀼞 ය􁁨 අ􀾹පා􀾹කම􀼦 ෙහ􀼞 ෙදාස􀼦 􁂫􀿼 􁂒වෙහා􀿚 ඉහත 􀼨 ෙර􀽻􁂪􀾪ා􁂁 ජනරා􁂈 ද එම ෙදපා􁂁තෙ􁁨􁀒􀿝ෙ􁂏 ෙ􁂪වෙ􁁻 􁀓􁁾􀼦ත 􁂫ය􁂿ම 􁀓ලධා􁂄􁀒 ද යෙථ􀼞􀼦ත අ􀾹පා􀾹ක􁁨 ෙහ􀼞 ෙද􀼞ෂය 􁁄􁂽බඳව වග􀼨ෙම􁀒 􁀓දහ􁂪 කරන බව ද වැ􀾷􀿼රට􀿚 􁁉කාශ කර􁁩 .<br>
              *நான் பதிவு செய்யும் பொது நிர்வாக அதிகாரியையும் மற்றும் பொது நிர்வாக அதிகாரியின் துறையின் அலுவலர்களையும் எனது சார்பில் தொடர்புடைய பதிவுகளைத் தேட அனுமதிக்கிறேன். மேலும், இந்த தேடல் அல்லது எனக்கு வழங்கப்படக்கூடிய அல்லது வழங்காமல் விடக்கூடிய எந்தத் தகவல் தொடர்பாகவும், மேற்கொள்ளப்படும் எந்த செயலினாலும், தவறினாலும் அல்லது விடுபட்டதினாலும் பொது நிர்வாக அதிகாரி மற்றும் அவரது துறையின் ஒவ்வொரு அலுவலரும் எந்த பொறுப்புக்கும் இராதவாறு எனது மாறாகச் சரியாக அறிக்கையிடுகிறேன்.
              * I Authorise the Registrar – General and the officers of the Registrar – General’s Department to make search on my behalf for the relevant registra􀆟on entry and I hereby expressly declare that I absolve the Registrar – General and every officer of his Department from all responsibility and liability in respect of any act error or omission in connec􀆟on with such search or any informa􀆟on that may be supplied or omi􀆩ed to be supplied to me.
           </p>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #ccc;"> 

            <div style="width: 45%;">
                <p>දිනය<br>திகதி<br>Date</p>
                <p>.....................................</p>
            </div>
            <div style="width: 45%;">
                <p>ඉ􁂈􁂋􁁨ක􁂆ෙ􀽄 අත්සන<br>விண்ணப்பதாரரின் கையொப்பம்<br>Signature of Applicant</p>
                <p>.....................................</p>
            </div>
      </div>         
            <p>*අයදුම්කරු විසින්ම සොයා බැලීම් කිරීමේදී මෙම ඡේදය කපා හරින්න. </p>
            <p>*விண்ணப்பதாரர் தானாகவே தேடலை மேற்கொள்ளும் போது இந்த பகுதியை வெட்டி விடவும்.</p>
            <p>*To be struck off if applicant makes the search</p> <br> <br> <br>

            <hr>
                <div style="font-weight: normal; text-align: center; padding: 5px; border-bottom: 1px solid #333;">
                <p>කාර්යාලයේ ප්‍රයෝජනය සඳහා පමණි<br>அலுவலக உபயோகத்திற்கு மாத்திரம்<br>FOR OFFICE USE ONLY</p>
                </div>
             
              <table>
                <tr>
                   <td style="border: 1px solid black; padding: 8px; ">1.ලැබුනු මුදල්වල වටිනාකම <br> பெறப்பட்ட கட்டணத்தின் தொகை <br> Amount of fees recieved </td>
                   <td style="border: 1px solid black; padding: 8px; width:100px; "></td>
                   <td style="border: 1px solid black; padding: 8px;">6. පිටපත් කළේ <br>நகலெடுக்கப்பட்டது <br> Copied by</td>
                   <td style="border: 1px solid black; padding: 8px; width:100px; "></td>
                </tr>

                <tr>
                   <td style="border: 1px solid black; padding: 8px;">2.සොයන ලද කොට්ඨාසය <br> தேடப்பட்ட பிரிவு <br> Division searched </td>
                   <td style="border: 1px solid black; padding: 8px;"></td>
                   <td style="border: 1px solid black; padding: 5px; " rowspan="3" >7. සහතිකය නිකුත් කළ පෝරමයේ මුද්‍රිත අනු අංකය හෝ ඡායා පිටපත් යන්ත්‍ර ක්‍රියාකරුගේ අත්සන <br><br> சான்றிதழ் படிவத்தின் வரிசை எண் அல்லது நகலெடுக்கும் இயந்திர இயக்குபரின் கையெழுத்து <br><br> Serial No.oof certificate form or copying machine operator's signature </td>
                   <td style="border: 1px solid black; padding: 8px;" rowspan="3"></td>
                </tr>

                <tr>
                   <td style="border: 1px solid black; padding: 8px; colspan =2;">3.සොයන ලද කාලය <br>தேடப்பட்ட நேரம் <br> Period searched</td>
                   <td style="border: 1px solid black; padding: 8px;"></td>
                   <td style="border: 1px solid black; padding: 8px; "><br><br> </td>
                   <td style="border: 1px solid black; padding: 8px;"></td>
                </tr> 

                <tr>
                   <td style="border: 1px solid black; padding: 8px;">4.සටහනේ අංකය සහ දිනය <br> குறிப்பின் எண் மற்றும் தேதி <br> No. and Date of entry </td>
                   <td style="border: 1px solid black; padding: 8px;"></td>
                    <td style="border: 1px solid black; padding: 8px; "><br><br> </td>
                   <td style="border: 1px solid black; padding: 8px;"></td>
                </tr>

                <tr>
                   <td style="border: 1px solid black; padding: 8px;">5.සොයන ලද්දේ <br> தேடப்படுகிறது <br> Search by </td>
                   <td style="border: 1px solid black; padding: 8px;"></td>
                   <td style="border: 1px solid black; padding: 5px; ">8.පරීක්ෂා කරන ලද්දේ <br> பரிசோதிக்கப்பட்டது <br>Compared by </td>
                   <td style="border: 1px solid black; padding: 8px;"></td>
                </tr>
              </table> 
              <p> වෙනත් සටහන් : </p>
              <p>மற்ற குறிப்புகள் : </p>
              <p>Other Notes : </p>
              <p><b>සැලකිය යුතුයි :/ குறிப்பு :/ Note : </b></p>

              <p style=" font-size: 0.8em; color: #666;">1.ගාස්තු ගෙවිය හැක්කේ මුදලින් පමණි. අයදුම්පත් තැපෑලෙන් එවන විට අදාල මුදල රෙජිස්ට්‍රාර් ජනරාල්ගේ ලංකා බැංකුවේ (පිටකොටුව ශාඛාවේ) අංක 7041650 දරන ගිණුමට බැර වන සේ ඕනෑම <bබ් ලංකා බැංකු ශාඛාවකට ගෙවා, <b>එම මුදල් තැන්පත් කිරීමේ රිසිට් පත අමුණා එවිය යුතුය. සෑම අයදුම්කරුවකු විසින්ම ලිපිනය සහිත කවරයක් අයදුම්පත සමග ඉදිරිපත් කළ යුතු අතර, ලියපදිංචි/ සාමාන්‍ය තැපෑලට සරිලන මුද්දර කවරයට අලවා එවිය යුතුය. <br>
                  கட்டணங்களை பணத்தினால் மட்டுமே செலுத்த முடியும். விண்ணப்பங்களை தபாலில் அனுப்பும் போது, சம்பந்தப்பட்ட தொகையை பதிவாளர் நாயகனின் லங்கா வங்கியின் (பிட்டக்கோட்டுவ கிளை) 7041650 என்ற எண்ணிலுள்ள கணக்கில் செலுத்த வேண்டும். ஏதேனும் லங்கா வங்கி கிளையில் செலுத்தி, அத்தொகை செலுத்திய ரசீதை இணைத்து அனுப்ப வேண்டும். ஒவ்வொரு விண்ணப்பதாரரும் முகவரி கொண்ட உறையை விண்ணப்பத்துடன் சமர்ப்பிக்க வேண்டும், மேலும் பதிவுத்தபால்/ சாதாரண தபாலுக்கு பொருந்தக்கூடிய முத்திரையுடன் கூடிய உறையில் அனுப்ப வேண்டும். <br>
                  Fees should be paid only in cash. If applications are sent by post, should attach bank reciept which deposit fees to Account No. 7041650 of Registrar Generel's Account (in Pettah Branch). through ay <b> any branch of Bank of Ceylon.</b> All applications should be accompanied by a self addressed envelope and required duty to registerd/normal post should be affixed to the cover  <br> <br>
                  2. සහතිකය, එය ලියාපදිංචි කර ඇති භාෂාවෙන් නිකුත් කරනු ලැබේ. එහි පරිවර්තනයක් ලබාගැනීමට අවශ්‍ය නම්, සහතිකය ලැබීමෙන් පසුව පරිවර්තනය කිරීමට අදාළ වන ඉල්ලුම් පත්‍රයක් සම්පූර්ණ කර රෙජිස්ට්‍රාර් ජනරාල් දෙපාර්තමේන්තුවේ ප්‍රධාන කාර්‍යාලයට හෝ දිවුරුම් දුන් භාෂා පරිවර්තකයකු සේවය කරන දිස්ත්‍රික් රෙජිස්ට්‍රාර් කාර්‍යාලයට හෝ ඉඩම් රෙජිස්ට්‍රාර් කාර්‍යාලයට හෝ ඉඩම් රෙජිස්ට්‍රාර් කාර්‍යාලයට හෝ ඉදිරිපත් කළ යුතුය. <br>
                     சான்றிதழ், அது பதிவு செய்யப்பட்ட மொழியின் மூலம் அங்கீகரிக்கப்படுகிறது. அதிகாரம் பெற வேண்டிய எந்த விவரங்களையும் பெற வேண்டியதாக சான்றிதழைப் பெற்ற பிறகு அதிகாரம் செய்யவும் அல்லது அதிகாரம் செய்யவும் வேண்டிய பின்னணிகளை அதிகாரம் அல்லது அதிகாரம் செய்யும் பின்னணிகளுக்கு அனுமதி செய்யும் வேண்டும். <br>
                     The certificate will be issued in the language it has been registered. If a translation is desired a separate application in the relevant form must be made to the head Office of the Registrar General's Department or any District Registrar of Land Office, where there is a sworm translator. <br><br>
                  3. එක අයදුම්පතක් මත අවශ්‍ය ගාස්තු ගෙවීමෙන් සහතික පිටපත් ඕනෑම ගණනක් ලබාගත හැක.   <br>
                      ஒரு விண்ணப்பதாரருக்கு தேவையான கட்டணங்களை செலுத்துவதற்கு ஒரு சான்றிதழ் ஒன்றை மட்டும் பெறலாம். <br>
                      Only one certificate can be obtained for the payment of required fees. <br><br>
                  4.  සහතිකයක් ලබා ගැනීම සදහා මෙහි සදහන් ගාස්තු හැර වෙනත් කිසිදු මුදලක් ගෙවීම අවශ්‍ය නොවේ. <br>
                      சான்றிதழைப் பெற வேண்டிய கட்டணங்களை செலுத்த முடியும். <br>
                      No any other additional payment is required to obtain the certificate for the payment of required fees. <br><br> 
              </p>

          
    </body>
    </html>`;
  };

  // Generate PDF
  const generatePdf = async () => {
    try {
      const htmlContent = generateHtml();
      console.log("Generated HTML:", htmlContent); // Log the generated HTML

      const file = await printToFileAsync({
        html: htmlContent,
        base64: false
      });

      console.log("Generated PDF URI:", file.uri); // Log the file URI

      await shareAsync(file.uri);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.header}>Birth Certificate Application</Text>
             
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>1. Applicant Details</Text>
            <Text style={styles.label}>Name of Applicant</Text>
            <TextInput
              value={formData.applicantName}
              placeholder="Full Name"
              style={styles.textInput}
              onChangeText={(value) => updateFormData('applicantName', value)}
            />
            
            <Text style={styles.label}>Address</Text>
            <TextInput
              value={formData.applicantAddress}
              placeholder="Full Address"
              style={styles.textArea}
              multiline={true}
              numberOfLines={3}
              onChangeText={(value) => updateFormData('applicantAddress', value)}
            />
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>2. Birth Details</Text>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              value={formData.fullName}
              placeholder="Full Name"
              style={styles.textInput}
              onChangeText={(value) => updateFormData('fullName', value)}
            />
            
            <Text style={styles.label}>Sex</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.sex}
                style={styles.picker}
                onValueChange={(itemValue) => updateFormData('', itemValue)}
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
            
            <Text style={styles.label}>No. of Copies Required</Text>
            <TextInput
              value={formData.copies}
              placeholder="1"
              style={styles.textInput}
              keyboardType="numeric"
              onChangeText={(value) => updateFormData('copies', value)}
            />
            
            <Text style={styles.label}>Date of Birth (YYYY-MM-DD)</Text>
            <TextInput
              value={formData.birthDate}
              placeholder="YYYY-MM-DD"
              style={styles.textInput}
              onChangeText={(value) => updateFormData('birthDate', value)}
            />
            
            <Text style={styles.label}>Place of Birth</Text>
            <TextInput
              value={formData.birthPlace}
              placeholder="Hospital, Address, etc."
              style={styles.textArea}
              multiline={true}
              numberOfLines={3}
              onChangeText={(value) => updateFormData('birthPlace', value)}
            />
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>3. Registration Details</Text>
            <Text style={styles.label}>Registrar's Division</Text>
            <TextInput
              value={formData.registrarDivision}
              placeholder="Division"
              style={styles.textInput}
              onChangeText={(value) => updateFormData('registrarDivision', value)}
            />
            
            <Text style={styles.label}>Revenue District</Text>
            <TextInput
              value={formData.revenueDistrict}
              placeholder="District"
              style={styles.textInput}
              onChangeText={(value) => updateFormData('revenueDistrict', value)}
            />
            
            <Text style={styles.label}>Registration No. (if known)</Text>
            <TextInput
              value={formData.registrationNo}
              placeholder="Registration Number"
              style={styles.textInput}
              onChangeText={(value) => updateFormData('registrationNo', value)}
            />
            
            <Text style={styles.label}>Registration Date (YYYY-MM-DD)</Text>
            <TextInput
              value={formData.registrationDate}
              placeholder="YYYY-MM-DD"
              style={styles.textInput}
              onChangeText={(value) => updateFormData('registrationDate', value)}
            />
            
            <Text style={styles.label}>Search Period - From (YYYY-MM-DD)</Text>
            <TextInput
              value={formData.searchFrom}
              placeholder="YYYY-MM-DD"
              style={styles.textInput}
              onChangeText={(value) => updateFormData('searchFrom', value)}
            />
            
            <Text style={styles.label}>Search Period - To (YYYY-MM-DD)</Text>
            <TextInput
              value={formData.searchTo}
              placeholder="YYYY-MM-DD"
              style={styles.textInput}
              onChangeText={(value) => updateFormData('searchTo', value)}
            />
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>4. Parents Details</Text>
            <Text style={styles.label}>Father's Full Name</Text>
            <TextInput
              value={formData.fatherName}
              placeholder="Father's Name"
              style={styles.textInput}
              onChangeText={(value) => updateFormData('fatherName', value)}
            />
            
            <Text style={styles.label}>Mother's Full Name (maiden name)</Text>
            <TextInput
              value={formData.motherName}
              placeholder="Mother's Name"
              style={styles.textInput}
              onChangeText={(value) => updateFormData('motherName', value)}
            />
          </View>
          
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>5. Fee Details</Text>
            <View style={styles.radioContainer}>
              <View style={styles.radioOption}>
                <Switch
                  value={formData.feeType === "120"}
                  onValueChange={(value) => 
                    updateFormData('feeType', value ? "120" : "250")
                  }
                />
                <Text style={styles.radioLabel}>Rs. 120/- (Registration details known)</Text>
              </View>
              
              <View style={styles.radioOption}>
                <Switch
                  value={formData.feeType === "250"}
                  onValueChange={(value) => 
                    updateFormData('feeType', value ? "250" : "120")
                  }
                />
                <Text style={styles.radioLabel}>Rs. 250/- (Search required)</Text>
              </View>
            </View>
            
            <Text style={styles.label}>Amount to Pay</Text>
            <Text style={styles.amount}>{calculateFee()}</Text>
          </View>
          
          {/* <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>6. Signature</Text>
            <Text style={styles.label}>Application Date (YYYY-MM-DD)</Text>
            <TextInput
              value={formData.applicationDate}
              placeholder="YYYY-MM-DD"
              style={styles.textInput}
              onChangeText={(value) => updateFormData('applicationDate', value)}
            />
            
            <Text style={styles.label}>Signature (Type your name)</Text>
            <TextInput
              value={formData.signature}
              placeholder="Type your name as signature"
              style={styles.textInput}
              onChangeText={(value) => updateFormData('signature', value)}
            />
          </View>    */}
         
          <View style={styles.buttonContainer}>
            <Button title="Generate PDF" onPress={generatePdf} />
          </View>
          
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  radioContainer: {
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 30,
  },
});