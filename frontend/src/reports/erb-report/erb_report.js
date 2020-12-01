const axios = require('axios')
const pptxgen = require('pptxgenjs')
const fs = require('fs')
const pptx = new pptxgen()
const slides = pptx.addSlide()
const slide2  = pptx.addSlide()
const slide3  = pptx.addSlide()
const lastSlide  = pptx.addSlide()
var slide2Counter_y = 32

// Grabs all of the events
const getEvents = async () => {
  try {
    const res = await axios.get('http://localhost:3000/events/all')
    const events = res.data
    return events
  }
  catch (e) {
    console.error(e)
  }
}

// Grabs all of the systems
const getSystems = async () => {
  try {
    const res = await axios.get('http://localhost:3000/systems/all')
    const systems = res.data
    return systems
  }
  catch (e) {
    console.error(e)
  }
}

// Grabs all of the findings
const getFindings = async () => {
  try {
    const res = await axios.get('http://localhost:3000/findings/all')
    const findings = res.data
    return findings

  }
  catch (e) {
    console.error(e)
  }
}

const createReports = (event, systems, findings) => {
  var today = new Date()
  var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
  pptx.author = 'team-8';
  pptx.company = 'CEAD';
  pptx.revision = '1';
  pptx.subject = 'ERB Report';
  pptx.title = 'ERB Report';

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
    fontFace: 'Arial',
    fontSize: 20,
    bold: true,
    x: '16%',
    y: '13%'
  })
  slide2.addText('Systems assessed during the ' + event[0].event_type + ' are as follows:',{
    fontFace: 'Arial',
    fontSize: 18,
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
    fontFace: 'Arial',
    fontSize: 20,
    bold: true,
    x: '16%',
    y: '13%'
  })

  var headerRow = [
    {
      text: "ID",
            options: {
                fontFace : "Arial",
                fontSize : 18,
                align    : "left",
                valign   :'bottom',
                bold     : true,
                color    :'ffffff',
                fill: { color: '32362c' }
            }

    },
    {
      text: "System",
            options: {
                fontFace : "Arial",
                fontSize : 18,
                align    : "left",
                valign   :'bottom',
                bold     : true,
                color    :'ffffff',
                fill: { color: '32362c' }
            }


    },
    {
      text: "Finding",
            options: {
                fontFace : "Arial",
                fontSize : 18,
                align    : "left",
                valign   :'bottom',
                bold     : true,
                color    : 'ffffff',
                fill: { color: '32362c' }
            }

    },
    {
      text: "Impact",
            options: {
                fontFace  : "Arial",
                fontSize  : 18,
                align     : "left",
                valign    : 'bottom',
                bold      : true,
                color     : 'ffffff',
                fill: { color: '32362c' }
            }

    },
    {
      text: "Risk",
      options: {
          fontFace : "Arial",
          fontSize : 18,
          align    : "left",
          valign   : 'bottom',
          bold     : true,
          color    : 'ffffff',
          fill: { color: '32362c' }
      }
    }
  ]

  var dataRows = findings.map(slide3Text)
  const columnDefinition = [.5, 2.5, 1.5, 1.5, 1.5]
  var table = []
  table.push(headerRow)

  for (var index in dataRows) {
    table.push(dataRows[index])
  }

  slide3.addTable(
    table, {
      x: 0.7,
      y: 1.3,
      w: columnDefinition.reduce((a,b) => a + b, 0),
      colW: columnDefinition,
      rowH: 0.40,
      border: {pt:'1', color:'ffffff'},
      autoPage: true,
      autoPageRepeatHeader: true,
      autoPageLineWeight: 1 ,
      newSlideStartY: 1.6
    }, {})


    lastSlide.addImage({path: './assets/img/army-logo-small.png',
      x: '4%',
      y: '4%',
      w: '6%',
      h: '14%'
    })
    lastSlide.addImage({path: './assets/img/combat-logo-small.png',
       x: '10%',
       y: '5%',
       w: '5%',
       h: '11%'
    })
    lastSlide.addImage({path: './assets/img/devcom-logo-small.png',
       x: '85%',
       y: '5%',
       w: '14%',
       h: '12%'
    })
    lastSlide.addText('FINDINGS HISTOGRAM', {
      fontFace: 'Arial',
      fontSize: 20,
      bold: true,
      x: '16%',
      y: '13%'
    })

    let dataChartAreaLine = [
        {
            labels: ["INFO", "VERY LOW", "LOW", "MEDIUM", "HIGH", "VERY HIGH"],
            values: [10, 20, 15, 5, 35, 21],
        },
    ]

  lastSlide.addChart(pptx.charts.BAR3D, dataChartAreaLine,
    {
      x: 1,
      y: 1,
      w: 8,
      h: 4,
      bar3DShape:'box',
      showTitle : true,
      title: 'Findings Risks',
      valAxisLineShow: false,
      valueBarColors: true,
    });

  pptx.writeFile('erb_report.pptx')
      .then(fileName => {
          console.log(`Finished creating ${fileName}`);
      });
}

const slide2Text = (system) => {

  slide2.addText('- ' + system.name, {
    fontFace: 'Arial',
    fontSize: 16,
    x: '8%',
    y: (slide2Counter_y + '%'),
  })
  slide2Counter_y += 6
}

const slide3Text = (findings) => {
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
        text: findings.systems_for_findings,
        options: {
          fontFace: 'Arial',
          align: 'left',
          fill: 'cccecc'
        }
      },
      {
        text: findings.finding_title,
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
  createReports(await getEvents(), await getSystems(), await getFindings())
}

main()
