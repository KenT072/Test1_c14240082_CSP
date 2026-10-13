import { useState } from "react";
import styles from "./ui.module.css";

const initialForm = {
  nama: "",
  kategori: "",
  harga: "",
  stok: "",
};

export default function AddMenuForm({ categories, onSubmit }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (values) => {
    const nextErrors = {};

    if (values.nama.trim().length < 3) {
      nextErrors.nama = "Nama minimal 3 karakter.";
    }

    if (!values.kategori) {
      nextErrors.kategori = "Kategori wajib dipilih.";
    }

    const price = Number(values.harga);
    if (!Number.isFinite(price) || price <= 0) {
      nextErrors.harga = "Harga harus lebih dari 0.";
    }

    const stock = Number(values.stok);
    if (!Number.isFinite(stock) || stock < 0) {
      nextErrors.stok = "Stok tidak boleh negatif.";
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(form);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSubmit({
      id: Date.now(),
      nama: form.nama.trim(),
      kategori: form.kategori,
      harga: Number(form.harga),
      stok: Number(form.stok),
    });

    setForm(initialForm);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formPanel} noValidate>
      <div className={styles.formGrid}>
        <div className={styles.fieldGroup}>
          <label htmlFor="nama" className={styles.fieldLabel}>
            Nama menu
          </label>
          <input
            id="nama"
            name="nama"
            type="text"
            value={form.nama}
            onChange={handleChange}
            className={styles.formInput}
          />
          {errors.nama && (
            <span className={styles.errorText} role="alert">
              {errors.nama}
            </span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="kategori" className={styles.fieldLabel}>
            Kategori
          </label>
          <select
            id="kategori"
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
            className={styles.formSelect}
          >
            <option value="">Pilih kategori</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.kategori && (
            <span className={styles.errorText} role="alert">
              {errors.kategori}
            </span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="harga" className={styles.fieldLabel}>
            Harga
          </label>
          <input
            id="harga"
            name="harga"
            type="number"
            min="1"
            value={form.harga}
            onChange={handleChange}
            className={styles.formInput}
          />
          {errors.harga && (
            <span className={styles.errorText} role="alert">
              {errors.harga}
            </span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="stok" className={styles.fieldLabel}>
            Stok
          </label>
          <input
            id="stok"
            name="stok"
            type="number"
            min="0"
            value={form.stok}
            onChange={handleChange}
            className={styles.formInput}
          />
          {errors.stok && (
            <span className={styles.errorText} role="alert">
              {errors.stok}
            </span>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>
          Tambah menu
        </button>
      </div>
    </form>
  );
}
