const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const dedent = require('dedent')

const root = 'src/content/posts'

const generateFrontMatter = (answers) => {
    let d = new Date()
    const date = [
      d.getFullYear(),
      ('0' + (d.getMonth() + 1)).slice(-2),
      ('0' + d.getDate()).slice(-2),
    ].join('-')
    const tagArray = answers.tags.split(',')
    tagArray.forEach((tag, index) => (tagArray[index] = tag.trim()))
    const tags = "'" + tagArray.join("','") + "'"
  
    let frontMatter = dedent`---
    title: "${answers.title ? answers.title : 'Untitled'}"
    date: ${date}
    tags: [${answers.tags ? tags : ''}]
    description: "${answers.description ? answers.description : ' '}"
    `
  
    frontMatter = frontMatter + '\n---'
  
    return frontMatter
  }

inquirer
  .prompt([
    {
      name: 'title',
      message: 'Enter post title:',
      type: 'input',
    },
    {
      name: 'description',
      message: 'Enter post description:',
      type: 'input',
    },
    {
      name: 'tags',
      message: 'Any Tags? Separate them with , or leave empty if no tags.',
      type: 'input',
    },
  ])
  .then((answers) => {
    // Remove special characters and replace space with -
    const fileName = answers.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/ /g, '-')
      .replace(/-+/g, '-')
    const frontMatter = generateFrontMatter(answers)
    const postPath = `${root}/${fileName ? fileName : 'untitled'}.md`
    fs.writeFile(postPath, frontMatter, { flag: 'wx' }, (err) => {
      if (err) {
        throw err
      } else {
        console.log(`Blog post generated successfully at ${postPath}`)
      }
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment")
    } else {
        console.log(error)
      console.log('Something went wrong, sorry!')
    }
  })