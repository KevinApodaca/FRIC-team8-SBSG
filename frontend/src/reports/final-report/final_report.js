const axios = require('axios')
var async = require('async')
const officegen = require('officegen')
const fs = require('fs')
var path = require('path')
const finding = require('../../../../backend/src/models/finding')
var outDir = path.join(__dirname)
var docx = officegen({
    type: 'docx',
    orientation: 'portrait',
    pageMargins: { top: 500, left: 1000, bottom: 500, right: 1000 }
})
// Grabs all of the analysts
const getAnalysts = async () => {
  try {
    const res = await axios.get('http://localhost:3000/analysts/all')
    const analysts = res.data
    return analysts
  } catch(e) {
    console.log(e)
  }
}
// Grabs all of the events
const getEvents = async () => {
  try {
    const res = await axios.get('http://localhost:3000/events/all')

    const events = res.data

    return events

  } catch (e) {
    console.error(e)
  }
}

// Grabs all of the systems
const getSystems = async () => {
  try {
    const res = await axios.get('http://localhost:3000/systems/all')

    const systems = res.data

    return systems

  } catch (e) {
    console.error(e)
  }
}

// Grabs all of the findings
const getFindings = async () => {
  try {
    const res = await axios.get('http://localhost:3000/findings/all')

    const findings = res.data

    return findings

  } catch (e) {
    console.error(e)
  }
}
const createFinalReport = (analysts, event, systems, findings) => {
  const d = new Date();
  var date = d.toLocaleString("default", {month: "long"}) + ' ' + d.getFullYear();

  docx.on('error', function(err) {
      console.log(err)
  })

  var par = docx.createP()

  par.addImage(path.resolve(__dirname, './assets/img/combat-logo.png'), {
      cx: 90,
      cy: 100
  })
  par.addImage(path.resolve(__dirname, './assets/img/devcom-logo.png'), {
      cx: 250,
      cy: 100
  })
  par.addText('                                             ')
  par.addText(date, {
      font_face: 'Adobe Fan Heiti Std B',
      font_size: 12,
      bold: true
  })

  par = docx.createP()

  par.addImage(path.resolve(__dirname, './assets/img/Capture.PNG'))

  par = docx.createP()

  par.addText(`Combat Capabilities Development Command (CCDC) Data & Analysis Center (DAC) ${systems[0].name} ${event[0].event_type} Report`, {
      font_face: 'Calibri',
      font_size: '20',
      bold: true
  })

  par = docx.createP()

  par.addText('by ', {
      font_face: 'Calibri',
      font_size: '14',
      bold: true
  })
  par.addText(`Lead Analyst: ${analysts[0].firstName} ${analysts[0].lastName} Analyst 1: ${analysts[1].firstName} ${analysts[1].lastName}, Analyst 2: ${analysts[2].firstName} ${analysts[2].lastName}, Analyst 3: ${analysts[3].firstName} ${analysts[3].lastName}, Analyst 4: ${analysts[4].firstName} ${analysts[4].lastName}`, {
      font_face: 'Adobe Fan Heiti Std B',
      font_size: '12'
  })

  par = docx.createP()

  par.addText('To update document, double-click ', {
      font_face: 'Adobe Fan Heiti Std B',
      font_size: '14',
      color: 'ff0000',
      bold: 'true'
  })
  par.addText('HERE ', {
      font_face: 'Adobe Fan Heiti Std B',
      font_size: '14',
      color: 'ff0000',
      back: 'ffff00',
      bold: 'true'
  })
  par.addText('then delete this line', {
      font_face: 'Adobe Fan Heiti Std B',
      font_size: '14',
      color: 'ff0000',
      bold: 'true'
  })

  var i;
  for (i = 0; i < 17; i++) {
      par.addLineBreak();
  }

  par.addImage(path.resolve(__dirname, './assets/img/Capture.PNG'))

  par = docx.createP()

  par.addText(`Classified by ${analysts[0].firstName} ${analysts[0].lastName}`, {
      font_face: 'Calibri',
      font_size: '10'
  })

  par = docx.createP()

  par.addText(`Derived from: ${systems[0].plan}`, {
      font_face: 'Calibri',
      font_size: '10'
  })

  par = docx.createP()

  par.addText(`Declassify on: ${event[0].declassified_date}`, {
      font_face: 'Calibri',
      font_size: '10'
  })

  par = docx.createP()

  par.addImage(path.resolve(__dirname, './assets/img/Capture.PNG'))

  par = docx.createP()

  docx.putPageBreak()

  par = docx.createP()

  for (i = 0; i < 17; i++) {
      par.addLineBreak();
  }

  par.addText('Destruction Notice', {
      font_face: 'Calibri',
      font_size: '12',
      bold: 'true'
  })
  par.options.align = 'center'

  par = docx.createP()

  par.addText('Destroy by any method that will prevent disclosure of contents or reconstruction of the document.',{
      font_face: 'Times New Roman',
      font_size: '12'
  })

  par = docx.createP()

  par.addText('Disclaimer', {
      font_face: 'Calibri',
      font_size: '12',
      bold: 'true'
  })
  par.options.align = 'center'

  par = docx.createP()

  par.addText('The findings in this report are not to be construed as an official Department of the Army position unless so specified by other official documentation.',{
      font_face: 'Times New Roman',
      font_size: '12'
  })

  par = docx.createP()

  par.addText('Warning', {
      font_face: 'Calibri',
      font_size: '12',
      bold: 'true'
  })
  par.options.align = 'center'

  par = docx.createP()

  par.addText('Information and data contained in this document are based on the input available at the time of preparation.',{
      font_face: 'Times New Roman',
      font_size: '12'
  })

  par = docx.createP()

  par.addText('Trade Names', {
      font_face: 'Calibri',
      font_size: '12',
      bold: 'true'
  })
  par.options.align = 'center'

  par = docx.createP()

  par.addText('The use of trade names in this report does not constitute an official endorsement or approval of the use of such commercial hardware or software.  The report may not be cited for purposes of advertisement.',{
      font_face: 'Times New Roman',
      font_size: '12'
  })

  docx.putPageBreak()

  par = docx.createP()

  par.addImage(path.resolve(__dirname, './assets/img/combat-logo.png'), {
      cx: 90,
      cy: 100
  })
  par.addImage(path.resolve(__dirname, './assets/img/devcom-logo.png'), {
      cx: 250,
      cy: 100
  })
  par.addText('                                             ')
  par.addText(date, {
      font_face: 'Adobe Fan Heiti Std B',
      font_size: 12,
      bold: true
  })

  par = docx.createP()

  par.addImage(path.resolve(__dirname, './assets/img/Capture.PNG'))

  par = docx.createP()

  par.addText(`Combat Capabilities Development Command (CCDC) Data & Analysis Center (DAC) ${systems[1].name} ${event[0].event_type} Report`, {
      font_face: 'Calibri',
      font_size: '20',
      bold: true
  })

  par = docx.createP()

  par.addText('by ', {
      font_face: 'Calibri',
      font_size: '14',
      bold: true
  })
  par.addText(`Lead Analyst: ${analysts[0].firstName} ${analysts[0].lastName} Analyst 1: ${analysts[1].firstName} ${analysts[1].lastName}, Analyst 2: ${analysts[2].firstName} ${analysts[2].lastName}, Analyst 3: ${analysts[3].firstName} ${analysts[3].lastName}, Analyst 4: ${analysts[4].firstName} ${analysts[4].lastName}`, {
      font_face: 'Adobe Fan Heiti Std B',
      font_size: '12'
  })

  par = docx.createP()

  par.addText('CCDC Data & Analysis Center', {
      font_face: 'Adobe Fan Heiti Std B',
      font_size: '11',
      italic: 'true'
  })

  par = docx.createP()

  par.addText('Author(s)', {
      font_face: 'Adobe Fan Heiti Std B',
      font_size: '12',
      bold: 'true'
  })

  par = docx.createP()

  par.addText('Affiliation', {
      font_face: 'Adobe Fan Heiti Std B',
      font_size: '11',
      italic: 'true'
  })

  for (i = 0; i < 15; i++) {
      par.addLineBreak();
  }

  par.addImage(path.resolve(__dirname, './assets/img/Capture.PNG'))

  par = docx.createP()

  par.addText(`Classified by: ${analysts[0].firstName} ${analysts[0].lastName}`, {
      font_face: 'Calibri',
      font_size: '10'
  })

  par = docx.createP()

  par.addText(`Derived from: ${systems[1].plan}`, {
      font_face: 'Calibri',
      font_size: '10'
  })

  par = docx.createP()

  par.addText(`Declassify on: ${event[0].declassified_date}`, {
      font_face: 'Calibri',
      font_size: '10'
  })

  par = docx.createP()

  par.addImage(path.resolve(__dirname, './assets/img/Capture.PNG'))

  docx.putPageBreak()

  var table = [
      [{
          val: 'REPORT DOCUMENTATION PAGE',
          opts: {
              b: true,
              fontFamily: 'Univers (W1)',
              sz: '28',
              cellColWidth: 7950,
              align: 'left'
          }
      },{
          val: 'Form Approved',
          opts: {
              fontFamily: 'Univers (W1)',
              sz: '20',
              cellColWidth: 2550,
              align: 'center'
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: 'INTENTIONALLY LEFT BLANK',
          opts: {
              fontFamily: 'Times New Roman',
              sz: '16',
              cellColWidth: 10500,
              align: 'left'
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: '1. REPORT DATE',
          opts: {
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 2900,
              align: 'left'
          }
      },{
          val:  '2. REPORT TYPE',
          opts:{
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 4700,
              align: 'left'
          }
      },{
          val: '3. DATES COVERED',
          opts:{
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 2900,
              align: 'left'
          }
      }],
      [date, `${event[0].event_type}`, `${event[0].created_Date} - ${event[0].declassified_date}`],
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2,
      spacingAfter: 200
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: '4. Title and Subtitle',
          opts: {
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 10500,
              align: 'left'
          }
      }],
      [`Combat Capabilities Development Command (CCDC) Data & Analysis Center (DAC) ${event[0].event_type} Report`]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: '5a. CONTRACT NUMBER',
          opts: {
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 3500,
              align: 'left'
          }
      },{
          val:  '5b. GRANT NUMBER',
          opts:{
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 3500,
              align: 'left'
          }
      },{
          val: '5c. PROGRAM ELEMENT NUMBER',
          opts:{
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 3500,
              align: 'left'
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2,
      spacingAfter: 500
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: '5d. PROJECT NUMBER',
          opts: {
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 3500,
              align: 'left'
          }
      },{
          val:  '5e. TASK NUMBER',
          opts:{
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 3500,
              align: 'left'
          }
      },{
          val: '5f. WORK UNIT NUMBER',
          opts:{
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 3500,
              align: 'left'
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2,
      spacingAfter: 500
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: '6. AUTHOR(S)',
          opts: {
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 10500,
              align: 'left'
          }
      }],
      [`Lead Analyst: ${analysts[0].firstName} ${analysts[0].lastName} Analyst 1: ${analysts[1].firstName} ${analysts[1].lastName}, Analyst 2: ${analysts[2].firstName} ${analysts[2].lastName}, Analyst 3: ${analysts[3].firstName} ${analysts[3].lastName}, Analyst 4: ${analysts[4].firstName} ${analysts[4].lastName}`]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: '7. PERFORMING ORGANIZATION NAME(S) AND ADDRESS(ES)',
          opts: {
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 6500,
              align: 'left'
          }
      },{
          val: '8. PERFORMING ORGANIZATION REPORT NUMBER',
          opts: {
              b:true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 4000,
              align: 'left'
          }
      }],
      ['Director U.S. Army CCDC Data & Analysis Center 6896 Mauchly Street Aberdeen Proving Ground, MD', ' ']
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: '9. SPONSORING / MONITORING AGENCY NAME(S) AND ADDRESS(ES):',
          opts: {
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 10500,
              align: 'left'
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: '10. SPONSOR/MONITOR’S ACRONYM(S):',
          opts: {
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 6500,
              align: 'left'
          }
      },{
          val: '11. SPONSOR/MONITOR’S REPORT NUMBER(S):',
          opts: {
              b:true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 4000,
              align: 'left'
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: '12. DISTRIBUTION / AVAILABILITY STATEMENT:',
          opts: {
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 10500,
              align: 'left'
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: '13. SUPPLEMENTARY NOTES:',
          opts: {
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 10500,
              align: 'left'
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: '14. ABSTRACT:',
          opts: {
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 10500,
              align: 'left'
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: '15. SUBJECT TERMS',
          opts: {
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 10500,
              align: 'left'
          }
      }],
      [`${event[0].event_type} Report`]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: '16. SECURITY CLASSIFICATION OF:',
          opts: {
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 10500,
              align: 'left'
          }
      }],
      [event[0].event_classification]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: 'a. REPORT',
          opts: {
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 3500,
              align: 'left'
          }
      },{
          val:  'b. ABSTRACT',
          opts:{
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 3500,
              align: 'left'
          }
      },{
          val: 'c. THIS PAGE',
          opts:{
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 3500,
              align: 'left'
          }
      }],
      ['UNCLASSIFIED', 'UNCLASSIFIED', 'UNCLASSIFIED']
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2,
      spacingAfter: 500
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: '17. LIMITATION OF ABSTRACT',
          opts: {
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 5250,
              align: 'left'
          }
      },{
          val: '18. NUMBER OF PAGES',
          opts: {
              b:true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 5250,
              align: 'left'
          }
      }],
      ['SAME AS REPORT', 23]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: '19a. NAME OF RESPONSIBLE PERSON',
          opts: {
              b: true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 5250,
              align: 'left'
          }
      },{
          val: '19b. TELEPHONE NUMBER (include area code)',
          opts: {
              b:true,
              fontFamily: 'Arial',
              sz: '16',
              cellColWidth: 5250,
              align: 'left'
          }
      }],
      ['Name', 'Phone']
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  docx.putPageBreak()

  par = docx.createP()

  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  par = docx.createP()
  par.options.align = 'center'

  par.addText('Table of Contents', {
      bold: true,
      font_face: 'Calibri',
      font_size: 14
  })

  par.addLineBreak()
  par = docx.createP()

  par.addText('List of Figures..............................................................................................................................iv',{
      font_face: 'Times New Roman',
      font_size: 12
  })
  par = docx.createP()
  par.addText('List of Tables.................................................................................................................................v',{
      font_face: 'Times New Roman',
      font_size: 12
  })
  par = docx.createP()
  par.addText('Acknowledgements......................................................................................................................vi',{
      font_face: 'Times New Roman',
      font_size: 12
  })
  par = docx.createP()
  par.addText('Executive Summary.....................................................................................................................vii',{
      font_face: 'Times New Roman',
      font_size: 12
  })

  par.addLineBreak()
  par = docx.createListOfNumbers()
  par.addText('(U) INTRODUCTION.........................................................................................................................8')

  par = docx.createNestedOrderedList({
      'level':2
  })
  par.addText('(U) System/Network Architecture......................................................................................9')

  par = docx.createNestedOrderedList({
      'level':2
  })
  par.addText('(U) Test Setup and Network Postures................................................................................10')

  par = docx.createNestedOrderedList({
      'level':2
  })
  par.addText('(U) Limitations....................................................................................................................10')

  par = docx.createListOfNumbers()
  par.addText(`${event[0].event_type} FINDINGS...........................................................11`)

  par = docx.createNestedOrderedList({
      'level':2
  })
  par.addText('(U) Lack of Encryption...........................................................................................................................12')

  par = docx.createNestedOrderedList({
      'level':2
  })
  par.addText('(U) Missing Patches...............................................................................................................................14')

  par = docx.createListOfNumbers()
  par.addText('CONCLUSIONS AND RECOMMENDATIONS.....................................................................................16')

  par = docx.createP()

  par.addText('Appendix A – List of Acronym....................................................................................................................A-1')

  par = docx.createP()

  par.addText('Appendix B – Distribution List....................................................................................................................B-1')

  for (i = 0; i < 17; i++) {
      par.addLineBreak();
  }

  par = docx.createP()
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))


  docx.putPageBreak()
  par = docx.createP()

  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  par = docx.createP()
  par.options.align = 'center'

  par.addText('List of Figures', {
      bold: true,
      font_face: 'Calibri',
      font_size: 14
  })

  par = docx.createP()
  par.addText('Figure 1 Sample Caption..........................................................................................................................13')
  par = docx.createP()
  par.addText('Figure 2 Sample Caption..........................................................................................................................15')

  for (i = 0; i < 41; i++) {
      par.addLineBreak();
  }

  par = docx.createP()
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  docx.putPageBreak()
  par = docx.createP()

  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  par = docx.createP()
  par.options.align = 'center'

  par.addText('List of Tables', {
      bold: true,
      font_face: 'Calibri',
      font_size: 14
  })

  par = docx.createP()
  par.addText('Table 1. (S) List of Findings..........................................................................................................................11')
  par = docx.createP()
  par.addText('Table 2 describes the Lack of Encryption vulnerability..............................................................12')
  par = docx.createP()
  par.addText('Table 3 describes the Missing Patches vulnerability..............................................................14')

  for (i = 0; i < 39; i++) {
      par.addLineBreak();
  }

  par = docx.createP()
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  docx.putPageBreak()
  par = docx.createP()

  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  par = docx.createP()
  par.options.align = 'center'

  par.addText('Acknowledgements', {
      bold: true,
      font_face: 'Calibri',
      font_size: 14
  })

  par = docx.createP()
  par.addText('TheThe U.S. Army Combat Capabilities Development Command (CCDC) Data & Analysis Center (DAC) recognizes the following individuals for their contributions to this report:', {
      font_face: 'Times New Roman',
      font_size: 12
  })

  par.addLineBreak()

  par = docx.createP()
  par.addText('The authors are', {
      font_face: 'Times New Roman',
      font_size: 12
  })

  par.addLineBreak()

  par = docx.createP()
  par.addText(`Lead Analyst: ${analysts[0].firstName} ${analysts[0].lastName} Analyst 1: ${analysts[1].firstName} ${analysts[1].lastName}, Analyst 2: ${analysts[2].firstName} ${analysts[2].lastName}, Analyst 3: ${analysts[3].firstName} ${analysts[3].lastName}, Analyst 4: ${analysts[4].firstName} ${analysts[4].lastName}`, {
      font_face: 'Times New Roman',
      font_size: 12
  })

  par.addLineBreak()

  par = docx.createP()
  par.addText('The authors wish to acknowledge the contributions of the following individuals for his/her assistance in the creation of this report:', {
      font_face: 'Times New Roman',
      font_size: 12
  })

  for (i = 0; i < 30; i++) {
      par.addLineBreak();
  }

  par = docx.createP()

  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  docx.putPageBreak()
  par = docx.createP()

  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  par = docx.createP()
  par.options.align = 'center'

  par.addText('Executive Summary', {
      bold: true,
      font_face: 'Calibri',
      font_size: 14
  })

  for (i = 0; i < 43; i++) {
      par.addLineBreak();
  }

  par = docx.createP()
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  docx.putPageBreak()
  par = docx.createP()

  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  par = docx.createP()
  par.options.align = 'left'

  par.addText('(U) INTRODUCTION', {
      bold: true,
      font_face: 'Calibri',
      font_size: 14
  })

  for (i = 0; i < 43; i++) {
      par.addLineBreak();
  }

  par = docx.createP()
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  docx.putPageBreak()
  par = docx.createP()

  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  par = docx.createP()
  par.options.align = 'left'

  par.addText('1.1 (U) System/Network Architecture', {
      bold: true,
      font_face: 'Calibri',
      font_size: 14
  })

  par = docx.createP()
  par.addText('The figure below provides an overview of the Enter System Name system/network architecture. Describe the system architecture based on a high level diagram provided below. <Insert a high level diagram of the system architecture>', {
      font_face: 'Times New Roman',
      font_size: 12
  })

  for (i = 0; i < 40; i++) {
      par.addLineBreak();
  }

  par = docx.createP()
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  docx.putPageBreak()
  par = docx.createP()

  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  par = docx.createP()
  par.options.align = 'left'

  par.addText('1.2 (U) Test Setup and Network Postures', {
      bold: true,
      font_face: 'Calibri',
      font_size: 14
  })

  par = docx.createP()
  par.options.align = 'left'

  par.addText('1.3 (U) Limitations', {
      bold: true,
      font_face: 'Calibri',
      font_size: 14
  })

  for (i = 0; i < 41; i++) {
      par.addLineBreak();
  }

  par = docx.createP()
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  docx.putPageBreak()
  par = docx.createP()

  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  par = docx.createP()
  par.addText(`2.	${event[0].event_type} FINDINGS`,{
      bold: true,
      font_face: 'Calibri',
      font_size: 16
  })

  par = docx.createP()
  par.addText(`(U) Table 1 lists vulnerabilities identified and validated by CCDC DAC during the ${event[0].event_type} with their associated technical risk.`,{
      font_face: 'Times New Roman',
      font_size: 12
  })

  par = docx.createP()
  par.addText('Table 1. (S) List of Findings',{
      font_face: 'Calibri',
      font_size: 12,
      bold: true
  })

  var table = [
      [{
          val: 'ID',
          opts: {
              b: true,
              fontFamily: 'Calibri',
              sz: '36',
              cellColWidth: 1550,
              align: 'center',
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },
      {
          val: 'DESCRIPTION',
          opts: {
              b: true,
              fontFamily: 'Calibri',
              sz: '36',
              cellColWidth: 6550,
              align: 'center',
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },
      {
          val: 'LIKELIHOOD',
          opts: {
              b: true,
              fontFamily: 'Calibri',
              sz: '24',
              cellColWidth: 1550,
              align: 'center',
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },
      {
          val: 'IMPACT',
          opts: {
              b: true,
              fontFamily: 'Calibri',
              sz: '24',
              cellColWidth: 1550,
              align: 'center',
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },
      {
          val: 'RISK',
          opts: {
              b: true,
              fontFamily: 'Calibri',
              sz: '24',
              cellColWidth: 1550,
              align: 'center',
              shd: {
                  fill: 'c5d9f1'
              }
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2,
      spacingBefore: 600,
      spacingAfter: 600
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: findings[0].id_form,
          opts: {
              b: true,
              fontFamily: 'Calibri',
              sz: '24',
              cellColWidth: 1550,
              align: 'center',
              shd: {
                  fill: 'd9d9d9'
              }
          }
      },{
          val: findings[0].finding_type,
          opts: {
              b: true,
              fontFamily: 'Calibri',
              sz: '24',
              cellColWidth: 6550,
              align: 'center',
              shd: {
                  fill: 'd9d9d9'
              }
          }
      },{
          val: findings[0].likelihood,
          opts: {
              b: true,
              fontFamily: 'Calibri',
              sz: '24',
              cellColWidth: 1550,
              align: 'center',
              shd: {
                  fill: 'ffbf8f'
              }
          }
      },{
          val: findings[0].impact_level,
          opts: {
              b: true,
              fontFamily: 'Calibri',
              sz: '24',
              cellColWidth: 1550,
              align: 'center',
              shd: {
                  fill: 'ff0000'
              }
          }
      },{
          val: findings[0].risk,
          opts: {
              b: true,
              fontFamily: 'Calibri',
              sz: '24',
              cellColWidth: 1550,
              align: 'center',
              shd: {
                  fill: 'ffc000'
              }
          }
      }]
  ]
  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

 var table = [
      [{
          val: findings[1].id_form,
          opts: {
              b: true,
              fontFamily: 'Calibri',
              sz: '24',
              cellColWidth: 1550,
              align: 'center',
              shd: {
                  fill: 'd9d9d9'
              }
          }
      },{
          val: findings[1].finding_type,
          opts: {
              b: true,
              fontFamily: 'Calibri',
              sz: '24',
              cellColWidth: 6550,
              align: 'center',
              shd: {
                  fill: 'd9d9d9'
              }
          }
      },{
          val: findings[1].likelihood,
          opts: {
              b: true,
              fontFamily: 'Calibri',
              sz: '24',
              cellColWidth: 1550,
              align: 'center',
              shd: {
                  fill: 'ffbf8f'
              }
          }
      },{
          val: findings[1].impact_level,
          opts: {
              b: true,
              fontFamily: 'Calibri',
              sz: '24',
              cellColWidth: 1550,
              align: 'center',
              shd: {
                  fill: 'ff0000'
              }
          }
      },{
          val: findings[1].risk,
          opts: {
              b: true,
              fontFamily: 'Calibri',
              sz: '24',
              cellColWidth: 1550,
              align: 'center',
              shd: {
                  fill: 'ffc000'
              }
          }
      }]
  ]
  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

   var table = [
      [{
          val: findings[2].id_form,
          opts: {
              b: true,
              fontFamily: 'Calibri',
              sz: '24',
              cellColWidth: 1550,
              align: 'center',
              shd: {
                  fill: 'd9d9d9'
              }
          }
      },{
          val: findings[2].finding_type,
          opts: {
              b: true,
              fontFamily: 'Calibri',
              sz: '24',
              cellColWidth: 6550,
              align: 'center',
              shd: {
                  fill: 'd9d9d9'
              }
          }
      },{
          val: findings[2].likelihood,
          opts: {
              b: true,
              fontFamily: 'Calibri',
              sz: '24',
              cellColWidth: 1550,
              align: 'center',
              shd: {
                  fill: 'ffbf8f'
              }
          }
      },{
          val: findings[2].impact_level,
          opts: {
              b: true,
              fontFamily: 'Calibri',
              sz: '24',
              cellColWidth: 1550,
              align: 'center',
              shd: {
                  fill: 'ff0000'
              }
          }
      },{
          val: findings[2].risk,
          opts: {
              b: true,
              fontFamily: 'Calibri',
              sz: '24',
              cellColWidth: 1550,
              align: 'center',
              shd: {
                  fill: 'ffc000'
              }
          }
      }]
  ]
  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  par = docx.createP()
  for (i = 0; i < 33; i++) {
      par.addLineBreak();
  }
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  docx.putPageBreak()
  par = docx.createP()

  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  par = docx.createP()
  par.addText('2.2	(U) Lack of Encryption',{
      bold: true,
      font_face: 'Calibri',
      font_size: 14
  })

  par = docx.createP()
  par.addText('Table 3 describes the Missing Patches vulnerability.',{
      font_face: 'Times New Roman',
      font_size: 12
  })

  par = docx.createP()
  par.options.align = 'center'
  par.addText('Table 2. Lack of Encryption',{
      bold: true,
      font_face: 'Times New Roman',
      font_size: 14
  })

  var table = [
      [{
          val: 'ID',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1312.5,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: '1',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1312.5
          }
      },{
          val: '',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1312.5,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'IMPACT SCORE',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1312.5,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: '4',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 1312.5,
          }
      },{
          val: 'STATUS',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1312.5,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'OPEN',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1312.5,
              shd: {
                  fill: 'ff0000'
              }
          }
      },{
          val: 'POSTURE',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1312.5,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: 'HOST NAMES',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 4600,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'IP:PORT',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 4600,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'NEARSIDER',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1300
          }
      }],
      [`${findings[0].host} ${findings[1].host} ${findings[2].host}`, `${findings[0].ip} ${findings[1].ip} ${findings[2].ip}`]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: 'CAT',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 2100,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'CAT SCORE',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 2100,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'VsSCORE',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 2100,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'Vs',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 2100,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'IMPACT RATIONALE',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 2100,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: 'I',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 2100,
          }
      },{
          val: '10',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 2100,
          }
      },{
          val: '40.0',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 2100,
          }
      },{
          val: 'M',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 2100,
              shd: {
                  fill: 'fabf8f'
              }
          }
      },{
          val: 'Test',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 2100,
              shd: {
                  fill: 'ffff66'
              }
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: 'LIKELIHOOD',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'IMPACT',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'RISK',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'CM',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'C',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'I',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'A',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)


  var table = [
      [{
          val: 'M',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500,
              shd: {
                  fill: 'fabf8f'
              }
          }
      },{
          val: 'VH',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500,
              shd: {
                  fill: 'ff0000'
              }
          }
      },{
          val: 'H',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500,
              shd: {
                  fill: 'ffc000'
              }
          }
      },{
          val: '10',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500
          }
      },{
          val: 'Y',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500
          }
      },{
          val: 'Y',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500
          }
      },{
          val: 'Y',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: 'TYPE',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 1250,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'ENCRYPTION',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 9250
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: '',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 1250,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'Lack of Encryption',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 9250
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: 'DESCRIPTION',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 1250,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'Test',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 9250,
              shd: {
                  fill: 'ffffcc'
              }
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2,
      spacingAfter: 2000
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: '',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 1250,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'Test',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 9250
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: 'MITIGATION',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 1250,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'Test',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 9250,
              shd: {
                  fill: 'ffffcc'
              }
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2,
      spacingAfter: 2000
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: 'REFERENCES',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 1250,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'Figure X.',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 9250,
              shd: {
                  fill: 'ffffcc'
              }
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: 'C-CONFIDENTIALITY      I-INTEGRITY     A-AVAILABILITY CM-COUNTERMEASURE',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 16,
              align: 'center',
              cellColWidth: 10500
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  par = docx.createP()
  par.options.align = 'center'
  par.addText(`${findings[0].finding_classification}`,{
      font_face: 'Times New Roman',
      font_size: '12',
      color: '008000'
  })

  par = docx.createP()
  for (i = 0; i < 2; i++) {
      par.addLineBreak();
  }
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  docx.putPageBreak()

  par = docx.createP()
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  par = docx.createP()
  par.options.align = 'center'
  par.addText(`${findings[0].finding_classification}`,{
      font_face: 'Times New Roman',
      font_size: '12',
      color: '008000'
  })

  par = docx.createP()
  par.addImage(path.resolve(__dirname, './assets/img/Figure1.PNG'))

  par = docx.createP()
  par.options.align = 'center'
  par.addText(`${findings[0].finding_classification}`,{
      font_face: 'Times New Roman',
      font_size: '12',
      color: '008000'
  })

  par = docx.createP()
  par.options.align = 'center'
  par.addText('Figure 1 Sample Caption', {
      font_face: 'Calibri',
      font_size: '12',
      bold: true
  })

  par = docx.createP()
  for (i = 0; i < 32; i++) {
      par.addLineBreak();
  }
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  docx.putPageBreak()
  par = docx.createP()
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  par = docx.createP()
  par.addText('2.2	(U) Missing Patches',{
      bold: true,
      font_face: 'Calibri',
      font_size: '14'
  })

  par = docx.createP()
  par.addText('Table 3 describes the Missing Patches vulnerability.',{
      font_face: 'Times New Roman',
      font_size: '12'
  })

  par = docx.createP()
  par.options.align = 'center'
  par.addText('Table 3. Missing Patches',{
      bold: true,
      font_face: 'Times New Roman',
      font_size: 14
  })

  var table = [
      [{
          val: 'ID',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1312.5,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: '2',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1312.5
          }
      },{
          val: '',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1312.5,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'IMPACT SCORE',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1312.5,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: '0',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 1312.5,
          }
      },{
          val: 'STATUS',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1312.5,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'OPEN',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1312.5,
              shd: {
                  fill: 'ff0000'
              }
          }
      },{
          val: 'POSTURE',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1312.5,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: 'HOST NAMES',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 4600,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'IP:PORT',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 4600,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'NEARSIDER',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1300
          }
      }],
      [`${findings[3].host} ${findings[4].host} ${findings[5].host}`, `${findings[3].ip} ${findings[4].ip} ${findings[5]}`]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: 'CAT',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 2100,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'CAT SCORE',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 2100,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'VsSCORE',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 2100,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'Vs',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 2100,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'IMPACT RATIONALE',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 2100,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: 'n/a',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 2100,
          }
      },{
          val: 'n/a',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 2100,
          }
      },{
          val: 'n/a',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 2100,
          }
      },{
          val: 'n/a',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 2100,
              shd: {
                  fill: 'fabf8f'
              }
          }
      },{
          val: 'Test',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 2100,
              shd: {
                  fill: 'ffff66'
              }
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: 'LIKELIHOOD',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'IMPACT',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'RISK',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'CM',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'C',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'I',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'A',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)


  var table = [
      [{
          val: 'INFO',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500,
              shd: {
                  fill: '0070c0'
              }
          }
      },{
          val: 'INFO',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500,
              shd: {
                  fill: '0070c0'
              }
          }
      },{
          val: 'INFO',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500,
              shd: {
                  fill: '0070c0'
              }
          }
      },{
          val: 'n/a',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500
          }
      },{
          val: 'N',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500
          }
      },{
          val: 'N',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500
          }
      },{
          val: 'N',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 1500
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: 'TYPE',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 1250,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'MISSING PATCHES',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 9250
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: '',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 1250,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'Missing Patches',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 20,
              align: 'center',
              cellColWidth: 9250
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: 'DESCRIPTION',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 1250,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'Several patches missing',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 9250,
              shd: {
                  fill: 'ffffcc'
              }
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2,
      spacingAfter: 2000
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: '',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 1250,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'Test',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 9250
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: 'MITIGATION',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 1250,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'Test',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 9250,
              shd: {
                  fill: 'ffffcc'
              }
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2,
      spacingAfter: 2000
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: 'REFERENCES',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 1250,
              shd: {
                  fill: 'c5d9f1'
              }
          }
      },{
          val: 'Figure X.',
          opts: {
              fontFamily: 'Times New Roman',
              sz: 24,
              align: 'center',
              cellColWidth: 9250,
              shd: {
                  fill: 'ffffcc'
              }
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  var table = [
      [{
          val: 'C-CONFIDENTIALITY      I-INTEGRITY     A-AVAILABILITY CM-COUNTERMEASURE',
          opts: {
              b: true,
              fontFamily: 'Times New Roman',
              sz: 16,
              align: 'center',
              cellColWidth: 10500
          }
      }]
  ]

  var tableStyle = {
      borders: true,
      borderSize: 2
  }
  docx.createTable (table, tableStyle)

  par = docx.createP()
  par.options.align = 'center'
  par.addText(`${findings[0].finding_classification}`,{
      font_face: 'Times New Roman',
      font_size: '12',
      color: '008000'
  })

  par = docx.createP()
  for (i = 0; i < 2; i++) {
      par.addLineBreak();
  }
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  docx.putPageBreak()

  par = docx.createP()
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  par = docx.createP()
  par.options.align = 'center'
  par.addText(`${findings[0].finding_classification}`,{
      font_face: 'Times New Roman',
      font_size: '12',
      color: '008000'
  })

  par = docx.createP()
  par.addImage(path.resolve(__dirname, './assets/img/Figure1.PNG'))

  par = docx.createP()
  par.options.align = 'center'
  par.addText(`${findings[0].finding_classification}`,{
      font_face: 'Times New Roman',
      font_size: '12',
      color: '008000'
  })

  par = docx.createP()
  par.options.align = 'center'
  par.addText('Figure 2 Sample Caption', {
      font_face: 'Calibri',
      font_size: '12',
      bold: true
  })

  par = docx.createP()
  for (i = 0; i < 32; i++) {
      par.addLineBreak();
  }
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  docx.putPageBreak()

  par = docx.createP()
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  par = docx.createP()
  par.addText('3.	CONCLUSIONS AND RECOMMENDATIONS', {
      font_face: 'Calibri',
      font_size: 16,
      bold: true
  })

  par = docx.createP()
  par.addText('Insert conclusions write up here', {
      font_face: 'Times New Roman',
      font_size: 12
  })

  par = docx.createP()
  for (i = 0; i < 33; i++) {
      par.addLineBreak();
  }
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  docx.putPageBreak()

  par = docx.createP()
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  par = docx.createP()
  for (i = 0; i < 21; i++) {
      par.addLineBreak();
  }
  par.options.align = 'center'
  par.addText('Appendix A – List of Acronym', {
      font_face: 'Calibri',
      font_size: 16,
      bold: true,
      color: '404040'
  })

  par = docx.createP()
  for (i = 0; i < 23; i++) {
      par.addLineBreak();
  }
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  docx.putPageBreak()
  par = docx.createP()
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  par.addLineBreak()
  par.addLineBreak()

  par = docx.createP()
  par.addText('CCDC       Combat Capabilities Development Command', {
      font_face: 'Times New Roman',
      font_size: 12
  })

  par.addLineBreak()
  par.addLineBreak()

  par = docx.createP()
  par.addText('DAC        Data & Analysis Center', {
      font_face: 'Times New Roman',
      font_size: 12
  })

  par = docx.createP()
  for (i = 0; i < 39; i++) {
      par.addLineBreak();
  }
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  docx.putPageBreak()

  par = docx.createP()
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  par = docx.createP()
  for (i = 0; i < 21; i++) {
      par.addLineBreak();
  }
  par.options.align = 'center'
  par.addText('Appendix B – Distribution List', {
      font_face: 'Calibri',
      font_size: 16,
      bold: true,
      color: '404040'
  })

  par = docx.createP()
  for (i = 0; i < 23; i++) {
      par.addLineBreak();
  }
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  docx.putPageBreak()

  par = docx.createP()
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  par = docx.createP()
  par.options.align = 'center'
  par.addText('ORGANIZATION',{
      font_face: 'Times New Roman',
      font_size: 12,
      bold: true
  })

  par = docx.createP()
  for (i = 0; i < 44; i++) {
      par.addLineBreak();
  }
  par.addImage(path.resolve(__dirname, './assets/img/Capture2.PNG'))

  var out = fs.createWriteStream(path.join(outDir, 'final_report.docx'))

  out.on('error', function (err) {
      console.log(err)
    })

  async.parallel(
      [
        function (done) {
          out.on('close', function () {
            console.log('Finished generating Final Report')
            done(null)
          })
          docx.generate(out)
        }
      ],
      function (err) {
        if (err) {
          console.log('error: ' + err)
        } // Endif.
      }
    )
}

const findingsTable = (findings) => {
    var dataRows = [
        {
          text: findings.id_form,
          options: {
            fontFace: 'Arial',
            align: 'left',
            fill: {color: 'cccecc'}
          }
        },
        {
          text: findings.finding_desc,
          options: {
            fontFace: 'Arial',
            align: 'left',
            fill: 'cccecc'
          }
        },
        {
          text: findings.finding_likelihood,
          options: {
            fontFace: 'Arial',
            align: 'left',
            fill: {color: 'cccecc'}
          }
        },
        {
          text: findings.impact_level,
          options: {
            fontFace: 'Arial',
            align: 'left',
            fill: {color: 'cccecc'}
          }
        },
        {
          text: findings.risk,
          options: {
            fontFace: 'Arial',
            align: 'left',
            fill: {color: 'cccecc'}
          }
        }
    ]
    return dataRows
  }
const main = async () => {
  createFinalReport(await getAnalysts(), await getEvents(), await getSystems(), await getFindings())
}

main()
