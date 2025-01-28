// Çeşitli sorular ve chatbot'un vereceği cevaplar
const responses = {
    "Merhaba": "Merhaba! Size nasıl yardımcı olabilirim?",
    "Yurtdışı üniversiteleri hakkında bilgi verir misin?": "Yurtdışındaki üniversiteler hakkında birçok bilgiye sahibiz! Hangi ülkelerle ilgileniyorsunuz?",
    "Başvuru nasıl yapılır?": "Başvuru sürecimiz çok kolay! Başvurularınız için adım adım rehberlik sağlıyoruz.",
    "Vize işlemleri hakkında bilgi verir misiniz?": "Vize işlemleri hakkında detaylı bilgilere sahibiz. Hangi ülkeye vize başvurusu yapacaksınız?",
    "Hizmetleriniz nelerdir?": "Üniversite seçimi, vize ve seyahat rehberliği, sigorta işlemleri ve daha fazlası!",
    "Teşekkür ederim": "Rica ederim, yardıma ihtiyacınız olursa her zaman buradayım!"
};

// Kullanıcıdan gelen inputu al ve cevap ver
function getBotResponse() {
    const userInput = document.getElementById("user-input").value;
    const chatlogs = document.getElementById("chatlogs");

    // Kullanıcı inputunu ekle
    if (userInput) {
        const userMessage = document.createElement("p");
        userMessage.classList.add("user-text");
        userMessage.innerText = userInput;
        chatlogs.appendChild(userMessage);
        
        // Bot cevabını ver
        const botMessage = document.createElement("p");
        botMessage.classList.add("bot-text");

        // Cevapları kontrol et
        if (responses[userInput]) {
            botMessage.innerText = responses[userInput];
        } else {
            botMessage.innerText = "Üzgünüm, bu konuda bir cevabım yok.";
        }
        
        chatlogs.appendChild(botMessage);
        document.getElementById("user-input").value = ""; // Input alanını temizle
        chatlogs.scrollTop = chatlogs.scrollHeight; // En son mesaja kaydır
    }
}


// Modal açılma fonksiyonu
function openServices() {
    document.getElementById("servicesModal").style.display = "block";
}

// Modal kapanma fonksiyonu
function closeServices() {
    document.getElementById("servicesModal").style.display = "none";
}

// Sayfa dışına tıklanırsa da modal kapanacak
window.onclick = function(event) {
    if (event.target == document.getElementById("servicesModal")) {
        closeServices();
    }
}


// Chatbot açma ve kapama fonksiyonları
function openChatbot() {
    document.getElementById('chatbot').style.display = 'block';
}

function closeChatbot() {
    document.getElementById('chatbot').style.display = 'none';
}

// Mesajları göndermek için fonksiyon
function sendMessage(event) {
    if (event.key === 'Enter' || event.type === 'click') {
        const userInput = document.getElementById('user-input').value;
        if (userInput.trim() === "") return; // Boş mesaj gönderilmesin

        // Kullanıcı mesajını ekle
        addMessage('user', userInput);

        // Bot cevabını belirle
        const botResponse = getBotResponse(userInput);
        addMessage('bot', botResponse);

        // Mesaj kutusunu temizle
        document.getElementById('user-input').value = '';
    }
}

// Kullanıcı ve bot mesajlarını eklemek için yardımcı fonksiyon
function addMessage(sender, message) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', sender + '-message');
    messageContainer.textContent = message;

    document.getElementById('chatbot-messages').appendChild(messageContainer);

    // Mesajlar en son eklenene kayması için
    document.getElementById('chatbot-messages').scrollTop = document.getElementById('chatbot-messages').scrollHeight;
}

// Bot cevaplarını belirleyen fonksiyon
function getBotResponse(userInput) {
    const lowerCaseInput = userInput.toLowerCase();

    if (lowerCaseInput.includes("merhaba") || lowerCaseInput.includes("selam")) {
        return "Merhaba! Size nasıl yardımcı olabilirim?";
    } else if (lowerCaseInput.includes("üniversite") || lowerCaseInput.includes("eğitim")) {
        return "Yurtdışındaki üniversiteler hakkında daha fazla bilgi verebilirim. Hangi konuda yardımcı olabilirim?";
    } else if (lowerCaseInput.includes("başvuru")) {
        return "Başvuru süreci hakkında detaylı bilgi almak isterseniz, başvuru formunu doldurabilirsiniz.";
    } else if (lowerCaseInput.includes("iletişim")) {
        return "İletişim için bize murad.edu.tm@gmail.com adresinden ulaşabilirsiniz.";
    } else {
        return "Üzgünüm, bu konuda bilgi veremiyorum. Başka bir sorunuz var mı?";
    }
}

