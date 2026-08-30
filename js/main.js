// 1. Daftar Harga dan Memori Keranjang
const hargaMenu = {
    'Supresso': 5000,
    'Kopi Jahe': 7000,
    'Americano': 8000,
    'Deadline Drip': 11000,
    'Veloura Roast': 12000,
    'Better Hug': 12000,
    'Just Friend': 12000
};

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
    // --- FITUR KUNCI JAM BUKA & TUTUP (15.00 - 21.00) ---
    const waktuSekarang = new Date();
    const jam = waktuSekarang.getHours();

    if (jam >= 21 || jam < 15) {
        alert("Maaf bro, Pre-Order saat ini sedang tutup. Kita buka jam 15.00 sampai 21.00 ya! ☕");
        return; 
    }
    // --------------------------------

    const nama = document.getElementById('nama').value.trim();
    const lokasi = document.getElementById('lokasi').value.trim();
    const nowa = document.getElementById('nowa').value.trim();
    const catatan = document.getElementById('catatan').value.trim();
    const pembayaran = document.getElementById('pembayaran').value;
    
    // Menyusun daftar pesanan dan menghitung TOTAL HARGA
    let daftarPesanan = "";
    let totalHarga = 0;

    for (let menu in keranjang) {
        if (keranjang[menu] > 0) {
            let subTotal = keranjang[menu] * hargaMenu[menu]; // Ngitung jumlah cup dikali harga menu
            totalHarga += subTotal; // Menambahkan ke total keseluruhan
            
            daftarPesanan += `- ${menu} (${keranjang[menu]} cup)%0A`;
        }
    }

    // Peringatan kalau belum milih kopi
    if (daftarPesanan === "") {
        alert("Bro, pilih minimal 1 kopi dulu dong di menu sebelah kiri pakai tombol '+' !");
        return;
    }

    // Peringatan kalau form data diri kosong
    if (!nama || !lokasi || !nowa) {
        alert("Bro, isi dulu nama, lokasi, dan nomor WA-nya ya!");
        return;
    }

    const nomorWAOwner = "6285746185257"; 
    const isiCatatan = catatan ? catatan : "-";
    
    // Mengubah angka total jadi format uang (contoh: 31000 jadi 31.000)
    const formatTotalHarga = totalHarga.toLocaleString('id-ID');
    
    // Format pesan akhir yang dikirim ke WhatsApp (Ada baris Total Harga)
    const teksPesan = `Halo Volt3ra Coffee! ☕%0A%0ASaya mau konfirmasi Pre-Order:%0A%0A*Nama:* ${nama}%0A*Pesanan:*%0A${daftarPesanan}%0A*Total Harga: Rp ${formatTotalHarga}*%0A%0A*Catatan:* ${isiCatatan}%0A*Lokasi Antar:* ${lokasi}%0A*No. WA:* ${nowa}%0A*Metode Pembayaran:* ${pembayaran}%0A%0AMohon info QRIS-nya ya bro!`;
    
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

    const elementsToAnimate = document.querySelectorAll('.menu-item, .form-title, .input-group, .btn-order, .feedback-section');
    
    elementsToAnimate.forEach((el) => {
        el.classList.add('hidden-animate');
        observer.observe(el);
    });
});