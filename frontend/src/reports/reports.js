const officegen = require('officegen')
const fs = require('fs')

var today = new Date()
var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

const pptx = officegen('pptx')
pptx.setDocTitle('Powerpoint slide')
pptx.setSlideSize('screen16x9')

const slides = pptx.makeNewSlide()
slides.name = 'ERB Report'

slides.addImage('./assets/img/army-logo.png', {
  y: '5%'
})
slides.addImage('./assets/img/combat-logo.png', {
   x: '20%',
   y: '6%'
})
slides.addImage('./assets/img/devcom-logo.png', {
   x: '65%',
   y: '5%'
})

slides.addText('U.S. ARMY COMBAT CAPABILITIES DEVELOPMENT COMMAND -\n DATA & ANALYSIS CENTER   ', {
  font_face: 'Arial',
  font_size: 36,
  align: 'left',
  x: '4%',
  y: '35%',
  cx: '85%',
  cy: '10%'
})
slides.addText('{{evemt.name}} + {{evemt.type}}', {
  font_face: 'Arial',
  font_size: 20,
  align: 'left',
  x: '4%',
  y: '65%',
  cx: '100%',
  cy: '100%'
})
slides.addText('Name of Presenter', {
  font_face: 'Arial',
  font_size: 12,
  align: 'left',
  x: '4%',
  y: '80%'
})
slides.addText('Rank/Title of Presenter', {
  font_face: 'Arial',
  font_size: 12,
  align: 'left',
  x: '4%',
  y: '85%'
})
slides.addText('Cyber Experimentation & Analysis Division', {
  font_face: 'Arial',
  font_size: 12,
  align: 'left',
  x: '4%',
  y: '90%',
  cx: '100%',
  cy: '100%'
})
slides.addText(date + ' at ' + time, {
  font_face: 'Arial',
  font_size: 8,
  x: '4%',
  y: '96%',
  color: 'd3d3d3'
})

slide2  = pptx.makeNewSlide()
slide2.addImage('./assets/img/army-logo-small.png', {
  x: '4%',
  y: '4%'
})
slide2.addImage('./assets/img/combat-logo-small.png', {
   x: '12%',
   y: '5%'
})
slide2.addImage('./assets/img/devcom-logo-small.png', {
   x: '85%',
   y: '5%'
})
slide2.addText('SCOPE', {
  font_face: 'Arial',
  font_size: 20,
  bold: true,
  x: '20%',
  y: '7%'
})
slide2.addText('Systems assessed during the {{event.type}} are as follows:',{
  font_face: 'Arial',
  font_size: 18,
  bold: true,
  x: '4%',
  y: '20%',
  cx: '100%',
  cy: '100%'
})
slide2.addText('-' + 'systems[i].systemName', {
  font_face: 'Arial',
  font_size: 16,
  x: '8%',
  y: '25%',
  cx: '92%',
  cy: '2cm'
})

slide3  = pptx.makeNewSlide()
slide3.addImage('./assets/img/army-logo-small.png', {
  x: '4%',
  y: '4%'
})
slide3.addImage('./assets/img/combat-logo-small.png', {
   x: '12%',
   y: '5%'
})
slide3.addImage('./assets/img/devcom-logo-small.png', {
   x: '85%',
   y: '5%'
})
slide3.addText('FINDINGS', {
  font_face: 'Arial',
  font_size: 20,
  bold: true,
  x: '20%',
  y: '7%'
})
var headerRow = [
  {
    val: "ID",
          opts: {
              font_face   : "Arial",
              font_size   : 18,
              align       : "center",
              bold        : true,
              font_color  : 'ffffff',
              fill_color  : '32362c'
          }

  },
  {
    val: "System",
          opts: {
              font_face   : "Arial",
              font_size   : 18,
              align       : "center",
              bold        : true,
              font_color  : 'ffffff',
              fill_color  : '32362c'
          }


  },
  {
    val: "Finding",
          opts: {
              font_face   : "Arial",
              font_size   : 18,
              align       : "center",
              bold        : true,
              font_color  : 'ffffff',
              fill_color  : '32362c'
          }

  },
  {
    val: "Impact",
          opts: {
              font_face   : "Arial",
              font_size   : 18,
              align       : "center",
              bold        : true,
              font_color  : 'ffffff',
              fill_color  : '32362c'
          }

  },
  {
    val: "Risk",
          opts: {
              font_face   : "Arial",
              font_size   : 18,
              align       : "center",
              bold        : true,
              font_color  : 'ffffff',
              fill_color  : '32362c'
          }

  }
]

var dataRows = [
    {
      val: 'findings.finding_id',
      opts: {
        font_face: 'Arial',
        align: 'center',
        fill_color: 'cccecc'
      }
    },
    {
      val: 'findings.system_name',
      opts: {
        font_face: 'Arial',
        align: 'center',
        fill_color: 'cccecc'
      }
    },
    {
      val: 'findings.finding_name',
      opts: {
        font_face: 'Arial',
        align: 'center',
        fill_color: 'cccecc'
      }
    },
    {
      val: 'findings.finding_impact',
      opts: {
        font_face: 'Arial',
        align: 'center',
        fill_color: 'cccecc'
      }
    },
    {
      val: 'findings.finding_risk',
      opts: {
        font_face: 'Arial',
        align: 'center',
        fill_color: 'cccecc'
      }
    }
]

var columnDefinition = [170000, 170000, 170000, 170000, 170000]

slide3.addTable([headerRow, dataRows], {
  font_size: 10,
  font_face: 'Arial',
  x: '4%',
  columnWidths: columnDefinition
})
// Column chart
slide4  = pptx.makeNewSlide()
slide4.addImage('./assets/img/army-logo-small.png', {
  x: '4%',
  y: '4%'
})
slide4.addImage('./assets/img/combat-logo-small.png', {
   x: '12%',
   y: '5%'
})
slide4.addImage('./assets/img/devcom-logo-small.png', {
   x: '85%',
   y: '5%'
})
slide4.addText('FINDINGS HISTOGRAM', {
  font_face: 'Arial',
  font_size: 20,
  bold: true,
  x: '20%',
  y: '7%',
  cx: '100%',
  cy: '100%'
})
/* slide4.addChart(
  {
      title: 'Column Chart',
      renderType: 'column',
      valAxisTitle: 'Costs/Revenues ($)',
      catAxistTitle: 'Category',
      valAxisNumFmt: '$0',
            valAxisMaxValue: 24,
    data: [
      {
        name: 'Income',
        labels: ['2005', '2006', '2007', '2008', '2009'],
        values: [23.5, 26.2, 30.1, 29.5, 24.6]
      },
      {
        name: 'Expense',
        labels: ['2005, 2006', '2007', '2008', '2009'],
        values: [18.1, 22.8, 23.9, 25.1, 25]
      }]
  }
) */


const out = fs.createWriteStream('ERB-Report.pptx')

const closed = () => console.log('ERB report has been generated')
out.on('close', closed)

pptx.generate(out)
