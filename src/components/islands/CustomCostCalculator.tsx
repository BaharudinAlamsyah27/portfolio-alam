import { useState, useId } from 'preact/hooks';

interface BaseProduct {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface Addon {
  id: string;
  name: string;
  price: number;
  desc: string;
}

const BASE_PRODUCTS: BaseProduct[] = [
  {
    id: 'piket',
    name: 'Sistem Jadwal Piket & Presensi',
    price: 250000,
    category: 'Operasional',
  },
  {
    id: 'gudang',
    name: 'Sistem Data Gudang & Mutasi Stok',
    price: 450000,
    category: 'Logistik',
  },
  {
    id: 'webgis',
    name: 'WebGIS Peta Geospasial Fasilitas',
    price: 550000,
    category: 'Pemetaan',
  },
  {
    id: 'custom',
    name: 'Sistem Custom dari Nol (Sesuai Alur Anda)',
    price: 350000,
    category: 'Full Custom',
  },
];

const ADDONS: Addon[] = [
  {
    id: 'remote-install',
    name: 'Bantuan Instalasi Remote (AnyDesk / TeamViewer)',
    price: 50000,
    desc: 'Dibantu pasang di laptop/PC lokal (XAMPP/Laragon) sampai jalan lancar.',
  },
  {
    id: 'hosting-domain',
    name: 'Paket Hosting CPanel + Domain 1 Tahun',
    price: 250000,
    desc: 'Web langsung online di internet, siap diakses seluruh staf kantor/sekolah.',
  },
  {
    id: 'wa-gateway',
    name: 'Integrasi WhatsApp Gateway Notifikasi',
    price: 150000,
    desc: 'Notifikasi otomatis ke nomor WA anggota saat jadwal piket atau stok habis.',
  },
  {
    id: 'pdf-custom',
    name: 'Custom Kop Surat, Stempel & Export PDF',
    price: 75000,
    desc: 'Format cetak laporan disesuaikan persis dengan kop surat resmi kantor.',
  },
  {
    id: 'multi-role',
    name: 'Tambah Hak Akses / Multi-Role Khusus',
    price: 100000,
    desc: 'Misal pemisahan role Manajer, Staf Input, Auditor, atau SuperAdmin.',
  },
  {
    id: 'geolocation',
    name: 'Integrasi Titik Koordinat GPS / Peta',
    price: 120000,
    desc: 'Validasi radius lokasi atau penandaan koordinat presensi/aset.',
  },
];

const WA_NUMBER = '6287781308730';

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function CustomCostCalculator({ locale = 'id' }: { locale?: string }) {
  const [selectedBaseId, setSelectedBaseId] = useState<string>('piket');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['remote-install']);
  const [note, setNote] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const noteInputId = useId();

  const currentBase = BASE_PRODUCTS.find((p) => p.id === selectedBaseId) || BASE_PRODUCTS[0];
  const activeAddons = ADDONS.filter((a) => selectedAddons.includes(a.id));
  const addonsTotal = activeAddons.reduce((sum, item) => sum + item.price, 0);
  const grandTotal = currentBase.price + addonsTotal;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const generateSummaryText = () => {
    const lines = [
      `Halo Alam, saya mencoba kalkulator estimasi di web portfolio Anda.`,
      `Berikut rincian paket sistem web yang saya minati:`,
      `• Paket Dasar: ${currentBase.name} (${formatRupiah(currentBase.price)})`,
    ];

    if (activeAddons.length > 0) {
      lines.push(`• Tambahan Layanan:`);
      activeAddons.forEach((a, idx) => {
        lines.push(`  ${idx + 1}. ${a.name} (${formatRupiah(a.price)})`);
      });
    } else {
      lines.push(`• Tambahan Layanan: (Hanya source code dasar)`);
    }

    lines.push(`• Estimasi Total: ${formatRupiah(grandTotal)}`);
    if (note.trim().length > 0) {
      lines.push(`• Catatan kebutuhan saya: "${note.trim()}"`);
    }
    lines.push(`Apakah paket ini bisa dikonsultasikan lebih lanjut? Terima kasih.`);
    return lines.join('\n');
  };

