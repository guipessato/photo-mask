

$(document).ready(function() {
    var profileImageFile = null;
    var overlayImageFile = null;
    var profileImg = new Image();
    var overlayImg = new Image();
    var canvas = document.getElementById('combinedCanvas');
    var ctx = canvas.getContext('2d');
    var canvasSize = 800; // Tamanho fixo do canvas

    // Configura o tamanho do canvas
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    // Função para desenhar a imagem de perfil no canvas
    function drawProfileImage() {
        if (profileImageFile) {
            var reader = new FileReader();
            reader.onload = function(event) {
                profileImg.src = event.target.result;
                profileImg.onload = function() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
                    ctx.drawImage(profileImg, 0, 0, canvasSize, canvasSize);
                    updateDownloadLink(); // Atualiza o link de download se a máscara já foi carregada
                };
            };
            reader.readAsDataURL(profileImageFile);
        }
    }

    // Função para desenhar a máscara no canvas
    function drawOverlayImage() {
        if (profileImg.src && overlayImageFile) {
            var reader = new FileReader();
            reader.onload = function(event) {
                overlayImg.src = event.target.result;
                overlayImg.onload = function() {
                    ctx.drawImage(overlayImg, 0, 0, canvasSize, canvasSize);
                    updateDownloadLink(); // Atualiza o link de download com a nova imagem combinada
                };
            };
            reader.readAsDataURL(overlayImageFile);
        }
    }

    // Atualiza o link de download com a imagem combinada
    function updateDownloadLink() {
        var dataURL = canvas.toDataURL('image/png');
        $('#download').attr('href', dataURL);
        $('#download-link').show(); // Mostra o link de download
    }

    // Evento de alteração para o upload da imagem de perfil
    $('#profileImageUpload').on('change', function() {
        profileImageFile = this.files[0];
        drawProfileImage(); // Exibe a imagem de perfil no canvas
    });

    // Evento de alteração para o upload da máscara
    $('#overlayImageUpload').on('change', function() {
        overlayImageFile = this.files[0];
        drawOverlayImage(); // Atualiza o canvas com a máscara sobre a imagem de perfil
    });
});
