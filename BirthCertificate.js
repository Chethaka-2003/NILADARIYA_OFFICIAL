import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, SafeAreaView, Switch, Platform, Pressable } from 'react-native';
import { useState } from 'react';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  // Form state
  const [formData, setFormData] = useState({
    applicantName: "",
    applicantAddress: "",
    fullName: "",
    sex: "",
    copies: "1",
    birthDate: new Date(),
    birthPlace: "",
    registrarDivision: "",
    revenueDistrict: "",
    registrationNo: "",
    registrationDate: new Date(),
    searchFrom: new Date(),
    searchTo: new Date(),
    fatherName: "",
    motherName: "",
    feeType: "120",
    applicationDate: new Date(),
    signature: ""
  });

  // Date picker visibility state
  const [showDatePicker, setShowDatePicker] = useState({
    birthDate: false,
    registrationDate: false,
    searchFrom: false,
    searchTo: false,
    applicationDate: false
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

  // Show date picker
  const showPicker = (pickerName) => {
    setShowDatePicker(prevState => {
      // First close all pickers
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      
      // Then open the selected one
      newState[pickerName] = true;
      return newState;
    });
  };

  // Handle date change
  const onDateChange = (event, selectedDate, pickerName) => {
    // Hide the date picker regardless of platform
    setShowDatePicker(prevState => ({
      ...prevState,
      [pickerName]: false
    }));
    
    // Update the date only if a date was selected
    if (selectedDate) {
      updateFormData(pickerName, selectedDate);
    }
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  // Render date picker based on platform
  const renderDatePicker = (field) => {
    return (
      <>
        <Pressable 
          onPress={() => showPicker(field)} 
          style={styles.datePickerButton}
        >
          <Text style={styles.dateText}>
            {formatDate(formData[field])}
          </Text>
        </Pressable>
        
        {showDatePicker[field] && (
          <DateTimePicker
            testID={'${field}Picker'}
            value={formData[field]}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, date) => onDateChange(event, date, field)}
          />
        )}
      </>
    );
  };

  // Generate HTML with form data
  const generateHtml = () => {
    // HTML generation code unchanged...
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Application for Birth Certificate and/or Search of Registers</title>
    <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    .logo {
      width: 80px;
      height: 80px;
      background-color: #f0f0f0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
    }
    .title {
      flex: 1;
      text-align: center;
    }
    .form-instruction {
      font-style: italic;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    th, td {
      border: 1px solid #333;
      padding: 8px;
      vertical-align: top;
    }
    .office-use {
      float: right;
      border: 1px solid #333;
      padding: 10px;
      width: 200px;
      text-align: center;
      margin-left: 10px;
    }
    .multilingual {
      font-size: 0.8em;
      color: #666;
    }
    .fees {
      font-size: 0.9em;
    }
    input[type="text"],
    input[type="date"],
    input[type="number"],
    select {
      width: 95%;
      padding: 8px;
      margin: 5px 0;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .input-field {
      min-height: 40px;
    }
    .date-input {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      margin-top: 10px;
    }
    .submit-btn {
      background-color: #4CAF50;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 20px;
    }
    .submit-btn:hover {
      background-color: #45a049;
    }
    </style>
    </head>
    <body>
    <div class="header">
    <div class="logo">
      <img src="/api/placeholder/80/80" alt="Government Emblem" />
    </div>
    <div class="title">
      <h2>APPLICATION FOR BIRTH CERTIFICATE AND/OR SEARCH OF REGISTERS</h2>
      <p class="multilingual">ජනනපත්‍ර සහතිකයක් ලබාගැනීම සඳහා / තොරතුරාන්</p>
      <p class="multilingual">பிறப்பு சான்றிதழுக்கும் அல்லது பதிவேடுகளைத் தேடுவதற்குமான விண்ணப்பம்</p>
    </div>
    <div class="office-use">
      <p>FOR OFFICE USE ONLY</p>
      <p class="multilingual">කාර්යාලයේ ප්‍රයෝජනය සඳහා පමණි</p>
      <p class="multilingual">அலுவலக உபயோகத்திற்கு மட்டும்</p>
      <hr>
      <p>Application No. and Date</p>
      <p>................................</p>
    </div>
    </div>
 
  <div class="form-instruction">
    <p>To be sent to the Office of the District Registrar of the Divisional Secretariat in which the birth occurred.</p>
    <p class="multilingual">මෙය මිය යූ ලංකාවේ තිබෙන අමාත්‍යාංශයේ දිස්ත්‍රික් ලේකම්වරයා වෙත යැවිය යුතුය.</p>
    <p class="multilingual">பிறப்பு நிகழ்ந்த இடத்தில் உள்ள பிரதேச செயலகத்தின் மாவட்டப் பதிவாளரின் அலுவலகத்திற்கு அனுப்ப வேண்டும்.</p>
  </div>
 
  <form id="birthCertificateForm">
    <table>
      <tr>
        <td width="40%">
          1. <strong>Name of Applicant and Address</strong>
          <p class="multilingual">අයදුම්කරුගේ නම සහ ලිපිනය</p>
          <p class="multilingual">விண்ணப்பதாரரின் பெயரும் முகவரியும்</p>
        </td>
        <td colspan="2" class="input-field">
          <input type="text" value="${formData.applicantName}" disabled>
          <textarea disabled>${formData.applicantAddress}</textarea>
        </td>
      </tr>
      <tr>
        <td>
          2. <strong>Full name of person respecting whose birth application is made?</strong>
          <p class="multilingual">අයදුම්කරුගේ නම්වල දක්වාතිබෙන පැණය? දින අංකය ලිපිනය</p>
          <p class="multilingual">யாருடைய பிறப்புக்கான விண்ணப்பம் செய்யப்படுகிறது அவரது பெயர்</p>
        </td>
        <td>
          <strong>Sex</strong>
          <p class="multilingual">ස්ත්‍රී පුරුෂ භාවය</p>
          <p class="multilingual">பால்</p>
          <select id="sex" name="sex" disabled>
            <option value="${formData.sex}">${formData.sex}</option>
          </select>
        </td>
        <td>
          <strong>No. of Copies required</strong>
          <p class="multilingual">අවශ්‍ය පිටපත් ගණන</p>
          <p class="multilingual">தேவைப்படும் பிரதிகளின் எண்ணிக்கை</p>
          <input type="number" id="copies" name="copies" value="${formData.copies}" disabled>
        </td>
      </tr>
      <tr>
        <td>
          <input type="text" id="fullName" name="fullName" value="${formData.fullName}" disabled>
        </td>
        <td colspan="2"></td>
      </tr>
      <tr>
        <td>
          3. <strong>Date of Birth</strong>
          <p class="multilingual">උපන්දිනය</p>
          <p class="multilingual">பிறந்த திகதி</p>
          <input type="date" id="birthDate" name="birthDate" value="${formatDate(formData.birthDate)}" disabled>
        </td>
        <td colspan="2">
          <strong>Place of occurrence (Hospital, House No. and Street, Town or Village of Name of Estate)</strong>
          <p class="multilingual">උපන් ස්ථානය (රෝහල, ගෘහ අංකය සහ වීදිය කොටඨාශය, ගම)</p>
          <p class="multilingual">பிறந்த இடம் (வைத்தியசாலை, வீட்டு இலக்கம், தெரு, நகர், கிராமம் அல்லது தோட்டப்பெயர்)</p>
          <textarea id="birthPlace" name="birthPlace" disabled>${formData.birthPlace}</textarea>
        </td>
      </tr>
      <tr>
        <td>
          4. <strong>Registrar's Division</strong>
          <p class="multilingual">රෙජිස්ට්‍රාර්ගේ කොට්ඨාශය</p>
          <p class="multilingual">பதிவாளர் பிரிவு</p>
          <input type="text" id="registrarDivision" name="registrarDivision" value="${formData.registrarDivision}" disabled>
        </td>
        <td colspan="2">
          <strong>Revenue District</strong>
          <p class="multilingual">ආදායම් දිස්ත්‍රික්කය</p>
          <p class="multilingual">இறைவரி மாவட்டம்</p>
          <input type="text" id="revenueDistrict" name="revenueDistrict" value="${formData.revenueDistrict}" disabled>
        </td>
      </tr>
      <tr>
        <td>
          5. <strong>No. and date of Registration Entry (If known)</strong>
          <p class="multilingual">ලියාපදිංචි අංකය සහ දිනය(දැන් තිබේ නම්)</p>
          <p class="multilingual">பதிவு இலக்கமும் திகதியும் (தெரிந்திருப்பின்)</p>
          <div style="display: flex; gap: 10px;">
            <input type="text" id="registrationNo" name="registrationNo" value="${formData.registrationNo}" disabled style="width: 45%;">
            <input type="date" id="registrationDate" name="registrationDate" value="${formatDate(formData.registrationDate)}" disabled style="width: 45%;">
          </div>
        </td>
        <td colspan="2">
          <strong>Period of search desired, if any. (The maximum period of search is limited to 2 years.)</strong>
          <p class="multilingual">සොයා බැලීම අවශ්‍ය කාල කොපමණ කාලයක් ද?(උපරිම කාලය වසර 2 දක්වා සීමා කර ඇත.)</p>
          <p class="multilingual">தேடல் தேவைப்படும் காலம் ஏதேனும் (அதிகபட்ச தேடல் காலம் 2 வருடங்களுக்கு மட்டுப்படுத்தப்பட்டுள்ளது.)</p>
          <div style="display: flex; gap: 10px;">
            <div style="width: 45%;">
              <label for="searchFrom">From:</label>
              <input type="date" id="searchFrom" name="searchFrom" value="${formatDate(formData.searchFrom)}" disabled>
            </div>
            <div style="width: 45%;">
              <label for="searchTo">To:</label>
              <input type="date" id="searchTo" name="searchTo" value="${formatDate(formData.searchTo)}" disabled>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          6. <strong>Father's Full Name</strong>
          <p class="multilingual">පියාගේ සම්පූර්ණ නම</p>
          <p class="multilingual">தந்தையின் முழுப்பெயர்</p>
        </td>
        <td colspan="2">
          <input type="text" id="fatherName" name="fatherName" value="${formData.fatherName}" disabled>
        </td>
      </tr>
      <tr>
        <td>
          7. <strong>Mother's Full Name (maiden name)</strong>
          <p class="multilingual">මවගේ සම්පූර්ණ නම (විවාහයට පෙර)</p>
          <p class="multilingual">தாயாரின் முழுப்பெயர் (கன்னிப் பெயர்)</p>
        </td>
        <td colspan="2">
          <input type="text" id="motherName" name="motherName" value="${formData.motherName}" disabled>
        </td>
      </tr>
      <tr>
        <td>
          8. <strong>Amount of money paid for charges</strong>
          <p class="multilingual">ගාස්තුව වශයෙන් ගෙවන ලද මුදල</p>
          <p class="multilingual">கட்டணங்களுக்காக கொடுப்பனவாக செலுத்தப்பட்ட பணத்தொகை</p>
          <input type="text" id="amountPaid" name="amountPaid" value="${calculateFee()}" disabled>
        </td>
        <td>
          <strong>Where the date of registration or the No. of the entry is given the fee for one copy of the certificate is Rs. 120/-</strong>
          <p class="multilingual">ලියාපදිංචි කිරීමේ දිනය හෝ අංකය දී ඇති විට සහතික එක පිටපතක ගාස්තුව රු. 120/-</p>
          <p class="multilingual">பதிவு திகதி அல்லது பதிவுப் பதிவின் இல. தரப்பட்டிருந்தால் ஒரு பிரதிக்கான கட்டணம் ரூபா 120/-</p>
          <div>
            <input type="radio" id="fee120" name="feeType" value="120" ${formData.feeType === "120" ? "checked" : ""} disabled>
            <label for="fee120">Rs. 120/- per copy</label>
          </div>
        </td>
        <td>
          <strong>Where the date of registration or the No. of the entry is not given and a search of registers not exceeding two years is involved fee for one copy of the certificate is Rs. 250/-</strong>
          <p class="multilingual">ලියාපදිංචි කල දිනය හෝ අංකය දී නැති විට වසර 2 කට නොවැඩි කාලයක් සඳහා ලේඛන පරීක්ෂා කර සහතිකයක එක පිටපතකට රු. 250/-</p>
          <p class="multilingual">பதிவுத் திகதி அல்லது பதிவின் இல. தரப்படாமல் 2 வருடங்களை விஞ்சாத காலப்பகுதிக்குரிய பதிவேடுகளைத் தேடவேண்டியிருந்தால் ஒரு பிரதிக்கான கட்டணம் ரூபா 250/-</p>
          <div>
            <input type="radio" id="fee250" name="feeType" value="250" ${formData.feeType === "250" ? "checked" : ""} disabled>
            <label for="fee250">Rs. 250/- per copy</label>
          </div>
        </td>
      </tr>
    </table>
   
    <div style="margin-top: 40px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <label for="applicationDate">දිනය/திகதி/Date:</label>
        <input type="date" id="applicationDate" name="applicationDate" value="${formatDate(formData.applicationDate)}" disabled style="width: 150px;">
      </div>
      <div>
        <label for="signature">Signature:</label>
        <input type="text" id="signature" name="signature" value="${formData.signature}" disabled style="width: 250px;">
      </div>
    </div>
  </form>
 
  <div style="margin-top: 80px; font-size: 0.7em; color: #666; text-align: center;">
    <p>H.04/2024 - 500,000 (2022/01) © කොළඹ රජයේ මුද්‍රණ දෙපාර්තමේන්තුව</p>
  </div>
</body>
</html> // Same HTML as before, truncated for brevity
  `};

  // Generate PDF
  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: generateHtml(),
      base64: false
    });

    await shareAsync(file.uri);
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
                onValueChange={(itemValue) => updateFormData('sex', itemValue)}
              >
                <Picker.Item label="Select" value="" />
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
            
            <Text style={styles.label}>Date of Birth</Text>
            {renderDatePicker('birthDate')}
            
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
            
            <Text style={styles.label}>Registration Date (if known)</Text>
            {renderDatePicker('registrationDate')}
            
            <Text style={styles.label}>Search Period - From</Text>
            {renderDatePicker('searchFrom')}
            
            <Text style={styles.label}>Search Period - To</Text>
            {renderDatePicker('searchTo')}
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
          
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>6. Signature</Text>
            <Text style={styles.label}>Application Date</Text>
            {renderDatePicker('applicationDate')}
            
            <Text style={styles.label}>Signature (Type your name)</Text>
            <TextInput
              value={formData.signature}
              placeholder="Type your name as signature"
              style={styles.textInput}
              onChangeText={(value) => updateFormData('signature', value)}
            />
          </View>
          
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
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  dateText: {
    color: '#333',
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
  },
});