  const handleCopy = () => {
    const text = generateSummaryText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(generateSummaryText())}`;

  return (
    <div class="sticker-card relative rounded-md bg-paper p-5 sm:p-7">
      <div class="space-y-2 border-b-2 border-dashed border-ink/20 pb-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="bg-mustard text-ink rounded-sm border-2 border-ink px-2.5 py-0.5 font-mono text-xs font-bold uppercase shadow-[2px_2px_0_var(--ink)]">
            🧮 {locale === 'id' ? 'Kalkulator Paket Web' : 'Web Project Estimator'}
          </span>
          <span class="font-hand text-ink-soft text-sm">
            {locale === 'id' ? 'Transparan · Tanpa biaya tersembunyi' : 'Transparent · No hidden fee'}
          </span>
        </div>
        <h3 class="font-display text-2xl font-extrabold sm:text-3xl">
          {locale === 'id'
            ? 'Hitung Estimasi Kebutuhan Sistem Anda'
            : 'Estimate Your Custom Web System'}
        </h3>
        <p class="text-xs leading-relaxed text-ink-soft sm:text-sm">
          {locale === 'id'
            ? 'Pilih produk dasar dan centang layanan tambahan yang Anda perlukan. Anda bisa langsung mengirimkan rincian ini ke WhatsApp Alam untuk konsultasi.'
            : 'Select a base system and tick any extra modules you need. Send the breakdown directly to WhatsApp for a quick consultation.'}
        </p>
      </div>

      <div class="mt-6 grid gap-6 lg:grid-cols-12">
        {/* Kolom Kiri: Pilihan Paket & Add-ons */}
        <div class="space-y-6 lg:col-span-7">
          {/* Langkah 1: Pilih Produk Dasar */}
          <div class="space-y-3">
            <label class="block font-mono text-xs font-bold uppercase text-ink">
              1. {locale === 'id' ? 'Pilih Paket Dasar Sistem' : 'Select Base System'}
            </label>
            <div class="grid gap-2.5 sm:grid-cols-2">
              {BASE_PRODUCTS.map((prod) => {
                const isSelected = selectedBaseId === prod.id;
                return (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => setSelectedBaseId(prod.id)}
                    class={`flex flex-col justify-between rounded-sm border-2 p-3 text-left transition-all ${
                      isSelected
                        ? 'border-ink bg-mustard/30 shadow-[3px_3px_0_var(--ink)] ring-2 ring-ink'
                        : 'border-ink/40 bg-paper-2 hover:border-ink hover:bg-paper'
                    }`}
                  >
                    <div>
                      <span class="text-[10px] font-mono font-bold uppercase text-ink-soft">
                        {prod.category}
                      </span>
                      <div class="font-display text-sm font-bold leading-tight text-ink">
                        {prod.name}
                      </div>
                    </div>
                    <div class="mt-2 font-mono text-xs font-extrabold text-tomato">
                      {formatRupiah(prod.price)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Langkah 2: Centang Add-on */}
          <div class="space-y-3">
            <label class="block font-mono text-xs font-bold uppercase text-ink">
              2. {locale === 'id' ? 'Kebutuhan Tambahan (Opsional)' : 'Optional Add-ons'}
            </label>
            <div class="space-y-2">
              {ADDONS.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <label
                    key={addon.id}
                    class={`flex cursor-pointer items-start gap-3 rounded-sm border-2 p-3 transition-all ${
                      isChecked
                        ? 'border-ink bg-paper shadow-[2px_2px_0_var(--ink)]'
                        : 'border-ink/25 bg-paper-2/60 hover:bg-paper'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleAddon(addon.id)}
                      class="mt-1 h-4 w-4 cursor-pointer accent-tomato"
                    />
                    <div class="flex-1">
                      <div class="flex flex-wrap items-center justify-between gap-1">
                        <span class="font-display text-xs font-bold text-ink sm:text-sm">
                          {addon.name}
                        </span>
                        <span class="font-mono text-xs font-extrabold text-leaf">
                          +{formatRupiah(addon.price)}
                        </span>
                      </div>
                      <p class="mt-0.5 text-[11px] leading-snug text-ink-soft">{addon.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Langkah 3: Catatan Singkat */}
          <div class="space-y-1.5">
            <label
              for={noteInputId}
              class="block font-mono text-xs font-bold uppercase text-ink"
            >
              3. {locale === 'id' ? 'Catatan Kebutuhan Tempat Anda (Opsional)' : 'Workflow Notes (Optional)'}
            </label>
            <input
              id={noteInputId}
              type="text"
              value={note}
              onInput={(e) => setNote((e.target as HTMLInputElement).value)}
              placeholder={
                locale === 'id'
                  ? 'Contoh: Untuk kantor cabang di Sragen, butuh laporan per divisi...'
                  : 'E.g., For school clinic in Sragen, need weekly export...'
              }
              class="w-full rounded-sm border-2 border-ink bg-paper px-3 py-2 font-mono text-xs text-ink focus:outline-none focus:ring-2 focus:ring-mustard"
            />
          </div>
        </div>

