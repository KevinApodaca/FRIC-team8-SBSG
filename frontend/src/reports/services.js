
const axios = require('axios')
const pptxgen = require('pptxgenjs')
const pptx = new pptxgen()
const slides = pptx.addSlide()
const slide2  = pptx.addSlide()
const slide3  = pptx.addSlide()
const slide4  = pptx.addSlide()
const fs = require('fs')
var slide2Counter_y = 32

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

const getFindings = async () => {
  try {
    const res = await axios.get('http://localhost:3000/findings/all')

    const findings = res.data

    return findings

  } catch (e) {
    console.error(e)
  }
}

const createReports = (event, systems, findings) => {
  var today = new Date()
  var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
  pptx.author = 'Brent Ely';
  pptx.company = 'S.T.A.R. Laboratories';
  pptx.revision = '15';
  pptx.subject = 'Annual Report';
  pptx.title = 'PptxGenJS Sample Presentation';

  // pptx.setTitle('Powerpoint slide')
  // pptx.setSlideSize('screen16x9')

  // const slides = pptx.makeNewSlide()

  slides.addImage({path: './assets/img/army-logo.png',
    y: '5%',
    w: '12%',
    h: '25%'
  })
  slides.addImage({path: './assets/img/combat-logo.png',
     x: '12%',
     y: '6%',
     w: '10%',
     h: '20%'
  })
  slides.addImage({path: './assets/img/devcom-logo.png',
     x: '65%',
     y: '5%',
     w: '30%',
     h: '20%'
  })

  slides.addText('U.S. ARMY COMBAT CAPABILITIES DEVELOPMENT COMMAND -\n DATA & ANALYSIS CENTER   ', {
    fontFace: 'Arial',
    fontSize: 26,
    align: 'left',
    x: '4%',
    y: '46%',
    cx: '85%',
    cy: '10%'
  })
  slides.addText( ' ' + event[0].name + ' ' + event[0].event_type, {
    fontFace: 'Arial',
    fontSize: 20,
    align: 'left',
    x: '4%',
    y: '65%',
    cx: '100%',
    cy: '100%'
  })
  slides.addText('Name of Presenter', {
    fontFace: 'Arial',
    fontSize: 12,
    align: 'left',
    x: '4%',
    y: '80%'
  })
  slides.addText('Rank/Title of Presenter (Ex. CISSP, CE|H, Security+)', {
    fontFace: 'Arial',
    fontSize: 12,
    align: 'left',
    x: '4%',
    y: '85%'
  })
  slides.addText('Cyber Experimentation & Analysis Division', {
    fontFace: 'Arial',
    fontSize: 12,
    align: 'left',
    x: '4%',
    y: '90%',
    cx: '100%',
    cy: '100%'
  })
  slides.addText(date + ' at ' + time, {
    fontFace: 'Arial',
    fontSize: 8,
    x: '4%',
    y: '96%',
    color: 'd3d3d3'
  })

  slide2.addImage({path: './assets/img/army-logo-small.png',
    x: '4%',
    y: '4%',
    w: '6%',
    h: '14%'
  })
  slide2.addImage({path: './assets/img/combat-logo-small.png',
     x: '10%',
     y: '5%',
     w: '5%',
     h: '11%'
  })
  slide2.addImage({path: './assets/img/devcom-logo-small.png',
     x: '85%',
     y: '5%',
     w: '14%',
     h: '12%'
  })
  slide2.addText('SCOPE', {
    font_face: 'Arial',
    font_size: 20,
    bold: true,
    x: '16%',
    y: '13%'
  })
  slide2.addText('Systems assessed during the ' + event[0].event_type + ' are as follows:',{
    font_face: 'Arial',
    font_size: 18,
    bold: true,
    x: '4%',
    y: '25%',
  })

  systems.map(slide2Text)


  slide3.addImage({path: './assets/img/army-logo-small.png',
    x: '4%',
    y: '4%',
    w: '6%',
    h: '14%'
  })
  slide3.addImage({path: './assets/img/combat-logo-small.png',
     x: '10%',
     y: '5%',
     w: '5%',
     h: '11%'
  })
  slide3.addImage({path: './assets/img/devcom-logo-small.png',
     x: '85%',
     y: '5%',
     w: '14%',
     h: '12%'
  })
  slide3.addText('FINDINGS', {
    font_face: 'Arial',
    font_size: 20,
    bold: true,
    x: '16%',
    y: '13%'
  })
  // var headerRow = [
  //   {
  //     val: "ID",
  //           opts: {
  //               font_face   : "Arial",
  //               font_size   : 18,
  //               align       : "center",
  //               bold        : true,
  //               font_color  : 'ffffff',
  //               fill_color  : '32362c'
  //           }
  //
  //   },
  //   {
  //     val: "System",
  //           opts: {
  //               font_face   : "Arial",
  //               font_size   : 18,
  //               align       : "center",
  //               bold        : true,
  //               font_color  : 'ffffff',
  //               fill_color  : '32362c'
  //           }
  //
  //
  //   },
  //   {
  //     val: "Finding",
  //           opts: {
  //               font_face   : "Arial",
  //               font_size   : 18,
  //               align       : "center",
  //               bold        : true,
  //               font_color  : 'ffffff',
  //               fill_color  : '32362c'
  //           }
  //
  //   },
  //   {
  //     val: "Impact",
  //           opts: {
  //               font_face   : "Arial",
  //               font_size   : 18,
  //               align       : "center",
  //               bold        : true,
  //               font_color  : 'ffffff',
  //               fill_color  : '32362c'
  //           }
  //
  //   },
  //   {
  //     val: "Risk",
  //           opts: {
  //               font_face   : "Arial",
  //               font_size   : 18,
  //               align       : "center",
  //               bold        : true,
  //               font_color  : 'ffffff',
  //               fill_color  : '32362c'
  //           }
  //
  //   }
  // ]
  //
  // var dataRows = findings.map(slide3Text)
  //
  // const columnDefinition = [170000, 170000, 170000, 170000, 170000]
  // var table = []
  // table.push(headerRow)
  //
  // for (var index in dataRows) {
  //   table.push(dataRows[index])
  // }
  //
  // slide3.addTable(table, {
  //   font_size: 10,
  //   font_face: 'Arial',
  //   x: '4%',
  //   columnWidths: columnDefinition
  // })
  //
  // // Column chart
  // // slide4  = pptx.makeNewSlide()
  // slide4.addImage('./assets/img/army-logo-small.png', {
  //   x: '4%',
  //   y: '4%'
  // })
  // slide4.addImage('./assets/img/combat-logo-small.png', {
  //    x: '12%',
  //    y: '5%'
  // })
  // slide4.addImage('./assets/img/devcom-logo-small.png', {
  //    x: '85%',
  //    y: '5%'
  // })
  // slide4.addText('FINDINGS HISTOGRAM', {
  //   font_face: 'Arial',
  //   font_size: 20,
  //   bold: true,
  //   x: '20%',
  //   y: '7%',
  //   cx: '100%',
  //   cy: '100%'
  // })
  //  slide4.addChart(
  //   {
  //       title: 'Column Chart',
  //       renderType: 'column',
  //       valAxisTitle: 'Costs/Revenues ($)',
  //       catAxistTitle: 'Category',
  //       valAxisNumFmt: '$0',
  //             valAxisMaxValue: 24,
  //     data: [
  //       {
  //         name: 'Income',
  //         labels: ['2005', '2006', '2007', '2008', '2009'],
  //         values: [23.5, 26.2, 30.1, 29.5, 24.6]
  //       },
  //       {
  //         name: 'Expense',
  //         labels: ['2005, 2006', '2007', '2008', '2009'],
  //         values: [18.1, 22.8, 23.9, 25.1, 25]
  //       }]
  //   }
  // )


  // const out = fs.createWriteStream('ERB-Report.pptx')
  //
  // const closed = () => console.log('ERB report has been generated')
  // out.on('close', closed)
  pptx.writeFile('ERB-Report.pptx')
      .then(fileName => {
          console.log(`created file: ${fileName}`);
      });
}

const slide2Text = (system) => {

  slide2.addText('- ' + system.name, {
    font_face: 'Arial',
    font_size: 16,
    x: '8%',
    y: (slide2Counter_y + '%'),
  })
  slide2Counter_y += 6
}

const slide3Text = (findings) => {
  var dataRows = [
      {
        val: findings.id_form,
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
        val: findings.finding_title,
        opts: {
          font_face: 'Arial',
          align: 'center',
          fill_color: 'cccecc'
        }
      },
      {
        val: findings.impact_level,
        opts: {
          font_face: 'Arial',
          align: 'center',
          fill_color: 'cccecc'
        }
      },
      {
        val: findings.risk,
        opts: {
          font_face: 'Arial',
          align: 'center',
          fill_color: 'cccecc'
        }
      }
  ]

  return dataRows
}

const main = async () => {
  createReports(await getEvents(), await getSystems(), await getFindings())
}

main()