// Chatbotu sayfa yüklendiğinde açalım
window.onload = function() {
    setTimeout(openChatbot, 3000); // 3 saniye sonra chatbot açılacak
};

// SSS soruları tıklandığında cevapları açma/kapatma
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        
        // Eğer cevap açık değilse, aç
        if (!answer.classList.contains('show')) {
            // Tüm cevapları kapat
            document.querySelectorAll('.faq-answer').forEach(answer => {
                answer.classList.remove('show');
            });
            // Tıklanan cevabı aç
            answer.classList.add('show');
        } else {
            // Cevabı kapat
            answer.classList.remove('show');
        }
    });
});

document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', function() {
        const answer = this.nextElementSibling; // Cevap, soru başlığının hemen altındaki <p> olmalı
        
        // Eğer cevap görünür değilse, göster
        if (!answer.classList.contains('show')) {
            // Tüm cevapları kapat
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('show');
            });
            // Seçilen cevabı göster
            answer.classList.add('show');
        } else {
            // Cevabı gizle
            answer.classList.remove('show');
        }
    });
});


fetch("https://metropolkurslari.com/2024-yurtdisindan-ogrenci-kabulu-ve-universitelere-basvurular-rehberi-2/")
  .then(response => response.text())
  .then(data => {
    // Sayfa içeriğini işleme ve güncelleme işlemi
    document.getElementById("universities").innerHTML = data;
  });



  // Chatbot'u açma fonksiyonu
function openChatbot() {
    document.getElementById('chatbot').style.display = 'block';
    document.getElementById('open-chatbot-btn').style.display = 'none'; // Chatbot açıldığında butonu gizle
}

// Chatbot'u kapama fonksiyonu
function closeChatbot() {
    document.getElementById('chatbot').style.display = 'none';
    document.getElementById('open-chatbot-btn').style.display = 'block'; // Chatbot kapandığında butonu göster
}

// Mesaj gönderme fonksiyonu
function sendMessage(event) {
    if (event.key === 'Enter' || event.type === 'click') {
        const userInput = document.getElementById('user-input').value;
        if (userInput.trim() !== "") {
            // Kullanıcının mesajını ekle
            const userMessage = document.createElement('div');
            userMessage.className = 'user-message';
            userMessage.textContent = userInput;
            document.getElementById('chatbot-messages').appendChild(userMessage);

            // Bot cevabını ekle (Örnek bir bot cevabı)
            const botMessage = document.createElement('div');
            botMessage.className = 'bot-message';
            botMessage.textContent = "Chatbot: " + "Bana yazdığınız mesajı aldım!";
            document.getElementById('chatbot-messages').appendChild(botMessage);

            // Input alanını temizle
            document.getElementById('user-input').value = '';
        }
    }
}


document.getElementById("appointmentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Kullanıcının girdiği verileri al
    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // Eğer alanlar doluysa
    if (name && date && time) {
        // Mesajı göster
        document.getElementById("message").innerHTML = `<p>Randevunuz başarıyla alındı!<br>Adınız: ${name}<br>Tarih: ${date}<br>Saat: ${time}</p>`;
        // Formu sıfırla
        document.getElementById("appointmentForm").reset();
    } else {
        // Eksik bilgi varsa uyarı mesajı
        document.getElementById("message").innerHTML = `<p>Lütfen tüm alanları doldurun.</p>`;
    }
});

// Dil veritabanı (JSON yapısı)
const translations = {
    "en": {
        "heading": "Welcome!",
        "description": "This is a multilingual web page. You can change the language from here."
    },
    "tr": {
        "heading": "Hoş Geldiniz!",
        "description": "Bu, çok dilli bir web sayfasıdır. Buradan dili değiştirebilirsiniz."
    },
    "fr": {
        "heading": "Bienvenue!",
        "description": "Ceci est une page web multilingue. Vous pouvez changer la langue ici."
    }
};

// Sayfa yüklendiğinde varsayılan dilin seçilmesi
window.onload = function() {
    const savedLang = localStorage.getItem('lang') || 'tr'; // Varsayılan olarak Türkçe
    document.getElementById('languageSwitcher').value = savedLang;
    changeLanguage(savedLang); // Sayfayı dilde değiştir
}

// Dil değiştiğinde çalışacak fonksiyon
function changeLanguage(lang = document.getElementById('languageSwitcher').value) {
    // Seçilen dildeki çeviriyi al
    const translation = translations[lang];

    // İçeriği değiştir
    document.getElementById('heading').textContent = translation.heading;
    document.getElementById('description').textContent = translation.description;

    // Dil bilgisini localStorage'da sakla
    localStorage.setItem('lang', lang);
}