        {/* Kolom Kanan: Ringkasan Nota Tagihan Meja Kerja */}
        <div class="lg:col-span-5">
          <div class="sticky top-6 rounded-md border-2 border-ink bg-paper-2 p-4 shadow-[4px_4px_0_var(--ink)] sm:p-5">
            <div class="flex items-center justify-between border-b-2 border-ink pb-3">
              <span class="font-mono text-xs font-bold uppercase tracking-wider text-ink">
                🧾 {locale === 'id' ? 'Nota Rincian' : 'Invoice Spec'}
              </span>
              <span class="bg-mustard text-ink rounded-sm border border-ink px-1.5 py-0.2 font-mono text-[10px] font-bold">
                ESTIMASI RP0
              </span>
            </div>

            <div class="mt-4 space-y-2.5 text-xs text-ink">
              <div class="flex items-start justify-between gap-2 border-b border-dashed border-ink/20 pb-2">
                <div>
                  <div class="font-bold">{currentBase.name}</div>
                  <div class="text-[10px] text-ink-soft">Paket Utama Source Code</div>
                </div>
                <div class="font-mono font-bold text-ink shrink-0">
                  {formatRupiah(currentBase.price)}
                </div>
              </div>

              {activeAddons.length > 0 ? (
                <div class="space-y-1.5 border-b border-dashed border-ink/20 pb-2">
                  <div class="text-[10px] font-mono font-bold uppercase text-ink-soft">
                    Layanan Tambahan:
                  </div>
                  {activeAddons.map((addon) => (
                    <div key={addon.id} class="flex items-start justify-between gap-2 text-[11px]">
                      <span class="text-ink-soft">• {addon.name}</span>
                      <span class="font-mono font-semibold shrink-0">
                        {formatRupiah(addon.price)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div class="border-b border-dashed border-ink/20 pb-2 text-[11px] italic text-ink-soft">
                  Tidak ada tambahan layanan (hanya source code).
                </div>
              )}

              {note.trim().length > 0 && (
                <div class="border-b border-dashed border-ink/20 pb-2 text-[11px] text-ink-soft">
                  <span class="font-bold">Catatan:</span> &ldquo;{note}&rdquo;
                </div>
              )}
            </div>

            {/* Total Section */}
            <div class="mt-4 rounded-sm border-2 border-ink bg-mustard/40 p-3">
              <div class="flex items-baseline justify-between">
                <span class="font-mono text-xs font-bold uppercase text-ink">Total Estimasi:</span>
                <span class="font-mono text-xl font-extrabold text-ink sm:text-2xl">
                  {formatRupiah(grandTotal)}
                </span>
              </div>
              <p class="mt-1 text-[10px] text-ink-soft">
                *Harga final dapat disesuaikan setelah diskusi alur spesifik via WhatsApp.
              </p>
            </div>

            {/* CTA Buttons */}
            <div class="mt-5 space-y-2">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                class="sticker-btn bg-leaf text-paper flex w-full justify-center rounded-sm px-4 py-2.5 font-mono text-xs font-bold shadow-[2px_2px_0_var(--ink)]"
              >
                💬 {locale === 'id' ? 'Konsultasi Paket Ini via WA' : 'Order via WhatsApp'} &rarr;
              </a>

              <button
                type="button"
                onClick={handleCopy}
                class="sticker-btn bg-paper text-ink flex w-full justify-center rounded-sm px-4 py-2 font-mono text-xs"
              >
                {copied
                  ? '✓ ' + (locale === 'id' ? 'Rincian Disalin ke Clipboard!' : 'Copied!')
                  : '📋 ' + (locale === 'id' ? 'Salin Teks Rincian' : 'Copy Breakdown')}
              </button>
            </div>

            <div class="mt-3 text-center text-[11px] text-ink-soft">
              📞 WhatsApp:{' '}
              <a href="https://wa.me/6287781308730" class="underline hover:text-tomato">
                0877-8130-8730
              </a>{' '}
              (Alam)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
