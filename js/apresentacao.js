/* ================= PDF WORKER ================= */

pdfjsLib.GlobalWorkerOptions.workerSrc =
"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js";


/* ================= VARIÁVEIS ================= */

let pdfDoc = null
let pageNum = 1
const scale = 1.8

const canvas = document.getElementById("pdf-render")
const ctx = canvas ? canvas.getContext("2d") : null

const viewer = document.getElementById("visualizador")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")


/* ================= ABRIR PDF ================= */

function abrirPDF(pdf){

if(!viewer || !canvas) return

viewer.style.display = "flex"

pdfjsLib.getDocument(pdf).promise.then(function(pdfFile){

pdfDoc = pdfFile
pageNum = 1

renderPage(pageNum)

}).catch(function(error){

console.error("Erro ao abrir PDF:", error)

})

}


/* ================= RENDER PAGE ================= */

function renderPage(num){

if(!pdfDoc || !canvas) return

pdfDoc.getPage(num).then(function(page){

const viewport = page.getViewport({scale: scale})

canvas.height = viewport.height
canvas.width = viewport.width

page.render({
canvasContext: ctx,
viewport: viewport
})

})

}


/* ================= SLIDE ANTERIOR ================= */

function prevPage(){

if(pageNum <= 1) return

pageNum--
renderPage(pageNum)

}


/* ================= PRÓXIMO SLIDE ================= */

function nextPage(){

if(!pdfDoc) return

if(pageNum >= pdfDoc.numPages){

const fim = document.getElementById("fim-apresentacao")

if(fim) fim.style.display = "flex"

return

}

pageNum++
renderPage(pageNum)

}


/* ================= REINICIAR ================= */

function reiniciarSlides(){

const fim = document.getElementById("fim-apresentacao")

if(fim) fim.style.display = "none"

pageNum = 1
renderPage(pageNum)

}


/* ================= VOLTAR GALERIA ================= */

function voltarGaleria(){

const fim = document.getElementById("fim-apresentacao")

if(fim) fim.style.display = "none"

if(viewer) viewer.style.display = "none"

}


/* ================= FECHAR ================= */

function fechar(){

const fim = document.getElementById("fim-apresentacao")

if(fim) fim.style.display = "none"

if(viewer) viewer.style.display = "none"

}


/* ================= BOTÕES ================= */

if(prevBtn) prevBtn.addEventListener("click", prevPage)
if(nextBtn) nextBtn.addEventListener("click", nextPage)


/* ================= CONTROLE TECLADO ================= */

document.addEventListener("keydown", function(e){

if(!viewer || viewer.style.display !== "flex") return

if(e.key === "ArrowRight" || e.key === " "){
nextPage()
}

if(e.key === "ArrowLeft"){
prevPage()
}

if(e.key === "Escape"){
viewer.style.display = "none"
}

})


/* ================= GERAR MINIATURAS ================= */

function gerarMiniaturas(){

const thumbs = document.querySelectorAll(".thumb")

thumbs.forEach(function(canvasThumb){

const url = canvasThumb.dataset.pdf
const ctxThumb = canvasThumb.getContext("2d")

pdfjsLib.getDocument(url).promise.then(function(pdf){

pdf.getPage(1).then(function(page){

const viewport = page.getViewport({scale:0.7})

canvasThumb.height = viewport.height
canvasThumb.width = viewport.width

page.render({
canvasContext: ctxThumb,
viewport: viewport
})

})

}).catch(function(error){

console.error("Erro ao gerar miniatura:", error)

})

})

}


/* ================= DOM READY ================= */

document.addEventListener("DOMContentLoaded", function(){

gerarMiniaturas()

})