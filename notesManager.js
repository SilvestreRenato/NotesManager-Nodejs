// Declaração das dependencias
const fs = require("node:fs")
const path = require("node:path")
const readline = require("node:readline")

const notesDirectory = path.join(__dirname, "Notes")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function initializeNotesDirectory() {
  if (!fs.existsSync(notesDirectory)) {
    fs.mkdirSync(notesDirectory)
  }
}

// função responsavel por adicionar o arquivo na pasta Notes
function addFile() {
  rl.question("Digite um nome para o arquivo: ", (noteName) => {
    const notePath = path.join(notesDirectory, noteName)

    rl.question("Digite o conteudo do arquivo:\n", (content) => {
      fs.writeFileSync(notePath + ".txt", content, "utf-8")
      console.log(`Nota ${noteName} criada com sucesso!`)

      askForNextAction()
    })
  })
}

// função responsavel por listar todos os arquivos da pasta Notes
function listNotes() {
  const notes = fs.readdirSync(notesDirectory)

  if (notes.length === 0) {
    console.log("Nenhuma nota encontrada.")
  } else {
    console.log("Notas salvas:")
    notes.forEach((note, index) => {
      console.log(`${index + 1}. ${note}`)
    })
  }
}

// função que le o conteudo de um determinado arquivo
function readFile() {
  listNotes()

  rl.question("Digite o número da nota que deseja ler:", (index) => {
    const notes = fs.readdirSync(notesDirectory)
    const selectedNote = notes[index - 1]

    if (!selectedNote) {
      console.log("Número da nota inválido!")
    } else {
      const notePath = path.join(notesDirectory, selectedNote)
      const content = fs.readFileSync(notePath, "utf-8")
      console.log(`Conteúdo da nota "${selectedNote}":\n\n${content}`)
    }

    askForNextAction()
  })
}

// função responsavel por remover um arquivo da pasta Notes
function removeFile() {
  listNotes()

  rl.question("Digite o número da nota que deseja excluir:", (index) => {
    const notes = fs.readdirSync(notesDirectory)
    const selectedNote = notes[index - 1]

    if (!selectedNote) {
      console.log("Número de nota inválido")
    } else {
      const notePath = path.join(notesDirectory, selectedNote)
      fs.rmSync(notePath)
      console.log(`Nota "${selectedNote}" apagada com sucesso!`)
    }

    askForNextAction()
  })
}

function askForNextAction() {
  rl.question("\nDeseja realizar outra ação? (s/n)", (answer) => {
    if (answer.trim().toLocaleLowerCase() === "s") {
      main()
    } else {
      console.log("Encerrando...")
      rl.close()
      process.exit(0)
    }
  })
}

function main() {
  initializeNotesDirectory()

  console.clear()
  console.log("------------------------------")
  console.log("Notas Rápidas no Terminal v1.0")
  console.log("------------------------------\n")

  console.log("Escolha uma opção:")
  console.log("1. Listar notas")
  console.log("2. Ler uma nota")
  console.log("3. Criar uma nova nota")
  console.log("4. Excluir uma nota")
  console.log("5. Sair")

  rl.question("Digite o número da opção desejada: ", (option) => {
    switch (option) {
      case "1":
        listNotes()
        break;
      case "2":
        readFile()
        break;
      case "3":
        addFile()
        break;
      case "4":
        removeFile()
        break;
      case "5":
        console.log("Saindo...")
        rl.close()
        process.exit(0)
      default:
        console.log("Opção inválida!")
        break;
    }
  })
}

main()