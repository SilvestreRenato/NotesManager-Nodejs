// Declaração das dependencias
const fs = require("node:fs")
const path = require("node:path")
const readline = require("node:readline")

// Declaração das variaveis
const args = process.argv.slice(2);
const dir = "./Notes"

// construção da CLI
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// função responsavel por adicionar o arquivo na pasta Notes
function addFile() {
  let fileName = ""
  let content = ""
  rl.question("Digite um nome para o arquivo:\n", (resp) => {
    fileName = resp
    rl.question("digite o conteudo do arquivo:\n", (con) => {
      content = con
      fs.writeFile(`./Notes/${fileName}.txt`, content, "utf-8", (err) => {
        if(err) {
          console.log(err.message)
        } 
        console.log("Arquivo criado com sucesso!")
        rl.close()
      })
    })
  })
}

// função responsavel por listar todos os arquivos da pasta Notes
function listNotes() {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.log("Erro ao ler o diretorio", err)
    }
    console.log("Arquivos encontrados no diretorio:\n", files)
  })
  rl.close()
}

// função que le o conteudo de um determinado arquivo
function readFile() {
  rl.question("Digite o nome do arquivo desejado (sem extensão): \n", (fileName) => {
    const filePath = path.join(dir, `${fileName}.txt`)

    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.log("Erro ao ler o arquivo\nErro: ", err.message)
      }
      console.log("Conteúdo do arquivo:\n", data)
      rl.close()
    })
  })
}

// função responsavel por remover um arquivo da pasta Notes
function removeFile() {
  rl.question("Digite o nome do arquivo que deseja remover (sem extensão)", (fileName) => {
    const filePath = path.join(dir, `${fileName}.txt`)
    fs.rm(filePath, (err) => {
      if (err) {
        console.log("Erro ao encontrar o arquivo", err.message)
      }
      console.log("Arquivo excluido com sucesso!")
      rl.close()
    })
  })
}

if (args.length === 0) {
} else {
  const command = args[0]
  
  switch (command) {
    case "add":
      // adiciona um arquivo com nome e conteudo (nomeDoArquivo.txt)
      addFile()
      break;
    case "list":
      // Lista os arquivos do diretorio Notes
      listNotes()
      break;
    case "read":
      readFile()
      break;
    case "remove":
      removeFile()
      break; 
    default:
      break;
  }
}