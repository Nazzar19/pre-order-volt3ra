// 1. Tempat nyimpen memori keranjang pesanan
let keranjang = {
    'Supresso': 0,
    'Kopi Jahe': 0,
    'Americano': 0,
    'Deadline Drip': 0,
    'Veloura Roast': 0,
    'Better Hug': 0,
    'Just Friend': 0
};

// 2. Fungsi saat tombol + atau - diklik
function ubahQty(idElement, namaMenu, perubahan) {
    keranjang[namaMenu] += perubahan;
    
    // Cegah angka jadi minus
    if (keranjang[namaMenu] < 0) {
        keranjang[namaMenu] = 0;
    }
    
    // Update angka di layar menu
    document.getElementById(idElement).innerText = keranjang[namaMenu];
}

// 3. Fungsi saat tombol "Kirim Pre-Order" diklik
function kirimWA() {
    // --- FITUR KUNCI JAM 9 MALAM ---
    const waktuSekarang = new Date();
    const jam = waktuSekarang.getHours();

    // Cek kalau waktu sudah jam 21 (9 malam) ke atas (21.00 s/d 23.59)
    if (jam >= 21 || jam < 15) {
        alert("Maaf bro, Pre-Order hari ini sudah ditutup (maksimal jam 21.00). Silakan order lagi besok sore ya! ☕");
        return; // Menghentikan proses biar web nggak buka WhatsApp
    }
    // --------------------------------

    const nama = document.getElementById('nama').value.trim();
    const lokasi = document.getElementById('lokasi').value.trim();
    const nowa = document.getElementById('nowa').value.trim();
    const catatan = document.getElementById('catatan').value.trim();
    const pembayaran = document.getElementById('pembayaran').value;
    
    // Menyusun daftar pesanan dari menu yang udah di-klik +
    let daftarPesanan = "";
    for (let menu in keranjang) {
        if (keranjang[menu] > 0) {
            daftarPesanan += `- ${menu} (${keranjang[menu]} cup)%0A`;
        }
    }

    // Peringatan kalau belum milih kopi sama sekali
    if (daftarPesanan === "") {
        alert("Bro, pilih minimal 1 kopi dulu dong di menu sebelah kiri pakai tombol '+' !");
        return;
    }

    // Peringatan kalau form data diri ada yang kosong
    if (!nama || !lokasi || !nowa) {
        alert("Bro, isi dulu nama, lokasi, dan nomor WA-nya ya!");
        return;
    }

    const nomorWAOwner = "6285746185257"; 
    const isiCatatan = catatan ? catatan : "-";
    
    // Format pesan akhir yang dikirim ke WhatsApp
    const teksPesan = `Halo Volt3ra Coffee! ☕%0A%0ASaya mau konfirmasi Pre-Order:%0A%0A*Nama:* ${nama}%0A*Pesanan:*%0A${daftarPesanan}%0A*Catatan:* ${isiCatatan}%0A*Lokasi Antar:* ${lokasi}%0A*No. WA:* ${nowa}%0A*Metode Pembayaran:* ${pembayaran}%0A%0AMohon info total harga dan QRIS-nya ya bro!`;
    
    // Buka WhatsApp
    window.open(`https://wa.me/${nomorWAOwner}?text=${teksPesan}`, '_blank');
}

// --- FITUR ANIMASI MUNCUL SATU-SATU SAAT DI-SCROLL ---
document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-animate');
            }
        });
    }, {
        threshold: 0.15 
    });

    // Termasuk nambahin animasi ke feedback/ulasan
    const elementsToAnimate = document.querySelectorAll('.menu-item, .form-title, .input-group, .btn-order, .feedback-section');
    
    elementsToAnimate.forEach((el) => {
        el.classList.add('hidden-animate');
        observer.observe(el);
    });
});