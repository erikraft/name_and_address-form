document.getElementById('data-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // 1. Captura dos dados
    const name = document.getElementById('username').value;
    const email = document.getElementById('useremail').value;
    const content = `Nome: ${name}\nE-mail: ${email}\nGerado em: ${new Date().toLocaleString()}`;

    // Desativa botão para evitar cliques duplos durante a animação
    const submitBtn = document.getElementById('btn-submit');
    submitBtn.disabled = true;

    // Reseta estados anteriores caso existam
    document.getElementById('download-container').innerHTML = '';
    gsap.set("#file-box", { opacity: 0.2, scale: 0.8 });
    gsap.set("#status-light", { backgroundColor: "#64748b" });
    document.getElementById('status-text').innerText = "Aguardando dados...";

    // 2. Timeline de Animação GSAP para o fluxo
    const tl = gsap.timeline();

    // Pisca a primeira seta indicando envio
    tl.to("#arrow-1", { opacity: 1, color: "#38bdf8", yoyo: true, repeat: 3, duration: 0.2 })
      
      // Muda status do servidor para processando
      .to("#status-light", { backgroundColor: "#fbbf24", duration: 0.1 })
      .call(() => {
          document.getElementById('status-text').innerText = "Criando arquivo no servidor...";
      })
      
      // Animação de criação do arquivo simulado
      .to("#file-box", { opacity: 1, scale: 1.05, duration: 0.5, ease: "back.out(1.7)" })
      .to("#file-box", { scale: 1, duration: 0.1 })
      .to("#status-light", { backgroundColor: "#22c55e", duration: 0.1 })
      .call(() => {
          document.getElementById('status-text').innerText = "dados.txt gerado com sucesso!";
      })

      // Pisca a segunda seta indicando liberação para o cliente
      .to("#arrow-2", { opacity: 1, color: "#22c55e", yoyo: true, repeat: 3, duration: 0.2 })
      
      // Cria e exibe o botão dinâmico de download
      .call(() => {
          createDownloadButton(content);
          submitBtn.disabled = false;
      });
});

function createDownloadButton(textToSave) {
    const container = document.getElementById('download-container');
    
    // Criação do Blob (arquivo simulado em memória pelo navegador)
    const blob = new Blob([textToSave], { type: 'text/plain' });
    const fileUrl = URL.createObjectURL(blob);

    // Estrutura do botão dinâmico
    const downloadBtn = document.createElement('a');
    downloadBtn.href = fileUrl;
    downloadBtn.download = 'dados.txt';
    downloadBtn.className = 'btn-download';
    downloadBtn.innerHTML = '<i class="fa-solid fa-file-arrow-down"></i> Baixar dados.txt';
    downloadBtn.style.opacity = 0;
    downloadBtn.style.transform = 'translateY(20px)';

    container.appendChild(downloadBtn);

    // Animação de entrada do botão gerado
    gsap.to(downloadBtn, { opacity: 1, translateY: 0, duration: 0.5, ease: "power2.out" });
}
