A1. 
Kode itu melanggar aturan Hooks karena useState ditulis di dalam if, sehingga pemanggilannya bisa berbeda pada setiap render. React mencocokkan state berdasarkan urutan Hook dipanggil, bukan berdasarkan nama variabelnya. Jadi, useState harus dipindahkan ke bagian teratas komponen sebelum pengecekan kondisi.

Perbaikannya:
function Profil({ sudahLogin }) {
  const [nama, setNama] = useState("");

  if (!sudahLogin) {
    return null;
  }

  // ...
}

A2.

items.push(baru) mengubah array yang lama secara langsung, lalu setItems(items) mengirim array dengan referensi yang sama. Akibatnya, React bisa anggap state tidak berubah dan tidak melakukan render ulang dan kita menggunakan array baru dengan spread operator saat menambahkan item.

Perbaikannya:
const tambah = (baru) => {
  setItems((itemsSebelumnya) => [...itemsSebelumnya, baru]);
};


A3.

useEffect tanpa dependency dijalankan setelah tiap render, sedangkan yang memakai [] dijalankan setelah render pertama. Jika memakai [kota], effect dijalankan setelah render pertama dan saat nilai kota berubah dan terakhir cleanup dijalankan sebelum effect diulang karena dependensi berubah dan saat komponen dilepas (unmount).

A4.

State keyword disimpan di komponen induk karena FilterBar dan DaftarMenu sama-sama membutuhkannya. Komponen induk mengirim nilai keyword ke komponen yang membutuhkan lewat props dan memberikan fungsi callback ke FilterBar dan saat pencarian berubah  FilterBar memanggil callback agar induk bisa memperbarui state keyword.

A5.

Controlled component adalah input yang nilainya diatur oleh state React melalui value dan diperbarui dengan onChange. Satu fungsi handleChange bisa dipakai untuk banyak input karena tiap input memiliki atribut name, dan fungsi tersebut membaca event.target.name serta event.target.value. name menentukan bagian state yang diubah, sedangkan value memberikan nilai yang dimasukkan ke input.