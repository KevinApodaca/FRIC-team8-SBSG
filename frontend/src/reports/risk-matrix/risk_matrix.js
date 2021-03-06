const officegen = require('officegen')
const axios = require('axios')
const fs = require('fs')

// Grabs all of the findings
const getFindings = async () => {
  try {
    const res = await axios.get('http://localhost:3000/findings/all')
    const finding = res.data
    return finding
  }
  catch (e) {
    console.error(e)
  }
}

const createRiskMatrix = finding => {
  let xlsx = officegen('xlsx')

  // Officegen calling this function after finishing to generate the xlsx document:
  xlsx.on('finalize', function(written) {
    console.log('Finished generating Risk Matrix.')
  })

  xlsx.on('error', function(err) {
    console.log(err)
  })

  let sheet = xlsx.makeNewSheet()
  sheet.name = 'RISK MATRIX'

  for(var i = 0; i <= finding.length+1; i++) {
    sheet.data[i] = []
  }

  sheet.data[0][0] = "ID"
  sheet.data[0][1] = "IP:PORT"
  sheet.data[0][2] = "DESCRIPTION"
  sheet.data[0][3] = "STATUS"
  sheet.data[0][4] = "POSTURE"
  sheet.data[0][5] = "C"
  sheet.data[0][6] = "I"
  sheet.data[0][7] = "A"
  sheet.data[0][8] = "C"
  sheet.data[0][9] = "I"
  sheet.data[0][10] = "A"
  sheet.data[0][11] = "IMP.SCORE"
  sheet.data[0][12] = "CAT"
  sheet.data[0][13] = "CAT SCORE"
  sheet.data[0][14] = "CM"
  sheet.data[0][15] = "Vs (n)"
  sheet.data[0][16] = "Vs (q)"
  sheet.data[0][17] = "RELEVANCE OF THREAT"
  sheet.data[0][18] = "LIKELIHOOD"
  sheet.data[0][19] = "IMPACT"
  sheet.data[0][20] = "IMPACT"
  sheet.data[0][21] = "IMPACT RATIONALE (HIDE THIS COULUMN)"
  sheet.data[0][22] = "RISK"
  sheet.data[0][0].colorIndex = 5

  // Display the ID for all findings
  for (var index in finding) {
    var i = Number(index)
    sheet.data[i+1][0] = finding[index].id_form
  }

  // Display the IP for all findings
  for(var index in finding){
  var i = Number(index)
  sheet.data[i+1][1] = finding[index].ip
  }

  // Display the description for all findings
  for (var index in finding) {
    var i = Number(index)
    sheet.data[i+1][2] = finding[index].finding_desc
  }

  // Display the Status for all findings
  for (var index in finding) {
    var i = Number(index)
    sheet.data[i+1][3] = finding[index].finding_status
  }

  // Display the posture for all findings
  for (var index in finding) {
    var i = Number(index)
    sheet.data[i+1][4] = finding[index].finding_posture
  }

  // Display the C for all findings
  for (var index in finding) {
    var i = Number(index)
    sheet.data[i+1][8] = finding[index].finding_confidentiality
  }

  // Display the I for all findings
  for (var index in finding) {
    var i = Number(index)
    sheet.data[i+1][9] = finding[index].finding_integrity
  }

  // Display the A for all findings
  for (var index in finding) {
    var i = Number(index)
    sheet.data[i+1][10] = finding[index].finding_availability
  }

  // Display the Impact for all findings
  for (var index in finding) {
    var i = Number(index)
    sheet.data[i+1][11] = finding[index].impact_level
  }

  // Display the Threat for all findings
  for (var index in finding) {
    var i = Number(index)
    sheet.data[i+1][17] = finding[index].threat_relevance
  }

  // Display the Likelihood for all findings
  for (var index in finding) {
    var i = Number(index)
    sheet.data[i+1][18] = finding[index].likelihood
  }

  // Display the Risk for all findings
  for (var index in finding) {
    var i = Number(index)
    sheet.data[i+1][22] = finding[index].risk
  }

  // Generate the output file.
  let out = fs.createWriteStream('risk_matrix.xlsx')

  out.on('error', function(err) {
    console.log(err)
  })

  xlsx.generate(out)
}

const main = async () => {
  createRiskMatrix(await getFindings())
}

main()
