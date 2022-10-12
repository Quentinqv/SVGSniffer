const fs = require('fs');
const glob = require("glob")
const path = 'tests/app/'

/**
 * @param {string} path
 */
function getUsedPaths(path) {
  glob(path+"**/*.svg", function (er, svgs) {
    glob(path+"**/*.{html,php}", function (er, files) {
      files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8')
        svgs.forEach(svg => {
          const svgName = svg.split('/').pop()
          if (content.includes(svgName)) {
            console.log(svg, 'is used in', file)
          }
        })
      })
    })
  })
}

function isThereDuplicatesNamedFiles(path) {
  glob(path+"**/*.svg", function (er, files) {
    const regex = /[^/]*$/
    const fileNames = files.map(file => file.match(regex)[0])
    
    const duplicatesNames = [...new Set(fileNames.filter((item, index) => fileNames.indexOf(item) != index))]

    if (duplicatesNames.length > 0) {
      console.log('There are duplicated files', duplicatesNames)
    } else {
      console.log('There are no duplicated files')
    }

    duplicatesNames.forEach(duplicate => {
      // regex sur filesNames qui contiennent le nom du fichier
      const filesWithDuplicateName = files.filter(file => file.match(regex)[0] === duplicate)
      let contents = []
      filesWithDuplicateName.forEach(duplicateName => {
        contents.push(fs.readFileSync(duplicateName, 'utf8'))
      });
      console.log('Files with duplicate name', filesWithDuplicateName)
    });
  })
}

// getUsedPaths(path)
isThereDuplicatesNamedFiles(path)
