// ====================================================================
// FOTO GEDUNG
// Menampilkan foto gedung awal & tujuan pada hasil rute, serta pada popup
// penanda di peta. Kunci = id node di graph.js, file ada di assets/foto/.
// Mau mengganti foto? Cukup timpa file-nya dengan nama yang sama.
// ====================================================================
const FOTO_GEDUNG = {
    gedung_12:     "assets/foto/gedung_12.jpg",
    lab_fisika:    "assets/foto/lab_fisika.jpg",
    lab_biologi:   "assets/foto/lab_biologi.jpg",
    lab_komputer:  "assets/foto/lab_komputer.jpg",
    rumah_kaca:    "assets/foto/rumah_kaca.jpg",
    lab_kimia:     "assets/foto/lab_kimia.jpg",
    bilingual:     "assets/foto/bilingual.jpg",
    biologi:       "assets/foto/biologi.jpg",
    fisika:        "assets/foto/fisika.jpg",
    gedung_syawal: "assets/foto/gedung_syawal.jpg",
    kimia:         "assets/foto/kimia.jpg",
    matematika:    "assets/foto/matematika.jpg"
};

function kartuFoto(nodeId, peran) {
    const src = FOTO_GEDUNG[nodeId];
    if (!src) return null;
    const nama = nodes[nodeId].name;
    const fig = document.createElement('figure');
    fig.className = 'foto-kartu foto-' + peran.kelas;
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Foto ' + nama;
    img.loading = 'lazy';
    img.addEventListener('click', () => bukaFotoBesar(src, nama));
    const cap = document.createElement('figcaption');
    const label = document.createElement('span');
    label.textContent = peran.teks;
    const judul = document.createElement('b');
    judul.textContent = nama;
    cap.append(label, judul);
    fig.append(img, cap);
    return fig;
}

function bukaFotoBesar(src, nama) {
    const lb = document.createElement('div');
    lb.className = 'foto-lightbox';
    lb.innerHTML = '<img alt=""><p></p>';
    lb.querySelector('img').src = src;
    lb.querySelector('img').alt = 'Foto ' + nama;
    lb.querySelector('p').textContent = nama;
    const tutup = () => { lb.remove(); document.removeEventListener('keydown', esc); };
    const esc = e => { if (e.key === 'Escape') tutup(); };
    lb.addEventListener('click', tutup);
    document.addEventListener('keydown', esc);
    document.body.appendChild(lb);
}

document.addEventListener('DOMContentLoaded', () => {
    const tombol = document.getElementById('find-route-btn');
    const wadah = document.getElementById('foto-rute');
    if (!tombol || !wadah) return;

    // dijalankan setelah handler utama di main.js
    tombol.addEventListener('click', () => {
        const awal = document.getElementById('start-node').value;
        const tujuan = document.getElementById('end-node').value;
        wadah.innerHTML = '';
        const k1 = kartuFoto(tujuan, { kelas: 'tujuan', teks: 'Tujuan kamu' });
        const k2 = awal !== tujuan ? kartuFoto(awal, { kelas: 'awal', teks: 'Titik awal' }) : null;
        [k1, k2].forEach(k => k && wadah.appendChild(k));
    });
});
